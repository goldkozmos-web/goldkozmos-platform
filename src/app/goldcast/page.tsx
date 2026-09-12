"use client";

import { useRef, type RefObject, type SyntheticEvent } from "react";
import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";
import ContinueGlance from "../../components/platform/ContinueGlance";
import { usePlayback } from "../../components/platform/PlaybackProvider";
import { youtubeIdFromUrl } from "../../lib/youtube";
import "../../styles/home.css";

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
const youtubeChannelUrl = "https://youtube.com/@goldkozmos";
const spotifyShowUrl =
  "https://open.spotify.com/show/0343du5jxaHZOJhqDJZKYQ";

const spotifyEpisodes = [
  {
    number: "01",
    category: "KENDİLİK REZONANSI",
    title: "Belki de Seni Yoran Hayat Değil, Kendinsin",
    description:
      "Kendinle kurduğun ilişkiyi ve fark etmeden taşıdığın zihinsel yükleri gözlemlemeye davet eden GoldCast bölümü.",
    embedUrl:
      "https://open.spotify.com/embed/episode/2OUemDgzVGfHOcweo3TNLX?utm_source=generator",
    cover: "https://i.ytimg.com/vi/OXWK7tGNXyc/hqdefault.jpg",
  },
];



function youtubeCover(id: string) {
  return {
    src: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
    srcSet: `https://i.ytimg.com/vi/${id}/sddefault.jpg 640w, https://i.ytimg.com/vi/${id}/maxresdefault.jpg 1280w`,
  };
}

function onCoverError(event: SyntheticEvent<HTMLImageElement>) {
  const img = event.currentTarget;
  const idMatch = img.src.match(/\/vi\/([\w-]{11})\//);
  const id = idMatch?.[1];

  if (!id) {
    return;
  }

  if (img.src.includes("maxresdefault")) {
    img.src = `https://i.ytimg.com/vi/${id}/sddefault.jpg`;
    img.removeAttribute("srcset");
    return;
  }

  if (img.src.includes("sddefault")) {
    img.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
    img.removeAttribute("srcset");
  }
}

const youtubeOnlyStyles = `
  @media (min-width: 901px) {
    .goldcastPage .goldcastYTSection {
      padding: 34px 0 58px;
      background:
        linear-gradient(180deg, #3a271b 0%, #24170f 56%, #1a120c 100%);
    }

    .goldcastPage .goldcastYTContainer {
      width: min(1180px, calc(100% - 80px));
      margin: 0 auto;
      padding: 26px 24px 20px;
      box-sizing: border-box;
      border: 0;
      border-radius: 26px;
      background: transparent;
      box-shadow: none;
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
      color: #e0c07a;
      letter-spacing: 0.19em;
      font-size: 9px;
      font-weight: 700;
    }

    .goldcastPage .goldcastYTHeader h2 {
      margin: 0;
      color: #e0c07a;
      font-family: inherit;
      font-size: 12px;
      font-weight: 700;
      line-height: 1.2;
      letter-spacing: 0.18em;
      text-transform: uppercase;
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
      padding: 14px 0 18px;
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
      border: 0;
      border-radius: 24px;
      background: #ffffff;
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

    .goldcastPage .goldcastYTBody,
    .goldcastPage .goldcastYTCategory,
    .goldcastPage .goldcastYTTitle,
    .goldcastPage .goldcastYTSubtitle,
    .goldcastPage .goldcastYTDescription {
      display: block;
    }

    .goldcastPage .goldcastYTTitle {
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
      color: #16110c;
      font-family: inherit;
      font-size: 12px;
      font-weight: 700;
      line-height: 1.2;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }

    .goldcastPage .goldcastSpotifyArchiveHeader h2 span {
      color: #16110c;
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
      gap: 18px;
      width: 100%;
      margin: 0;
      padding: 14px 0 18px;
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
      box-shadow: none;
    }

    .goldcastPage .goldcastSpotifyEpisodeCard::before,
    .goldcastPage .goldcastSpotifyEpisodeCard::after {
      content: none;
      display: none;
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

const goldcastPremiumStyles = `
  body:has(.goldcastPage) .goldkozmosGlobalBackToTop {
    display: none !important;
  }

  .goldcastPage .platformPageContinue {
    position: relative;
    width: min(1180px, calc(100% - 32px));
    margin: 10px auto 6px;
    padding: 12px 14px;
    box-sizing: border-box;
    overflow: hidden;
    border: 0;
    border-radius: 18px;
    background: #ffffff;
    box-shadow:
      0 8px 18px rgba(48, 28, 12, 0.10),
      0 18px 32px rgba(48, 28, 12, 0.12);
  }

  .goldcastPage .platformPageContinue::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
    box-sizing: border-box;
    border-radius: inherit;
    padding: 2px;
    background:
      linear-gradient(
        180deg,
        rgba(255, 248, 220, 0.7) 0%,
        transparent 38%,
        rgba(72, 46, 16, 0.28) 100%
      ),
      linear-gradient(
        125deg,
        #fff4c8 0%,
        #f0d78a 8%,
        #d4b056 18%,
        #b8893a 32%,
        #7a5418 46%,
        #e6c878 58%,
        #c4a04a 70%,
        #8d6624 84%,
        #f7e7b4 100%
      );
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    mask-composite: exclude;
  }

  .goldcastPage .platformPageContinue:has(.isFlashing) {
    animation: goldcastPlayFlash 0.55s ease;
  }

  @keyframes goldcastPlayFlash {
    0% { background-color: #ffffff; }
    40% { background-color: #f0d78a; }
    100% { background-color: #ffffff; }
  }

  .goldcastPage .platformContinue {
    padding-top: 0;
  }

  .goldcastPage .platformContinueCard {
    margin-top: 0;
    padding: 0;
    border: 0;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
    grid-template-columns: 56px minmax(0, 1fr);
    gap: 8px 12px;
    align-items: center;
  }

  .goldcastPage .platformContinueArt,
  .goldcastPage .platformContinueMark {
    width: 56px;
    height: 56px;
    border-radius: 10px;
    box-shadow: 0 6px 14px rgba(48, 28, 12, 0.22);
  }

  .goldcastPage .platformContinueCopy {
    gap: 2px;
  }

  .goldcastPage .platformContinueCopy p {
    color: #b08a3c;
    font-weight: 800;
    letter-spacing: 0.14em;
  }

  .goldcastPage .platformContinueCopy strong {
    font-size: 15px;
    color: #16110c;
  }

  .goldcastPage .platformContinueDesc {
    -webkit-line-clamp: 1;
    font-size: 12px;
    line-height: 1.35;
    color: #4a4038;
  }

  .goldcastPage .platformContinueMeter {
    margin-top: 2px;
    gap: 5px;
  }

  .goldcastPage .platformContinuePercent {
    color: #5a4e44;
  }

  .goldcastPage .platformContinue .platformProgressTrack {
    background: rgba(176, 138, 62, 0.2);
  }

  .goldcastPage .platformContinue .platformProgressTrack i {
    background: linear-gradient(90deg, #c4a056, #e2c67c);
  }

  .goldcastPage .platformContinueCta {
    min-height: 30px;
    margin-top: 4px;
    padding: 0 12px;
    font-size: 10px;
    border-color: #1c120b;
    background: #1c120b;
    color: #f7ead0;
  }

  .goldcastPage .platformContinueCta:hover {
    background: #2a1c12;
    border-color: #2a1c12;
    color: #fff6e4;
  }

  @media (min-width: 901px) {
    .goldcastPage .platformPageContinue {
      width: min(1180px, calc(100% - 80px));
      margin: 16px auto 0;
      padding: 14px 18px 14px;
    }
  }

  .goldcastPage .goldcastYTSection {
    background:
      linear-gradient(180deg, #3a271b 0%, #24170f 56%, #1a120c 100%) !important;
  }

  .goldcastPage .goldcastYTContainer {
    background: transparent !important;
    border-color: transparent !important;
    box-shadow: none !important;
  }

  .goldcastPage .goldcastYTHeader p {
    color: #e0c07a !important;
  }

  .goldcastPage .goldcastYTHeader h2,
  .goldcastPage .goldcastYTHeader h2 span {
    max-width: none !important;
    color: #e0c07a !important;
    font-family: inherit !important;
    font-size: 11px !important;
    font-weight: 700 !important;
    line-height: 1.2 !important;
    letter-spacing: 0.18em !important;
    text-transform: uppercase !important;
  }

  .goldcastPage .goldcastYTCard:not(.goldcastSpotifyEpisodeCard) {
    overflow: hidden !important;
    background: #ffffff !important;
    border: 0 !important;
    box-shadow:
      0 8px 18px rgba(24, 14, 8, 0.10),
      0 18px 32px rgba(24, 14, 8, 0.12) !important;
  }

  .goldcastPage .goldcastYTCard:not(.goldcastSpotifyEpisodeCard):hover {
    transform: translateY(-6px) !important;
    box-shadow:
      0 1px 0 rgba(255, 252, 246, 0.95) inset,
      0 16px 24px rgba(24, 14, 8, 0.22),
      0 28px 48px rgba(24, 14, 8, 0.26) !important;
  }

  .goldcastPage .goldcastYTCard:not(.goldcastSpotifyEpisodeCard) .goldcastYTTop {
    color: #b08a3e !important;
    letter-spacing: 0.16em !important;
  }

  .goldcastPage .goldcastYTCard:not(.goldcastSpotifyEpisodeCard) .goldcastYTImage {
    border: 1px solid rgba(176, 138, 62, 0.22) !important;
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.35) inset,
      0 10px 18px rgba(48, 28, 12, 0.16) !important;
    background: #1c140f !important;
  }

  .goldcastPage .goldcastYTCard:not(.goldcastSpotifyEpisodeCard) .goldcastYTImage img {
    filter: saturate(0.92) contrast(1.04);
  }

  .goldcastPage .goldcastYTCard:not(.goldcastSpotifyEpisodeCard) .goldcastYTTitle,
  .goldcastPage .goldcastYTCard:not(.goldcastSpotifyEpisodeCard) h3 {
    color: #2a1c12 !important;
    letter-spacing: -0.03em !important;
    line-height: 1.12 !important;
  }

  .goldcastPage .goldcastYTCard:not(.goldcastSpotifyEpisodeCard) .goldcastYTSubtitle {
    color: #a8792a !important;
    letter-spacing: 0.01em !important;
  }

  .goldcastPage .goldcastYTCard:not(.goldcastSpotifyEpisodeCard) .goldcastYTDescription {
    color: #6a5c50 !important;
    line-height: 1.5 !important;
  }

  .goldcastPage .goldcastYTCard:not(.goldcastSpotifyEpisodeCard) .goldcastYTCategory {
    color: #a8792a !important;
    letter-spacing: 0.16em !important;
  }

  .goldcastPage .goldcastSpotifyEpisodeCard {
    overflow: hidden !important;
    background: #ffffff !important;
    border: 0 !important;
    box-shadow:
      0 8px 18px rgba(24, 14, 8, 0.10),
      0 18px 32px rgba(24, 14, 8, 0.12) !important;
  }

  .goldcastPage .goldcastSpotifyEpisodeCard:hover {
    transform: translateY(-4px) !important;
  }

  .goldcastPage .goldcastSpotifyEpisodeCard .goldcastYTTop {
    color: #e0c07a !important;
    letter-spacing: 0.16em !important;
  }

  .goldcastPage .goldcastSpotifyEpisodeCard .goldcastYTImage {
    border: 1px solid rgba(214, 172, 88, 0.28) !important;
    box-shadow: 0 10px 18px rgba(8, 4, 2, 0.28) !important;
    background: #120c09 !important;
  }

  .goldcastPage .goldcastSpotifyEpisodeCard .goldcastYTTitle,
  .goldcastPage .goldcastSpotifyEpisodeCard h3 {
    color: #fffaf1 !important;
    letter-spacing: -0.03em !important;
    line-height: 1.12 !important;
  }

  .goldcastPage .goldcastSpotifyEpisodeCard .goldcastYTSubtitle,
  .goldcastPage .goldcastSpotifyEpisodeCard .goldcastYTCategory {
    color: #e0c07a !important;
  }

  .goldcastPage .goldcastSpotifyEpisodeCard .goldcastYTDescription {
    color: rgba(247, 234, 208, 0.72) !important;
    line-height: 1.5 !important;
  }

  .goldcastPage .goldcastFloatingWhatsapp,
  .goldcastPage .goldcastFloatingWhatsappLabel,
  .goldcastPage .goldcastYTControls,
  .goldcastPage .goldcastSpotifyControls,
  .goldcastPage .goldcastYTFooter,
  .goldcastPage .goldcastYTWatch {
    display: none !important;
  }

  .goldcastPage .goldcastYTImage,
  .goldcastPage .goldcastInlineActions a,
  .goldcastPage .analysisHubActions a {
    box-shadow: none !important;
  }

  .goldcastPage .goldcastYTCard,
  .goldcastPage .goldcastSpotifyEpisodeCard {
    position: relative;
    isolation: isolate;
    display: block !important;
    grid-template-columns: none !important;
    grid-template-areas: none !important;
    text-align: left;
    padding: 0 !important;
    min-height: 0 !important;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    transform: translateY(0);
    transition: transform 220ms ease, box-shadow 220ms ease;
  }

  .goldcastPage .goldcastSpotifyEpisodeCard::before {
    content: none !important;
    display: none !important;
  }

  .goldcastPage .goldcastYTCard:not(.goldcastSpotifyEpisodeCard):hover {
    transform: translateY(-8px) !important;
    box-shadow: 0 18px 28px rgba(48, 31, 13, 0.22) !important;
  }

  .goldcastPage .goldcastSpotifyEpisodeCard:hover {
    transform: translateY(-4px) !important;
  }

  .goldcastPage .goldcastYTCard:active,
  .goldcastPage .goldcastSpotifyEpisodeCard:active {
    transform: translateY(-3px) !important;
  }

  .goldcastPage .goldcastYTScroller,
  .goldcastPage .goldcastSpotifyScroller {
    padding-top: 18px !important;
    padding-bottom: 28px !important;
  }

  .goldcastPage .goldcastYTSection,
  .goldcastPage .goldcastSpotifyArchive {
    overflow: visible !important;
  }

  .goldcastPage .goldcastSpotifyArchive {
    background:
      linear-gradient(180deg, #fbf8f2 0%, #f4eadc 100%) !important;
  }

  .goldcastPage .goldcastSpotifyArchiveHeader h2,
  .goldcastPage .goldcastSpotifyArchiveHeader h2 span {
    max-width: none !important;
    color: #16110c !important;
    font-family: inherit !important;
    font-size: 11px !important;
    font-weight: 700 !important;
    line-height: 1.2 !important;
    letter-spacing: 0.18em !important;
    text-transform: uppercase !important;
  }

  .goldcastPage .goldcastChannelHead {
    display: flex !important;
    align-items: baseline !important;
    flex-wrap: wrap !important;
    gap: 6px 8px !important;
    max-width: none !important;
  }

  .goldcastPage .goldcastChannelDash {
    color: #e0c07a !important;
    font-size: 10px !important;
    font-weight: 700 !important;
    letter-spacing: 0 !important;
    line-height: 1.2 !important;
  }

  .goldcastPage .goldcastSpotifyArchiveHeader .goldcastChannelDash {
    color: #16110c !important;
  }

  .goldcastPage .goldcastChannelLink {
    color: #e0c07a !important;
    font-size: 10px !important;
    font-weight: 700 !important;
    letter-spacing: 0.14em !important;
    line-height: 1.2 !important;
    text-decoration: underline !important;
    text-underline-offset: 3px !important;
    text-decoration-thickness: 1px !important;
    text-transform: uppercase !important;
    white-space: nowrap !important;
  }

  .goldcastPage .goldcastSpotifyArchiveHeader .goldcastChannelLink {
    color: #16110c !important;
  }

  .goldcastPage .goldcastChannelLink:hover {
    opacity: 0.82 !important;
  }

  .goldcastPage .goldcastYTCard.isActive,
  .goldcastPage .goldcastSpotifyEpisodeCard.isActive {
    border-color: rgba(240, 208, 138, 0.72) !important;
  }

  .goldcastPage .goldcastYTBody,
  .goldcastPage .goldcastYTCategory,
  .goldcastPage .goldcastYTTitle,
  .goldcastPage .goldcastYTSubtitle,
  .goldcastPage .goldcastYTDescription {
    display: block;
  }

  .goldcastPage .goldcastYTImage {
    position: relative;
    overflow: hidden;
    border: 0 !important;
    padding: 0;
    width: calc(100% - 32px);
    background: #120d09;
    cursor: pointer;
  }

  .goldcastPage .goldcastSpotifyEpisodeCard {
    flex: 0 0 320px !important;
    width: 320px !important;
    max-width: 320px !important;
    border-radius: 24px !important;
  }

  @media (max-width: 700px) {
    .goldcastPage .goldcastYTCard,
    .goldcastPage .goldcastSpotifyEpisodeCard {
      flex-basis: min(68vw, 248px) !important;
      width: min(68vw, 248px) !important;
      max-width: 248px !important;
      border-radius: 18px !important;
    }

    .goldcastPage .goldcastYTImage {
      width: calc(100% - 24px) !important;
      border-radius: 12px !important;
    }

    .goldcastPage .goldcastYTTitle {
      font-size: 13px !important;
      letter-spacing: -0.02em !important;
    }
  }

  @media (min-width: 901px) {
    .goldcastPage .goldcastYTCard,
    .goldcastPage .goldcastSpotifyEpisodeCard {
      flex: 0 0 320px !important;
      width: 320px !important;
      max-width: 320px !important;
    }
  }

  .goldcastPage .goldcastYTCard,
  .goldcastPage .goldcastSpotifyEpisodeCard,
  .goldcastPage .goldcastYTCard:not(.goldcastSpotifyEpisodeCard),
  .goldcastPage .goldcastSpotifyEpisodeCard:hover,
  .goldcastPage .goldcastYTCard:not(.goldcastSpotifyEpisodeCard):hover {
    overflow: hidden !important;
    border: 0 !important;
    background: #ffffff !important;
    position: relative;
    display: flex !important;
    flex-direction: column !important;
    height: 100%;
    min-height: 0;
    padding: 0 !important;
    box-shadow:
      0 8px 18px rgba(48, 28, 12, 0.10),
      0 18px 32px rgba(48, 28, 12, 0.12) !important;
  }

  .goldcastPage .goldcastYTCard:hover,
  .goldcastPage .goldcastSpotifyEpisodeCard:hover,
  .goldcastPage .goldcastYTCard:not(.goldcastSpotifyEpisodeCard):hover {
    transform: translateY(-4px) !important;
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.95) inset,
      0 12px 22px rgba(48, 28, 12, 0.12),
      0 22px 36px rgba(48, 28, 12, 0.14) !important;
  }

  .goldcastPage .goldcastYTTop,
  .goldcastPage .goldcastSpotifyEpisodeCard .goldcastYTTop,
  .goldcastPage .goldcastYTCard:not(.goldcastSpotifyEpisodeCard) .goldcastYTTop {
    color: #b08a3c !important;
    font-size: 9px !important;
    letter-spacing: 0.16em !important;
  }

  .goldcastPage .goldcastYTImage,
  .goldcastPage .goldcastSpotifyEpisodeCard .goldcastYTImage,
  .goldcastPage .goldcastYTCard:not(.goldcastSpotifyEpisodeCard) .goldcastYTImage {
    overflow: hidden !important;
    border: 0 !important;
    box-shadow: none !important;
    background: #16110c !important;
  }

  .goldcastPage .goldcastYTImage img,
  .goldcastPage .goldcastSpotifyEpisodeCard .goldcastYTImage img,
  .goldcastPage .goldcastYTCard:not(.goldcastSpotifyEpisodeCard) .goldcastYTImage img {
    display: block !important;
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: center 36% !important;
    transform: scale(1.18);
    transform-origin: center 40%;
    filter: contrast(1.08) saturate(1.06) !important;
    image-rendering: auto;
  }

  .goldcastPage .goldcastYTCategory,
  .goldcastPage .goldcastYTSubtitle,
  .goldcastPage .goldcastSpotifyEpisodeCard .goldcastYTCategory,
  .goldcastPage .goldcastSpotifyEpisodeCard .goldcastYTSubtitle,
  .goldcastPage .goldcastYTCard:not(.goldcastSpotifyEpisodeCard) .goldcastYTCategory,
  .goldcastPage .goldcastYTCard:not(.goldcastSpotifyEpisodeCard) .goldcastYTSubtitle {
    color: #b08a3c !important;
    font-weight: 800 !important;
    letter-spacing: 0.14em !important;
  }

  .goldcastPage .goldcastYTTitle,
  .goldcastPage .goldcastYTCard h3,
  .goldcastPage .goldcastSpotifyEpisodeCard .goldcastYTTitle,
  .goldcastPage .goldcastSpotifyEpisodeCard h3,
  .goldcastPage .goldcastYTCard:not(.goldcastSpotifyEpisodeCard) .goldcastYTTitle,
  .goldcastPage .goldcastYTCard:not(.goldcastSpotifyEpisodeCard) h3 {
    color: #16110c !important;
    font-size: 13px !important;
    font-weight: 600 !important;
    letter-spacing: -0.02em !important;
    line-height: 1.2 !important;
  }

  .goldcastPage .goldcastYTDescription,
  .goldcastPage .goldcastSpotifyEpisodeCard .goldcastYTDescription,
  .goldcastPage .goldcastYTCard:not(.goldcastSpotifyEpisodeCard) .goldcastYTDescription {
    color: #5a4e44 !important;
    font-size: 12px !important;
    line-height: 1.45 !important;
  }

  .goldcastPage .goldcastYTSection,
  .goldcastPage .goldcastYTContainer,
  .goldcastPage .goldcastSpotifyArchive,
  .goldcastPage .goldcastSpotifyArchiveInner {
    overflow: visible !important;
  }

  .goldcastPage .goldcastYTScroller,
  .goldcastPage .goldcastSpotifyScroller {
    overflow-x: auto !important;
    overflow-y: visible !important;
    padding: 16px 20px 40px !important;
  }

  .goldcastPage .goldcastCardShell {
    flex: 0 0 min(62vw, 212px);
    width: min(62vw, 212px);
    max-width: 212px;
    box-sizing: border-box;
    padding: 6px 6px 14px;
    overflow: visible !important;
  }

  .goldcastPage .goldcastCardShell .goldcastYTCard,
  .goldcastPage .goldcastCardShell .goldcastSpotifyEpisodeCard {
    flex: none !important;
    width: 100% !important;
    max-width: none !important;
    min-height: 348px !important;
    border-radius: 16px !important;
  }

  @media (min-width: 901px) {
    .goldcastPage .goldcastCardShell {
      flex-basis: 252px;
      width: 252px;
      max-width: 252px;
    }

    .goldcastPage .goldcastCardShell .goldcastYTCard,
    .goldcastPage .goldcastCardShell .goldcastSpotifyEpisodeCard {
      min-height: 368px !important;
      border-radius: 18px !important;
    }
  }

  .goldcastPage .goldcastYTCard::after,
  .goldcastPage .goldcastSpotifyEpisodeCard::after,
  .goldcastPage .goldcastYTCard:not(.goldcastSpotifyEpisodeCard)::after {
    content: "" !important;
    display: block !important;
    position: absolute !important;
    inset: 0 !important;
    top: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    left: 0 !important;
    width: auto !important;
    height: auto !important;
    margin: 0 !important;
    z-index: 3 !important;
    box-sizing: border-box !important;
    border: 0 !important;
    border-radius: inherit !important;
    padding: 1.5px !important;
    pointer-events: none;
    background:
      linear-gradient(
        180deg,
        rgba(255, 248, 220, 0.7) 0%,
        transparent 38%,
        rgba(72, 46, 16, 0.28) 100%
      ),
      linear-gradient(
        125deg,
        #fff4c8 0%,
        #f0d78a 8%,
        #d4b056 18%,
        #b8893a 32%,
        #7a5418 46%,
        #e6c878 58%,
        #c4a04a 70%,
        #8d6624 84%,
        #f7e7b4 100%
      ) !important;
    box-shadow: 0 0 0 0.5px rgba(90, 58, 18, 0.35);
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    mask-composite: exclude;
  }

  @media (max-width: 700px) {
    .goldcastPage .goldcastYTTitle,
    .goldcastPage .goldcastYTCard h3,
    .goldcastPage .goldcastSpotifyEpisodeCard .goldcastYTTitle {
      font-size: 13px !important;
    }

    .goldcastPage .goldcastYTDescription,
    .goldcastPage .goldcastSpotifyEpisodeCard .goldcastYTDescription {
      font-size: 10px !important;
    }
  }

  .goldcastPage .goldcastSpotifyArchiveHeader h2,
  .goldcastPage .goldcastSpotifyArchiveHeader h2 span,
  .goldcastPage .goldcastSpotifyArchiveHeader .goldcastChannelDash,
  .goldcastPage .goldcastSpotifyArchiveHeader .goldcastChannelLink {
    color: #16110c !important;
  }

  main.goldcastPage .goldcastSpotifyArchiveHeader h2,
  main.goldcastPage .goldcastSpotifyArchiveHeader h2 span,
  main.goldcastPage .goldcastSpotifyArchiveHeader .goldcastChannelDash,
  main.goldcastPage .goldcastSpotifyArchiveHeader .goldcastChannelLink {
    color: #16110c !important;
    font-size: 11px !important;
    font-weight: 800 !important;
    letter-spacing: 0.1em !important;
    line-height: 1.3 !important;
    opacity: 1 !important;
  }

  main.goldcastPage .goldcastSpotifyArchiveHeader .goldcastChannelLink {
    font-size: 11px !important;
    text-decoration-thickness: 1px !important;
  }

  main.goldcastPage .goldcastYTHeader h2,
  main.goldcastPage .goldcastYTHeader h2 span,
  main.goldcastPage .goldcastYTHeader .goldcastChannelDash,
  main.goldcastPage .goldcastYTHeader .goldcastChannelLink {
    color: #d4b56a !important;
    font-size: 11px !important;
    font-weight: 800 !important;
    letter-spacing: 0.14em !important;
    line-height: 1.3 !important;
    opacity: 1 !important;
  }

  main.goldcastPage .goldcastYTHeader .goldcastChannelLink {
    font-size: 11px !important;
  }

  main.goldcastPage .goldcastYTCategory,
  main.goldcastPage .goldcastSpotifyEpisodeCard .goldcastYTCategory {
    color: #b08a3c !important;
    font-size: 7px !important;
    font-weight: 800 !important;
    letter-spacing: 0.12em !important;
    margin: 0 0 5px !important;
  }

  main.goldcastPage .goldcastYTSubtitle,
  main.goldcastPage .goldcastSpotifyEpisodeCard .goldcastYTSubtitle {
    color: #b08a3c !important;
    font-size: 8px !important;
    font-weight: 700 !important;
    letter-spacing: 0.01em !important;
    margin-top: 4px !important;
  }

  main.goldcastPage .goldcastYTTitle,
  main.goldcastPage .goldcastYTCard h3,
  main.goldcastPage .goldcastSpotifyEpisodeCard .goldcastYTTitle {
    color: #16110c !important;
    font-size: 13px !important;
    font-weight: 600 !important;
    line-height: 1.22 !important;
    letter-spacing: -0.02em !important;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    min-height: 0;
  }

  main.goldcastPage .goldcastYTDescription,
  main.goldcastPage .goldcastSpotifyEpisodeCard .goldcastYTDescription {
    color: #4a4038 !important;
    font-size: 10px !important;
    line-height: 1.4 !important;
    margin-top: 6px !important;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  main.goldcastPage .goldcastYTBody {
    display: flex !important;
    flex-direction: column;
    flex: 1 1 auto;
    min-height: 0;
    padding: 10px 12px 12px !important;
  }

  main.goldcastPage .goldcastYTImage,
  main.goldcastPage .goldcastSpotifyEpisodeCard .goldcastYTImage {
    overflow: hidden !important;
    width: calc(100% - 20px) !important;
    margin: 0 10px !important;
    aspect-ratio: 16 / 9 !important;
    flex: 0 0 auto;
    border-radius: 10px !important;
  }

  main.goldcastPage .goldcastYTImage img {
    transform: scale(1.12);
  }

  main.goldcastPage .goldcastYTTop {
    color: #b08a3c !important;
    font-size: 9px !important;
    font-weight: 800 !important;
    min-height: 28px !important;
    padding: 8px 12px 6px !important;
  }
`;

export default function GoldCastPage() {
  const youtubeSliderRef =
    useRef<HTMLDivElement>(null);

  const spotifySliderRef =
    useRef<HTMLDivElement>(null);

  const { startYoutube, startSpotify, session } = usePlayback();

  const openEpisode = (episode: (typeof episodes)[number]) => {
    const youtubeId = youtubeIdFromUrl(episode.youtubeUrl);

    if (!youtubeId) {
      return;
    }

    startYoutube({
      platform: "goldcast",
      contentId: youtubeId,
      title: episode.title,
      href: "/goldcast",
      youtubeId,
      artworkUrl: episode.thumbnail,
      description: episode.description,
    });
  };

  const scrollSlider = (
    ref: RefObject<HTMLDivElement | null>,
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
      <style>{youtubeOnlyStyles}</style>
      <style>{desktopSpotifyStyles}</style>
      <style>{goldcastPremiumStyles}</style>

      <Navbar />

      <ContinueGlance platformId="goldcast" variant="page" />

      {/* YOUTUBE */}

      <section
        className="goldcastYTSection"
        id="goldcast-bolumleri"
      >
        <div className="goldcastYTContainer">
          <header className="goldcastYTHeader">
            <div className="goldcastChannelHead">
              <h2>YOUTUBE · GOLDCAST</h2>
              <span className="goldcastChannelDash" aria-hidden="true">
                -
              </span>
              <a
                className="goldcastChannelLink"
                href={youtubeChannelUrl}
                target="_blank"
                rel="noreferrer"
              >
                Kanala git
              </a>
            </div>
          </header>

          <div
            ref={youtubeSliderRef}
            className="goldcastYTScroller"
          >
            {episodes.map((episode) => {
                const youtubeId = youtubeIdFromUrl(episode.youtubeUrl) ?? "";
                const cover = youtubeCover(youtubeId);

                return (
                <div className="goldcastCardShell" key={episode.youtubeUrl}>
                <button
                  type="button"
                  className={`goldcastYTCard${
                    session?.contentId === youtubeId ? " isActive" : ""
                  }`}
                  aria-label={`${episode.title} ekranda aç`}
                  onClick={() => openEpisode(episode)}
                >
                <span className="goldcastYTTop">
                  <span>{episode.number}</span>
                  <span>▶</span>
                </span>

                <span className="goldcastYTImage">
                  <img
                    src={cover.src}
                    srcSet={cover.srcSet}
                    sizes="(max-width: 700px) 220px, 288px"
                    alt=""
                    loading="lazy"
                    decoding="async"
                    onError={onCoverError}
                  />
                </span>

                <span className="goldcastYTBody">
                  <span className="goldcastYTCategory">
                    {episode.category}
                  </span>

                  <span className="goldcastYTTitle">{episode.title}</span>

                  <span className="goldcastYTSubtitle">
                    {episode.subtitle}
                  </span>

                  <span className="goldcastYTDescription">
                    {episode.description}
                  </span>
                </span>
              </button>
                </div>
                );
            })}
          </div>
        </div>
      </section>

      {/* SPOTIFY */}

      <section className="goldcastSpotifyArchive">
        <div className="goldcastSpotifyArchiveInner">
          <header className="goldcastSpotifyArchiveHeader">
            <div className="goldcastChannelHead">
              <h2>SPOTIFY · GOLDCAST</h2>
              <span className="goldcastChannelDash" aria-hidden="true">
                -
              </span>
              <a
                className="goldcastChannelLink"
                href={spotifyShowUrl}
                target="_blank"
                rel="noreferrer"
              >
                Kanala git
              </a>
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
              <div className="goldcastCardShell" key={episode.number}>
              <button
                type="button"
                className={`goldcastYTCard goldcastSpotifyEpisodeCard${
                  session?.contentId === `spotify-${episode.number}`
                    ? " isActive"
                    : ""
                }`}
                aria-label={`${episode.title} Spotify ekranında aç`}
                onClick={() =>
                  startSpotify({
                    platform: "goldcast",
                    contentId: `spotify-${episode.number}`,
                    title: episode.title,
                    href: "/goldcast",
                    embedUrl: episode.embedUrl,
                    artworkUrl: episode.cover,
                    description: episode.description,
                  })
                }
              >
                <span className="goldcastYTTop">
                  <span>{episode.number}</span>
                  <span>▶</span>
                </span>

                <span className="goldcastYTImage">
                  <img
                    src={youtubeCover("OXWK7tGNXyc").src}
                    srcSet={youtubeCover("OXWK7tGNXyc").srcSet}
                    sizes="(max-width: 700px) 220px, 288px"
                    alt=""
                    loading="lazy"
                    decoding="async"
                    onError={onCoverError}
                  />
                </span>

                <span className="goldcastYTBody">
                  <span className="goldcastYTCategory">
                    SPOTIFY · {episode.category}
                  </span>

                  <span className="goldcastYTTitle">{episode.title}</span>

                  <span className="goldcastYTDescription">
                    {episode.description}
                  </span>
                </span>
              </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}