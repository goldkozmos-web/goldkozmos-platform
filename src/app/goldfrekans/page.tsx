"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import HomeNavbar from "../../components/HomeNavbar";
import FooterSection from "../../components/FooterSection";
import ContinueGlance from "../../components/platform/ContinueGlance";
import { usePlayback } from "../../components/platform/PlaybackProvider";
import { youtubeIdFromUrl } from "../../lib/youtube";
import "../../styles/home.css";
import "../../styles/goldfrekans-premium.css";

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
  {
    number: "06",
    category: "432 HZ · UYKU · SAKİNLEŞME",
    title: "432 Hz · Derin Uyku Müziği",
    description:
      "Günün sonunda yavaşlamak, zihni sakinleştirmek ve uyku öncesinde kendine bir alan açmak için 11 dakikalık frekans müziği.",
    youtubeUrl: "https://youtu.be/f9-4qE0UN7s",
    thumbnail: "https://i.ytimg.com/vi/f9-4qE0UN7s/hqdefault.jpg",
  },
];

export default function GoldFrekansPage() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("Tümü");
  const visibleTracks = goldFrekansTracks.filter(track => filter === "Tümü" || (filter === "Doğa sesleri" ? track.category.startsWith("NATURE") : !track.category.startsWith("NATURE")));
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
      <HomeNavbar />
      <header className="goldFrekansHero">
        <div className="goldFrekansHeroArt" aria-hidden="true"><Image src="/images/platform/goldfrekans-premium.webp" alt="" fill sizes="(max-width: 700px) 100vw, 60vw" priority /></div>
        <div className="goldFrekansHeroInner">
          <p className="goldFrekansEyebrow">GOLDFREKANS · KENDİ RİTMİNDE</p>
          <h1>Günün sesini<br /><span>biraz yavaşlat.</span></h1>
          <p className="goldFrekansHeroLead">Doğanın ritmi ve frekans müzikleriyle<br />kendine sakin bir alan aç.</p>
          <a className="goldFrekansExplore" href="#goldfrekans-kutuphanesi">Dinleme alanını keşfet <span aria-hidden="true">↓</span></a>
        </div>
      </header>
      <div className="goldFrekansContinue"><ContinueGlance platformId="goldfrekans" variant="page" /></div>

      <section
        className="goldFrekansArchive"
        id="goldfrekans-kutuphanesi"
      >
        <div className="goldFrekansArchiveInner">
          <header className="goldFrekansArchiveHeader">
            <div><p className="goldFrekansEyebrow">SES KÜTÜPHANESİ</p><h2>Bugün hangi ritme ihtiyacın var?</h2></div>
            <a className="goldFrekansChannelLink" href={youtubeChannelUrl} target="_blank" rel="noreferrer">YouTube kanalını keşfet ↗</a>
          </header>
          <div className="goldFrekansLibraryTools">
            <div className="goldFrekansFilters" role="tablist" aria-label="Ses kategorileri">{["Tümü", "Doğa sesleri", "Frekanslar"].map(item => <button type="button" key={item} role="tab" aria-selected={filter === item} onClick={() => {setFilter(item); sliderRef.current?.scrollTo({left:0});}}>{item}</button>)}</div>
            <div className="goldFrekansControls"><button type="button" aria-label="Önceki kayıtlar" onClick={() => sliderRef.current?.scrollBy({left:-320,behavior:"smooth"})}>←</button><button type="button" aria-label="Sonraki kayıtlar" onClick={() => sliderRef.current?.scrollBy({left:320,behavior:"smooth"})}>→</button></div>
          </div>

          <div
            className="goldFrekansScroller"
            ref={sliderRef}
          >
            {visibleTracks.map((track) => {
              const youtubeId = youtubeIdFromUrl(track.youtubeUrl);
              const isActive = session?.contentId === youtubeId;

              return (
              <button
                type="button"
                className={`goldFrekansCard${isActive ? " isActive" : ""}`}
                key={track.youtubeUrl}
                aria-label={`${track.title} dinle`}
                aria-pressed={isActive}
                onClick={() => openTrack(track)}
              >
                <span className="goldFrekansTop">
                  <span>{track.category.startsWith("NATURE") ? "DOĞANIN SESİ" : "FREKANS MÜZİĞİ"}</span>
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
                  <span className="goldFrekansListen">{isActive && isPlaying ? "Şimdi dinliyorsun" : "Dinlemeye başla"}<span aria-hidden="true">↗</span></span>
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
