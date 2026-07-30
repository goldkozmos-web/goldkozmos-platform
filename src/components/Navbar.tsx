"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", closeWithEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeWithEscape);
    };
  }, [menuOpen]);

  return (
    <header className="navbar">
      <div className="navbarInner">
        <Link
          href="/"
          className="logo"
          onClick={closeMenu}
          aria-label="Goldkozmos Enerji Ekolü ana sayfa"
        >
          <div className="logoWordmark">
            Goldkozmos
            <sup className="registeredSymbol">®</sup>
          </div>

          <span>Enerji Ekolü</span>
        </Link>

        <nav
          id="main-navigation"
          className={`navLinks ${menuOpen ? "navLinksOpen" : ""}`}
          aria-label="Ana menü"
        >
          <Link href="/" onClick={closeMenu}>
            Ana Sayfa
          </Link>

          <Link href="/enerji-ekolu" onClick={closeMenu}>
            Enerji Ekolü
          </Link>

          <Link href="/calismalar" onClick={closeMenu}>
            Çalışmalar
          </Link>

          <Link href="/goldbook" onClick={closeMenu}>
            GoldBook
          </Link>

          <Link href="/goldcast" onClick={closeMenu}>
            GoldCast
          </Link>

          <Link href="/goldblog" onClick={closeMenu}>
            GoldBlog
          </Link>

          <Link href="/etkinlikler" onClick={closeMenu}>
            Etkinlikler
          </Link>

          <Link href="/hakkimda" onClick={closeMenu}>
            Hakkımda
          </Link>

          <Link
            href="/randevu"
            className="mobileAppointmentButton"
            onClick={closeMenu}
          >
            Randevu Al
            <span aria-hidden="true">→</span>
          </Link>
        </nav>

        <Link
          href="/randevu"
          className="appointmentButton"
          onClick={closeMenu}
        >
          Randevu Al
        </Link>

        <button
          type="button"
          className={`menuButton ${menuOpen ? "menuButtonOpen" : ""}`}
          onClick={() => setMenuOpen((current) => !current)}
          aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <button
        type="button"
        className={`navOverlay ${menuOpen ? "navOverlayOpen" : ""}`}
        onClick={closeMenu}
        aria-label="Menüyü kapat"
        tabIndex={menuOpen ? 0 : -1}
      />
    </header>
  );
}