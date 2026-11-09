"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import Image from "next/image";
import "../styles/energy-discovery-popup.css";

const visitKey = "gk-telegram-invitation-shown";
let shownThisVisit = false;

export default function TelegramInvite() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (pathname !== "/" || shownThisVisit) return;
    try { if (sessionStorage.getItem(visitKey)) return; } catch { /* Memory fallback. */ }
    let timer: ReturnType<typeof setTimeout>;
    function showWhenReady() {
      const blocked = Array.from(document.querySelectorAll('.memberInvite, .energyInvitationPopup, [role="dialog"], dialog[open]')).some(element => element.getClientRects().length > 0 && getComputedStyle(element).visibility !== "hidden");
      if (document.visibilityState !== "visible" || blocked) {
        timer = setTimeout(showWhenReady, 5000);
        return;
      }
      shownThisVisit = true;
      try { sessionStorage.setItem(visitKey, "1"); } catch { /* Memory fallback. */ }
      setOpen(true);
    }
    timer = setTimeout(showWhenReady, 25000);
    return () => clearTimeout(timer);
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  if (!open || pathname !== "/") return null;
  return createPortal(<aside className="energyInvitationPopup telegramInvitationPopup" aria-labelledby="telegram-invitation-title">
    <button className="energyInvitationClose" type="button" aria-label="İletişim kutusunu kapat" onClick={() => setOpen(false)}>×</button>
    <div className="energyInvitationArt"><Image src="/images/basla/whatsapp.webp" alt="" width={84} height={84} /><span>GOLDKOZMOS<small>SANA UYGUN ÇALIŞMAYI BİRLİKTE BULALIM</small></span></div>
    <h2 id="telegram-invitation-title">Aklındaki soruları<br /><em>birlikte konuşalım.</em></h2>
    <p>Kozmik enerji çalışmaları hakkında bilgi almak veya randevu planlamak için WhatsApp’tan bana yazabilirsin.</p>
    <a className="energyInvitationAction" href={`https://wa.me/905054722153?text=${encodeURIComponent("Merhaba, kozmik enerji çalışmaları hakkında bilgi almak istiyorum.")}`} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>WhatsApp’ta sor <span aria-hidden="true">↗</span></a>
    <button className="energyInvitationLater" type="button" onClick={() => setOpen(false)}>Şimdi değil, keşfetmeye devam et</button>
  </aside>, document.body);
}
