const instagramUrl = "https://www.instagram.com/goldkozmos/";

const topics = [
  "Kendilik",
  "İlişkiler",
  "Bolluk",
  "Stoa",
  "Sosyoloji",
  "Farkındalık",
];

export default function HomeInstagramSection() {
  return (
    <section className="homeInstagramSection" id="instagram">
      <div className="homeInstagramContainer">
        <div className="homeInstagramPanel">
          <div className="homeInstagramTop">
            <div>
              <p className="sectionEyebrow">INSTAGRAM</p>

              <h2>
                Günlük içeriklerde
                <span> Goldkozmos’a devam et.</span>
              </h2>
            </div>

            <div className="homeInstagramAccount">
              <span className="homeInstagramMark" aria-hidden="true">◎</span>

              <div>
                <small>INSTAGRAM</small>
                <strong>@goldkozmos</strong>
              </div>
            </div>
          </div>

          <div className="homeInstagramBody">
            <div className="homeInstagramCopy">
              <p>
                Kendilik, ilişkiler, bolluk, Stoa ve insan davranışları
                üzerine kısa içerikler, yeni yayınlar ve Goldkozmos
                duyuruları Instagram’da.
              </p>

              <a
                className="homeInstagramButton"
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
              >
                Instagram’a Git
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="homeInstagramTopics" aria-label="İçerik konuları">
              {topics.map((topic, index) => (
                <div className="homeInstagramTopic" key={topic}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{topic}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="homeInstagramTicker" aria-hidden="true">
            <span>GOLDKOZMOS®</span>
            <i>✦</i>
            <span>KENDİLİK</span>
            <i>✦</i>
            <span>İLİŞKİLER</span>
            <i>✦</i>
            <span>BOLLUK</span>
            <i>✦</i>
            <span>STOA</span>
            <i>✦</i>
            <span>SOSYOLOJİ</span>
          </div>
        </div>
      </div>
    </section>
  );
}