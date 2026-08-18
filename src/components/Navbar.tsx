"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  function closeMenu() {
    setMobileMenuOpen(false);
  }

  function toggleMenu() {
    setMobileMenuOpen((current) => !current);
  }

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  return (
    <>
      <header
        className={`siteGlobalNav ${
          mobileMenuOpen ? "menuIsOpen" : ""
        }`}
      >
        <div className="siteGlobalNavInner">
          <a
            href="/"
            className="siteGlobalBrand"
            onClick={closeMenu}
          >
            <strong>
              GOLDKOZMOS<sup>®</sup>
            </strong>

            <span>REZONANS EKOLÜ</span>
          </a>

          <nav className="siteGlobalMenu">
            <a href="/">Ana Sayfa</a>

            <a href="/#rezonans">
              Atölyeler
            </a>

            <a href="/#diger">
              Çalışmalar
            </a>

            <a href="/goldbook">
              GoldBook
            </a>

            <a href="/goldcast">
              GoldCast
            </a>

            <a href="/goldfrekans">
              GoldFrekans
            </a>

            <a href="/goldblog">
              GoldBlog
            </a>

            <a href="/hakkimda">
              Hakkımda
            </a>
          </nav>

          <a
            href="/sana-uygun-calismayi-bul"
            className="siteGlobalTest"
            onClick={closeMenu}
          >
            Ücretsiz Test
            <span>→</span>
          </a>

          <button
            type="button"
            className={`siteGlobalMobileMenuButton ${
              mobileMenuOpen ? "isOpen" : ""
            }`}
            aria-label={
              mobileMenuOpen
                ? "Menüyü kapat"
                : "Menüyü aç"
            }
            aria-expanded={mobileMenuOpen}
            aria-controls="siteGlobalMobileMenu"
            onClick={toggleMenu}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <div
          id="siteGlobalMobileMenu"
          className={`siteGlobalMobileMenu ${
            mobileMenuOpen ? "isOpen" : ""
          }`}
        >
          <nav>
            <a href="/" onClick={closeMenu}>
              <span>01</span>
              <strong>Ana Sayfa</strong>
            </a>

            <a
              href="/#rezonans"
              onClick={closeMenu}
            >
              <span>02</span>
              <strong>Atölyeler</strong>
            </a>

            <a
              href="/#diger"
              onClick={closeMenu}
            >
              <span>03</span>
              <strong>Çalışmalar</strong>
            </a>

            <a
              href="/goldbook"
              onClick={closeMenu}
            >
              <span>04</span>
              <strong>GoldBook</strong>
            </a>

            <a
              href="/goldcast"
              onClick={closeMenu}
            >
              <span>05</span>
              <strong>GoldCast</strong>
            </a>

            <a
              href="/goldfrekans"
              onClick={closeMenu}
            >
              <span>06</span>
              <strong>GoldFrekans</strong>
            </a>

            <a
              href="/goldblog"
              onClick={closeMenu}
            >
              <span>07</span>
              <strong>GoldBlog</strong>
            </a>

            <a
              href="/hakkimda"
              onClick={closeMenu}
            >
              <span>08</span>
              <strong>Hakkımda</strong>
            </a>

            <a
              href="/sana-uygun-calismayi-bul"
              onClick={closeMenu}
              className="siteGlobalMobileTestLink"
            >
              <span>09</span>
              <strong>Ücretsiz Test</strong>
            </a>
          </nav>
        </div>
      </header>

      <a
        href="#top"
        className="siteGlobalBackToTop"
        aria-label="Sayfanın başına dön"
      >
        <span>↑</span>
      </a>
    </>
  );
}