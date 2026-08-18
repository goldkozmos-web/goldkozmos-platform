import type { Metadata } from "next";

import Navbar from "../../../components/Navbar";
import FooterSection from "../../../components/FooterSection";
import "../../../styles/home.css";

const pageUrl =
  "https://goldkozmos.com/calismalar/kendilik";

const SHOPIER_URL =
  "https://www.shopier.com/goldkozmos/49716325";

const WHATSAPP_URL =
  "https://wa.me/905054722153?text=Merhaba%2C%20Kendilik%20Rezonans%C4%B1%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.";

export const metadata: Metadata = {
  title:
    "Kendilik Rezonansı | Özdeğer, Sınırlar ve Onay İhtiyacı",

  description:
    "Kendilik Rezonansı; özdeğer, onay ihtiyacı, sınırlar, kendilik algısı ve tekrar eden rolleri ele alan 5 günlük canlı online Goldkozmos® atölyesidir.",

  alternates: {
    canonical: pageUrl,
  },

  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: pageUrl,
    siteName: "Goldkozmos",

    title:
      "Kendilik Rezonansı | Özdeğer ve Kendini Tanıma",

    description:
      "Özdeğer, sınırlar, onay ihtiyacı, kendilik algısı ve tekrar eden davranış rollerini daha yakından inceleyen 5 günlük canlı online atölye.",

    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Goldkozmos Kendilik Rezonansı",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Kendilik Rezonansı | Özdeğer ve Kendini Tanıma",

    description:
      "Özdeğer, sınırlar, onay ihtiyacı ve kendinle kurduğun ilişki üzerine Goldkozmos® Kendilik Rezonansı.",

    images: ["/opengraph-image"],
  },
};

const kendilikJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${pageUrl}/#webpage`,
  url: pageUrl,
  name: "Kendilik Rezonansı",
  description:
    "Özdeğer, onay ihtiyacı, sınırlar, kendilik algısı ve tekrar eden davranış rollerini ele alan 5 günlük canlı online Goldkozmos® atölyesi.",
  inLanguage: "tr-TR",

  isPartOf: {
    "@id": "https://goldkozmos.com/#website",
  },

  about: [
    {
      "@type": "Thing",
      name: "Özdeğer",
    },
    {
      "@type": "Thing",
      name: "Onay İhtiyacı",
    },
    {
      "@type": "Thing",
      name: "Kişisel Sınırlar",
    },
    {
      "@type": "Thing",
      name: "Kendilik Algısı",
    },
    {
      "@type": "Thing",
      name: "Kendini Tanıma",
    },
    {
      "@type": "Thing",
      name: "Kişisel Gelişim",
    },
  ],

  mainEntity: {
    "@type": "Service",
    name: "Kendilik Rezonansı",
    serviceType:
      "Online kişisel farkındalık atölyesi",

    provider: {
      "@id":
        "https://goldkozmos.com/#organization",
    },

    offers: {
      "@type": "Offer",
      price: "1500",
      priceCurrency: "TRY",
      url: SHOPIER_URL,
      availability:
        "https://schema.org/InStock",
    },
  },
};

const workshopCards = [
  {
    number: "01",
    eyebrow: "ATÖLYENİN İÇERİĞİ",
    title: "Kendilik Rezonansı’nda ne var?",
    intro:
      "Kendinle kurduğun ilişkinin seçimlerine, sınırlarına ve günlük yaşamına nasıl yansıdığını daha yakından görmeye odaklanan 5 günlük çalışma.",
    focusAreas: [
      {
        number: "01",
        title: "Özdeğer",
        text: "Kendi değerini neye göre belirlediğini ve dışarıdan gelen ilgiyle nasıl ilişkilendirdiğini görme.",
      },
      {
        number: "02",
        title: "Onay İhtiyacı",
        text: "Başkalarının takdiri, ilgisi ve kabulü için kendinden ödün verdiğin alanları fark etme.",
      },
      {
        number: "03",
        title: "Sınırlar",
        text: "Hayır demekte zorlandığın, fazla sorumluluk aldığın ve ihtiyaçlarını geri plana attığın noktaları inceleme.",
      },
      {
        number: "04",
        title: "Kendilik Algısı",
        text: "Kendine nasıl baktığının kararlarına, ilişkilerine ve davranışlarına nasıl yansıdığını görme.",
      },
      {
        number: "05",
        title: "Tekrar Eden Roller",
        text: "Kurtarıcı, fedakâr, güçlü olmak zorunda olan veya sürekli veren kişi gibi tekrar eden rollerini fark etme.",
      },
      {
        number: "06",
        title: "Kendini Geri Plana Atmak",
        text: "Kendi isteklerini ve ihtiyaçlarını fark etmeden ertelediğin alanları görünür hâle getirme.",
      },
    ],
    closing:
      "Amaç sana nasıl biri olman gerektiğini söylemek değil; kendinle kurduğun ilişkiyi daha görünür hâle getirmek.",
  },

  {
    number: "02",
    eyebrow: "5 GÜNLÜK PROGRAM",
    title: "Program akışı",
    intro:
      "Her gün farklı bir başlığa odaklanarak kendilik alanını adım adım inceliyoruz.",
    days: [
      {
        day: "1. Gün",
        title: "Kendilik Algısı",
        text: "Kendine nasıl baktığını ve bunun seçimlerine nasıl yansıdığını fark etme.",
      },
      {
        day: "2. Gün",
        title: "Özdeğer ve Onay",
        text: "Değerini başkalarının ilgisi, takdiri veya onayı üzerinden ölçtüğün alanlara bakma.",
      },
      {
        day: "3. Gün",
        title: "Sınırlar",
        text: "Hayır diyemediğin ve kendi ihtiyaçlarını geri plana attığın alanları görme.",
      },
      {
        day: "4. Gün",
        title: "Tekrar Eden Roller",
        text: "Günlük yaşamda ve ilişkilerde tekrar ettiğin davranış ve sorumluluk rollerini fark etme.",
      },
      {
        day: "5. Gün",
        title: "Kendilik Envanteri",
        text: "Değerlerini, sınırlarını ve ihtiyaçlarını daha net bir çerçevede bir araya getirme.",
      },
    ],
  },

  {
    number: "03",
    eyebrow: "KATILIM BİLGİLERİ",
    title: "Nasıl gerçekleşiyor?",
    intro:
      "Program her ay yeniden planlanır. Kesin tarih ve başlangıç bilgisi ilgili dönem açıldığında duyurulur.",
    details: [
      {
        label: "PROGRAM",
        value: "5 Gün",
      },
      {
        label: "FORMAT",
        value: "Google Meet",
      },
      {
        label: "GÖRÜŞME",
        value: "75–90 dakika",
      },
      {
        label: "TARİH",
        value: "Her ay yeniden belirlenir",
      },
      {
        label: "SAAT",
        value:
          "Akşam · 19:00–20:00 başlangıç aralığı",
      },
      {
        label: "KATILAMAZSAN",
        value:
          "Çalışma kaydı sonrasında iletilir",
      },
    ],
  },

  {
    number: "04",
    eyebrow: "PROGRAM SONUNDA",
    title: "Seninle kalanlar",
    intro:
      "Canlı çalışmanın yanında program sonrasında kendi zamanında kullanabileceğin ek içerikler de seninle kalır.",
    benefits: [
      {
        title: "Dijital Rehber Kitap",
        text: "Program sonrasında kullanabileceğin dijital çalışma rehberi.",
      },
      {
        title: "Numeroloji Analizi",
        text: "Kişisel eğilimlerini sembolik bir çerçevede inceleyen ek analiz.",
      },
      {
        title: "Katılım Belgesi",
        text: "Kendilik Rezonansı programına katılımını gösteren dijital belge.",
      },
      {
        title: "Kendilik Envanteri",
        text: "Program boyunca fark ettiğin alanları bir araya getirebileceğin kişisel çerçeve.",
      },
    ],
  },
];

export default function KendilikPage() {
  return (
    <main
      className="homePage kendilikSnapshotPage kendilikShowcasePage"
      id="top"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            kendilikJsonLd
          ),
        }}
      />

      <Navbar />

      <section className="kendilikShowcaseSection">
        <div className="kendilikShowcaseContainer">
          <header className="kendilikShowcaseHeader">
            <p className="kendilikShowcaseEyebrow">
              KENDİLİK REZONANSI
            </p>

            <h1>
              Kendine dön,
              <span> kendini daha net gör.</span>
            </h1>

            <p>
              Özdeğerini, sınırlarını, onay
              ihtiyacını ve kendinle kurduğun
              ilişkiyi daha yakından inceleyen 5
              günlük canlı online atölye.
            </p>

            <div className="kendilikShowcaseMiniMeta">
              <span>5 Gün</span>
              <span>Google Meet</span>
              <span>75–90 dk</span>
              <span>Canlı Online</span>
            </div>
          </header>

          <div className="kendilikShowcaseVisual">
            <img
              src="/images/services/kendilik-rezonansi.webp"
              alt="Kendilik Rezonansı özdeğer ve kişisel farkındalık atölyesi"
            />
          </div>

          <section className="kendilikShowcaseInfo">
            <div className="kendilikShowcaseInfoHead">
              <div>
                <p>KENDİLİK REZONANSI</p>

                <h2>
                  Bilmek istediğin
                  <span> her şey burada.</span>
                </h2>
              </div>

              <span className="kendilikShowcaseSwipe">
                ← YANA KAYDIR →
              </span>
            </div>

            <div className="kendilikShowcaseSlider">
              {workshopCards.map((card) => (
                <article
                  className="kendilikShowcaseInfoCard"
                  key={card.number}
                >
                  <div className="kendilikShowcaseCardTop">
                    <span>{card.number}</span>
                    <small>{card.eyebrow}</small>
                  </div>

                  <h3>{card.title}</h3>

                  <p className="kendilikShowcaseCardIntro">
                    {card.intro}
                  </p>

                  {card.focusAreas && (
                    <div className="kendilikShowcaseFocusAreas">
                      {card.focusAreas.map(
                        (item) => (
                          <div key={item.number}>
                            <span>
                              {item.number}
                            </span>

                            <div>
                              <strong>
                                {item.title}
                              </strong>
                              <p>
                                {item.text}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {card.closing && (
                    <div className="kendilikShowcaseFocusClosing">
                      <span>✦</span>
                      <p>{card.closing}</p>
                    </div>
                  )}

                  {card.days && (
                    <div className="kendilikShowcaseDays">
                      {card.days.map((item) => (
                        <div key={item.day}>
                          <span>
                            {item.day}
                          </span>

                          <div>
                            <strong>
                              {item.title}
                            </strong>
                            <p>
                              {item.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {card.details && (
                    <div className="kendilikShowcaseDetails">
                      {card.details.map(
                        (item) => (
                          <div
                            key={item.label}
                          >
                            <small>
                              {item.label}
                            </small>
                            <strong>
                              {item.value}
                            </strong>
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {card.benefits && (
                    <div className="kendilikShowcaseBenefits">
                      {card.benefits.map(
                        (item, index) => (
                          <div
                            key={item.title}
                          >
                            <span>
                              {String(
                                index + 1
                              ).padStart(
                                2,
                                "0"
                              )}
                            </span>

                            <div>
                              <strong>
                                {item.title}
                              </strong>
                              <p>
                                {item.text}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}

                  <div className="kendilikShowcaseCardFooter">
                    <span>
                      GOLDKOZMOS®
                    </span>
                    <span>
                      REZONANS EKOLÜ
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="kendilikShowcaseCta">
            <div className="kendilikShowcaseCtaCopy">
              <p>
                5 GÜNLÜK KENDİLİK REZONANSI
              </p>

              <h2>
                Kendinle kurduğun ilişkiye
                <span>
                  {" "}
                  daha yakından bak.
                </span>
              </h2>

              <div className="kendilikShowcasePrice">
                <small>
                  ATÖLYE ÜCRETİ
                </small>
                <strong>
                  1.500 TL
                </strong>
              </div>
            </div>

            <div className="kendilikShowcaseActions">
              <a
                className="kendilikShowcaseShopier"
                href={SHOPIER_URL}
                target="_blank"
                rel="noreferrer"
              >
                Shopier’den Katıl
                <span>↗</span>
              </a>

              <a
                className="kendilikShowcaseWhatsapp"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  <small>
                    AKLINDA SORU MU VAR?
                  </small>
                  Merak Ettiklerini
                  WhatsApp’tan Sor
                </span>

                <b>↗</b>
              </a>
            </div>
          </section>

          <p className="kendilikShowcaseLegal">
            Bu çalışma kişisel farkındalık ve
            bireysel gelişim amacıyla
            hazırlanmıştır. Psikoterapi,
            psikolojik danışmanlık, teşhis veya
            tedavi yerine geçmez. Numeroloji
            içeriği sembolik farkındalık amacıyla
            sunulur.
          </p>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}