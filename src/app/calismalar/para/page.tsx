import type { Metadata } from "next";

import Navbar from "../../../components/Navbar";
import FooterSection from "../../../components/FooterSection";
import "../../../styles/home.css";

const pageUrl =
  "https://goldkozmos.com/calismalar/para";

const SHOPIER_URL =
  "https://www.shopier.com/goldkozmos/49716246";

const WHATSAPP_URL =
  "https://wa.me/905054722153?text=Merhaba%2C%20Bolluk%20Rezonans%C4%B1%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.";

export const metadata: Metadata = {
  title:
    "Bolluk Rezonansı | Para Algısı, Kıtlık Döngüsü ve Üretkenlik",

  description:
    "Bolluk Rezonansı; para algısı, değer duygusu, kıtlık döngüsü, üretkenlik ve para davranışlarını ele alan 5 günlük canlı online Goldkozmos® atölyesidir.",

  alternates: {
    canonical: pageUrl,
  },

  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: pageUrl,
    siteName: "Goldkozmos",

    title:
      "Bolluk Rezonansı | Para Algısı ve Kıtlık Döngüsü",

    description:
      "Para ile kurduğun ilişkiyi, değer algını, kıtlık düşüncelerini, üretkenlik alışkanlıklarını ve para davranışlarını inceleyen 5 günlük canlı online atölye.",

    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Goldkozmos Bolluk Rezonansı",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Bolluk Rezonansı | Para Algısı ve Kıtlık Döngüsü",

    description:
      "Para algısı, değer duygusu, kıtlık döngüsü ve üretkenlik üzerine Goldkozmos® Bolluk Rezonansı.",

    images: ["/opengraph-image"],
  },
};

const abundanceJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${pageUrl}/#webpage`,
  url: pageUrl,
  name: "Bolluk Rezonansı",
  description:
    "Para algısı, değer duygusu, kıtlık döngüsü, üretkenlik ve para davranışlarını ele alan 5 günlük canlı online Goldkozmos® atölyesi.",
  inLanguage: "tr-TR",

  isPartOf: {
    "@id": "https://goldkozmos.com/#website",
  },

  about: [
    {
      "@type": "Thing",
      name: "Para Algısı",
    },
    {
      "@type": "Thing",
      name: "Değer Algısı",
    },
    {
      "@type": "Thing",
      name: "Kıtlık Döngüsü",
    },
    {
      "@type": "Thing",
      name: "Üretkenlik",
    },
    {
      "@type": "Thing",
      name: "Para Davranışları",
    },
    {
      "@type": "Thing",
      name: "Bolluk",
    },
    {
      "@type": "Thing",
      name: "Kişisel Gelişim",
    },
  ],

  mainEntity: {
    "@type": "Service",
    name: "Bolluk Rezonansı",
    serviceType:
      "Online para ve bolluk farkındalığı atölyesi",

    provider: {
      "@id": "https://goldkozmos.com/#organization",
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
    title: "Bolluk Rezonansı’nda ne var?",
    intro:
      "Para ile kurduğun ilişkinin değer algına, seçimlerine, üretkenliğine ve günlük yaşamındaki maddi davranışlarına nasıl yansıdığını daha yakından görmeye odaklanan 5 günlük çalışma.",
    focusAreas: [
      {
        number: "01",
        title: "Para Algısı",
        text: "Para hakkında geçmişten bugüne taşıdığın düşünceleri ve paraya yüklediğin anlamları fark etme.",
      },
      {
        number: "02",
        title: "Değer Algısı",
        text: "Kendi değerini, emeğini ve ürettiklerini nasıl değerlendirdiğini daha yakından inceleme.",
      },
      {
        number: "03",
        title: "Kıtlık Döngüsü",
        text: "Yetmezlik, kaybetme veya eksik kalma düşüncesinin tekrar ettiği alanları görünür hâle getirme.",
      },
      {
        number: "04",
        title: "Üretkenlik",
        text: "Üretimini destekleyen veya ertelemene neden olan günlük alışkanlıklarını fark etme.",
      },
      {
        number: "05",
        title: "Para Davranışları",
        text: "Kazanma, harcama, biriktirme ve para yönetimi sırasında tekrar eden davranışlarını gözlemleme.",
      },
      {
        number: "06",
        title: "Bolluk Planın",
        text: "Para, değer ve üretim alanında fark ettiğin noktaları kendi yol haritanda bir araya getirme.",
      },
    ],
    closing:
      "Amaç sana nasıl zengin olacağını söylemek değil; para, değer ve üretim alanında tekrar ettiğin düşünce ve davranışları daha görünür hâle getirmek.",
  },

  {
    number: "02",
    eyebrow: "5 GÜNLÜK PROGRAM",
    title: "Program akışı",
    intro:
      "Her gün farklı bir başlığa odaklanarak para ile kurduğun ilişkiyi adım adım inceliyoruz.",
    days: [
      {
        day: "1. Gün",
        title: "Para Hikâyen",
        text: "Para hakkında öğrendiğin düşüncelerin bugünkü seçimlerine nasıl yansıdığını fark etme.",
      },
      {
        day: "2. Gün",
        title: "Değer Algısı",
        text: "Ürettiğin şey ile kendine biçtiğin değer arasındaki ilişkiye daha yakından bakma.",
      },
      {
        day: "3. Gün",
        title: "Kıtlık Döngüsü",
        text: "Yetmezlik ve kaybetme düşüncesinin tekrar ettiği alanları görünür hâle getirme.",
      },
      {
        day: "4. Gün",
        title: "Üretkenlik",
        text: "Gelir üretimini destekleyen veya zorlaştıran günlük alışkanlıklarını inceleme.",
      },
      {
        day: "5. Gün",
        title: "Bolluk Planın",
        text: "Para, değer ve üretim alanındaki farkındalıklarını kişisel bir yol haritasında bir araya getirme.",
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
        text: "Bolluk Rezonansı programına katılımını gösteren dijital belge.",
      },
      {
        title: "Bolluk Planın",
        text: "Program boyunca fark ettiğin para, değer ve üretim alanlarını bir araya getirebileceğin kişisel çerçeve.",
      },
    ],
  },
];

export default function BollukRezonansiPage() {
  return (
    <main
      className="homePage kendilikSnapshotPage kendilikShowcasePage bollukSnapshotPage bollukShowcasePage"
      id="top"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            abundanceJsonLd
          ),
        }}
      />

      <Navbar />

      <section className="kendilikShowcaseSection bollukShowcaseSection">
        <div className="kendilikShowcaseContainer">
          <header className="kendilikShowcaseHeader">
            <p className="kendilikShowcaseEyebrow">
              BOLLUK REZONANSI
            </p>

            <h1>
              Para ile ilişkini gör,
              <span>
                {" "}
                döngülerini daha net fark et.
              </span>
            </h1>

            <p>
              Para algını, değer duygunu, kıtlık
              düşüncelerini ve üretkenlik
              alışkanlıklarını daha yakından
              inceleyen 5 günlük canlı online
              atölye.
            </p>

            <div className="kendilikShowcaseMiniMeta">
              <span>5 Gün</span>
              <span>Google Meet</span>
              <span>75–90 dk</span>
              <span>Canlı Online</span>
            </div>
          </header>

          <div className="kendilikShowcaseVisual bollukShowcaseVisual">
            <img
              src="/images/services/bolluk-rezonansi.webp"
              alt="Bolluk Rezonansı para algısı, kıtlık döngüsü ve üretkenlik atölyesi"
            />
          </div>

          <section className="kendilikShowcaseInfo">
            <div className="kendilikShowcaseInfoHead">
              <div>
                <p>BOLLUK REZONANSI</p>

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
                            <span>{item.number}</span>

                            <div>
                              <strong>
                                {item.title}
                              </strong>

                              <p>{item.text}</p>
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
                      {card.days.map(
                        (item) => (
                          <div key={item.day}>
                            <span>{item.day}</span>

                            <div>
                              <strong>
                                {item.title}
                              </strong>

                              <p>{item.text}</p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {card.details && (
                    <div className="kendilikShowcaseDetails">
                      {card.details.map(
                        (item) => (
                          <div key={item.label}>
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
                          <div key={item.title}>
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

                              <p>{item.text}</p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}

                  <div className="kendilikShowcaseCardFooter">
                    <span>GOLDKOZMOS®</span>
                    <span>REZONANS EKOLÜ</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="kendilikShowcaseCta bollukShowcaseCta">
            <div className="kendilikShowcaseCtaCopy">
              <p>5 GÜNLÜK BOLLUK REZONANSI</p>

              <h2>
                Para ile kurduğun ilişkiye
                <span> daha yakından bak.</span>
              </h2>

              <div className="kendilikShowcasePrice">
                <small>ATÖLYE ÜCRETİ</small>
                <strong>1.500 TL</strong>
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
            hazırlanmıştır. Finansal danışmanlık,
            yatırım tavsiyesi veya gelir garantisi
            sunmaz. Numeroloji içeriği sembolik öz
            farkındalık amacıyla sunulur. Katılım
            belgesi mesleki yeterlilik veya eğitim
            sertifikası değildir.
          </p>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}