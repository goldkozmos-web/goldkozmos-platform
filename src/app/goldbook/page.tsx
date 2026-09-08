"use client";

import { useState } from "react";
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

const goldBookSocialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/goldkozmos?igsh=ODF4aWx1bndreDhq",
    image: "/images/services/goldblog/social/instagram.webp",
  },
  {
    name: "WhatsApp Kanalı",
    href: "https://whatsapp.com/channel/0029Vb8BNoHHwXbBIssG2k1s",
    image: "/images/services/goldblog/social/whatsapp.webp",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@goldkozmos",
    image: "/images/services/goldblog/social/tiktok.webp",
  },
  {
    name: "X",
    href: "https://x.com/GoldKozmos",
    image: "/images/services/goldblog/social/x.webp",
  },
  {
    name: "Threads",
    href: "https://www.threads.com/@goldkozmos",
    image: "/images/services/goldblog/social/threads.webp",
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@goldkozmos",
    image: "/images/services/goldblog/social/youtube.webp",
  },
  {
    name: "Spotify",
    href: "https://open.spotify.com/show/0343du5jxaHZOJhqDJZKYQ",
    image: "/images/services/goldblog/social/spotify.webp",
  },
];

const goldBookWhatsappActions = [
  {
    title: "Randevu Al",
    message:
      "Merhaba Özge Hanım, birebir görüşme için randevu almak istiyorum. Uygun gün ve saatleri öğrenebilir miyim?",
  },
  {
    title: "Hangi Çalışma Bana Uygun?",
    message:
      "Merhaba, hangi Goldkozmos çalışmasının bana uygun olduğuna karar veremedim. Kısaca bilgi almak istiyorum.",
  },
  {
    title: "Atölyeler Hakkında Bilgi",
    message:
      "Merhaba, Goldkozmos Rezonans Atölyeleri hakkında bilgi almak istiyorum.",
  },
  {
    title: "Satın Alma / Erişim Desteği",
    message:
      "Merhaba, satın alma veya erişim konusunda desteğe ihtiyacım var.",
  },
];

const goldBookWhatsappNumber = "905054722153";

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

const goldBookSocialDockStyles = `
  .goldbookSocialDock {
    display: none;
  }

  @media (max-width: 700px) {
    .goldbookCompactPage .siteGlobalBackToTop {
      bottom: 84px !important;
    }

    .goldbookSocialDock {
      position: fixed;
      right: 17px;
      bottom: 18px;
      z-index: 99998;
      display: flex;
      align-items: center;
      gap: 10px;
      pointer-events: none;
    }

    .goldbookSocialDockPanel {
      position: absolute;
      right: 64px;
      bottom: 0;

      width: min(326px, calc(100vw - 96px));
      padding: 14px;

      display: flex;
      flex-direction: column;
      gap: 12px;

      border:
        1px solid rgba(213, 168, 82, 0.38);

      border-radius: 26px;

      background:
        radial-gradient(
          circle at 100% 0%,
          rgba(205, 158, 73, 0.13),
          transparent 34%
        ),
        linear-gradient(
          145deg,
          rgba(36, 24, 16, 0.99),
          rgba(20, 14, 10, 0.99)
        );

      box-shadow:
        0 20px 54px rgba(0, 0, 0, 0.34),
        inset 0 1px 0 rgba(255, 255, 255, 0.035);

      backdrop-filter: blur(16px);

      opacity: 0;
      visibility: hidden;
      pointer-events: none;

      transform:
        translateX(14px)
        scale(0.94);

      transform-origin: right bottom;

      transition:
        opacity 180ms ease,
        visibility 180ms ease,
        transform 220ms ease;
    }

    .goldbookSocialDockPanel.isOpen {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;

      transform:
        translateX(0)
        scale(1);
    }

    .goldbookSocialDockIntro {
      padding: 2px 2px 1px;
    }

    .goldbookSocialDockIntro small {
      display: block;

      margin-bottom: 5px;

      color: #c99a47;

      font-size: 7px;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }

    .goldbookSocialDockIntro strong {
      display: block;

      color: #fffaf1;

      font-family:
        Georgia,
        "Times New Roman",
        serif;

      font-size: 19px;
      line-height: 1.05;
      font-weight: 400;
    }

    .goldbookWhatsappActions {
      display: grid;
      grid-template-columns:
        repeat(2, minmax(0, 1fr));

      gap: 7px;
    }

    .goldbookWhatsappAction {
      min-height: 50px;

      padding:
        10px
        10px;

      display: flex;
      align-items: center;
      justify-content: space-between;

      gap: 8px;

      border:
        1px solid rgba(215, 171, 91, 0.16);

      border-radius: 14px;

      background:
        rgba(255, 250, 241, 0.035);

      color: #fff8ec;

      text-decoration: none;

      transition:
        transform 160ms ease,
        border-color 160ms ease,
        background 160ms ease;
    }

    .goldbookWhatsappAction:first-child {
      border-color:
        rgba(215, 171, 91, 0.42);

      background:
        linear-gradient(
          135deg,
          rgba(195, 145, 58, 0.16),
          rgba(255, 250, 241, 0.035)
        );
    }

    .goldbookWhatsappAction span:first-child {
      max-width: 112px;

      font-size: 9.5px;
      line-height: 1.25;
      font-weight: 600;
    }

    .goldbookWhatsappAction span:last-child {
      flex: 0 0 auto;

      color: #d6a54d;

      font-size: 12px;
    }

    .goldbookWhatsappAction:active {
      transform: scale(0.98);
    }

    .goldbookSocialDockDivider {
      height: 1px;

      background:
        rgba(215, 171, 91, 0.12);
    }

    .goldbookSocialDockChannelsHead {
      display: flex;
      align-items: center;
      justify-content: space-between;

      gap: 12px;
    }

    .goldbookSocialDockChannelsHead span {
      color: #d4a552;

      font-size: 7.5px;
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
    }

    .goldbookSocialDockChannelsHead small {
      color:
        rgba(255, 250, 241, 0.48);

      font-size: 7px;
    }

    .goldbookSocialDockChannels {
      display: flex;
      align-items: center;

      gap: 6px;

      overflow-x: auto;
      overflow-y: hidden;

      padding-bottom: 1px;

      scrollbar-width: none;
    }

    .goldbookSocialDockChannels::-webkit-scrollbar {
      display: none;
    }

    .goldbookSocialDockLink {
      flex: 0 0 36px;

      width: 36px;
      height: 36px;

      display: flex;
      align-items: center;
      justify-content: center;

      border:
        1px solid rgba(215, 171, 91, 0.20);

      border-radius: 50%;

      background:
        rgba(255, 250, 241, 0.045);

      text-decoration: none;
      overflow: hidden;

      transition:
        transform 160ms ease,
        border-color 160ms ease,
        background 160ms ease;
    }

    .goldbookSocialDockLink:active {
      transform: scale(0.94);
    }

    .goldbookSocialDockLink img {
      width: 30px;
      height: 30px;

      display: block;

      object-fit: cover;

      border-radius: 50%;
    }

    .goldbookSocialDockButton {
      position: relative;
      z-index: 2;

      flex: 0 0 54px;

      width: 54px;
      height: 54px;

      padding: 0;

      display: flex;
      align-items: center;
      justify-content: center;

      border:
        1px solid rgba(215, 171, 91, 0.68);

      border-radius: 50%;

      background:
        radial-gradient(
          circle at 35% 28%,
          rgba(214, 169, 82, 0.18),
          transparent 38%
        ),
        #1f1510;

      color: #e0ad50;

      box-shadow:
        0 13px 34px rgba(0, 0, 0, 0.30),
        inset 0 0 0 4px rgba(225, 179, 92, 0.035);

      cursor: pointer;
      pointer-events: auto;
    }

    .goldbookSocialDockButton img {
      width: 42px;
      height: 42px;

      display: block;

      object-fit: cover;

      border-radius: 50%;
    }
  }
`;


export default function GoldBookPage() {
  const [socialDockOpen, setSocialDockOpen] = useState(false);

  return (
    <main
      className="goldbookCompactPage homePage"
      id="top"
    >
      <style>{goldBookNavbarStyles}</style>
      <style>{goldBookCardStyles}</style>
      <style>{goldBookSocialDockStyles}</style>

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

      <div className="goldbookSocialDock">
        <div
          className={`goldbookSocialDockPanel ${
            socialDockOpen ? "isOpen" : ""
          }`}
          aria-hidden={!socialDockOpen}
        >
          <div className="goldbookSocialDockIntro">
            <small>WHATSAPP</small>
            <strong>Nasıl yardımcı olabilirim?</strong>
          </div>

          <div className="goldbookWhatsappActions">
            {goldBookWhatsappActions.map((action) => (
              <a
                key={action.title}
                className="goldbookWhatsappAction"
                href={`https://wa.me/${goldBookWhatsappNumber}?text=${encodeURIComponent(
                  action.message,
                )}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => setSocialDockOpen(false)}
              >
                <span>{action.title}</span>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>

          <div
            className="goldbookSocialDockDivider"
            aria-hidden="true"
          />

          <div className="goldbookSocialDockChannelsHead">
            <span>Kanallarım</span>
            <small>Goldkozmos’u takip et</small>
          </div>

          <div className="goldbookSocialDockChannels">
            {goldBookSocialLinks.map((social) => (
              <a
                key={social.name}
                className="goldbookSocialDockLink"
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
                title={social.name}
                onClick={() => setSocialDockOpen(false)}
              >
                <img
                  src={social.image}
                  alt=""
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="goldbookSocialDockButton"
          aria-label={
            socialDockOpen
              ? "Sosyal medya bağlantılarını kapat"
              : "Sosyal medya bağlantılarını aç"
          }
          aria-expanded={socialDockOpen}
          onClick={() =>
            setSocialDockOpen((current) => !current)
          }
        >
          <img
            src="/images/services/goldblog/social/whatsapp.webp"
            alt=""
            aria-hidden="true"
          />
        </button>
      </div>

      <FooterSection />
    </main>
  );
}