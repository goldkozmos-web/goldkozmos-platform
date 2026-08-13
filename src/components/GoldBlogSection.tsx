"use client";

import { useRef } from "react";

const articles = [
  {
    number: "01",
    category: "SPİRİTÜEL STOA",
    title:
      "Kontrol Edemediklerinle Savaşmayı Bıraktığında Ne Değişir?",
    description:
      "Stoacı düşüncenin kontrol alanı yaklaşımını, günlük yaşam, içsel denge ve farkındalık üzerinden ele alan bir yazı.",
    readingTime: "6 Dakika",
    href: "/goldblog/kontrol-edemediklerin",
    featured: true,
  },

  {
    number: "02",
    category: "İLİŞKİ REZONANSI",
    title:
      "Neden Bazen Sevilmek Yerine Onaylanmak İsteriz?",
    description:
      "İlişkilerde sevgi, kabul görme, özdeğer ve onay ihtiyacı arasındaki görünmez bağlantıları inceleyen bir yazı.",
    readingTime: "5 Dakika",
    href: "/goldblog/sevilmek-ve-onaylanmak",
    featured: false,
  },

  {
    number: "03",
    category: "KENDİLİK REZONANSI",
    title:
      "Kendimiz Hakkındaki Fikirlerimiz Gerçekten Bize mi Ait?",
    description:
      "Aileden, çevreden ve geçmiş deneyimlerden taşıdığımız düşüncelerin kendilik algımızı nasıl şekillendirdiğini sorgulayan bir yazı.",
    readingTime: "7 Dakika",
    href: "/goldblog/benlik-ve-toplum",
    featured: false,
  },

  {
    number: "04",
    category: "BOLLUK REZONANSI",
    title:
      "Para Kazanmak İstiyorsun, Peki Para Hakkında Gerçekte Neye İnanıyorsun?",
    description:
      "Para, değer, kıtlık düşüncesi ve bollukla kurduğumuz görünmez ilişkinin günlük seçimlerimize nasıl yansıdığını inceleyen bir yazı.",
    readingTime: "6 Dakika",
    href: "/goldblog/para-hakkinda-neye-inaniyorsun",
    featured: false,
  },

  {
    number: "05",
    category: "GOLDKOZMOS GÜNLÜĞÜ",
    title:
      "Bazen Sorun Hayatın Değil, Ona Baktığın Yerin",
    description:
      "Hayata, insana ve kendimize bakışımız üzerine Özge Batıgün’ün kişisel gözlemlerinden ve düşünce notlarından bir yazı.",
    readingTime: "4 Dakika",
    href: "/goldblog/bazen-sorun-hayatin-degil",
    featured: false,
  },
];

export default function GoldBlogSection() {
  const sliderRef = useRef<HTMLDivElement>(null);

  function scrollBlog(
    direction: "left" | "right",
  ) {
    const slider = sliderRef.current;

    if (!slider) return;

    slider.scrollBy({
      left:
        direction === "right"
          ? slider.clientWidth * 0.78
          : -slider.clientWidth * 0.78,
      behavior: "smooth",
    });
  }

  return (
    <section
      className="goldBlogSection"
      id="goldblog"
    >
      <div className="goldBlogContainer">

        {/* BAŞLIK */}

        <header className="goldBlogHeading">
          <div>
            <p className="sectionEyebrow">
              <span>
                GOLDKOZMOS
                <sup className="registeredSymbol">
                  ®
                </sup>
              </span>

              <br />

              <span>GOLDBLOG</span>
            </p>

            <h2>
              Okudukça sorgula,
              <span>
                {" "}
                sorguladıkça kendini keşfet.
              </span>
            </h2>
          </div>

          <div className="goldBlogHeadingContent">
            <p>
              Kendilik Rezonansı, İlişki Rezonansı,
              Bolluk Rezonansı, Spiritüel Stoa ve
              Goldkozmos Günlüğü üzerinden insanı,
              ilişkileri ve yaşamındaki tekrar eden
              örüntüleri farklı açılardan keşfet.
            </p>

            <div className="goldBlogHeadingActions">
              <a href="/goldblog">
                Tüm Yazıları Gör
                <span aria-hidden="true">
                  →
                </span>
              </a>

              <div
                className="goldBlogSliderControls"
                aria-label="GoldBlog yazılarını kaydır"
              >
                <button
                  type="button"
                  onClick={() =>
                    scrollBlog("left")
                  }
                  aria-label="Önceki GoldBlog yazıları"
                >
                  ←
                </button>

                <button
                  type="button"
                  onClick={() =>
                    scrollBlog("right")
                  }
                  aria-label="Sonraki GoldBlog yazıları"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* YAZILAR */}

        <div
          className="goldBlogGrid"
          ref={sliderRef}
        >
          {articles.map((article) => (
            <article
              className={`goldBlogCard ${
                article.featured
                  ? "goldBlogCardFeatured"
                  : ""
              }`}
              key={article.number}
            >
              <div
                className="goldBlogCardVisual"
                aria-hidden="true"
              >
                <span>
                  Görsel daha sonra eklenecek
                </span>
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

                <h3>
                  {article.title}
                </h3>

                <p className="goldBlogDescription">
                  {article.description}
                </p>

                <a href={article.href}>
                  Yazıyı Oku

                  <span aria-hidden="true">
                    ↗
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* KAYDIRMA İPUCU */}

        <div
          className="goldBlogScrollHint"
          aria-hidden="true"
        >
          <span>←</span>

          <p>
            Yana kaydır
          </p>

          <span>→</span>
        </div>

        {/* WHATSAPP */}

        <div className="goldBlogNewsletter">
          <div>
            <p className="goldBlogNewsletterEyebrow">
              GOLDKOZMOS
              <sup className="registeredSymbol">
                ®
              </sup>{" "}
              YAZILARINI KAÇIRMA
            </p>

            <h3>
              Yeni GoldBlog yazıları
              yayınlandığında haberdar ol.
            </h3>
          </div>

          <a href="/whatsapp-kanali">
            WhatsApp Kanalına Katıl

            <span aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}