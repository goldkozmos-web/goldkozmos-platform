"use client";

import { useRef, useState } from "react";
import FooterSection from "../../components/FooterSection";
import ContinueGlance from "../../components/platform/ContinueGlance";
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
    background: #f7f1e8;
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
      radial-gradient(circle at 88% 3%, rgba(188, 143, 58, 0.10), transparent 30%),
      linear-gradient(180deg, #f8f3ea 0%, #f4ecdf 100%);
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
    margin-bottom: 28px;
  }

  .goldFrekansArchiveHeader > div:first-child {
    max-width: 760px;
  }

  .goldFrekansArchiveHeader p {
    margin: 0 0 11px;
    color: #9b742f;
    letter-spacing: 0.22em;
    font-size: 10px;
    font-weight: 700;
  }

  .goldFrekansArchiveHeader h2 {
    margin: 0;
    color: #211811;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(41px, 3.2vw, 54px);
    font-weight: 400;
    line-height: 0.98;
    letter-spacing: -1.5px;
  }

  .goldFrekansArchiveHeader h2 span {
    color: #a77a2d;
  }

  .goldFrekansControls {
    display: flex;
    gap: 8px;
    padding-bottom: 2px;
  }

  .goldFrekansControls button {
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    padding: 0;
    border: 1px solid rgba(155, 116, 47, 0.28);
    border-radius: 999px;
    background: rgba(255, 253, 248, 0.76);
    color: #8d6728;
    font-size: 17px;
    cursor: pointer;
  }

  .goldFrekansScroller {
    display: flex;
    gap: 18px;
    width: 100%;
    margin: 0;
    padding: 4px 0 12px;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
  }

  .goldFrekansScroller::-webkit-scrollbar {
    display: none;
  }

  .goldFrekansCard {
    flex: 0 0 380px;
    min-width: 0;
    overflow: hidden;
    scroll-snap-align: start;
    border: 2px solid rgba(205, 158, 70, 0.76);
    border-radius: 24px;
    background:
      radial-gradient(circle at 88% 4%, rgba(199, 154, 67, 0.13), transparent 30%),
      linear-gradient(145deg, #2b1d13 0%, #1e150f 58%, #17100c 100%);
    box-shadow: 0 20px 46px rgba(48, 31, 13, 0.20), 0 6px 16px rgba(48, 31, 13, 0.10);
  }

  .goldFrekansCardVisual {
    position: relative;
    display: block;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background: #21160f;
  }

  .goldFrekansCardVisual img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .goldFrekansNumber {
    position: absolute;
    top: 14px;
    left: 14px;
    min-width: 34px;
    height: 28px;
    padding: 0 9px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(218, 176, 95, 0.25);
    border-radius: 999px;
    color: #e0b766;
    background: rgba(29, 19, 12, 0.87);
    font-size: 8px;
    font-weight: 700;
  }

  .goldFrekansPlay {
    position: absolute;
    right: 14px;
    bottom: 14px;
    width: 42px;
    height: 42px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    color: #20160f;
    background: linear-gradient(135deg, #b88431, #ddb761);
    font-size: 10px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  }

  .goldFrekansCardBody {
    padding: 21px 20px 19px;
  }

  .goldFrekansCategory {
    margin: 0 0 9px;
    color: #c99c4b;
    letter-spacing: 0.15em;
    font-size: 8px;
    font-weight: 700;
    line-height: 1.3;
  }

  .goldFrekansCard h3 {
    min-height: 52px;
    margin: 0;
    color: #fffaf1;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 24px;
    font-weight: 400;
    line-height: 1.03;
    letter-spacing: -0.55px;
  }

  .goldFrekansDescription {
    min-height: 72px;
    margin: 13px 0 0;
    color: rgba(255, 250, 241, 0.62);
    font-size: 11.5px;
    line-height: 1.55;
  }

  .goldFrekansListenLink {
    margin-top: 17px;
    padding-top: 15px;
    border-top: 1px solid rgba(214, 173, 97, 0.16);
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #d8af62;
    text-decoration: none;
    font-size: 10px;
    font-weight: 700;
  }

  .goldFrekansBottomNote {
    margin-top: 46px;
    padding: 30px 34px;
    border: 1px solid rgba(199, 154, 67, 0.22);
    border-radius: 25px;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 36px;
    background:
      radial-gradient(circle at 88% 8%, rgba(190, 143, 62, 0.17), transparent 32%),
      linear-gradient(145deg, #291c13 0%, #18110d 100%);
  }

  .goldFrekansBottomNote small {
    display: block;
    margin-bottom: 8px;
    color: #c89a47;
    letter-spacing: 0.17em;
    font-size: 8px;
    font-weight: 700;
  }

  .goldFrekansBottomNote h3 {
    max-width: 720px;
    margin: 0;
    color: #fffaf1;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 32px;
    font-weight: 400;
    line-height: 1.04;
  }

  .goldFrekansBottomNote a {
    min-width: 185px;
    min-height: 46px;
    padding: 0 17px;
    border: 1px solid rgba(167, 122, 45, 0.34);
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    color: #2a1b12;
    background: linear-gradient(120deg, #c8963f 0%, #e0bb6a 100%);
    text-decoration: none;
    font-size: 11.5px;
    font-weight: 700;
    box-shadow: 0 10px 24px rgba(66, 42, 17, 0.12);
    transition: transform 160ms ease, filter 160ms ease;
  }

  .goldFrekansBottomNote a:hover {
    transform: translateY(-2px);
    filter: brightness(1.03);
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
      align-items: center;
    }

    .goldFrekansArchiveHeader h2 {
      font-size: clamp(36px, 8vw, 48px);
    }

    .goldFrekansCard {
      flex-basis: min(82vw, 370px);
    }

    .goldFrekansBottomNote {
      grid-template-columns: 1fr;
    }
  }
`;

export default function GoldFrekansPage() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollSlider = (direction: "left" | "right") => {
    const slider = sliderRef.current;

    if (!slider) return;

    const firstCard =
      slider.querySelector<HTMLElement>(".goldFrekansCard");

    const amount = firstCard
      ? firstCard.offsetWidth + 18
      : slider.clientWidth * 0.34;

    slider.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
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
              <p>GOLDFREKANS · YOUTUBE KÜTÜPHANESİ</p>

              <h2>
                Dinlemek istediğin
                <span> kaydı seç.</span>
              </h2>
            </div>

            <div className="goldFrekansControls">
              <button
                type="button"
                onClick={() => scrollSlider("left")}
                aria-label="Önceki GoldFrekans kaydı"
              >
                ←
              </button>

              <button
                type="button"
                onClick={() => scrollSlider("right")}
                aria-label="Sonraki GoldFrekans kaydı"
              >
                →
              </button>
            </div>
          </header>

          <div
            className="goldFrekansScroller"
            ref={sliderRef}
          >
            {goldFrekansTracks.map((track) => (
              <article
                className="goldFrekansCard"
                key={track.youtubeUrl}
              >
                <a
                  className="goldFrekansCardVisual"
                  href={track.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${track.title} YouTube'da dinle`}
                >
                  <img
                    src={track.thumbnail}
                    alt={track.title}
                    loading="lazy"
                  />

                  <span className="goldFrekansNumber">
                    {track.number}
                  </span>

                  <span
                    className="goldFrekansPlay"
                    aria-hidden="true"
                  >
                    ▶
                  </span>
                </a>

                <div className="goldFrekansCardBody">
                  <p className="goldFrekansCategory">
                    {track.category}
                  </p>

                  <h3>{track.title}</h3>

                  <p className="goldFrekansDescription">
                    {track.description}
                  </p>

                  <a
                    className="goldFrekansListenLink"
                    href={track.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    YouTube’da Dinle
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="goldFrekansBottomNote">
            <div>
              <small>GOLDFREKANS KÜTÜPHANESİ</small>
              <h3>
                Yeni doğa sesleri, meditasyonlar ve frekans kayıtları
                eklendikçe bu alan büyümeye devam edecek.
              </h3>
            </div>

            <a
              href={youtubeChannelUrl}
              target="_blank"
              rel="noreferrer"
            >
              YouTube’a Git
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}