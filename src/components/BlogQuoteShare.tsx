"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "../styles/blog-quote-share.css";

type Theme = "gold" | "cream" | "cosmic";

function paintStoryBackground(ctx: CanvasRenderingContext2D, theme: Theme) {
  const cream = theme === "cream";
  const gradient = ctx.createLinearGradient(0, 0, 1080, 1920);
  const colors = cream ? ["#fffaf0", "#f1e6d1", "#e3cdaa"] : theme === "gold" ? ["#11120f", "#1b1913", "#090c0b"] : ["#17142b", "#171126", "#070e20"];
  colors.forEach((color, index) => gradient.addColorStop(index / 2, color));
  ctx.fillStyle = gradient; ctx.fillRect(0, 0, 1080, 1920);
  function glow(x: number, y: number, radius: number, color: string) {
    const light = ctx.createRadialGradient(x, y, 0, x, y, radius);
    light.addColorStop(0, color); light.addColorStop(1, "transparent");
    ctx.fillStyle = light; ctx.fillRect(0, 0, 1080, 1920);
  }
  glow(1000, 100, 850, cream ? "#ffffffb0" : theme === "gold" ? "#b7822838" : "#865bbb65");
  glow(0, 1700, 700, cream ? "#bf986122" : theme === "gold" ? "#96713a22" : "#26738938");
  // A deterministic fine texture keeps exported cards consistent between renders.
  for (let index = 0; index < 6500; index++) {
    const x = (index * 137.23 + 73) % 1080;
    const y = (index * 271.71 + 31) % 1920;
    ctx.fillStyle = cream ? "#856d4512" : "#e9d8ad0a";
    ctx.fillRect(x, y, 1, 1);
  }
  ctx.lineWidth = 1.3;
  if (theme === "gold") {
    for (let index = 0; index < 8; index++) {
      const metal = ctx.createLinearGradient(100, 0, 1080, 650);
      metal.addColorStop(0, "#ae824610"); metal.addColorStop(.55, "#e4c78980"); metal.addColorStop(1, "#96713b12");
      ctx.strokeStyle = metal; ctx.beginPath(); ctx.ellipse(1040, 110, 270 + index * 32, 190 + index * 30, -.35, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.strokeStyle = "#b69a5440"; ctx.beginPath(); ctx.arc(-80, 1920, 420, 0, Math.PI * 2); ctx.stroke();
  } else if (cream) {
    ctx.strokeStyle = "#b0925d20";
    for (let index = 0; index < 7; index++) {
      ctx.beginPath(); ctx.moveTo(720 + index * 32, 0); ctx.bezierCurveTo(440 + index * 28, 250, 1260, 380 + index * 40, 1080, 750 + index * 35); ctx.stroke();
    }
    ctx.fillStyle = "#b8945718"; ctx.beginPath(); ctx.ellipse(-90, 1760, 380, 620, -.5, 0, Math.PI * 2); ctx.fill();
  } else {
    for (let index = 0; index < 150; index++) {
      const x = (index * 173 + 43) % 1080, y = (index * 307 + 97) % 1920;
      ctx.fillStyle = `rgba(226,216,255,${.12 + (index % 5) * .09})`;
      ctx.beginPath(); ctx.arc(x, y, .6 + (index % 3) * .6, 0, Math.PI * 2); ctx.fill();
    }
    const stars = [[735, 140], [860, 235], [990, 180], [920, 370], [1040, 470]];
    ctx.strokeStyle = "#c4b7eb35"; ctx.beginPath(); stars.forEach(([x, y], index) => { if (index === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); }); ctx.stroke();
    stars.forEach(([x, y]) => { glow(x, y, 24, "#ddd1ff45"); ctx.fillStyle = "#eadcfa"; ctx.beginPath(); ctx.arc(x, y, 2.6, 0, Math.PI * 2); ctx.fill(); });
    ctx.strokeStyle = "#bfa4e638"; ctx.beginPath(); ctx.ellipse(960, 240, 260, 100, -.5, 0, Math.PI * 2); ctx.stroke();
  }
  ctx.strokeStyle = cream ? "#9f7a3945" : theme === "cosmic" ? "#bc9dd640" : "#d3ac6255";
  ctx.strokeRect(52, 70, 976, 1780);
  ctx.strokeStyle = cream ? "#9f7a391c" : "#e5c99615"; ctx.strokeRect(66, 84, 948, 1752);
}

function linesFor(ctx: CanvasRenderingContext2D, text: string, width: number) {
  const lines: string[] = [];
  for (const paragraph of text.split(/\n/)) {
    let line = "";
    for (const word of paragraph.split(/\s+/)) {
      const candidate = line ? `${line} ${word}` : word;
      if (ctx.measureText(candidate).width > width && line) { lines.push(line); line = word; }
      else line = candidate;
    }
    if (line) lines.push(line);
  }
  return lines;
}

export default function BlogQuoteShare({ title, slug, defaultQuote }: { title: string; slug: string; defaultQuote: string }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [quote, setQuote] = useState(defaultQuote.slice(0, 700));
  const [theme, setTheme] = useState<Theme>("gold");
  const [preview, setPreview] = useState("");
  const [notice, setNotice] = useState("");
  const [linkNotice, setLinkNotice] = useState("");
  const blobRef = useRef<Blob | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const articleUrl = `https://goldkozmos.com/goldblog/${slug}`;

  useEffect(() => {
    function readSelection() {
      const selection = window.getSelection();
      if (!selection?.rangeCount || selection.isCollapsed) return "";
      const range = selection.getRangeAt(0);
      const start = range.startContainer.parentElement?.closest(".blogLead, .blogTextSection");
      const end = range.endContainer.parentElement?.closest(".blogLead, .blogTextSection");
      return start && end ? selection.toString().trim() : "";
    }
    function onSelection() { setSelected(readSelection()); }
    function onCopy() {
      const text = readSelection();
      if (text) { setQuote(text.slice(0, 700)); setNotice(text.length > 700 ? "Uzun alıntının ilk 700 karakteri karta eklendi. Metni aşağıdan düzenleyebilirsin." : "Alıntın kopyalandı. Şimdi hikâye kartını hazırlayabilirsin."); setOpen(true); }
    }
    document.addEventListener("selectionchange", onSelection);
    document.addEventListener("copy", onCopy);
    return () => { document.removeEventListener("selectionchange", onSelection); document.removeEventListener("copy", onCopy); };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab") return;
      const items = dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), textarea, input, a[href]');
      if (!items?.length) return;
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", onKey); previousFocus?.focus(); };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    let disposed = false;
    let objectUrl = "";
    blobRef.current = null;
    const canvas = document.createElement("canvas");
    canvas.width = 1080; canvas.height = 1920;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const cream = theme === "cream";
    paintStoryBackground(ctx, theme);
    const gold = cream ? "#90703d" : theme === "cosmic" ? "#d7c0eb" : "#dec087";
    const ink = cream ? "#382c1e" : "#fff5e5";
    ctx.fillStyle = gold; ctx.font = "25px Arial"; ctx.fillText("GOLDKOZMOS", 105, 180);
    ctx.font = "20px Arial"; ctx.fillText("G O L D B L O G   /   B İ R  S A T I R", 105, 228);
    ctx.strokeStyle = gold; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(160, 350, 51, 0, Math.PI * 2); ctx.stroke();
    ctx.font = "54px Georgia"; ctx.fillText("✦", 137, 369);
    ctx.font = "130px Georgia"; ctx.fillText("“", 95, 525);
    let fontSize = 58;
    let quoteLines: string[] = [];
    do { ctx.font = `${fontSize}px Georgia`; quoteLines = linesFor(ctx, quote.trim() || "Kendini anlamaya bir sayfa aç.", 870); if (quoteLines.length * fontSize * 1.4 <= 970) break; fontSize -= 2; } while (fontSize > 28);
    ctx.fillStyle = ink;
    const lineHeight = fontSize * 1.4;
    const textY = 590 + Math.max(0, (800 - quoteLines.length * lineHeight) / 2);
    quoteLines.forEach((line, index) => ctx.fillText(line, 105, textY + index * lineHeight));
    ctx.strokeStyle = gold; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(105, 1540); ctx.lineTo(230, 1540); ctx.stroke();
    ctx.fillStyle = gold; ctx.font = "25px Arial"; ctx.fillText("BU YAZIDAN BİR SATIR", 105, 1605);
    ctx.fillStyle = ink; ctx.font = "34px Georgia";
    linesFor(ctx, title, 850).slice(0, 3).forEach((line, index) => ctx.fillText(line, 105, 1665 + index * 45));
    ctx.fillStyle = gold; ctx.font = "25px Arial"; ctx.fillText("goldkozmos.com", 105, 1800);
    canvas.toBlob((blob) => { if (!blob || disposed) return; blobRef.current = blob; objectUrl = URL.createObjectURL(blob); setPreview(objectUrl); }, "image/png");
    return () => { disposed = true; if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [open, quote, theme, title]);

  function showShare() { setQuote((selected || defaultQuote).slice(0, 700)); setNotice(""); setOpen(true); }
  async function copyArticleLink() {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setLinkNotice("Yazı bağlantısı kopyalandı.");
    } catch {
      setLinkNotice("Bağlantı kopyalanamadı. Tarayıcının kopyalama iznini kontrol edip tekrar deneyebilirsin.");
    }
  }
  async function shareImage() {
    if (!blobRef.current) return;
    const file = new File([blobRef.current], `goldblog-${slug}.png`, { type: "image/png" });
    const payload = { files: [file], title, text: quote, url: articleUrl };
    if (!navigator.share || !navigator.canShare?.(payload)) {
      setNotice("Bu tarayıcı görselle uygulama paylaşımını desteklemiyor. Telefonunda bu sayfayı Safari veya Chrome ile açıp tekrar deneyebilirsin.");
      return;
    }
    try {
      await navigator.share(payload);
      setNotice("Paylaşım menüsü kapandı.");
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        setNotice("Paylaşım menüsü açılamadı. Telefonunda desteklenen bir tarayıcıyla tekrar deneyebilirsin.");
      }
    }
  }
  return <>
    <div className="blogShareEntryRow"><button type="button" className="blogShareEntry" onClick={showShare}><span aria-hidden="true">✦</span> Alıntıyı hikâyende paylaş <span aria-hidden="true">↗</span></button><button type="button" className="blogShareEntry blogCopyLink" onClick={copyArticleLink}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="3"/><path d="M15 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2"/></svg>Bağlantıyı kopyala</button></div>
    <p className="blogCopyLinkNotice" role="status">{linkNotice}</p>
    {selected && !open && createPortal(<button type="button" className="blogSelectionShare" onMouseDown={(event) => event.preventDefault()} onClick={showShare}>Seçtiğin alıntıyı paylaş ↗</button>, document.body)}
    {open && createPortal(<div className="blogShareBackdrop" onClick={(event) => { if (event.target === event.currentTarget) setOpen(false); }}><div className="blogShareDialog" data-theme={theme} role="dialog" aria-modal="true" aria-labelledby="quote-share-title" ref={dialogRef}>
      <header><div><p>GOLDBLOG · BİR SATIR PAYLAŞ</p><h2 id="quote-share-title">Sana dokunan sözü yanında taşı.</h2></div><button type="button" ref={closeRef} onClick={() => setOpen(false)} aria-label="Paylaşımı kapat">×</button></header>
      <div className="blogShareLayout"><div className="blogStoryStage"><div className="blogStoryPreview">{preview && <img src={preview} alt="Seçtiğin alıntının Goldkozmos imzalı hikâye görseli" width={1080} height={1920} />}</div><p>HİKÂYE ÖNİZLEMESİ <span>9:16</span></p></div><div className="blogShareControls">
        <label htmlFor="blog-share-quote">Alıntın</label><textarea id="blog-share-quote" value={quote} maxLength={700} onChange={(event) => setQuote(event.target.value)} rows={4} /><small>{quote.length} / 700 karakter</small>
        <p className="blogShareLabel">HİKÂYENİN ATMOSFERİNİ SEÇ</p><div className="blogShareThemes">{([['gold','Gece & Altın','Siyah · Altın'],['cream','Sıcak Krem','Kâğıt · Sıcak'],['cosmic','Kozmik','Gece · Yıldızlar']] as const).map(([key,label,description]) => <button type="button" key={key} data-theme={key} aria-label={label} aria-pressed={theme === key} onClick={() => setTheme(key)}><span className="blogThemeSwatch" aria-hidden="true"><i>✦</i><b>“</b><span className="blogThemeTick">✓</span></span><strong>{label}</strong><small>{description}</small></button>)}</div>
        <p className="blogShareLabel">GÖRSELİN HAZIR</p><div className="blogSharePlatforms"><button type="button" onClick={shareImage} disabled={!preview}>Paylaşım platformlarını göster ↗</button></div>
        <div className="blogShareActions"><button type="button" onClick={copyArticleLink}>Bağlantıyı kopyala</button></div><p className="blogCopyLinkNotice" role="status">{linkNotice}</p>
        <p className="blogShareHint">Görsel ve yazı bağlantısı telefonunun paylaşım menüsüne iletilir. Uygulamaların bunları nasıl kullandığı değişebilir; Instagram hikâyesine tıklanabilir bağlantı otomatik eklenmez.</p><p className="blogShareNotice" role="status">{notice}</p>
      </div></div>
    </div></div>, document.body)}
  </>;
}

