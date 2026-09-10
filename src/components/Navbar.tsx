"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
      <style>{`
        /* =====================================================
           GOLDKOZMOS ORTAK NAVBAR
           ANA SAYFA MASAÜSTÜ ÖLÇÜLERİ
           ID İLE SAYFA ÖZEL OVERRIDE'LARINDAN KORUNUR
        ===================================================== */

        @media (min-width: 901px) {
          #goldkozmosGlobalNav.siteGlobalNav {
            position: relative !important;
            z-index: 99999 !important;

            width: 100% !important;

            min-height: 82px !important;
            height: 82px !important;

            margin: 0 !important;
            padding: 0 !important;

            background:
              linear-gradient(
                180deg,
                #211812 0%,
                #271c15 100%
              ) !important;

            border-bottom:
              1px solid rgba(210, 166, 82, 0.16) !important;

            box-shadow:
              0 8px 24px rgba(21, 13, 8, 0.16) !important;
          }

          #goldkozmosGlobalNav .siteGlobalNavInner {
            width:
              min(
                1380px,
                calc(100% - 64px)
              ) !important;

            min-height: 82px !important;
            height: 82px !important;

            margin: 0 auto !important;
            padding: 0 !important;

            display: grid !important;

            grid-template-columns:
              1fr
              auto
              1fr !important;

            align-items: center !important;

            gap: 35px !important;
          }

          #goldkozmosGlobalNav .siteGlobalBrand {
            justify-self: start !important;

            display: flex !important;
            flex-direction: column !important;

            gap: 2px !important;

            margin: 0 !important;
            padding: 0 !important;

            color: #d4aa59 !important;

            text-decoration: none !important;
          }

          #goldkozmosGlobalNav
          .siteGlobalBrand
          strong {
            display: block !important;

            margin: 0 !important;

            color: #d4aa59 !important;

            font-family:
              Georgia,
              "Times New Roman",
              serif !important;

            font-size: 27px !important;
            line-height: 1 !important;

            letter-spacing: 0.07em !important;

            font-weight: 500 !important;

            white-space: nowrap !important;
          }

          #goldkozmosGlobalNav
          .siteGlobalBrand
          strong
          sup {
            font-size: 7px !important;
          }

          #goldkozmosGlobalNav
          .siteGlobalBrand
          > span {
            display: block !important;

            margin-top: 0 !important;

            color:
              rgba(239, 215, 166, 0.72) !important;

            font-size: 11px !important;
            line-height: 1 !important;

            letter-spacing: 0.19em !important;

            font-weight: 700 !important;

            white-space: nowrap !important;
          }

          #goldkozmosGlobalNav
          .siteGlobalMenu {
            display: flex !important;

            align-items: center !important;
            justify-content: center !important;

            gap: 16px !important;

            margin: 0 !important;
            padding: 0 !important;
          }

          #goldkozmosGlobalNav
          .siteGlobalMenu
          a {
            display: inline-flex !important;

            align-items: center !important;

            margin: 0 !important;
            padding: 0 !important;

            color:
              rgba(255, 248, 235, 0.82) !important;

            font-size: 18px !important;
            line-height: 1.2 !important;

            font-weight: 400 !important;

            text-decoration: none !important;

            white-space: nowrap !important;

            transition:
              color 160ms ease,
              opacity 160ms ease !important;
          }

          #goldkozmosGlobalNav
          .siteGlobalMenu
          a:hover {
            color: #d6ad60 !important;
          }

          #goldkozmosGlobalNav
          .siteGlobalTest {
            justify-self: end !important;

            display: inline-flex !important;

            align-items: center !important;

            gap: 9px !important;

            margin: 0 !important;
            padding: 0 !important;

            color: #e0b86c !important;

            font-size: 16px !important;
            line-height: 1.2 !important;

            font-weight: 700 !important;

            text-decoration: none !important;

            white-space: nowrap !important;
          }

          #goldkozmosGlobalNav
          .siteGlobalTest
          > span {
            color: #e0b86c !important;
          }

          #goldkozmosGlobalNav
          .siteGlobalMobileMenuButton,

          #goldkozmosGlobalNav
          .siteGlobalMobileMenu,

          .siteGlobalMobileMenuBackdrop {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
          }
        }
      `}</style>

      <header
        id="goldkozmosGlobalNav"
        className={`siteGlobalNav ${
          mobileMenuOpen ? "menuIsOpen" : ""
        }`}
      >
        <div className="siteGlobalNavInner">
          <Link
            href="/"
            className="siteGlobalBrand"
            onClick={closeMenu}
          >
            <strong>
              GOLDKOZMOS<sup>®</sup>
            </strong>

            <span>REZONANS EKOLÜ</span>
          </Link>

          <nav className="siteGlobalMenu">
            <Link href="/">Ana Sayfa</Link>

            <a href="/#rezonans">
              Atölyeler
            </a>

            <Link href="/rezonans-egitimleri">
              Eğitimler
            </Link>

            <a href="/#diger">
              Çalışmalar
            </a>

            <Link href="/goldbook">
              GoldBook
            </Link>

            <Link href="/goldcast">
              GoldCast
            </Link>

            <Link href="/goldmind">
              GoldMind
            </Link>

            <Link href="/goldfrekans">
              GoldFrekans
            </Link>

            <Link href="/goldblog">
              GoldBlog
            </Link>

            <Link href="/hakkimda">
              Hakkımda
            </Link>

            <a href="/#sss">
              SSS
            </a>
          </nav>

          <Link
            href="/sana-uygun-calismayi-bul"
            className="siteGlobalTest"
            onClick={closeMenu}
          >
            Ücretsiz Test
            <span aria-hidden="true">→</span>
          </Link>

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
          aria-hidden={!mobileMenuOpen}
        >
          <nav>
            <Link href="/" onClick={closeMenu}>
              <span>01</span>
              <strong>Ana Sayfa</strong>
            </Link>

            <a
              href="/#rezonans"
              onClick={closeMenu}
            >
              <span>02</span>
              <strong>Atölyeler</strong>
            </a>

            <Link
              href="/rezonans-egitimleri"
              onClick={closeMenu}
            >
              <span>03</span>
              <strong>Eğitimler</strong>
            </Link>

            <a
              href="/#diger"
              onClick={closeMenu}
            >
              <span>04</span>
              <strong>Çalışmalar</strong>
            </a>

            <Link
              href="/goldbook"
              onClick={closeMenu}
            >
              <span>05</span>
              <strong>GoldBook</strong>
            </Link>

            <Link
              href="/goldcast"
              onClick={closeMenu}
            >
              <span>06</span>
              <strong>GoldCast</strong>
            </Link>

            <Link
              href="/goldmind"
              onClick={closeMenu}
            >
              <span>07</span>
              <strong>GoldMind</strong>
            </Link>

            <Link
              href="/goldfrekans"
              onClick={closeMenu}
            >
              <span>08</span>
              <strong>GoldFrekans</strong>
            </Link>

            <Link
              href="/goldblog"
              onClick={closeMenu}
            >
              <span>09</span>
              <strong>GoldBlog</strong>
            </Link>

            <Link
              href="/hakkimda"
              onClick={closeMenu}
            >
              <span>10</span>
              <strong>Hakkımda</strong>
            </Link>

            <a
              href="/#sss"
              onClick={closeMenu}
            >
              <span>11</span>
              <strong>SSS</strong>
            </a>

            <Link
              href="/sana-uygun-calismayi-bul"
              onClick={closeMenu}
              className="siteGlobalMobileTestLink"
            >
              <span>12</span>
              <strong>Ücretsiz Test</strong>
            </Link>
          </nav>
        </div>
      </header>

      <a
        href="#top"
        className="siteGlobalBackToTop"
        aria-label="Sayfanın başına dön"
      >
        <span aria-hidden="true">↑</span>
      </a>
    </>
  );
}