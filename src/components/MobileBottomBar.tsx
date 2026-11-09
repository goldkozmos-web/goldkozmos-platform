"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PLATFORM_CATALOG } from "../data/platformFlow";
import { usePlayback } from "./platform/PlaybackProvider";
import PlatformProgressCard from "./platform/PlatformProgressCard";
import "../styles/golds-premium.css";

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m3 10 9-7 9 7M5 9v11h5v-6h4v6h5V9" />
    </svg>
  );
}

function GoldsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 3 2.3 6.7L21 12l-6.7 2.3L12 21l-2.3-6.7L3 12l6.7-2.3L12 3Z" />
    </svg>
  );
}


function ProfileIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="4" /><path d="M4 21v-2a8 6 0 0 1 16 0v2" />
    </svg>
  );
}

export default function MobileBottomBar() {
  const pathname = usePathname();
  const [goldsOpen, setGoldsOpen] = useState(false);

  useEffect(() => {
    setGoldsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!goldsOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setGoldsOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [goldsOpen]);

  function openWhatsApp() {
    setGoldsOpen(false);
    window.dispatchEvent(new Event("goldkozmos:toggle-whatsapp"));
  }

  function toggleGolds() {
    setGoldsOpen((open) => {
      const next = !open;
      if (next) {
        window.dispatchEvent(new Event("goldkozmos:close-whatsapp"));
      }
      return next;
    });
  }

  const { forPlatform } = usePlayback();
  const atHome = pathname === "/";
  const goldsActive = PLATFORM_CATALOG.some((item) =>
    pathname.startsWith(item.href),
  );
  const atProfile = pathname === "/profilim";

  if (pathname === "/goldlink" || pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      {goldsOpen ? (
        <button
          type="button"
          className="goldkozmosMobileGoldsBackdrop"
          aria-label="Golds panelini kapat"
          onClick={() => setGoldsOpen(false)}
        />
      ) : null}

      {goldsOpen ? (
        <div
          className="goldkozmosMobileGoldsSheet goldsPremiumSheet"
          role="dialog"
          aria-modal="true"
          aria-labelledby="goldkozmosGoldsTitle"
        >
          <div className="goldkozmosMobileGoldsTop">
            <svg className="goldsHeaderOrbit" viewBox="0 0 220 180" fill="none" aria-hidden="true">
              <circle cx="150" cy="88" r="65" /><circle cx="150" cy="88" r="44" />
              <ellipse cx="150" cy="88" rx="90" ry="26" transform="rotate(-35 150 88)" />
              <path d="m150 62 5 20 21 6-21 6-5 20-6-20-20-6 20-6 6-20Z" />
              <circle cx="108" cy="39" r="3" /><circle cx="209" cy="114" r="2" /><circle cx="80" cy="130" r="2" />
            </svg>
            <div>
              <p className="goldkozmosMobileGoldsEyebrow">GOLDS · KENDİNE AYIRDIĞIN ALAN</p>
              <strong id="goldkozmosGoldsTitle">Kozmosunu keşfet.</strong>
              <p className="goldsPremiumIntro">Oku, dinle, kendine dön.</p>
            </div>
            <button
              type="button"
              className="goldkozmosMobileGoldsClose"
              aria-label="Kapat"
              onClick={() => setGoldsOpen(false)}
            >
              ×
            </button>
          </div>
          <div className="goldkozmosMobileGoldsTrack">
            {PLATFORM_CATALOG.map((item) => (
              <PlatformProgressCard
                key={item.id}
                platform={item}
                progress={forPlatform(item.id)}
                className="goldsPopupCard"
                onOpen={() => setGoldsOpen(false)}
              />
            ))}
          </div>
        </div>
      ) : null}

      <nav className="goldkozmosMobileBottomBar" aria-label="Mobil gezinme">
        <Link
          href="/"
          className={atHome ? "isActive" : undefined}
          aria-current={atHome ? "page" : undefined}
        >
          <span className="goldkozmosMobileBottomIcon">
            <HomeIcon />
          </span>
          Ev
        </Link>

        <button
          type="button"
          className={goldsOpen || goldsActive ? "isActive" : undefined}
          aria-expanded={goldsOpen}
          onClick={toggleGolds}
        >
          <span className="goldkozmosMobileBottomIcon">
            <GoldsIcon />
          </span>
          Golds
        </button>

        <button type="button" onClick={openWhatsApp}>
          <span className="goldkozmosMobileBottomIcon">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="1.5" /><rect x="14" y="4" width="6" height="6" rx="1.5" /><rect x="4" y="14" width="6" height="6" rx="1.5" /><path d="m17 13-3 5h3l-1 4 5-6h-4l1-3" /></svg>
          </span>
          Hızlı Erişim
        </button>

        <Link href="/paylasim-cemberi" className={pathname.startsWith('/paylasim-cemberi') ? 'isActive' : undefined} aria-current={pathname.startsWith('/paylasim-cemberi') ? 'page' : undefined} onClick={()=>setGoldsOpen(false)}>
          <span className="goldkozmosMobileBottomIcon"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="7" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2M16 4a3 3 0 0 1 0 6M18 13a5 5 0 0 1 3 5v2"/></svg></span>
          Topluluk
        </Link>

        <Link
          href="/profilim"
          className={atProfile ? "isActive" : undefined}
          aria-current={atProfile ? "page" : undefined}
        >
          <span className="goldkozmosMobileBottomIcon">
            <ProfileIcon />
          </span>
          Profilim
        </Link>
      </nav>
    </>
  );
}

