"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import "@/styles/site-zoom.css";

const storageKey = "gk-view-size-v1";
const changeEvent = "gk-view-size-change";
let memorySize = 100;
const clamp = (value: number) => Math.min(150, Math.max(70, Math.round(value / 10) * 10));

function readSize() {
  try {
    const saved = Number(window.localStorage.getItem(storageKey));
    return saved >= 70 && saved <= 150 ? clamp(saved) : memorySize;
  } catch {
    return memorySize;
  }
}
function subscribeSize(notify: () => void) {
  window.addEventListener("storage", notify);
  window.addEventListener(changeEvent, notify);
  return () => {
    window.removeEventListener("storage", notify);
    window.removeEventListener(changeEvent, notify);
  };
}
function subscribeWidth(notify: () => void) {
  const media = window.matchMedia("(min-width: 600px)");
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
}
const readWidth = () => window.matchMedia("(min-width: 600px)").matches;
const serverSize = () => 100;
const serverWidth = () => false;

export default function SiteZoom() {
  const size = useSyncExternalStore(subscribeSize, readSize, serverSize);
  const wide = useSyncExternalStore(subscribeWidth, readWidth, serverWidth);
  const [open, setOpen] = useState(false);
  const appliedSize = wide ? size : 100;

  useEffect(() => {
    const root = document.documentElement;
    root.style.zoom = appliedSize === 100 ? "" : String(appliedSize / 100);
    return () => { root.style.zoom = ""; };
  }, [appliedSize]);

  function changeSize(next: number) {
    memorySize = clamp(next);
    try { window.localStorage.setItem(storageKey, String(memorySize)); } catch { /* Keep the control usable when storage is unavailable. */ }
    window.dispatchEvent(new Event(changeEvent));
  }

  return (
    <aside className="siteZoom" aria-label="Sayfa görünüm boyutu" style={{ zoom: 100 / appliedSize }}>
      {open && (
        <div className="siteZoomControls" id="site-zoom-controls">
          <span className="siteZoomCaption">Görünüm boyutu</span>
          <div className="siteZoomSteps">
            <button type="button" aria-label="Sayfayı uzaklaştır" disabled={size <= 70} onClick={() => changeSize(size - 10)}>−</button>
            <output aria-live="polite" aria-atomic="true">%{size}</output>
            <button type="button" aria-label="Sayfayı yakınlaştır" disabled={size >= 150} onClick={() => changeSize(size + 10)}>+</button>
          </div>
          <button className="siteZoomReset" type="button" onClick={() => changeSize(100)}>Normal boyut</button>
        </div>
      )}
      <button className="siteZoomToggle" type="button" aria-expanded={open} aria-controls="site-zoom-controls" onClick={() => setOpen(!open)}>
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="10" cy="10" r="6.5"/><path d="m15 15 5 5M7 10h6M10 7v6"/></svg>
        Görünüm · %{size}<span aria-hidden="true">{open ? "×" : "⌃"}</span>
      </button>
    </aside>
  );
}
