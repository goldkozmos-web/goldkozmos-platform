async function canvasPng(body: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const grout = ctx.createLinearGradient(0, 0, 0, 1350);
  grout.addColorStop(0, "#1a140f");
  grout.addColorStop(1, "#120e0b");
  ctx.fillStyle = grout;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(196,163,90,0.45)";
  ctx.lineWidth = 2;
  ctx.strokeRect(48, 48, 984, 1254);
  ctx.strokeRect(64, 64, 952, 1222);

  ctx.fillStyle = "#c4a35a";
  ctx.font = "700 22px Georgia, serif";
  ctx.letterSpacing = "6px";
  ctx.fillText("GOLDKOZMOS", 108, 160);

  ctx.fillStyle = "rgba(244,234,216,0.55)";
  ctx.font = "600 18px sans-serif";
  ctx.letterSpacing = "4px";
  ctx.fillText("BUGÜN", 108, 210);

  ctx.fillStyle = "#f4ead8";
  ctx.font = "400 48px Georgia, serif";
  ctx.letterSpacing = "0px";
  wrapText(ctx, body, 108, 340, 860, 64);

  ctx.fillStyle = "#c4a35a";
  ctx.font = "500 22px sans-serif";
  ctx.fillText("goldkozmos.com", 108, 1228);

  return canvas;
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(/\s+/);
  let line = "";
  let cursor = y;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, cursor);
      line = word;
      cursor += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, cursor);
}

function canvasToBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/png");
  });
}

export async function shareDailyMessage(body: string) {
  const text = `${body}\n\nGoldKozmos · goldkozmos.com`;
  const canvas = await canvasPng(body);
  const blob = canvas ? await canvasToBlob(canvas) : null;
  const file =
    blob && typeof File !== "undefined"
      ? new File([blob], "goldkozmos-gunun-mesaji.png", { type: "image/png" })
      : null;

  if (
    file &&
    typeof navigator !== "undefined" &&
    typeof navigator.share === "function" &&
    (!navigator.canShare || navigator.canShare({ files: [file] }))
  ) {
    try {
      await navigator.share({
        title: "GoldKozmos · Günün Mesajı",
        text,
        files: [file],
      });
      return "shared";
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return "aborted";
      }
    }
  }

  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    try {
      await navigator.share({ title: "GoldKozmos · Günün Mesajı", text });
      return "shared-text";
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return "aborted";
      }
    }
  }

  if (blob) {
    await saveBlob(blob, "goldkozmos-gunun-mesaji.png");
    return "saved";
  }

  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // ignore
  }
  return "copied";
}

export async function saveDailyMessageImage(body: string, dateLabel = "bugun") {
  const canvas = await canvasPng(body);
  const blob = canvas ? await canvasToBlob(canvas) : null;
  if (!blob) return;
  await saveBlob(blob, `gunun-mesaji-${dateLabel}.png`);
}

function saveBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}
