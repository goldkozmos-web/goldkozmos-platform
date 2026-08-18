import type { Metadata } from "next";

import Navbar from "../../../components/Navbar";
import FooterSection from "../../../components/FooterSection";
import "../../../styles/home.css";

const pageUrl =
  "https://goldkozmos.com/calismalar/iliski";

const SHOPIER_URL =
  "https://www.shopier.com/goldkozmos/49716360";

const WHATSAPP_URL =
  "https://wa.me/905054722153?text=Merhaba%2C%20%C4%B0li%C5%9Fki%20Rezonans%C4%B1%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.";

export const metadata: Metadata = {
  title:
    "İlişki Rezonansı | İlişki Örüntüleri, Sınırlar ve İletişim",

  description:
    "İlişki Rezonansı; partner seçimi, tekrar eden ilişki örüntüleri, iletişim, ihtiyaçlar, güven ve sınırları ele alan 5 günlük canlı online Goldkozmos® atölyesidir.",

  alternates: {
    canonical: pageUrl,
  },

  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: pageUrl,
    siteName: "Goldkozmos",

    title:
      "İlişki Rezonansı | İlişki Örüntüleri ve Sınırlar",

    description:
      "Partner seçimlerini, tekrar eden ilişki örüntülerini, ihtiyaçlarını, iletişimini, güvenini ve sınırlarını daha yakından inceleyen 5 günlük canlı online atölye.",

    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Goldkozmos İlişki Rezonansı",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "İlişki Rezonansı | İlişki Örüntüleri ve Sınırlar",

    description:
      "Partner seçimi, tekrar eden ilişki döngüleri, iletişim, güven ve sınırlar üzerine Goldkozmos® İlişki Rezonansı.",

    images: ["/opengraph-image"],
  },
};

const relationshipJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${pageUrl}/#webpage`,
  url: pageUrl,
  name: "İlişki Rezonansı",
  description:
    "Partner seçimi, tekrar eden ilişki örüntüleri, ihtiyaçlar, iletişim, güven ve sınırları ele alan 5 günlük canlı online Goldkozmos® atölyesi.",
  inLanguage: "tr-TR",

  isPartOf: {
    "@id": "https://goldkozmos.com/#website",
  },

  about: [
    {
      "@type": "Thing",
      name: "İlişki Örüntüleri",
    },
    {
      "@type": "Thing",
      name: "Partner Seçimi",
    },
    {
      "@type": "Thing",
      name: "İlişkide İletişim",
    },
    {
      "@type": "Thing",
      name: "Kişisel Sınırlar",
    },
    {
      "@type": "Thing",
      name: "Güven",
    },
    {
      "@type": "Thing",
      name: "İlişkide Kendini Kaybetmek",
    },
    {
      "@type": "Thing",
      name: "Kişisel Gelişim",
    },
  ],

  mainEntity: {
    "@type": "Service",
    name: "İlişki Rezonansı",
    serviceType:
      "Online ilişki farkındalığı atölyesi",

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

type FocusArea = {
  number: string;
  title: string;
  text: string;
};

type ProgramDay = {
  day: string;
  title: string;
  text: string;
};

type Detail = {
  label: string;
  value: string;
};

type Benefit = {
  title: string;
  text: string;
};

type WorkshopCard = {
  number: string;
  eyebrow: string;
  title: string;
  intro: string;
  focusAreas?: FocusArea[];
  closing?: string;
  days?: ProgramDay[];
  details?: Detail[];
  benefits?: Benefit[];
};

const workshopCards: WorkshopCard[] = [
  {
    number: "01",
    eyebrow: "ATÖLYENİN İÇERİĞİ",
    title: "İlişki Rezonansı’nda ne var?",
    intro:
      "İlişkilerinde tekrar eden seçimleri, ihtiyaçlarını, sınırlarını ve yakınlık kurma biçimini daha yakından görmeye odaklanan 5 günlük çalışma.",
    focusAreas: [
      {
        number: "01",
        title: "Partner Seçimi",
        text: "Seni belirli kişilere çeken seçim ve çekim dinamiklerini daha görünür hâle getirme.",
      },
      {
        number: "02",
        title: "İlişki Örüntüleri",
        text: "Kişiler değişse bile tekrar eden ilişki senaryolarını ve benzer sonuçları fark etme.",
      },
      {
        number: "03",
        title: "İhtiyaçlar",
        text: "İlişkide gerçekten neye ihtiyaç duyduğunu ve bunu ne kadar ifade edebildiğini inceleme.",
      },
      {
        number: "04",
        title: "İletişim",
        text: "Duygularını, beklentilerini ve rahatsızlıklarını nasıl ifade ettiğini görme.",
      },
      {
        number: "05",
        title: "Güven ve Sınırlar",
        text: "Yakınlık kurarken kendi alanını, değerlerini ve sınırlarını nasıl koruduğunu fark etme.",
      },
      {
        number: "06",
        title: "İlişkide Kendini Kaybetmek",
        text: "Bir bağın içinde kendi ihtiyaçlarını, seçimlerini ve merkezini geri plana attığın alanlara bakma.",
      },
    ],
    closing:
      "Amaç karşındaki kişiyi çözmek değil; ilişkide kendi seçimlerini, sınırlarını ve aldığın yeri daha net görebilmek.",
  },

  {
    number: "02",
    eyebrow: "5 GÜNLÜK PROGRAM",
    title: "Program akışı",
    intro:
      "Her gün ilişkinin başka bir katmanına odaklanarak tekrar eden dinamikleri adım adım inceliyoruz.",
    days: [
      {
        day: "1. Gün",
        title: "Partner Seçimi",
        text: "Seni belirli kişilere çeken seçim, çekim ve beklenti dinamiklerini fark etme.",
      },
      {
        day: "2. Gün",
        title: "İlişki Örüntüleri",
        text: "Kişiler değişse bile tekrar eden senaryolara, rollere ve benzer sonuçlara bakma.",
      },
      {
        day: "3. Gün",
        title: "İhtiyaçlar ve İletişim",
        text: "İlişkide ne istediğini, neyi söyleyemediğini ve ihtiyaçlarını nasıl ifade ettiğini görme.",
      },
      {
        day: "4. Gün",
        title: "Güven ve Sınırlar",
        text: "Yakınlık kurarken kendi alanını, değerlerini ve sınırlarını nasıl koruduğunu inceleme.",
      },
      {
        day: "5. Gün",
        title: "İlişki Sözlüğün",
        text: "Nasıl bir ilişki istediğini, istemediğini ve bundan sonra nelere dikkat edeceğini daha net tanımlama.",
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
        text: "Program sonrasında yeniden dönebileceğin dijital ilişki çalışma rehberi.",
      },
      {
        title: "Numeroloji Analizi",
        text: "Kişisel eğilimlerini sembolik bir çerçevede inceleyen ek analiz.",
      },
      {
        title: "Katılım Belgesi",
        text: "İlişki Rezonansı programına katılımını gösteren dijital belge.",
      },
      {
        title: "İlişki Sözlüğün",
        text: "İhtiyaçlarını, sınırlarını, beklentilerini ve ilişki tercihlerini bir araya getirebileceğin kişisel çerçeve.",
      },
    ],
  },
];

export default function IliskiRezonansiPage() {
  return (
    <main
      className="homePage kendilikSnapshotPage kendilikShowcasePage iliskiShowcasePage"
      id="top"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            relationshipJsonLd
          ),
        }}
      />

      <Navbar />

      <section className="kendilikShowcaseSection">
        <div className="kendilikShowcaseContainer">
          <header className="kendilikShowcaseHeader">
            <p className="kendilikShowcaseEyebrow">
              İLİŞKİ REZONANSI
            </p>

            <h1>
              İlişkide önce
              <span> kendi yerini gör.</span>
            </h1>

            <p>
              Partner seçimlerini, tekrar eden ilişki
              örüntülerini, ihtiyaçlarını, iletişimini
              ve sınırlarını daha yakından inceleyen
              5 günlük canlı online atölye.
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
              src="/images/services/iliski-rezonansi.webp"
              alt="İlişki Rezonansı ilişki örüntüleri, iletişim ve sınırlar atölyesi"
            />
          </div>

          <section className="kendilikShowcaseInfo">
            <div className="kendilikShowcaseInfoHead">
              <div>
                <p>İLİŞKİ REZONANSI</p>

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
                          <div
                            key={item.number}
                          >
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
                      {card.days.map(
                        (item) => (
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
                        )
                      )}
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
                5 GÜNLÜK İLİŞKİ REZONANSI
              </p>

              <h2>
                İlişkide önce
                <span>
                  {" "}
                  kendi yerini gör.
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
            hazırlanmıştır. Psikoterapi, çift
            terapisi, psikolojik danışmanlık,
            teşhis veya tedavi yerine geçmez.
            Numeroloji içeriği sembolik öz
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