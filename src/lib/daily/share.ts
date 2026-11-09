import { istanbulMessageDay } from "./visual";
import { monthlyDailyMessage } from "./monthly";

async function canvasPng(body: string, day: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Görsel hazırlanamadı.");
  const landscape = await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    const timer = window.setTimeout(() => reject(new Error("Görsel yüklenemedi. Yeniden dene.")), 15000);
    image.onload = () => { window.clearTimeout(timer); resolve(image); };
    image.onerror = () => { window.clearTimeout(timer); reject(new Error("Görsel yüklenemedi. Yeniden dene.")); };
    image.src = monthlyDailyMessage(day).image;
  });
  ctx.drawImage(landscape, 0, 0, 1080, 1920);
  const shade = ctx.createLinearGradient(0, 0, 0, 1920);
  shade.addColorStop(0, "rgba(15,24,20,.18)");
  shade.addColorStop(.25, "rgba(15,24,20,.12)");
  shade.addColorStop(.6, "rgba(15,24,20,.65)");
  shade.addColorStop(1, "rgba(15,24,20,.85)");
  ctx.fillStyle = shade;
  ctx.fillRect(0, 0, 1080, 1920);
  ctx.fillStyle = "#f7efdf";
  ctx.textAlign = "center";
  ctx.font = "500 22px Arial, sans-serif";
  ctx.letterSpacing = "4px";
  ctx.fillText("GÜNÜN MESAJI", 540, 145);
  ctx.letterSpacing = "0px";
  const date = new Date(day + "T12:00:00Z");
  ctx.font = "400 22px Arial, sans-serif";
  ctx.fillText(date.toLocaleDateString("tr-TR", {timeZone:"Europe/Istanbul", day:"numeric", month:"long", year:"numeric"}), 540, 188);
  const words = body.split(/\s+/);
  let lines: string[] = [], size = 56;
  do {
    ctx.font = "400 " + size + "px Georgia, serif";
    lines = []; let line = "";
    for (const word of words) {
      const test = line ? line + " " + word : word;
      if (ctx.measureText(test).width > 860 && line) { lines.push(line); line = word; }
      else line = test;
    }
    if(line) lines.push(line);
    if(lines.length * size * 1.38 <= 550) break;
    size -= 2;
  } while(size > 34);
  ctx.shadowColor = "rgba(0,0,0,.3)"; ctx.shadowBlur = 12;
  const lineHeight = size * 1.38;
  const start = 1150 - (lines.length - 1) * lineHeight / 2;
  lines.forEach((line, index) => ctx.fillText(line, 540, start + index * lineHeight));
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#dfc792";
  ctx.font = "400 32px Georgia, serif";
  ctx.fillText("Goldkozmos", 540, 1720);
  ctx.font = "400 20px Arial, sans-serif";
  ctx.fillText("goldkozmos.com", 540, 1760);
  return canvas;
}

function canvasToBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/png");
  });
}

export async function shareDailyMessage(body: string, day = istanbulMessageDay()) {
  const text = `${body}\n\nGoldKozmos · goldkozmos.com`;
  const canvas = await canvasPng(body, day);
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

export async function saveDailyMessageImage(body: string, dateLabel = istanbulMessageDay()) {
  const canvas = await canvasPng(body, dateLabel);
  const blob = canvas ? await canvasToBlob(canvas) : null;
  if (!blob) throw new Error("Görsel kaydedilemedi. Yeniden dene.");
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
