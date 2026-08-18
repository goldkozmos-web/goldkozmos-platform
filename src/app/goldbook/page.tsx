"use client";

import { useState } from "react";
import FooterSection from "../../components/FooterSection";
import "../../styles/home.css";

const books = [
  {
    number: "01",
    category: "KİŞİSEL DÖNÜŞÜM",
    title: "İçindeki Kozmosu Kucakla",
    description:
      "Özdeğer, sınırlar, sezgi, geçmişten taşınan kalıplar ve içsel özgürlük üzerine hazırlanmış dijital GoldBook.",
    image: "/goldbook/icindeki-kozmosu-kucakla.webp",
    price: "300 TL",
    shopier:
      "https://www.shopier.com/goldkozmos/46435030",
    focus: [
      "Başkalarının yargılarından özgürleşmek",
      "Kendi değerini yeniden hatırlamak",
      "Sağlıklı sınırlar oluşturmak",
      "Sezgi ve teslimiyet alanını keşfetmek",
    ],
    info: [
      "20 bölümlük içsel yolculuk",
      "5 ana kısım ve son söz",
      "Dijital kitap formatı",
      "Özge Batıgün imzalı",
    ],
  },
  {
    number: "02",
    category: "AŞK VE İLİŞKİLER",
    title: "Aşk Manifestosu",
    description:
      "Geçmiş ilişkiler, tekrar eden senaryolar, sınırlar, flört dinamikleri ve doğru ilişkiyi seçme üzerine hazırlanmış dijital GoldBook.",
    image: "/goldbook/ask-manifestosu.webp",
    price: "300 TL",
    shopier:
      "https://www.shopier.com/goldkozmos/47631093",
    focus: [
      "Aşk ihtiyacını seçime taşımak",
      "Tekrarlayan ilişki döngülerini görmek",
      "Flörtte kendi merkezini korumak",
      "Gerçek ilgiyi ayırt etmek",
    ],
    info: [
      "20 bölümlük ilişki rehberi",
      "6 ana kısım",
      "Dijital kitap formatı",
      "Özge Batıgün imzalı",
    ],
  },
];

const goldBookCardStyles = `
  .goldbookCompactPage .goldbookCompactCard {
    overflow: hidden !important;
    border: 2px solid rgba(205, 158, 70, 0.76) !important;
    border-radius: 24px !important;
    background:
      radial-gradient(
        circle at 92% 8%,
        rgba(203, 157, 72, 0.12),
        transparent 30%
      ),
      linear-gradient(
        145deg,
        #2b1d13 0%,
        #21160f 58%,
        #17100c 100%
      ) !important;
    box-shadow:
      0 22px 48px rgba(48, 31, 13, 0.20),
      0 7px 18px rgba(48, 31, 13, 0.10) !important;
    transition:
      transform 180ms ease,
      box-shadow 180ms ease,
      border-color 180ms ease;
  }

  .goldbookCompactPage .goldbookCompactCard:hover {
    transform: translateY(-4px);
    border-color: rgba(221, 177, 92, 0.9) !important;
    box-shadow:
      0 28px 58px rgba(48, 31, 13, 0.24),
      0 9px 22px rgba(48, 31, 13, 0.12) !important;
  }

  .goldbookCompactPage .goldbookCompactCardTop {
    background: transparent !important;
  }

  .goldbookCompactPage .goldbookCompactCover {
    overflow: hidden;
    border: 1px solid rgba(214, 173, 97, 0.38) !important;
    border-radius: 16px !important;
    background: #f7f0e5 !important;
  }

  .goldbookCompactPage .goldbookCompactCover img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .goldbookCompactPage .goldbookCompactNumber,
  .goldbookCompactPage .goldbookCompactCategory {
    color: #d2a653 !important;
  }

  .goldbookCompactPage .goldbookCompactMainInfo h2 {
    color: #fffaf1 !important;
  }

  .goldbookCompactPage .goldbookCompactDescription {
    color: rgba(255, 250, 241, 0.66) !important;
  }

  .goldbookCompactPage .goldbookCompactPrice {
    color: #ddb45f !important;
  }

  .goldbookCompactPage .goldbookCompactDetails {
    gap: 10px !important;
  }

  .goldbookCompactPage .goldbookCompactDetails > div {
    border: 1px solid rgba(214, 173, 97, 0.24) !important;
    border-radius: 16px !important;
    background:
      linear-gradient(
        145deg,
        rgba(255, 255, 255, 0.055),
        rgba(255, 255, 255, 0.022)
      ) !important;
    box-shadow:
      inset 0 0 0 1px rgba(255, 255, 255, 0.012);
  }

  .goldbookCompactPage .goldbookCompactDetails h3 {
    color: #fffaf1 !important;
  }

  .goldbookCompactPage .goldbookCompactDetails li {
    color: rgba(255, 250, 241, 0.68) !important;
  }

  .goldbookCompactPage .goldbookCompactDetails li span {
    color: #d2a653 !important;
  }

  .goldbookCompactPage .goldbookCompactButton {
    border: 1px solid rgba(156, 108, 30, 0.35) !important;
    color: #2a1b12 !important;
    background:
      linear-gradient(
        120deg,
        #c8953d 0%,
        #e0bb69 100%
      ) !important;
    box-shadow:
      0 10px 24px rgba(0, 0, 0, 0.16) !important;
    font-weight: 700 !important;
  }

  .goldbookCompactPage .goldbookCompactButton:hover {
    filter: brightness(1.04);
  }

  @media (max-width: 700px) {
    .goldbookCompactPage .goldbookCompactCard {
      border-width: 1.5px !important;
      border-radius: 20px !important;
    }
  }
`;

export default function GoldBookPage() {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  return (
    <main
      className="goldbookCompactPage homePage"
      id="top"
    >
      <style>{goldBookCardStyles}</style>

      <header className="goldbookCompactNav">
        <div className="goldbookCompactNavInner">
          <a href="/" className="goldbookCompactBrand">
            <strong>
              Goldkozmos<sup>®</sup>
            </strong>

            <span>REZONANS EKOLÜ</span>
          </a>

          {/* MASAÜSTÜ MENÜ */}

          <nav className="goldbookCompactMenu">
            <a href="/">Ana Sayfa</a>
            <a href="/#rezonans">Atölyeler</a>
            <a href="/#diger">Çalışmalar</a>
            <a href="/goldbook">GoldBook</a>
            <a href="/goldcast">GoldCast</a>
            <a href="/goldblog">GoldBlog</a>
            <a href="/hakkimda">Hakkımda</a>
          </nav>

          {/* MASAÜSTÜ SAĞ BUTON */}

          <a
            href="/calismalar"
            className="goldbookCompactNavButton"
          >
            Çalışmaları Gör
          </a>

          {/* MOBİL HAMBURGER */}

          <button
            type="button"
            className={`goldbookMobileMenuButton ${
              mobileMenuOpen ? "isOpen" : ""
            }`}
            aria-label={
              mobileMenuOpen
                ? "Menüyü kapat"
                : "Menüyü aç"
            }
            aria-expanded={mobileMenuOpen}
            aria-controls="goldbookMobileMenu"
            onClick={() =>
              setMobileMenuOpen((open) => !open)
            }
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* MOBİL AÇILIR MENÜ */}

        <div
          id="goldbookMobileMenu"
          className={`goldbookMobileMenu ${
            mobileMenuOpen ? "isOpen" : ""
          }`}
          aria-hidden={!mobileMenuOpen}
        >
          <nav>
            <a
              href="/"
              onClick={() => setMobileMenuOpen(false)}
            >
              Ana Sayfa
              <span>01</span>
            </a>

            <a
              href="/#rezonans"
              onClick={() => setMobileMenuOpen(false)}
            >
              Atölyeler
              <span>02</span>
            </a>

            <a
              href="/#diger"
              onClick={() => setMobileMenuOpen(false)}
            >
              Çalışmalar
              <span>03</span>
            </a>

            <a
              href="/goldbook"
              onClick={() => setMobileMenuOpen(false)}
            >
              GoldBook
              <span>04</span>
            </a>

            <a
              href="/goldcast"
              onClick={() => setMobileMenuOpen(false)}
            >
              GoldCast
              <span>05</span>
            </a>

            <a
              href="/goldblog"
              onClick={() => setMobileMenuOpen(false)}
            >
              GoldBlog
              <span>06</span>
            </a>

            <a
              href="/hakkimda"
              onClick={() => setMobileMenuOpen(false)}
            >
              Hakkımda
              <span>07</span>
            </a>

            <a
              href="/#sss"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sıkça Sorulan Sorular
              <span>08</span>
            </a>
          </nav>

          <a
            href="/sana-uygun-calismayi-bul"
            className="goldbookMobileMenuTest"
            onClick={() => setMobileMenuOpen(false)}
          >
            Ücretsiz Test
            <span>→</span>
          </a>
        </div>

        {/* MENÜ AÇILDIĞINDA ARKA PLAN */}

        {mobileMenuOpen && (
          <button
            type="button"
            className="goldbookMobileMenuBackdrop"
            aria-label="Menüyü kapat"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </header>

      <section className="goldbookCompactHero">
        <div className="goldbookCompactContainer">
          <div className="goldbookCompactHeroGrid">
            <div>
              <p className="goldbookCompactEyebrow">
                GOLDBOOK KÜTÜPHANESİ
              </p>

              <h1>
                Okudukça kendine
                <span> biraz daha yaklaş.</span>
              </h1>
            </div>

            <div className="goldbookCompactHeroText">
              <p>
                GoldBook, Goldkozmos® Rezonans Ekolü
                içerisinde kişisel farkındalık ve içsel
                dönüşüm konularında hazırlanan dijital
                kitap koleksiyonudur.
              </p>

              <p>
                Kütüphanede şu anda iki GoldBook
                bulunuyor. Yeni çalışmalar yayımlandıkça
                koleksiyona eklenecek.
              </p>
            </div>
          </div>

          <div className="goldbookCompactGrid">
            {books.map((book) => (
              <article
                className="goldbookCompactCard"
                key={book.title}
              >
                <div className="goldbookCompactCardTop">
                  <div className="goldbookCompactCover">
                    <img
                      src={book.image}
                      alt={book.title}
                    />
                  </div>

                  <div className="goldbookCompactMainInfo">
                    <div className="goldbookCompactNumber">
                      <span>{book.number}</span>
                      <span>✦</span>
                    </div>

                    <p className="goldbookCompactCategory">
                      {book.category}
                    </p>

                    <h2>{book.title}</h2>

                    <p className="goldbookCompactDescription">
                      {book.description}
                    </p>

                    <div className="goldbookCompactPrice">
                      {book.price}
                    </div>
                  </div>
                </div>

                <div className="goldbookCompactDetails">
                  <div>
                    <h3>Kitabın odağı</h3>

                    <ul>
                      {book.focus.map((item) => (
                        <li key={item}>
                          <span>✦</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3>Kitap bilgileri</h3>

                    <ul>
                      {book.info.map((item) => (
                        <li key={item}>
                          <span>✦</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <a
                  className="goldbookCompactButton"
                  href={book.shopier}
                  target="_blank"
                  rel="noreferrer"
                >
                  Shopier’den Al
                  <span>→</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}