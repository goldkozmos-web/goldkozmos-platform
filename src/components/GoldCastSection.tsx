const episodes = [
  {
    number: "01",
    category: "İLİŞKİLER",
    title: "Neden Hep Aynı İlişki Döngüsünü Yaşıyorsun?",
    description:
      "Tekrar eden ilişki dinamiklerinin ardındaki duygusal ve toplumsal örüntülere farklı bir bakış.",
    duration: "Yeni Bölüm",
    href: "/goldcast/ayni-iliski-dongusu",
  },
  {
    number: "02",
    category: "SPİRİTÜEL STOA",
    title: "Kontrol Edemediklerinle Nasıl Yaşarsın?",
    description:
      "Stoacı düşünceyi günlük yaşam, duygular ve içsel denge üzerinden ele alan bir sohbet.",
    duration: "Yakında",
    href: "/goldcast/kontrol-edemediklerin",
  },
  {
    number: "03",
    category: "SOSYOLOJİ",
    title: "İnsan Neden Kendini Başkalarının Gözüyle Tanımlar?",
    description:
      "Benlik algımızın çevre, toplum ve ilişkiler tarafından nasıl şekillendiğini keşfet.",
    duration: "Yakında",
    href: "/goldcast/baskalarinin-gozu",
  },
];

export default function GoldCastSection() {
  return (
    <section className="goldCastSection" id="goldcast">
      <div className="goldCastContainer">
        <header className="goldCastHeading">
          <div>
            <p className="sectionEyebrow">
              <span>
                GOLDKOZMOS
                <sup className="registeredSymbol">®</sup>
              </span>

              <br />

              <span>ENERJİ EKOLÜ</span>

              <br />

              <span>GOLDCAST</span>
            </p>

            <h2>
              Dinledikçe düşün,
              <span> düşündükçe dönüş.</span>
            </h2>
          </div>

          <div className="goldCastHeadingContent">
            <p>
              Goldkozmos® Enerji Ekolü’nün podcast serisi GoldCast’te;
              Spiritüel Stoa, sosyoloji, ilişkiler ve içsel dönüşüm üzerine
              hazırlanan bölümleri keşfet.
            </p>

            <a href="/goldcast">
              Tüm Bölümleri Gör
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </header>

        <div className="goldCastFeatured">
          <div className="goldCastFeaturedVisual">
            <div className="goldCastCoverPlaceholder">
              <span>Kapak görseli daha sonra eklenecek</span>

              <div className="goldCastPlayIcon" aria-hidden="true">
                <span />
              </div>
            </div>
          </div>

          <div className="goldCastFeaturedContent">
            <p className="goldCastFeaturedEyebrow">
              ÖNE ÇIKAN BÖLÜM
            </p>

            <h3>İnsan değişmeden hayat neden değişmez?</h3>

            <p>
              Dönüşümün yalnızca dış koşullarla değil, insanın düşünme biçimi,
              seçimleri ve kendisiyle kurduğu ilişkiyle nasıl başladığını
              konuşuyoruz.
            </p>

            <div className="goldCastFeaturedMeta">
              <span>GoldCast</span>
              <span>Spiritüel Stoa</span>
              <span>Yeni Bölüm</span>
            </div>

            <a href="/goldcast/insan-degismeden-hayat-degismez">
              Bölümü Dinle
              <span aria-hidden="true">▶</span>
            </a>
          </div>
        </div>

        <div className="goldCastEpisodes">
          {episodes.map((episode) => (
            <article
              className="goldCastEpisode"
              key={episode.number}
            >
              <span className="goldCastEpisodeNumber">
                {episode.number}
              </span>

              <div className="goldCastEpisodeContent">
                <p>{episode.category}</p>

                <h3>{episode.title}</h3>

                <span>{episode.description}</span>
              </div>

              <div className="goldCastEpisodeAction">
                <small>{episode.duration}</small>

                <a
                  href={episode.href}
                  aria-label={`${episode.title} bölümünü aç`}
                >
                  <span aria-hidden="true">▶</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="goldCastPlatforms">
          <p>
            GOLDKOZMOS
            <sup className="registeredSymbol">®</sup> GOLDCAST’İ DİNLE
          </p>

          <div>
            <a href="/spotify">Spotify</a>
            <a href="/youtube">YouTube</a>
            <a href="/apple-podcasts">Apple Podcasts</a>
          </div>
        </div>
      </div>
    </section>
  );
}