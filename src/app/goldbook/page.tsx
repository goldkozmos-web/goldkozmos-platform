"use client";

import FooterSection from "../../components/FooterSection";
import Navbar from "../../components/Navbar";
import ContinueGlance from "../../components/platform/ContinueGlance";
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

const goldBookNavbarStyles = `
  /* =========================================================
     GOLDBOOK · SADECE MASAÜSTÜ NAVBAR
     ANA SAYFANIN GERÇEK ÖLÇÜLERİ
  ========================================================= */

  @media (min-width: 901px) {
    .goldbookCompactPage .siteGlobalNav {
      width: 100% !important;
      min-height: 82px !important;
      height: 82px !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    .goldbookCompactPage .siteGlobalNavInner {
      width: min(calc(100% - 64px), 1240px) !important;
      min-height: 82px !important;
      height: 82px !important;
      margin: 0 auto !important;
      padding: 0 !important;

      display: grid !important;
      grid-template-columns: 1fr auto 1fr !important;
      gap: 35px !important;
      align-items: center !important;
    }

    .goldbookCompactPage .siteGlobalBrand {
      display: flex !important;
      flex-direction: column !important;
      gap: 2px !important;
      justify-self: start !important;
      margin: 0 !important;
      padding: 0 !important;
      text-decoration: none !important;
    }

    .goldbookCompactPage .siteGlobalBrand strong {
      font-size: 20px !important;
      line-height: 1 !important;
      letter-spacing: 0.07em !important;
      font-weight: 500 !important;
    }

    .goldbookCompactPage .siteGlobalBrand strong sup {
      font-size: 7px !important;
    }

    .goldbookCompactPage .siteGlobalBrand > span {
      margin-top: 2px !important;
      font-size: 9px !important;
      line-height: 1 !important;
      letter-spacing: 0.19em !important;
      font-weight: 700 !important;
    }

    .goldbookCompactPage .siteGlobalMenu {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 27px !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    .goldbookCompactPage .siteGlobalMenu a {
      font-size: 12px !important;
      line-height: 1 !important;
      text-decoration: none !important;
      white-space: nowrap !important;
    }

    .goldbookCompactPage .siteGlobalTest {
      justify-self: end !important;
      display: inline-flex !important;
      align-items: center !important;
      gap: 9px !important;
      margin: 0 !important;
      padding: 0 !important;
      font-size: 12px !important;
      line-height: 1 !important;
      font-weight: 700 !important;
      text-decoration: none !important;
      white-space: nowrap !important;
    }

    .goldbookCompactPage .siteGlobalMobileMenuButton,
    .goldbookCompactPage .siteGlobalMobileMenu,
    .goldbookCompactPage .siteGlobalMobileMenuBackdrop {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }
  }
`;

const goldBookCardStyles = `
  .goldbookCompactPage .goldbookCompactCard {
    position: relative !important;
    isolation: isolate;
    overflow: hidden !important;
    border: 1px solid rgba(214, 172, 88, 0.38) !important;
    border-radius: 22px !important;
    background:
      linear-gradient(
        180deg,
        rgba(255, 232, 186, 0.10) 0%,
        transparent 28%
      ),
      linear-gradient(
        155deg,
        #3c291b 0%,
        #24170f 46%,
        #120c09 100%
      ) !important;
    box-shadow: none !important;
    transition:
      transform 180ms ease,
      border-color 180ms ease;
  }

  .goldbookCompactPage .goldbookCompactCard::before {
    content: "";
    position: absolute;
    top: 16px;
    bottom: 16px;
    left: 0;
    z-index: 2;
    width: 3px;
    border-radius: 0 3px 3px 0;
    background: linear-gradient(180deg, #f3d592 0%, #c8953d 52%, #8d6320 100%);
    pointer-events: none;
  }

  .goldbookCompactPage .goldbookCompactCard:hover {
    transform: translateY(-4px);
    border-color: rgba(232, 190, 104, 0.62) !important;
    box-shadow: none !important;
  }

  .goldbookCompactPage .goldbookCompactCardTop {
    background: transparent !important;
  }

  .goldbookCompactPage .goldbookCompactCover {
    position: relative;
    overflow: hidden;
    border: 0 !important;
    border-radius: 5px 12px 12px 5px !important;
    background: #1a120c !important;
    box-shadow:
      inset 10px 0 14px rgba(0, 0, 0, 0.32),
      0 12px 20px rgba(0, 0, 0, 0.28) !important;
  }

  .goldbookCompactPage .goldbookCompactCover::after {
    content: "";
    position: absolute;
    inset: 0 auto 0 0;
    width: 10px;
    pointer-events: none;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.42),
      transparent
    );
  }

  .goldbookCompactPage .goldbookCompactCover img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .goldbookCompactPage .goldbookCompactNumber,
  .goldbookCompactPage .goldbookCompactCategory {
    color: #e0b45c !important;
  }

  .goldbookCompactPage .goldbookCompactMainInfo h2 {
    color: #fffaf1 !important;
    text-wrap: balance;
  }

  .goldbookCompactPage .goldbookCompactDescription {
    color: rgba(255, 250, 241, 0.70) !important;
  }

  .goldbookCompactPage .goldbookCompactPrice {
    display: block !important;
    width: auto !important;
    padding: 0 !important;
    border: 0 !important;
    border-radius: 0 !important;
    background: transparent !important;
    color: #f0d08a !important;
    letter-spacing: 0.02em;
  }

  .goldbookCompactPage .goldbookCompactDetails {
    gap: 8px !important;
  }

  .goldbookCompactPage .goldbookCompactDetails > div {
    border: 1px solid rgba(214, 173, 97, 0.16) !important;
    border-radius: 14px !important;
    background:
      linear-gradient(
        180deg,
        rgba(255, 246, 226, 0.06),
        rgba(255, 255, 255, 0.025)
      ) !important;
    box-shadow: inset 0 1px 0 rgba(255, 236, 196, 0.08) !important;
  }

  .goldbookCompactPage .goldbookCompactDetails h3 {
    color: #f6e7c6 !important;
  }

  .goldbookCompactPage .goldbookCompactDetails li {
    color: rgba(255, 250, 241, 0.72) !important;
  }

  .goldbookCompactPage .goldbookCompactDetails li span {
    color: #e0b45c !important;
  }

  .goldbookCompactPage .goldbookCompactButton {
    border: 0 !important;
    border-radius: 14px !important;
    color: #1c120b !important;
    background:
      linear-gradient(
        180deg,
        #f3d592 0%,
        #d4a24a 48%,
        #b07d28 100%
      ) !important;
    box-shadow:
      0 10px 20px rgba(92, 60, 16, 0.28),
      inset 0 1px 0 rgba(255, 255, 255, 0.42) !important;
    font-weight: 700 !important;
    letter-spacing: 0.04em;
  }

  .goldbookCompactPage .goldbookCompactButton:hover {
    filter: brightness(1.05);
  }

  @media (max-width: 700px) {
    .goldbookCompactPage .goldbookCompactCard {
      padding: 15px 14px 13px 16px !important;
      border-radius: 20px !important;
    }

    .goldbookCompactPage .goldbookCompactCover {
      width: 92px !important;
      height: 132px !important;
    }

    .goldbookCompactPage .goldbookCompactMainInfo h2 {
      font-size: 20px !important;
      letter-spacing: -0.04em !important;
    }

    .goldbookCompactPage .goldbookCompactPrice {
      font-size: 14px !important;
    }

    .goldbookCompactPage .goldbookCompactButton {
      min-height: 42px !important;
      border-radius: 13px !important;
      font-size: 10px !important;
    }
  }
`;

const goldBookChromeStyles = `
  @media (max-width: 700px) {
    .goldbookCompactPage .siteGlobalBackToTop,
    .goldbookCompactPage .siteGlobalBackToTop::before,
    .goldbookCompactPage .siteGlobalBackToTop::after {
      display: none !important;
      background: transparent !important;
      border: 0 !important;
      box-shadow: none !important;
    }
  }
`;

export default function GoldBookPage() {
  return (
    <main
      className="goldbookCompactPage homePage"
      id="top"
    >
      <style>{goldBookNavbarStyles}</style>
      <style>{goldBookCardStyles}</style>
      <style>{goldBookChromeStyles}</style>

      <Navbar />

      <ContinueGlance platformId="goldbook" variant="page" />

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