"use client";

import { useRef } from "react";
import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";
import "../../styles/home.css";

const youtubeChannelUrl =
  "https://youtube.com/@goldkozmos?si=NbufFa7Zo3wsQuoo";

const spotifyShowUrl =
  "https://open.spotify.com/show/0343du5jxaHZOJhqDJZKYQ";

const spotifyEmbedUrl =
  "https://open.spotify.com/embed/show/0343du5jxaHZOJhqDJZKYQ?utm_source=generator&theme=0";

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

export default function GoldCastPage() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollEpisodes = (
    direction: "left" | "right",
  ) => {
    const slider = sliderRef.current;

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
      <Navbar />

      <section
        className="analysisHubSection"
        id="goldcast-bolumleri"
      >
        <div className="analysisHubContainer">
          <div className="goldcastEpisodesPanel">
            <div className="goldcastMediaLayout">
              {/* SOL TARAF */}

              <div className="goldcastYoutubeSide">
                <div className="goldcastPanelHeader">
                  <div className="analysisHubIntro">
                    <div>
                      <p className="sectionEyebrow">
                        GÜNCEL GOLDCAST BÖLÜMLERİ
                      </p>

                      <h2>
                        Bir başlığa dokun,
                        <span>
                          {" "}
                          video YouTube’da açılsın.
                        </span>
                      </h2>
                    </div>
                  </div>

                  <div
                    className="goldcastSliderControls"
                    aria-label="GoldCast bölümlerini kaydır"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        scrollEpisodes("left")
                      }
                      aria-label="Önceki GoldCast bölümleri"
                    >
                      <span aria-hidden="true">
                        ←
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        scrollEpisodes("right")
                      }
                      aria-label="Sonraki GoldCast bölümleri"
                    >
                      <span aria-hidden="true">
                        →
                      </span>
                    </button>
                  </div>
                </div>

                <div
                  ref={sliderRef}
                  className="analysisHubGrid goldcastEpisodeScroller"
                >
                  {episodes.map((episode) => (
                    <a
                      className="analysisHubCard"
                      href={episode.youtubeUrl}
                      target="_blank"
                      rel="noreferrer"
                      key={episode.youtubeUrl}
                      aria-label={`${episode.title} bölümünü YouTube'da aç`}
                    >
                      <div className="analysisHubCardTop">
                        <span>
                          {episode.number}
                        </span>

                        <span aria-hidden="true">
                          ▶
                        </span>
                      </div>

                      <div className="goldcastEpisodeImage">
                        <img
                          src={episode.thumbnail}
                          alt={`${episode.title} YouTube kapak görseli`}
                          loading="lazy"
                        />
                      </div>

                      <p className="analysisHubCardEyebrow">
                        {episode.category}
                      </p>

                      <h3>
                        {episode.title}
                      </h3>

                      <p className="analysisHubCardDescription goldcastEpisodeSubtitle">
                        {episode.subtitle}
                      </p>

                      <p className="analysisHubCardDescription">
                        {episode.description}
                      </p>

                      <span className="goldcastWatchLink">
                        YouTube’da İzle
                        <span aria-hidden="true">
                          ↗
                        </span>
                      </span>
                    </a>
                  ))}
                </div>

                <div className="goldcastYoutubeFooter">
                  <div className="analysisHubActions goldcastInlineActions">
                    <a
                      href={youtubeChannelUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      YouTube Kanalıma Git
                      <span aria-hidden="true">
                        ↗
                      </span>
                    </a>

                    <a href="/iletisim">
                      İletişime Geç
                      <span aria-hidden="true">
                        →
                      </span>
                    </a>
                  </div>

                  <div
                    className="goldcastScrollHint"
                    aria-hidden="true"
                  >
                    <span>←</span>
                    <p>Yana kaydır</p>
                    <span>→</span>
                  </div>
                </div>
              </div>

              {/* SAĞ TARAF SPOTIFY */}

              <aside className="goldcastSpotifySide">
                <div className="goldcastSpotifySpeaker" />

                <div className="goldcastSpotifyHeader">
                  <div className="goldcastSpotifyIcon">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                      />

                      <path d="M7 9.2c3.5-1 7.3-.8 10.5.7" />
                      <path d="M7.8 12.3c2.9-.8 6-.6 8.7.5" />
                      <path d="M8.8 15.2c2.2-.5 4.5-.4 6.5.4" />
                    </svg>
                  </div>

                  <div>
                    <p>GOLDKOZMOS®</p>
                    <h2>Spotify</h2>
                  </div>
                </div>

                <p className="goldcastSpotifyDescription">
                  Kendilik, ilişkiler, bolluk ve insanı
                  anlamaya yönelik GoldCast bölümlerini
                  Spotify üzerinden de dinleyebilirsin.
                </p>

                <div className="goldcastSpotifyEmbed">
                  <iframe
                    src={spotifyEmbedUrl}
                    width="100%"
                    frameBorder="0"
                    scrolling="no"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title="GoldKozmos Spotify"
                  />
                </div>

                <a
                  className="goldcastSpotifyButton"
                  href={spotifyShowUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Spotify’da Dinle
                  <span aria-hidden="true">
                    ↗
                  </span>
                </a>

                <div
                  className="goldcastSpotifyHomeBar"
                  aria-hidden="true"
                />
              </aside>
            </div>

            {/* GOLDCAST HAKKINDA */}

            <div className="analysisHubNotice">
              <div>
                <p className="sectionEyebrow">
                  GOLDCAST HAKKINDA
                </p>

                <h2>
                  Dinle, düşün,
                  <span>
                    {" "}
                    yaşamındaki karşılığını
                    gözlemle.
                  </span>
                </h2>
              </div>

              <div className="goldcastNoticeText">
                <p>
                  GoldCast içerikleri genel
                  bilgilendirme ve kişisel
                  farkındalık amacıyla hazırlanır.
                </p>

                <p>
                  İçerikler psikoterapi,
                  psikolojik danışmanlık, tıbbi
                  veya finansal danışmanlık yerine
                  geçmez.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}