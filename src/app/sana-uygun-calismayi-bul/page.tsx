"use client";

import { useState } from "react";
import WorkFinderSection from "../../components/WorkFinderSection";
import ServicesSection from "../../components/ServicesSection";
import FAQSection from "../../components/FAQSection";
import FooterSection from "../../components/FooterSection";
import "../../styles/home.css";

export default function WorkFinderPage() {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <main
      className="homeV3Page homePage workFinderPage"
      id="top"
    >
      {/* NAVBAR */}

      <header className="homeV3Nav">
        <div className="homeV3NavInner">
          <a
            className="homeV3Brand"
            href="/"
            onClick={closeMobileMenu}
          >
            <strong>
              GOLDKOZMOS<sup>®</sup>
            </strong>

            <span>REZONANS EKOLÜ</span>
          </a>

          <nav className="homeV3Menu">
            <a href="/">Ana Sayfa</a>
            <a href="/#rezonans">Atölyeler</a>
            <a href="/#diger">Çalışmalar</a>
            <a href="/goldbook">GoldBook</a>
            <a href="/goldcast">GoldCast</a>
            <a href="/goldblog">GoldBlog</a>
            <a href="/hakkimda">Hakkımda</a>
            <a href="/#sss">SSS</a>
          </nav>

          <a
            className="homeV3NavTest"
            href="#calisma-bul"
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
            aria-controls="workFinderMobileMenu"
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
          id="workFinderMobileMenu"
          className={`homeV3MobileMenu ${
            mobileMenuOpen ? "isOpen" : ""
          }`}
          aria-hidden={!mobileMenuOpen}
        >
          <nav>
            <a href="/" onClick={closeMobileMenu}>
              Ana Sayfa
              <span>01</span>
            </a>

            <a
              href="/#rezonans"
              onClick={closeMobileMenu}
            >
              Atölyeler
              <span>02</span>
            </a>

            <a
              href="/#diger"
              onClick={closeMobileMenu}
            >
              Çalışmalar
              <span>03</span>
            </a>

            <a
              href="/goldbook"
              onClick={closeMobileMenu}
            >
              GoldBook
              <span>04</span>
            </a>

            <a
              href="/goldcast"
              onClick={closeMobileMenu}
            >
              GoldCast
              <span>05</span>
            </a>

            <a
              href="/goldblog"
              onClick={closeMobileMenu}
            >
              GoldBlog
              <span>06</span>
            </a>

            <a
              href="/hakkimda"
              onClick={closeMobileMenu}
            >
              Hakkımda
              <span>07</span>
            </a>

            <a
              href="/#sss"
              onClick={closeMobileMenu}
            >
              SSS
              <span>08</span>
            </a>
          </nav>

          <a
            href="#calisma-bul"
            className="homeV3MobileMenuTest"
            onClick={closeMobileMenu}
          >
            Ücretsiz Test
            <span>→</span>
          </a>
        </div>

        {mobileMenuOpen && (
          <button
            type="button"
            className="homeV3MobileMenuBackdrop"
            aria-label="Menüyü kapat"
            onClick={closeMobileMenu}
          />
        )}
      </header>

      {/* TEST */}

      <WorkFinderSection />

      {/* ÇALIŞMA ALANLARI */}

      <ServicesSection />

      {/* SSS */}

      <FAQSection />

      {/* FOOTER */}

      <FooterSection />

      {/* YUKARI ÇIK */}

      <a
        href="#top"
        className="workFinderFloatingTop"
        aria-label="Sayfanın başına dön"
      >
        ↑
      </a>
    </main>
  );
}