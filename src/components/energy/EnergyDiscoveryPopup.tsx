"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import "../../styles/energy-discovery-popup.css";

const visitKey = "gk-energy-invitation-shown";
let shownThisVisit = false;

export default function EnergyDiscoveryPopup() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (shownThisVisit) return;
    try { if (sessionStorage.getItem(visitKey)) return; } catch { /* Memory fallback. */ }
    let timer: ReturnType<typeof setTimeout>;
    function showWhenReady() {
      const anotherPopupVisible = Array.from(document.querySelectorAll('.memberInvite, [role="dialog"], dialog[open]')).some(element => element.getClientRects().length > 0 && getComputedStyle(element).visibility !== "hidden");
      if (document.visibilityState !== "visible" || anotherPopupVisible) {
        timer = setTimeout(showWhenReady, 5000);
        return;
      }
      shownThisVisit = true;
      try { sessionStorage.setItem(visitKey, "1"); } catch { /* Memory fallback. */ }
      setOpen(true);
    }
    timer = setTimeout(showWhenReady, 20000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  if (!open) return null;
  return createPortal(<aside className="energyInvitationPopup" aria-labelledby="energy-invitation-title">
    <button className="energyInvitationClose" type="button" aria-label="Çalışma davetini kapat" onClick={() => setOpen(false)}>×</button>
    <div className="energyInvitationArt"><Image src="/images/basla/enerji.webp" alt="" width={84} height={84} /><span>GOLDKOZMOS<br /><small>KENDİNE AYIRDIĞIN BİR AN</small></span></div>
    <h2 id="energy-invitation-title">Kozmik enerji<br /><em>çalışmalarını keşfet.</em></h2>
    <p>Özge Batıgün ile online çalışma seçeneklerini, sürelerini ve ücretlerini incele. Kendine uygun alanı seç.</p>
    <Link className="energyInvitationAction" href="/calismalar/enerji-calismalari" onClick={() => setOpen(false)}>Çalışmaları incele <span aria-hidden="true">↗</span></Link>
    <button className="energyInvitationLater" type="button" onClick={() => setOpen(false)}>Şimdi değil, okumaya devam et</button>
  </aside>, document.body);
}
