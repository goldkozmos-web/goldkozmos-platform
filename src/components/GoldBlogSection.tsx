const articles = [
  {
    number: "01",
    category: "SPİRİTÜEL STOA",
    title: "Kontrol Edemediklerinle Savaşmayı Bıraktığında Ne Değişir?",
    description:
      "Stoacı düşüncenin kontrol alanı yaklaşımını, günlük yaşam ve duygusal denge üzerinden inceleyen bir yazı.",
    readingTime: "6 Dakika",
    href: "/goldblog/kontrol-edemediklerin",
    featured: true,
  },
  {
    number: "02",
    category: "İLİŞKİLER",
    title: "Neden Bazen Sevilmek Yerine Onaylanmak İsteriz?",
    description:
      "İlişkilerde sevgi, kabul görme ve özdeğer arasındaki görünmez bağlantılara farklı bir bakış.",
    readingTime: "5 Dakika",
    href: "/goldblog/sevilmek-ve-onaylanmak",
    featured: false,
  },
  {
    number: "03",
    category: "SOSYOLOJİ",
    title: "Kendimiz Hakkındaki Fikirlerimiz Gerçekten Bize mi Ait?",
    description:
      "Aile, çevre ve toplumun benlik algımızı nasıl şekillendirdiğini sorgulayan sosyolojik bir inceleme.",
    readingTime: "7 Dakika",
    href: "/goldblog/benlik-ve-toplum",
    featured: false,
  },
];

export default function GoldBlogSection() {
  return (
    <section className="goldBlogSection" id="goldblog">
      <div className="goldBlogContainer">
        <header className="goldBlogHeading">
          <div>
            <p className="sectionEyebrow">
              <span>
                GOLDKOZMOS
                <sup className="registeredSymbol">®</sup>
              </span>

              <br />

              <span>GOLDBLOG</span>
            </p>

            <h2>
              Okudukça sorgula,
              <span> sorguladıkça kendini keşfet.</span>
            </h2>
          </div>

          <div className="goldBlogHeadingContent">
            <p>
              Spiritüel Stoa, sosyoloji, ilişkiler ve içsel dönüşüm üzerine
              hazırlanan GoldBlog yazılarını keşfet.
            </p>

            <a href="/goldblog">
              Tüm Yazıları Gör
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </header>

        <div className="goldBlogGrid">
          {articles.map((article) => (
            <article
              className={`goldBlogCard ${
                article.featured ? "goldBlogCardFeatured" : ""
              }`}
              key={article.number}
            >
              <div className="goldBlogCardVisual" aria-hidden="true">
                <span>Görsel daha sonra eklenecek</span>
              </div>

              <div className="goldBlogCardShade" />

              <div className="goldBlogCardTop">
                <span className="goldBlogNumber">
                  {article.number}
                </span>

                <span className="goldBlogCategory">
                  {article.category}
                </span>
              </div>

              <div className="goldBlogCardContent">
                <p className="goldBlogReadingTime">
                  {article.readingTime} Okuma
                </p>

                <h3>{article.title}</h3>

                <p className="goldBlogDescription">
                  {article.description}
                </p>

                <a href={article.href}>
                  Yazıyı Oku
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="goldBlogNewsletter">
          <div>
            <p className="goldBlogNewsletterEyebrow">
              GOLDKOZMOS
              <sup className="registeredSymbol">®</sup> YAZILARINI KAÇIRMA
            </p>

            <h3>
              Yeni GoldBlog yazıları yayınlandığında haberdar ol.
            </h3>
          </div>

          <a href="/whatsapp-kanali">
            WhatsApp Kanalına Katıl
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}