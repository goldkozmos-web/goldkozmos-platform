const instagramPosts = [
  {
    number: "01",
    category: "SPİRİTÜEL STOA",
    title: "Kontrol edemediğin şeyler seni neden bu kadar yoruyor?",
    href: "/instagram/spirituel-stoa",
  },
  {
    number: "02",
    category: "AŞK VE İLİŞKİ",
    title: "Aşkı istiyorsun ama kalbin gerçekten buna hazır mı?",
    href: "/instagram/ask-ve-iliski",
  },
  {
    number: "03",
    category: "GOLDFREKANS",
    title: "Kendi alanına geri dön.",
    href: "/instagram/goldfrekans",
  },
  {
    number: "04",
    category: "GOLDBOOK",
    title: "Okudukça kendine biraz daha yaklaş.",
    href: "/instagram/goldbook",
  },
  {
    number: "05",
    category: "SOSYOLOJİ",
    title: "Kendin hakkındaki fikirlerin gerçekten sana mı ait?",
    href: "/instagram/sosyoloji",
  },
  {
    number: "06",
    category: "GRUP ÇALIŞMALARI",
    title: "Dönüşüm için birlikte bir alan açalım.",
    href: "/instagram/grup-calismalari",
  },
];

export default function InstagramSection() {
  return (
    <section className="instagramSection" id="instagram">
      <div className="instagramContainer">
        <header className="instagramHeading">
          <div>
            <p className="sectionEyebrow">
              INSTAGRAM’DA GOLDKOZMOS
              <sup className="registeredSymbol">®</sup>
              <br />
              ENERJİ EKOLÜ
            </p>

            <h2>
              Günlük içeriklerle
              <span> kendi kozmosunu besle.</span>
            </h2>
          </div>

          <div className="instagramHeadingContent">
            <p>
              Spiritüel Stoa, sosyoloji, aşk, ilişkiler ve içsel dönüşüm
              üzerine hazırlanan Goldkozmos® Enerji Ekolü içeriklerini takip
              et.
            </p>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram’da Takip Et
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </header>

        <div className="instagramProfile">
          <div className="instagramProfileLogo" aria-hidden="true">
            G
          </div>

          <div className="instagramProfileContent">
            <p>@goldkozmos</p>

            <span>
              Goldkozmos® Enerji Ekolü • Spiritüel Stoa • Sosyoloji
            </span>
          </div>

          <div className="instagramProfileStats">
            <div>
              <strong>Gold</strong>
              <span>İçerikler</span>
            </div>

            <div>
              <strong>Gold</strong>
              <span>Topluluk</span>
            </div>

            <div>
              <strong>Gold</strong>
              <span>Dönüşüm</span>
            </div>
          </div>
        </div>

        <div className="instagramGrid">
          {instagramPosts.map((post) => (
            <a
              className="instagramCard"
              href={post.href}
              key={post.number}
            >
              <div className="instagramCardVisual" aria-hidden="true">
                <span>Görsel daha sonra eklenecek</span>
              </div>

              <div className="instagramCardShade" />

              <div className="instagramCardTop">
                <span className="instagramCardNumber">
                  {post.number}
                </span>

                <span className="instagramCardIcon" aria-hidden="true">
                  ↗
                </span>
              </div>

              <div className="instagramCardContent">
                <p>{post.category}</p>
                <h3>{post.title}</h3>
              </div>
            </a>
          ))}
        </div>

        <div className="instagramCta">
          <div>
            <p>
              GOLDKOZMOS
              <sup className="registeredSymbol">®</sup> TOPLULUĞUNA KATIL
            </p>

            <h3>
              Yeni içerikler, çalışmalar ve duyurular için bizi takip et.
            </h3>
          </div>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram’a Git
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}