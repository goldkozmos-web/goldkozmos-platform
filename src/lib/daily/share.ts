export async function shareDailyMessage(body: string) {
  const text = `${body}\n\nGoldKozmos`;

  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    try {
      await navigator.share({ title: "Günün Mesajı", text });
      return;
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
    }
  }

  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Ignore clipboard denial.
  }
}

export async function saveDailyMessageImage(body: string, dateLabel: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = "#211812";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#d4aa59";
  ctx.font = "600 28px Georgia, serif";
  ctx.fillText("GOLDKOZMOS", 80, 120);

  ctx.fillStyle = "rgba(255,248,235,0.62)";
  ctx.font = "500 22px sans-serif";
  ctx.fillText(dateLabel.toUpperCase(), 80, 170);

  ctx.fillStyle = "#fff8ed";
  ctx.font = "400 54px Georgia, serif";
  wrapText(ctx, body, 80, 320, 920, 72);

  ctx.fillStyle = "#cda354";
  ctx.font = "500 22px sans-serif";
  ctx.fillText("Günün Mesajı", 80, 1240);

  const url = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = url;
  link.download = `gunun-mesaji-${dateLabel}.png`;
  link.click();
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

  if (line) {
    ctx.fillText(line, x, cursor);
  }
}
