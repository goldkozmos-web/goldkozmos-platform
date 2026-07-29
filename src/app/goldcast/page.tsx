import Navbar from "../../components/Navbar";
import FAQSection from "../../components/FAQSection";
import FooterSection from "../../components/FooterSection";
import "../../styles/home.css";

const youtubeChannelUrl =
  "https://youtube.com/@goldkozmos?si=NbufFa7Zo3wsQuoo";

const episodes = [
  {
    number: "01",
    category: "PARA · BOLLUK · KARMA",
    title: "Kötü İnsanlar Neden Zengin Olur?",
    subtitle: "Para Karmasının Görünmeyen Yüzü",
    description:
      "Para, ahlak, adalet beklentisi ve bollukla kurulan görünmez bağları sorgulayan GoldCast bölümü.",
    youtubeUrl: "https://youtu.be/nNwVpUPHF7c",
    thumbnail: "https://i.ytimg.com/vi/nNwVpUPHF7c/hqdefault.jpg",
  },
  {
    number: "02",
    category: "ATALAR · TRAVMALAR · BOLLUK",
    title: "Bolluğun Önündeki Görünmez El",
    subtitle: "Atalar, Travmalar ve Biz",
    description:
      "Geçmiş kuşaklardan taşınan duygusal ve düşünsel kalıpların bolluk alanıyla ilişkisini ele alan GoldCast bölümü.",
    youtubeUrl: "https://youtu.be/DO24_2x7Emg",
    thumbnail: "https://i.ytimg.com/vi/DO24_2x7Emg/hqdefault.jpg",
  },
];

export default function GoldCastPage() {
  return (
    <main className="homePage" id="top">
      <Navbar />

      <section className="innerPageHero">
        <div className="innerPageHeroContainer">
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

          <h1>
            Düşüncenin sesini aç,
            <span> kendi kozmosunu dinle.</span>
          </h1>

          <p>
            Para, bolluk, ilişkiler, sosyoloji, Spiritüel Stoa ve kişisel
            dönüşüm üzerine hazırlanan Goldkozmos® video ve ses içerikleri.
          </p>

          <div className="innerPageHeroActions">
            <a href="#goldcast-bolumleri">
              Bölümleri İncele
              <span aria-hidden="true">↓</span>
            </a>

            <a
              href={youtubeChannelUrl}
              target="_blank"
              rel="noreferrer"
            >
              Goldkozmos YouTube Kanalı
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section
        className="analysisHubSection"
        id="goldcast-bolumleri"
      >
        <div className="analysisHubContainer">
          <div className="analysisHubIntro">
            <div>
              <p className="sectionEyebrow">
                GÜNCEL GOLDCAST BÖLÜMLERİ
              </p>

              <h2>
                Bir başlığa dokun,
                <span> video YouTube’da açılsın.</span>
              </h2>
            </div>

          </div>

          <div className="analysisHubGrid">
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
                  <span>{episode.number}</span>
                  <span aria-hidden="true">▶</span>
                </div>

                <div
                  style={{
                    overflow: "hidden",
                    borderRadius: "22px",
                    marginBottom: "24px",
                    aspectRatio: "16 / 9",
                    background: "#f3efe7",
                  }}
                >
                  <img
                    src={episode.thumbnail}
                    alt={`${episode.title} YouTube kapak görseli`}
                    loading="lazy"
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <p className="analysisHubCardEyebrow">
                  {episode.category}
                </p>

                <h3>{episode.title}</h3>

                <p className="analysisHubCardDescription">
                  {episode.subtitle}
                </p>

                <p className="analysisHubCardDescription">
                  {episode.description}
                </p>

                <span>
                  YouTube’da İzle
                  <span aria-hidden="true">↗</span>
                </span>
              </a>
            ))}
          </div>

          <div className="analysisHubNotice">
            <div>
              <p className="sectionEyebrow">
                GOLDCAST HAKKINDA
              </p>

              <h2>
                Dinle, düşün,
                <span> yaşamındaki karşılığını gözlemle.</span>
              </h2>
            </div>

            <div>
              <p>
                GoldCast içerikleri genel bilgilendirme ve kişisel
                farkındalık amacıyla hazırlanır.
              </p>

              <p>
                İçerikler psikoterapi, psikolojik danışmanlık, tıbbi veya
                finansal danışmanlık yerine geçmez.
              </p>
            </div>
          </div>

          <div className="analysisHubActions">
            <a
              href={youtubeChannelUrl}
              target="_blank"
              rel="noreferrer"
            >
              YouTube Kanalına Git
              <span aria-hidden="true">↗</span>
            </a>

            <a href="/iletisim">
              İletişime Geç
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <FAQSection />

      <FooterSection />
    </main>
  );
}