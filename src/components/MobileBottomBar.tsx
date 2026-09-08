"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { PLATFORM_CATALOG } from "../data/platformFlow";

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4.2 3.8 11.2a1 1 0 0 0-.3.7V20a1 1 0 0 0 1 1h5.2v-6.2h4.6V21H19.5a1 1 0 0 0 1-1v-8.1a1 1 0 0 0-.3-.7L12 4.2z" />
    </svg>
  );
}

function GoldsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.8 13.7 8h5.7l-4.6 3.4 1.8 5.5L12 13.8 7.4 16.9 9.2 11.4 4.6 8h5.7L12 2.8z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12.04 3.2A8.7 8.7 0 0 0 3.4 11.9c0 1.53.4 3.02 1.16 4.33L3.2 20.8l4.7-1.23A8.7 8.7 0 1 0 12.04 3.2zm5 12.18c-.21.59-1.22 1.09-1.69 1.16-.44.07-.99.1-1.59-.1-.37-.12-.84-.27-1.45-.53-2.55-1.1-4.21-3.67-4.34-3.85-.13-.17-1.03-1.37-1.03-2.62 0-1.24.65-1.85.87-2.1.23-.25.5-.31.66-.31h.48c.16 0 .37-.06.58.44.21.5.71 1.74.78 1.87.06.13.1.28.02.45-.09.17-.13.28-.26.43-.13.15-.27.34-.38.45-.13.13-.26.27-.11.52.15.25.66 1.09 1.42 1.77.98.87 1.81 1.15 2.06 1.28.25.13.4.11.55-.07.15-.18.64-.74.81-1 .17-.25.35-.21.58-.12.23.09 1.45.68 1.7.8.25.12.42.18.48.29.06.1.06.61-.15 1.2z" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4.2a4.1 4.1 0 1 1 0 8.2 4.1 4.1 0 0 1 0-8.2zm0 9.4c3.7 0 8 1.85 8 4.15V20H4v-2.25c0-2.3 4.3-4.15 8-4.15z" />
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

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setGoldsOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
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

  const atHome = pathname === "/";
  const goldsActive = PLATFORM_CATALOG.some((item) =>
    pathname.startsWith(item.href),
  );
  const atProfile = pathname === "/profilim";

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
          className="goldkozmosMobileGoldsSheet"
          role="dialog"
          aria-label="Golds"
        >
          <div className="goldkozmosMobileGoldsTrack">
            {PLATFORM_CATALOG.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setGoldsOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      ) : null}

      <nav className="goldkozmosMobileBottomBar" aria-label="Mobil gezinme">
        <a
          href="/"
          className={atHome ? "isActive" : undefined}
          aria-current={atHome ? "page" : undefined}
        >
          <span className="goldkozmosMobileBottomIcon">
            <HomeIcon />
          </span>
          Ev
        </a>

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
            <WhatsAppIcon />
          </span>
          WhatsApp
        </button>

        <a
          href="/profilim"
          className={atProfile ? "isActive" : undefined}
          aria-current={atProfile ? "page" : undefined}
        >
          <span className="goldkozmosMobileBottomIcon">
            <ProfileIcon />
          </span>
          Profilim
        </a>
      </nav>
    </>
  );
}
