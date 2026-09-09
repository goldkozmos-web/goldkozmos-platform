"use client";

import { useRef, useState } from "react";
import FooterSection from "../../components/FooterSection";
import ContinueGlance from "../../components/platform/ContinueGlance";
import { usePlayback } from "../../components/platform/PlaybackProvider";
import { youtubeIdFromUrl } from "../../lib/youtube";
import "../../styles/home.css";

const youtubeChannelUrl = "https://youtube.com/@goldkozmos";

const goldFrekansTracks = [
  {
    number: "01",
    category: "NATURE · YAĞMUR",
    title: "Nature · Yağmur Sesi",
    description:
      "Yağmurun doğal ritmiyle dinlenmek, çalışırken arka planda sakin bir alan kurmak veya zihni yavaşlatmak için hazırlanmış doğa sesi.",
    youtubeUrl: "https://youtu.be/qeS29ftEtho",
    thumbnail: "https://i.ytimg.com/vi/qeS29ftEtho/hqdefault.jpg",
  },
  {
    number: "02",
    category: "NATURE · DENİZ · MEDİTASYON",
    title: "Nature · Deniz · Meditasyon Müziği",
    description:
      "Deniz atmosferi ve meditasyon müziğini bir araya getiren, sakinleşme ve kendi alanına dönme anlarına eşlik eden kayıt.",
    youtubeUrl: "https://youtu.be/pIU5_-U9uCo",
    thumbnail: "https://i.ytimg.com/vi/pIU5_-U9uCo/hqdefault.jpg",
  },
  {
    number: "03",
    category: "528 HZ · SEVGİ · DÖNÜŞÜM",
    title: "528 Hz · Sevgi, Dönüşüm ve DNA Onarımı",
    description:
      "528 Hz temasıyla hazırlanan sevgi, dönüşüm ve içsel farkındalık odaklı frekans müziği.",
    youtubeUrl: "https://youtu.be/zs4WsgOI3Hg",
    thumbnail: "https://i.ytimg.com/vi/zs4WsgOI3Hg/hqdefault.jpg",
  },
  {
    number: "04",
    category: "7 ÇAKRA · DENGELEME",
    title: "7 Çakra Dengeleme Frekans Müziği",
    description:
      "Yedi çakra temasını merkezine alan, meditasyon ve enerji farkındalığı pratiğine eşlik eden frekans müziği.",
    youtubeUrl: "https://youtu.be/T9C5Vo3hYiE",
    thumbnail: "https://i.ytimg.com/vi/T9C5Vo3hYiE/hqdefault.jpg",
  },
  {
    number: "05",
    category: "KALP ÇAKRASI · AŞK",
    title: "Kalp Çakrası Frekans Müziği · Aşkı Hayatına Çağır",
    description:
      "Kalp çakrası, sevgi ve ilişki niyetleri temasına odaklanan meditasyon ve frekans müziği.",
    youtubeUrl: "https://youtu.be/FNUfK4BcsgU",
    thumbnail: "https://i.ytimg.com/vi/FNUfK4BcsgU/hqdefault.jpg",
  },
];

const styles = `
  .goldFrekansPage {
    background: #24170f;
  }

  .goldFrekansHero {
    position: relative;
    overflow: hidden;
    padding: 92px 0 86px;
    background:
      radial-gradient(circle at 84% 14%, rgba(190, 145, 58, 0.12), transparent 30%),
      radial-gradient(circle at 12% 90%, rgba(190, 145, 58, 0.07), transparent 26%),
      linear-gradient(180deg, #fbf7ef 0%, #f5ede1 100%);
  }

  .goldFrekansHero::after {
    content: "";
    position: absolute;
    right: -180px;
    bottom: -260px;
    width: 540px;
    height: 540px;
    border: 1px solid rgba(155, 116, 47, 0.16);
    border-radius: 50%;
  }

  .goldFrekansHeroInner {
    position: relative;
    z-index: 1;
    width: min(1180px, calc(100% - 80px));
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0, 1.08fr) minmax(340px, 0.92fr);
    gap: 72px;
    align-items: end;
  }

  .goldFrekansEyebrow {
    margin: 0 0 16px;
    color: #c99b48;
    letter-spacing: 0.22em;
    font-size: 10px;
    font-weight: 700;
  }

  .goldFrekansHero h1 {
    max-width: 780px;
    margin: 0;
    color: #241911;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(54px, 5vw, 76px);
    font-weight: 400;
    line-height: 0.96;
    letter-spacing: -2.4px;
  }

  .goldFrekansHero h1 span {
    color: #a9782b;
  }

  .goldFrekansHeroLead {
    max-width: 670px;
    margin: 25px 0 0;
    color: #6f6257;
    font-size: 14px;
    line-height: 1.75;
  }

  .goldFrekansHeroActions {
    display: flex;
    gap: 10px;
    margin-top: 28px;
  }

  .goldFrekansHeroActions a {
    min-height: 48px;
    padding: 0 18px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    text-decoration: none;
    font-size: 10px;
    font-weight: 700;
  }

  .goldFrekansHeroActions a:first-child {
    min-width: 188px;
    color: #1d140e;
    background: linear-gradient(120deg, #a9782b, #dfbb68);
  }

  .goldFrekansHeroActions a:last-child {
    color: #8f6727;
    border: 1px solid rgba(155, 116, 47, 0.26);
    background: rgba(255, 253, 248, 0.72);
  }

  .goldFrekansHeroNote {
    padding-top: 22px;
    border-top: 1px solid rgba(155, 116, 47, 0.18);
  }

  .goldFrekansHeroNote strong {
    display: block;
    margin-bottom: 10px;
    color: #c99b48;
    letter-spacing: 0.17em;
    font-size: 9px;
  }

  .goldFrekansHeroNote p {
    margin: 0;
    color: #766a5f;
    font-size: 12px;
    line-height: 1.7;
  }

  .goldFrekansArchive {
    padding: 64px 0 94px;
    overflow: hidden;
    background:
      linear-gradient(180deg, #3a271b 0%, #24170f 56%, #1a120c 100%);
  }

  .goldFrekansArchiveInner {
    width: min(1320px, calc(100% - 48px));
    margin: 0 auto;
  }

  .goldFrekansArchiveHeader {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 40px;
    margin-bottom: 20px;
  }

  .goldFrekansArchiveHeader > div:first-child {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 6px 8px;
    max-width: none;
  }

  .goldFrekansArchiveHeader p {
    margin: 0;
    color: #e0c07a;
    letter-spacing: 0.18em;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
  }

  .goldFrekansChannelDash {
    color: #e0c07a;
    font-size: 10px;
    font-weight: 700;
  }

  .goldFrekansChannelLink {
    color: #e0c07a;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    line-height: 1.2;
    text-decoration: underline;
    text-underline-offset: 3px;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .goldFrekansControls {
    display: none;
  }

  .goldFrekansScroller {
    display: flex;
    gap: 18px;
    width: 100%;
    margin: 0;
    padding: 18px 0 28px;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
  }

  .goldFrekansScroller::-webkit-scrollbar {
    display: none;
  }

  .goldFrekansCard {
    flex: 0 0 320px;
    width: 320px;
    max-width: 320px;
    min-width: 0;
    padding: 0;
    overflow: hidden;
    scroll-snap-align: start;
    text-align: left;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    border: 1px solid rgba(232, 204, 148, 0.72);
    border-radius: 24px;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.55) 0%, transparent 28%),
      linear-gradient(165deg, #fffdf8 0%, #f6eee0 52%, #efe4d2 100%);
    box-shadow:
      0 1px 0 rgba(255, 252, 246, 0.92) inset,
      0 0 0 1px rgba(48, 28, 12, 0.04) inset;
  }

  .goldFrekansCard.isActive {
    border-color: rgba(176, 138, 62, 0.78);
  }

  .goldFrekansTop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 34px;
    padding: 13px 16px 11px;
    color: #b08a3e;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.16em;
  }

  .goldFrekansCardVisual {
    position: relative;
    display: block;
    width: calc(100% - 32px);
    aspect-ratio: 16 / 9;
    margin: 0 16px;
    overflow: hidden;
    box-sizing: border-box;
    border: 1px solid rgba(176, 138, 62, 0.22);
    border-radius: 16px;
    background: #1c140f;
  }

  .goldFrekansCardVisual img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(0.92) contrast(1.04);
  }

  .goldFrekansCardBody {
    display: block;
    padding: 16px 16px 18px;
  }

  .goldFrekansCategory {
    display: block;
    margin: 0 0 7px;
    color: #a8792a;
    letter-spacing: 0.16em;
    font-size: 8px;
    font-weight: 700;
    line-height: 1.3;
  }

  .goldFrekansTitle {
    display: block;
    margin: 0;
    color: #2a1c12;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 23px;
    font-weight: 400;
    line-height: 1.12;
    letter-spacing: -0.04em;
  }

  .goldFrekansDescription {
    display: block;
    min-height: 0;
    margin: 9px 0 0;
    color: #6a5c50;
    font-size: 10.5px;
    line-height: 1.55;
  }

  @media (max-width: 900px) {
    .goldFrekansHero {
      padding: 64px 0 58px;
    }

    .goldFrekansHeroInner,
    .goldFrekansArchiveInner {
      width: min(100% - 34px, 760px);
    }

    .goldFrekansHeroInner {
      display: block;
    }

    .goldFrekansHero h1 {
      font-size: clamp(42px, 11vw, 60px);
    }

    .goldFrekansHeroNote {
      margin-top: 34px;
    }

    .goldFrekansArchive {
      padding: 58px 0 70px;
    }

    .goldFrekansArchiveHeader {
      align-items: flex-start;
    }

    .goldFrekansCard {
      flex: 0 0 min(68vw, 248px);
      flex-basis: min(68vw, 248px);
      width: min(68vw, 248px);
      max-width: 248px;
      border-radius: 18px;
    }

    .goldFrekansCardVisual {
      width: calc(100% - 24px);
      margin: 0 12px;
      border-radius: 12px;
    }

    .goldFrekansTitle {
      font-size: 18px;
    }
  }

  .goldFrekansPage {
    background: #24170f !important;
  }

  .goldFrekansArchive {
    background:
      linear-gradient(180deg, #3a271b 0%, #24170f 56%, #1a120c 100%) !important;
  }

  .goldFrekansControls {
    display: none !important;
  }

  .goldFrekansCard {
    box-shadow: none !important;
  }

  .goldFrekansCard.isActive {
    border-color: rgba(176, 138, 62, 0.78) !important;
  }

  @media (max-width: 700px) {
    .goldFrekansCard {
      flex: 0 0 min(68vw, 248px) !important;
      width: min(68vw, 248px) !important;
      max-width: 248px !important;
    }
  }
`;

export default function GoldFrekansPage() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { startYoutube, session, isPlaying } = usePlayback();

  const openTrack = (track: (typeof goldFrekansTracks)[number]) => {
    const youtubeId = youtubeIdFromUrl(track.youtubeUrl);

    if (!youtubeId) {
      return;
    }

    startYoutube({
      platform: "goldfrekans",
      contentId: youtubeId,
      title: track.title,
      href: "/goldfrekans",
      youtubeId,
      artworkUrl: track.thumbnail,
      description: track.description,
    });
  };

  return (
    <main className="homeV3Page goldFrekansPage" id="top">
      <style>{styles}</style>


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
            <a href="/#rezonans">Atölyeler</a>
            <a href="/#diger">Çalışmalar</a>
            <a href="/goldbook">GoldBook</a>
            <a href="/goldcast">GoldCast</a>
            <a href="/goldfrekans">GoldFrekans</a>
            <a href="/goldblog">GoldBlog</a>
            <a href="/hakkimda">Hakkımda</a>
            <a href="/#sss">SSS</a>
          </nav>

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
            aria-label={mobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={mobileMenuOpen}
            aria-controls="homeV3MobileMenu"
            onClick={() => setMobileMenuOpen((open) => !open)}
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
            <a href="/" onClick={() => setMobileMenuOpen(false)}>
              Ana Sayfa
            </a>
            <a href="/#rezonans" onClick={() => setMobileMenuOpen(false)}>
              Atölyeler
            </a>
            <a href="/#diger" onClick={() => setMobileMenuOpen(false)}>
              Çalışmalar
            </a>
            <a href="/goldbook" onClick={() => setMobileMenuOpen(false)}>
              GoldBook
            </a>
            <a href="/goldcast" onClick={() => setMobileMenuOpen(false)}>
              GoldCast
            </a>
            <a href="/goldfrekans" onClick={() => setMobileMenuOpen(false)}>
              GoldFrekans
            </a>
            <a href="/goldblog" onClick={() => setMobileMenuOpen(false)}>
              GoldBlog
            </a>
            <a href="/hakkimda" onClick={() => setMobileMenuOpen(false)}>
              Hakkımda
            </a>
            <a href="/#sss" onClick={() => setMobileMenuOpen(false)}>
              SSS
            </a>
          </nav>

          <a
            href="/sana-uygun-calismayi-bul"
            className="homeV3MobileMenuTest"
            onClick={() => setMobileMenuOpen(false)}
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
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </header>

      <ContinueGlance platformId="goldfrekans" variant="page" />

      <section
        className="goldFrekansArchive"
        id="goldfrekans-kutuphanesi"
      >
        <div className="goldFrekansArchiveInner">
          <header className="goldFrekansArchiveHeader">
            <div>
              <p>GOLDFREKANS · YOUTUBE</p>
              <span className="goldFrekansChannelDash" aria-hidden="true">
                -
              </span>
              <a
                className="goldFrekansChannelLink"
                href={youtubeChannelUrl}
                target="_blank"
                rel="noreferrer"
              >
                Kanala git
              </a>
            </div>
          </header>

          <div
            className="goldFrekansScroller"
            ref={sliderRef}
          >
            {goldFrekansTracks.map((track) => {
              const youtubeId = youtubeIdFromUrl(track.youtubeUrl);
              const isActive = session?.contentId === youtubeId;

              return (
              <button
                type="button"
                className={`goldFrekansCard${isActive ? " isActive" : ""}`}
                key={track.youtubeUrl}
                aria-label={`${track.title} ekranda aç`}
                onClick={() => openTrack(track)}
              >
                <span className="goldFrekansTop">
                  <span>{track.number}</span>
                  <span>{isActive && isPlaying ? "❚❚" : "▶"}</span>
                </span>

                <span className="goldFrekansCardVisual">
                  <img
                    src={track.thumbnail}
                    alt=""
                    loading="lazy"
                  />
                </span>

                <span className="goldFrekansCardBody">
                  <span className="goldFrekansCategory">
                    {track.category}
                  </span>

                  <span className="goldFrekansTitle">{track.title}</span>

                  <span className="goldFrekansDescription">
                    {track.description}
                  </span>
                </span>
              </button>
              );
            })}
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}