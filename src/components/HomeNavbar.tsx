"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import AppointmentAdminBell from "./appointments/AppointmentAdminBell";

export default function HomeNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const atHome = pathname === "/";

  const workshopsHref = atHome
    ? "#rezonans"
    : "/#rezonans";
  const worksHref = atHome ? "#diger" : "/#diger";
  const faqHref = atHome ? "#sss" : "/#sss";

  function closeMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <header className="homeV3Nav">
      <div className="homeV3NavInner">
        <a className="homeV3Brand" href="/">
          <strong>
            GOLDKOZMOS<sup>®</sup>
          </strong>
          <span>REZONANS EKOLÜ</span>
        </a>

        <nav className="homeV3Menu">
          <a href="/">Ana Sayfa</a>
          <a href={workshopsHref}>Atölyeler</a>
          <a href="/rezonans-egitimleri">
            Eğitimler
          </a>
          <a href={worksHref}>Çalışmalar</a>
          <a href="/goldbook">GoldBook</a>
          <a href="/goldcast">GoldCast</a>
          <a href="/goldmind">GoldMind</a>
          <a href="/goldfrekans">GoldFrekans</a>
          <a href="/goldblog">GoldBlog</a>
          <a href="/hakkimda">Hakkımda</a>
          <a href={faqHref}>SSS</a>
        </nav>

        <AppointmentAdminBell />

        <a
          className="homeV3NavTest"
          href="/sana-uygun-calismayi-bul"
        >
          Ücretsiz Test
          <span>→</span>
        </a>

        <button
          type="button"
          className={`homeV3MobileMenuButton ${
            mobileMenuOpen ? "isOpen" : ""
          }`}
          aria-label={
            mobileMenuOpen
              ? "Menüyü kapat"
              : "Menüyü aç"
          }
          aria-expanded={mobileMenuOpen}
          aria-controls="homeV3MobileMenu"
          onClick={() =>
            setMobileMenuOpen((open) => !open)
          }
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        id="homeV3MobileMenu"
        className={`homeV3MobileMenu ${
          mobileMenuOpen ? "isOpen" : ""
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <nav>
          <a href="/" onClick={closeMenu}>
            Ana Sayfa
          </a>
          <a href={workshopsHref} onClick={closeMenu}>
            Atölyeler
          </a>
          <a
            href="/rezonans-egitimleri"
            onClick={closeMenu}
          >
            Eğitimler
          </a>
          <a href={worksHref} onClick={closeMenu}>
            Çalışmalar
          </a>
          <a href="/goldbook" onClick={closeMenu}>
            GoldBook
          </a>
          <a href="/goldcast" onClick={closeMenu}>
            GoldCast
          </a>
          <a href="/goldmind" onClick={closeMenu}>
            GoldMind
          </a>
          <a href="/goldfrekans" onClick={closeMenu}>
            GoldFrekans
          </a>
          <a href="/goldblog" onClick={closeMenu}>
            GoldBlog
          </a>
          <a href="/hakkimda" onClick={closeMenu}>
            Hakkımda
          </a>
          <a href={faqHref} onClick={closeMenu}>
            SSS
          </a>
        </nav>

        <a
          href="/sana-uygun-calismayi-bul"
          className="homeV3MobileMenuTest"
          onClick={closeMenu}
        >
          Ücretsiz Test
          <span>→</span>
        </a>
      </div>

      {mobileMenuOpen ? (
        <button
          type="button"
          className="homeV3MobileMenuBackdrop"
          aria-label="Menüyü kapat"
          onClick={closeMenu}
        />
      ) : null}
    </header>
  );
}
