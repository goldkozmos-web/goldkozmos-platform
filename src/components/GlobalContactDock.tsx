"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const socialLinks = [
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

const whatsappActions = [
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

const whatsappNumber = "905054722153";

const dockStyles = `
  .goldkozmosGlobalContactDock {
    display: none;
  }

  @media (max-width: 700px) {

    /* Ana sayfa ve GoldCast'taki eski tek WhatsApp balonlarını gizle */
    .homeV3FloatingWhatsapp,
    .goldcastFloatingWhatsapp {
      display: none !important;
    }

    /* Eski shared oku kapat.
       Yeni yukarı çık butonu WhatsApp dock'unun içinde. */
    .siteGlobalBackToTop {
      display: none !important;
    }

    .goldkozmosGlobalContactButton,
    .goldkozmosGlobalContactButton img {
      display: none !important;
    }

    .goldkozmosGlobalBackToTop {
      position: absolute;
      right: 0;
      bottom: 0;
      z-index: 3;

      width: 54px;
      height: 54px;

      margin: 0;
      padding: 0;

      display: flex;
      align-items: center;
      justify-content: center;

      border:
        1px solid rgba(215, 171, 91, 0.68);

      border-radius: 50%;

      background:
        rgba(43, 29, 19, 0.98);

      color: #e0ad50;

      box-shadow:
        0 10px 28px rgba(0, 0, 0, 0.24);

      font-family:
        Arial,
        Helvetica,
        sans-serif;

      font-size: 28px;
      font-weight: 800;
      line-height: 1;

      cursor: pointer;
      pointer-events: auto;
    }

    .goldkozmosGlobalContactDock {
      position: fixed;
      right: 17px;
      bottom: calc(92px + env(safe-area-inset-bottom, 0px));
      z-index: 99998;

      display: flex;
      align-items: center;

      pointer-events: none;
    }

    .goldkozmosGlobalContactPanel {
      position: fixed;
      left: 50%;
      right: auto;
      bottom: calc(96px + env(safe-area-inset-bottom, 0px));

      width: min(372px, calc(100vw - 32px));
      padding: 18px;

      display: flex;
      flex-direction: column;
      gap: 14px;

      border:
        1px solid rgba(213, 168, 82, 0.38);

      border-radius: 28px;

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
      -webkit-backdrop-filter: blur(16px);

      opacity: 0;
      visibility: hidden;
      pointer-events: none;

      transform:
        translateX(-50%)
        translateY(8px)
        scale(0.96);

      transform-origin: center bottom;

      transition:
        opacity 180ms ease,
        visibility 180ms ease,
        transform 220ms ease;
    }

    .goldkozmosGlobalContactPanel.isOpen {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;

      transform:
        translateX(-50%)
        scale(1);
    }

    .goldkozmosGlobalContactIntro {
      padding: 2px 2px 1px;
    }

    .goldkozmosGlobalContactIntro small {
      display: block;

      margin-bottom: 5px;

      color: #c99a47;

      font-size: 7px;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }

    .goldkozmosGlobalContactIntro strong {
      display: block;

      color: #fffaf1;

      font-family:
        Georgia,
        "Times New Roman",
        serif;

      font-size: 22px;
      line-height: 1.05;
      font-weight: 400;
    }

    .goldkozmosGlobalWhatsappActions {
      display: grid;

      grid-template-columns:
        repeat(2, minmax(0, 1fr));

      gap: 7px;
    }

    .goldkozmosGlobalWhatsappAction {
      min-height: 56px;

      padding: 10px;

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

    .goldkozmosGlobalWhatsappAction:first-child {
      border-color:
        rgba(215, 171, 91, 0.42);

      background:
        linear-gradient(
          135deg,
          rgba(195, 145, 58, 0.16),
          rgba(255, 250, 241, 0.035)
        );
    }

    .goldkozmosGlobalWhatsappAction span:first-child {
      max-width: 112px;

      font-size: 9.5px;
      line-height: 1.25;
      font-weight: 600;
    }

    .goldkozmosGlobalWhatsappAction span:last-child {
      flex: 0 0 auto;

      color: #d6a54d;

      font-size: 12px;
    }

    .goldkozmosGlobalWhatsappAction:active {
      transform: scale(0.98);
    }

    .goldkozmosGlobalContactDivider {
      height: 1px;

      background:
        rgba(215, 171, 91, 0.12);
    }

    .goldkozmosGlobalChannelsHead {
      display: flex;
      align-items: center;
      justify-content: space-between;

      gap: 12px;
    }

    .goldkozmosGlobalChannelsHead span {
      color: #d4a552;

      font-size: 7.5px;
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
    }

    .goldkozmosGlobalChannelsHead small {
      color:
        rgba(255, 250, 241, 0.48);

      font-size: 7px;
    }

    .goldkozmosGlobalChannels {
      display: flex;
      align-items: center;

      gap: 6px;

      overflow-x: auto;
      overflow-y: hidden;

      padding-bottom: 1px;

      scrollbar-width: none;
    }

    .goldkozmosGlobalChannels::-webkit-scrollbar {
      display: none;
    }

    .goldkozmosGlobalChannelLink {
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

    .goldkozmosGlobalChannelLink:active {
      transform: scale(0.94);
    }

    .goldkozmosGlobalChannelLink img {
      width: 30px;
      height: 30px;

      display: block;

      object-fit: cover;

      border-radius: 50%;
    }

    .goldkozmosGlobalContactButton {
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

      box-shadow:
        0 13px 34px rgba(0, 0, 0, 0.30),
        inset 0 0 0 4px rgba(225, 179, 92, 0.035);

      cursor: pointer;
      pointer-events: auto;
    }

    .goldkozmosGlobalContactButton img {
      width: 42px;
      height: 42px;

      display: block;

      object-fit: cover;

      border-radius: 50%;
    }
  }
`;

export default function GlobalContactDock() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const toggleWhatsApp = () => setOpen((current) => !current);
    const closeWhatsApp = () => setOpen(false);

    window.addEventListener("goldkozmos:toggle-whatsapp", toggleWhatsApp);
    window.addEventListener("goldkozmos:close-whatsapp", closeWhatsApp);

    return () => {
      window.removeEventListener(
        "goldkozmos:toggle-whatsapp",
        toggleWhatsApp,
      );
      window.removeEventListener(
        "goldkozmos:close-whatsapp",
        closeWhatsApp,
      );
    };
  }, []);

  /*
    GoldBook'ta aynı sistem sayfanın içinde zaten var.
    Mobilde bottom bar WhatsApp paneli için dock yine de render edilir;
    yuvarlak buton CSS ile gizlenir.
  */

  return (
    <>
      <style>{dockStyles}</style>

      <div className="goldkozmosGlobalContactDock">
        <div
          className={`goldkozmosGlobalContactPanel ${
            open ? "isOpen" : ""
          }`}
          aria-hidden={!open}
        >
          <div className="goldkozmosGlobalContactIntro">
            <small>WHATSAPP</small>
            <strong>Nasıl yardımcı olabilirim?</strong>
          </div>

          <div className="goldkozmosGlobalWhatsappActions">
            {whatsappActions.map((action) => (
              <a
                key={action.title}
                className="goldkozmosGlobalWhatsappAction"
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  action.message,
                )}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
              >
                <span>{action.title}</span>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>

          <div
            className="goldkozmosGlobalContactDivider"
            aria-hidden="true"
          />

          <div className="goldkozmosGlobalChannelsHead">
            <span>Kanallarım</span>
            <small>Goldkozmos’u takip et</small>
          </div>

          <div className="goldkozmosGlobalChannels">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                className="goldkozmosGlobalChannelLink"
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
                title={social.name}
                onClick={() => setOpen(false)}
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
          className="goldkozmosGlobalBackToTop"
          aria-label="Sayfanın başına dön"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          ↑
        </button>
      </div>
    </>
  );
}