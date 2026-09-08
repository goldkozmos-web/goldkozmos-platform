"use client";

import { useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";
import ContinueGlance from "../../components/platform/ContinueGlance";
import "../../styles/home.css";

const youtubeChannelUrl =
  "https://youtube.com/@goldkozmos?si=NbufFa7Zo3wsQuoo";

const spotifyShowUrl =
  "https://open.spotify.com/show/0343du5jxaHZOJhqDJZKYQ";

const episodes = [
  {
    number: "01",
    category: "PARA · BOLLUK · KARMA",
    title: "Kötü İnsanlar Neden Zengin Olur?",
    subtitle: "Para Karmasının Görünmeyen Yüzü",
    description:
      "Para, ahlak, adalet beklentisi ve bollukla kurulan görünmez bağları sorgulayan GoldCast bölümü.",
    youtubeUrl: "https://youtu.be/nNwVpUPHF7c",
    thumbnail:
      "https://i.ytimg.com/vi/nNwVpUPHF7c/hqdefault.jpg",
  },
  {
    number: "02",
    category: "ATALAR · TRAVMALAR · BOLLUK",
    title: "Bolluğun Önündeki Görünmez El",
    subtitle: "Atalar, Travmalar ve Biz",
    description:
      "Geçmiş kuşaklardan taşınan duygusal ve düşünsel kalıpların bolluk alanıyla ilişkisini ele alan GoldCast bölümü.",
    youtubeUrl: "https://youtu.be/DO24_2x7Emg",
    thumbnail:
      "https://i.ytimg.com/vi/DO24_2x7Emg/hqdefault.jpg",
  },
  {
    number: "03",
    category: "KENDİLİK REZONANSI",
    title: "Belki de Seni Yoran Hayat Değil, Kendinsin",
    subtitle: "Kendilik Rezonansı",
    description:
      "Kendinle kurduğun ilişkiyi, zihinsel yüklerini ve fark etmeden kendine eklediğin baskıları daha yakından görmeye davet eden GoldCast bölümü.",
    youtubeUrl:
      "https://www.youtube.com/watch?v=OXWK7tGNXyc&t=53s",
    thumbnail:
      "https://i.ytimg.com/vi/OXWK7tGNXyc/hqdefault.jpg",
  },
];

/*
  YENİ SPOTIFY BÖLÜMLERİ GELDİĞİNDE
  BURAYA YENİ OBJE EKLEYECEĞİZ.
*/
const spotifyEpisodes = [
  {
    number: "01",
    category: "KENDİLİK REZONANSI",
    title: "Belki de Seni Yoran Hayat Değil, Kendinsin",
    description:
      "Kendinle kurduğun ilişkiyi ve fark etmeden taşıdığın zihinsel yükleri gözlemlemeye davet eden GoldCast bölümü.",
    embedUrl:
      "https://open.spotify.com/embed/show/0343du5jxaHZOJhqDJZKYQ?utm_source=generator&theme=0",
    spotifyUrl: spotifyShowUrl,
  },
];



const goldcastWhatsappStyles = `
  .goldcastPage .goldcastFloatingWhatsapp {
    position: fixed;
    right: 24px;
    bottom: 92px;
    z-index: 99998;

    width: 56px;
    height: 56px;

    display: grid;
    place-items: center;

    border: 1.5px solid rgba(211, 168, 84, 0.70);
    border-radius: 50%;

    color: #d9ad58;

    background:
      linear-gradient(
        145deg,
        #21150f 0%,
        #120c09 100%
      );

    box-shadow:
      0 16px 34px rgba(18, 11, 7, 0.30),
      0 0 0 6px rgba(211, 168, 84, 0.07);

    text-decoration: none;

    transition:
      transform 180ms ease,
      box-shadow 180ms ease,
      border-color 180ms ease;
  }

  .goldcastPage .goldcastFloatingWhatsapp:hover {
    transform: translateY(-3px) scale(1.03);
    border-color: rgba(224, 187, 105, 0.95);

    box-shadow:
      0 20px 40px rgba(18, 11, 7, 0.36),
      0 0 0 8px rgba(211, 168, 84, 0.09);
  }

  .goldcastPage .goldcastFloatingWhatsapp svg {
    width: 26px;
    height: 26px;
    fill: currentColor;
  }

  .goldcastPage .goldcastFloatingWhatsappLabel {
    position: absolute;

    right: 68px;
    top: 50%;

    transform: translateY(-50%);

    min-width: max-content;

    padding: 8px 11px;

    border: 1px solid rgba(211, 168, 84, 0.24);
    border-radius: 10px;

    color: #fffaf1;
    background: rgba(18, 12, 9, 0.94);

    box-shadow:
      0 10px 24px rgba(18, 11, 7, 0.20);

    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.03em;

    opacity: 0;
    pointer-events: none;

    transition:
      opacity 160ms ease,
      transform 160ms ease;
  }

  .goldcastPage
  .goldcastFloatingWhatsapp:hover
  .goldcastFloatingWhatsappLabel {
    opacity: 1;
    transform: translateY(-50%) translateX(-2px);
  }

  @media (max-width: 700px) {
    .goldcastPage .goldcastFloatingWhatsapp {
      right: 18px;
      bottom: 82px;
      width: 52px;
      height: 52px;
    }

    .goldcastPage .goldcastFloatingWhatsappLabel {
      display: none;
    }
  }
`;

const youtubeOnlyStyles = `
  @media (min-width: 901px) {
    .goldcastPage .goldcastYTSection {
      padding: 34px 0 58px;
      background:
        radial-gradient(circle at 94% 20%, rgba(188, 143, 58, 0.07), transparent 28%),
        linear-gradient(180deg, #fbf8f2 0%, #f7f1e8 100%);
    }

    .goldcastPage .goldcastYTContainer {
      width: min(1180px, calc(100% - 80px));
      margin: 0 auto;
      padding: 26px 24px 20px;
      box-sizing: border-box;
      border: 1px solid rgba(161, 118, 43, 0.14);
      border-radius: 26px;
      background: rgba(255, 255, 255, 0.72);
      box-shadow: 0 18px 50px rgba(66, 42, 17, 0.06);
    }

    .goldcastPage .goldcastYTHeader {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 28px;
      margin-bottom: 20px;
    }

    .goldcastPage .goldcastYTHeader p {
      margin: 0 0 8px;
      color: #9d742d;
      letter-spacing: 0.19em;
      font-size: 9px;
      font-weight: 700;
    }

    .goldcastPage .goldcastYTHeader h2 {
      margin: 0;
      color: #241911;
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(30px, 2.5vw, 42px);
      font-weight: 400;
      line-height: 1;
      letter-spacing: -1px;
    }

    .goldcastPage .goldcastYTHeader h2 span {
      color: #a8792a;
    }

    .goldcastPage .goldcastYTControls {
      display: flex;
      gap: 8px;
    }

    .goldcastPage .goldcastYTControls button {
      width: 42px;
      height: 42px;
      padding: 0;
      display: grid;
      place-items: center;
      border: 1px solid rgba(155, 116, 47, 0.25);
      border-radius: 50%;
      background: #fffdf8;
      color: #8d6728;
      font-size: 16px;
      cursor: pointer;
    }

    .goldcastPage .goldcastYTScroller {
      display: flex;
      gap: 18px;
      width: 100%;
      padding: 2px 0 10px;
      overflow-x: auto;
      overflow-y: hidden;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
    }

    .goldcastPage .goldcastYTScroller::-webkit-scrollbar {
      display: none;
    }

    .goldcastPage .goldcastYTCard {
      flex: 0 0 calc((100% - 18px) / 2);
      min-width: 0;
      overflow: hidden;
      box-sizing: border-box;
      scroll-snap-align: start;
      border: 2px solid rgba(205, 158, 70, 0.76);
      border-radius: 24px;
      background:
        radial-gradient(circle at 92% 8%, rgba(196, 151, 66, 0.11), transparent 30%),
        linear-gradient(145deg, #2a1c13 0%, #1a120d 100%);
      box-shadow: 0 22px 48px rgba(48, 31, 13, 0.20), 0 7px 18px rgba(48, 31, 13, 0.10);
    }

    .goldcastPage .goldcastYTTop {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 13px 16px 11px;
      color: #d2a552;
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.13em;
    }

    .goldcastPage .goldcastYTImage {
      display: block;
      width: calc(100% - 32px);
      aspect-ratio: 16 / 9;
      margin: 0 16px;
      overflow: hidden;
      box-sizing: border-box;
      border: 1px solid rgba(216, 173, 91, 0.30);
      border-radius: 16px;
      background: #120d09;
    }

    .goldcastPage .goldcastYTImage img {
      display: block;
      width: 100%;
      height: 100%;
      max-width: none;
      margin: 0;
      padding: 0;
      object-fit: cover;
      object-position: center;
      border-radius: 0;
    }

    .goldcastPage .goldcastYTBody {
      padding: 16px 16px 18px;
    }

    .goldcastPage .goldcastYTCategory {
      margin: 0 0 7px;
      color: #c89a47;
      letter-spacing: 0.14em;
      font-size: 8px;
      font-weight: 700;
    }

    .goldcastPage .goldcastYTCard h3 {
      margin: 0;
      color: #fffaf1;
      font-family: Georgia, "Times New Roman", serif;
      font-size: 23px;
      font-weight: 400;
      line-height: 1.05;
    }

    .goldcastPage .goldcastYTSubtitle {
      margin: 8px 0 0;
      color: #c89a47;
      font-size: 10px;
      font-weight: 700;
    }

    .goldcastPage .goldcastYTDescription {
      margin: 9px 0 0;
      color: rgba(255, 250, 241, 0.62);
      font-size: 10.5px;
      line-height: 1.55;
    }

    .goldcastPage .goldcastYTWatch {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 14px;
      padding-top: 13px;
      border-top: 1px solid rgba(216, 173, 91, 0.15);
      color: #d7aa55;
      text-decoration: none;
      font-size: 10px;
      font-weight: 700;
    }

    .goldcastPage .goldcastYTFooter {
      margin-top: 8px;
    }
  }
`;

const desktopSpotifyStyles = `
  @media (min-width: 901px) {
    .goldcastPage .goldcastSpotifyArchive {
      position: relative;
      width: 100%;
      margin: 0;
      padding: 76px 0 86px;
      overflow: hidden;
      background:
        radial-gradient(circle at 87% 12%, rgba(188, 143, 58, 0.12), transparent 30%),
        radial-gradient(circle at 8% 90%, rgba(188, 143, 58, 0.07), transparent 24%),
        linear-gradient(180deg, #f7f1e7 0%, #f4ecdf 100%);
    }

    .goldcastPage .goldcastSpotifyArchive::before {
      content: "";
      position: absolute;
      top: 0;
      left: 50%;
      width: min(1180px, calc(100% - 80px));
      height: 1px;
      transform: translateX(-50%);
      background: linear-gradient(90deg, transparent, rgba(157, 116, 46, 0.28), transparent);
    }

    .goldcastPage .goldcastSpotifyArchiveInner {
      position: relative;
      z-index: 1;
      width: min(1180px, calc(100% - 80px));
      margin: 0 auto;
    }

    .goldcastPage .goldcastSpotifyArchiveHeader {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 36px;
      margin: 0 0 30px;
    }

    .goldcastPage .goldcastSpotifyArchiveHeader > div:first-child {
      max-width: 720px;
    }

    .goldcastPage .goldcastSpotifyArchiveHeader p {
      margin: 0 0 11px;
      color: #9b742f;
      letter-spacing: 0.22em;
      font-size: 10px;
      font-weight: 700;
      line-height: 1.2;
    }

    .goldcastPage .goldcastSpotifyArchiveHeader h2 {
      margin: 0;
      color: #211811;
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(40px, 3.2vw, 52px);
      font-weight: 400;
      line-height: 0.98;
      letter-spacing: -1.4px;
    }

    .goldcastPage .goldcastSpotifyArchiveHeader h2 span {
      color: #a77a2d;
      font: inherit;
    }

    .goldcastPage .goldcastSpotifyControls {
      display: flex;
      gap: 8px;
      padding-bottom: 2px;
    }

    .goldcastPage .goldcastSpotifyControls button {
      display: grid;
      place-items: center;
      width: 44px;
      height: 44px;
      padding: 0;
      border: 1px solid rgba(155, 116, 47, 0.28);
      border-radius: 999px;
      background: rgba(255, 253, 248, 0.72);
      color: #8d6728;
      font-size: 17px;
      line-height: 1;
      cursor: pointer;
      transition: transform 160ms ease, border-color 160ms ease, background 160ms ease;
    }

    .goldcastPage .goldcastSpotifyControls button:hover {
      transform: translateY(-2px);
      border-color: rgba(155, 116, 47, 0.48);
      background: #fffdf8;
    }

    .goldcastPage .goldcastSpotifyScroller {
      display: flex;
      gap: 22px;
      width: 100%;
      margin: 0;
      padding: 4px 0 10px;
      overflow-x: auto;
      overflow-y: hidden;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
    }

    .goldcastPage .goldcastSpotifyScroller::-webkit-scrollbar {
      display: none;
    }

    .goldcastPage .goldcastSpotifyEpisodeCard {
      position: relative;
      isolation: isolate;
      display: grid;
      grid-template-columns: minmax(0, 0.88fr) minmax(460px, 1.12fr);
      grid-template-areas:
        "top embed"
        "category embed"
        "title embed"
        "description embed"
        "link embed";
      align-items: center;
      column-gap: clamp(42px, 5vw, 72px);
      flex: 0 0 100%;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      min-height: 390px;
      padding: 46px 48px;
      box-sizing: border-box;
      overflow: hidden;
      scroll-snap-align: start;
      border: 1px solid rgba(201, 157, 77, 0.26);
      border-radius: 30px;
      background:
        radial-gradient(circle at 88% 4%, rgba(199, 154, 67, 0.18), transparent 30%),
        radial-gradient(circle at 8% 92%, rgba(167, 122, 45, 0.08), transparent 28%),
        linear-gradient(145deg, #2b1d13 0%, #1e150f 56%, #17100c 100%);
      box-shadow: 0 28px 70px rgba(48, 31, 13, 0.18);
    }

    .goldcastPage .goldcastSpotifyEpisodeCard::before {
      content: "";
      position: absolute;
      z-index: -1;
      top: -150px;
      right: -120px;
      width: 360px;
      height: 360px;
      border: 1px solid rgba(201, 157, 77, 0.12);
      border-radius: 50%;
    }

    .goldcastPage .goldcastSpotifyEpisodeCard::after {
      content: "";
      position: absolute;
      z-index: -1;
      bottom: -110px;
      left: -90px;
      width: 250px;
      height: 250px;
      border: 1px solid rgba(201, 157, 77, 0.08);
      border-radius: 50%;
    }

    .goldcastPage .goldcastSpotifyEpisodeTop {
      grid-area: top;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 18px;
      margin: 0 0 22px;
      padding-bottom: 17px;
      border-bottom: 1px solid rgba(214, 173, 97, 0.16);
    }

    .goldcastPage .goldcastSpotifyEpisodeTop > span:first-child {
      color: #c99c4b;
      letter-spacing: 0.16em;
      font-size: 11px;
      font-weight: 700;
    }

    .goldcastPage .goldcastSpotifyMiniLogo {
      display: grid;
      place-items: center;
      width: 35px;
      height: 35px;
      border: 1px solid rgba(214, 173, 97, 0.33);
      border-radius: 50%;
      color: #d7ad5c;
      font-size: 13px;
      line-height: 1;
    }

    .goldcastPage .goldcastSpotifyEpisodeCategory {
      grid-area: category;
      margin: 0 0 11px;
      color: #c39a50;
      letter-spacing: 0.15em;
      font-size: 10px;
      font-weight: 700;
      line-height: 1.25;
    }

    .goldcastPage .goldcastSpotifyEpisodeCard h3 {
      grid-area: title;
      max-width: 500px;
      margin: 0;
      color: #fffaf1;
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(31px, 2.4vw, 40px);
      font-weight: 400;
      line-height: 1.02;
      letter-spacing: -0.9px;
    }

    .goldcastPage .goldcastSpotifyEpisodeDescription {
      grid-area: description;
      max-width: 500px;
      margin: 16px 0 24px;
      color: rgba(255, 250, 241, 0.62);
      font-size: 13px;
      line-height: 1.65;
    }

    .goldcastPage .goldcastSpotifyEpisodeEmbed {
      grid-area: embed;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      box-sizing: border-box;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 20px;
      background: #121212;
      box-shadow: 0 18px 45px rgba(0, 0, 0, 0.26);
    }

    .goldcastPage .goldcastSpotifyEpisodeEmbed iframe {
      display: block;
      width: 100%;
      height: 232px;
      border: 0;
    }

    .goldcastPage .goldcastSpotifyEpisodeCard > a {
      grid-area: link;
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      gap: 22px;
      width: fit-content;
      min-width: 188px;
      min-height: 44px;
      padding: 0 16px;
      border: 1px solid rgba(214, 173, 97, 0.34);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.02);
      color: #d8af62;
      font-size: 11px;
      font-weight: 700;
      text-decoration: none;
      transition: transform 160ms ease, background 160ms ease, border-color 160ms ease;
    }

    .goldcastPage .goldcastSpotifyEpisodeCard > a:hover {
      transform: translateY(-2px);
      border-color: rgba(214, 173, 97, 0.56);
      background: rgba(214, 173, 97, 0.07);
    }

    .goldcastPage .goldcastSpotifyEpisodeCard > a span {
      font-size: 13px;
      line-height: 1;
    }
  }
`;

export default function GoldCastPage() {
  const youtubeSliderRef =
    useRef<HTMLDivElement>(null);

  const spotifySliderRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const backToTop =
      document.querySelector<HTMLAnchorElement>(
        ".goldcastPage .siteGlobalBackToTop",
      );

    if (!backToTop) return;

    const handleBackToTop = (event: MouseEvent) => {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    backToTop.addEventListener(
      "click",
      handleBackToTop,
    );

    return () => {
      backToTop.removeEventListener(
        "click",
        handleBackToTop,
      );
    };
  }, []);

  const scrollSlider = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: "left" | "right",
  ) => {
    const slider = ref.current;

    if (!slider) return;

    slider.scrollBy({
      left:
        direction === "right"
          ? slider.clientWidth * 0.8
          : -slider.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  return (
    <main
      className="homePage goldcastPage"
      id="top"
    >
      <style>{goldcastWhatsappStyles}</style>
      <style>{youtubeOnlyStyles}</style>
      <style>{desktopSpotifyStyles}</style>

      <Navbar />

      <ContinueGlance platformId="goldcast" variant="page" />

      {/* YOUTUBE */}

      <section
        className="goldcastYTSection"
        id="goldcast-bolumleri"
      >
        <div className="goldcastYTContainer">
          <header className="goldcastYTHeader">
            <div>
              <p>GÜNCEL GOLDCAST BÖLÜMLERİ</p>
              <h2>
                Bir başlığa dokun,
                <span> video YouTube’da açılsın.</span>
              </h2>
            </div>

            <div className="goldcastYTControls">
              <button
                type="button"
                onClick={() =>
                  scrollSlider(
                    youtubeSliderRef,
                    "left",
                  )
                }
                aria-label="Önceki bölüm"
              >
                ←
              </button>

              <button
                type="button"
                onClick={() =>
                  scrollSlider(
                    youtubeSliderRef,
                    "right",
                  )
                }
                aria-label="Sonraki bölüm"
              >
                →
              </button>
            </div>
          </header>

          <div
            ref={youtubeSliderRef}
            className="goldcastYTScroller"
          >
            {episodes.map((episode) => (
              <article
                className="goldcastYTCard"
                key={episode.youtubeUrl}
              >
                <div className="goldcastYTTop">
                  <span>{episode.number}</span>
                  <span>▶</span>
                </div>

                <a
                  className="goldcastYTImage"
                  href={episode.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${episode.title} YouTube'da izle`}
                >
                  <img
                    src={episode.thumbnail}
                    alt={episode.title}
                    loading="lazy"
                  />
                </a>

                <div className="goldcastYTBody">
                  <p className="goldcastYTCategory">
                    {episode.category}
                  </p>

                  <h3>{episode.title}</h3>

                  <p className="goldcastYTSubtitle">
                    {episode.subtitle}
                  </p>

                  <p className="goldcastYTDescription">
                    {episode.description}
                  </p>

                  <a
                    className="goldcastYTWatch"
                    href={episode.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    YouTube’da İzle
                    <span>↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="goldcastYTFooter">
            <div className="analysisHubActions goldcastInlineActions">
              <a
                href={youtubeChannelUrl}
                target="_blank"
                rel="noreferrer"
              >
                YouTube Kanalıma Git
                <span>↗</span>
              </a>

              <a href="/iletisim">
                İletişime Geç
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SPOTIFY */}

      <section className="goldcastSpotifyArchive">
        <div className="goldcastSpotifyArchiveInner">
          <header className="goldcastSpotifyArchiveHeader">
            <div>
              <p>SPOTIFY · GOLDCAST</p>

              <h2>
                Dinlemek istediğin
                <span> bölümü seç.</span>
              </h2>
            </div>

            {spotifyEpisodes.length > 1 && (
              <div className="goldcastSpotifyControls">
                <button
                  type="button"
                  onClick={() =>
                    scrollSlider(
                      spotifySliderRef,
                      "left",
                    )
                  }
                  aria-label="Önceki Spotify bölümü"
                >
                  ←
                </button>

                <button
                  type="button"
                  onClick={() =>
                    scrollSlider(
                      spotifySliderRef,
                      "right",
                    )
                  }
                  aria-label="Sonraki Spotify bölümü"
                >
                  →
                </button>
              </div>
            )}
          </header>

          <div
            className="goldcastSpotifyScroller"
            ref={spotifySliderRef}
          >
            {spotifyEpisodes.map((episode) => (
              <article
                className="goldcastSpotifyEpisodeCard"
                key={episode.number}
              >
                <div className="goldcastSpotifyEpisodeTop">
                  <span>{episode.number}</span>

                  <span className="goldcastSpotifyMiniLogo">
                    ◉
                  </span>
                </div>

                <p className="goldcastSpotifyEpisodeCategory">
                  {episode.category}
                </p>

                <h3>{episode.title}</h3>

                <p className="goldcastSpotifyEpisodeDescription">
                  {episode.description}
                </p>

                <div className="goldcastSpotifyEpisodeEmbed">
                  <iframe
                    src={episode.embedUrl}
                    width="100%"
                    frameBorder="0"
                    scrolling="no"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title={`${episode.title} Spotify`}
                  />
                </div>

                <a
                  href={episode.spotifyUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Spotify’da Dinle
                  <span>↗</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FooterSection />

      <a
        href="https://wa.me/905054722153"
        className="goldcastFloatingWhatsapp"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp'tan mesaj gönder"
      >
        <svg
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M16 3.2c-6.95 0-12.6 5.56-12.6 12.4 0 2.19.59 4.33 1.7 6.2L3 29l7.42-2.02A12.7 12.7 0 0 0 16 28c6.95 0 12.6-5.56 12.6-12.4S22.95 3.2 16 3.2Zm0 22.7c-1.87 0-3.7-.5-5.28-1.45l-.38-.23-4.4 1.2 1.18-4.25-.25-.4a10.2 10.2 0 0 1-1.57-5.17C5.3 9.91 10.1 5.3 16 5.3s10.7 4.61 10.7 10.3S21.9 25.9 16 25.9Zm5.88-7.67c-.32-.16-1.9-.92-2.2-1.03-.3-.1-.52-.16-.74.16-.22.32-.85 1.03-1.04 1.24-.19.21-.38.24-.7.08-.32-.16-1.36-.49-2.58-1.57-.95-.83-1.6-1.86-1.78-2.18-.19-.32-.02-.49.14-.65.15-.14.32-.37.49-.56.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.56-.08-.16-.74-1.75-1.01-2.4-.27-.64-.54-.55-.74-.56h-.63c-.22 0-.58.08-.88.4-.3.32-1.15 1.1-1.15 2.69 0 1.58 1.18 3.11 1.34 3.33.16.21 2.32 3.48 5.62 4.88.79.33 1.4.53 1.88.68.79.25 1.5.21 2.07.13.63-.09 1.9-.76 2.17-1.49.27-.73.27-1.36.19-1.49-.08-.13-.3-.21-.62-.37Z"
            clipRule="evenodd"
          />
        </svg>

        <span className="goldcastFloatingWhatsappLabel">
          WhatsApp’tan Mesaj Gönder
        </span>
      </a>
    </main>
  );
}