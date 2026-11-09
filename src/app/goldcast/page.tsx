"use client";

import { useRef } from "react";
import Image from "next/image";
import HomeNavbar from "../../components/HomeNavbar";
import FooterSection from "../../components/FooterSection";
import ContinueGlance from "../../components/platform/ContinueGlance";
import { usePlayback } from "../../components/platform/PlaybackProvider";
import { youtubeIdFromUrl } from "../../lib/youtube";
import "../../styles/home.css";
import "../../styles/goldcast-library.css";

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
    cover: "https://image-cdn-fa.spotifycdn.com/image/ab67656300005f1f8e83785c50b274cee7355922",
  },
  {
    number: "02",
    category: "KENDİLİK REZONANSI · BÖLÜM 2",
    title: "Kendine Bu Kadar Sert Olmayı Nereden Öğrendin?",
    description:
      "Kendine yönelttiğin sertliği ve iç sesinle kurduğun ilişkiyi keşfetmeye davet eden Kendilik Rezonansı serisinin ikinci bölümü.",
    embedUrl:
      "https://open.spotify.com/embed/episode/6LwdYzwUhmMS3yYOQl5hai?utm_source=generator",
    cover: "https://image-cdn-fa.spotifycdn.com/image/ab67656300005f1f7b26d814a19c6d4f5266b58c",
  },
];



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
      className="homeV3Page goldcastLibraryPage"
      id="top"
    >
      <HomeNavbar />
      <header className="goldcastHero">
        <div className="goldcastHeroArt" aria-hidden="true"><Image src="/images/platform/goldcast-premium.webp" alt="" fill sizes="(max-width:700px) 100vw, 60vw" priority /></div>
        <div className="goldcastHeroInner"><p>GOLDCAST · BİR SES, YENİ BİR BAKIŞ</p><h1>Dinle.<br /><span>Kendine biraz yaklaş.</span></h1><div>Sohbetler, farkındalık ve hayata dair sorular.<br />Sana eşlik edecek bir bölüm seç.</div><a href="#goldcast-bolumleri">Bölümleri keşfet <span aria-hidden="true">↓</span></a></div>
      </header>
      <div className="goldcastContinue"><ContinueGlance platformId="goldcast" variant="page" /></div>

      {/* YOUTUBE */}

      <section
        className="castEpisodeSection"
        id="goldcast-bolumleri"
      >
        <div className="castEpisodeContainer">
          <header className="castEpisodeHeader">
            <div className="castChannelHead">
              <p className="goldcastEyebrow">YOUTUBE · GOLDCAST</p><h2>Yeni bir bakış için dinle.</h2>
              
              <a
                className="castChannelLink"
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
            className="castEpisodeScroller"
          >
            {episodes.map((episode) => (
                <button
                  type="button"
                  className={`castEpisodeCard${
                    session?.contentId ===
                    youtubeIdFromUrl(episode.youtubeUrl)
                      ? " isActive"
                      : ""
                  }`}
                  key={episode.youtubeUrl}
                  aria-label={`${episode.title} ekranda aç`}
                  onClick={() => openEpisode(episode)}
                >
                <span className="castEpisodeTop">
                  <span className="castYoutubeBrand"><svg viewBox="0 0 28 20" aria-hidden="true"><rect width="28" height="20" rx="6" fill="#ff0033"/><path d="m11 5 8 5-8 5z" fill="white"/></svg>YouTube</span>
                  <span>▶</span>
                </span>

                <span className="castEpisodeImage">
                  <img
                    src={episode.thumbnail}
                    alt=""
                    loading="lazy"
                  />
                </span>

                <span className="castEpisodeBody">
                  <span className="castEpisodeCategory">
                    {episode.category}
                  </span>

                  <span className="castEpisodeTitle">{episode.title}</span>

                  <span className="castEpisodeSubtitle">
                    {episode.subtitle}
                  </span>

                  <span className="castEpisodeDescription">{episode.description}</span>
                  <span className="goldcastListen">Bölümü izle <span aria-hidden="true">▶</span></span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SPOTIFY */}

      <section className="castSpotifyArchive">
        <div className="castSpotifyArchiveInner">
          <header className="castSpotifyArchiveHeader">
            <div className="castChannelHead">
              <p className="goldcastEyebrow">SPOTIFY · GOLDCAST</p><h2>Gününe bir sohbet eşlik etsin.</h2>
              
              <a
                className="castChannelLink"
                href={spotifyShowUrl}
                target="_blank"
                rel="noreferrer"
              >
                Kanala git
              </a>
            </div>

            {spotifyEpisodes.length > 1 && (
              <div className="castSpotifyControls">
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
            className="castSpotifyScroller"
            ref={spotifySliderRef}
          >
            {spotifyEpisodes.map((episode) => (
              <button
                type="button"
                className={`castEpisodeCard castSpotifyEpisodeCard${
                  session?.contentId === `spotify-${episode.number}`
                    ? " isActive"
                    : ""
                }`}
                key={episode.number}
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
                <span className="castEpisodeTop">
                  <span className="castSpotifyBrand"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#1ed760"/><path d="M5 8c5-2 10-1 14 1M6 12c4-1.5 8-1 11 1M7 16c3-1 6-1 9 .5" fill="none" stroke="#102318" strokeWidth="1.7" strokeLinecap="round"/></svg>Spotify</span>
                  <span>GOLDCAST · {episode.number}</span>
                </span>

                <span className="castEpisodeImage">
                  <img
                    src={episode.cover}
                    alt=""
                    loading="lazy"
                  />
                </span>

                <span className="castEpisodeBody">
                  <span className="castEpisodeCategory">
                    {episode.category}
                  </span>

                  <span className="castEpisodeTitle">{episode.title}</span>

                  <span className="castEpisodeDescription">{episode.description}</span>
                  <span className="goldcastListen">Bölümü dinle <span aria-hidden="true">▶</span></span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
