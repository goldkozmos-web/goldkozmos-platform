import type { Metadata } from "next";

import Navbar from "../../../components/Navbar";
import FooterSection from "../../../components/FooterSection";
import "../../../styles/home.css";

const pageUrl =
  "https://goldkozmos.com/calismalar/numeroloji";

const APPLICATION_URL = "/randevu";

const WHATSAPP_URL =
  "https://wa.me/905054722153?text=Merhaba%2C%20Numeroloji%20Analizi%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.";

export const metadata: Metadata = {
  title: {
    absolute:
      "Numeroloji Analizi | Yaşam Yolu ve Kişisel Sayı Haritası",
  },

  description:
    "Goldkozmos® Numeroloji Analizi; isim ve doğum tarihinden hesaplanan yaşam yolu, karakter eğilimleri, ilişkiler, yetenekler ve yaşam dönemlerini inceleyen kişiye özel dijital analizdir.",

  alternates: {
    canonical: pageUrl,
  },

  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: pageUrl,
    siteName: "Goldkozmos",

    title:
      "Numeroloji Analizi | Yaşam Yolu ve Kişisel Sayı Haritası",

    description:
      "İsim ve doğum tarihinden hesaplanan kişisel sayı haritanı; karakter, ilişkiler, yetenekler ve yaşam dönemleri üzerinden inceleyen dijital numeroloji analizi.",

    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Goldkozmos Numeroloji Analizi",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Numeroloji Analizi | Goldkozmos®",

    description:
      "Yaşam yolu, karakter eğilimleri, ilişkiler, yetenekler ve yaşam dönemlerini isim ve doğum tarihi üzerinden inceleyen kişiye özel numeroloji analizi.",

    images: ["/opengraph-image"],
  },
};

const numerologyJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${pageUrl}#webpage`,
  url: pageUrl,

  name: "Goldkozmos® Numeroloji Analizi",

  description:
    "İsim ve doğum tarihinden hesaplanan yaşam yolu, karakter eğilimleri, ilişkiler, yetenekler ve yaşam dönemlerini inceleyen kişiye özel dijital numeroloji analizi.",

  inLanguage: "tr-TR",

  isPartOf: {
    "@id": "https://goldkozmos.com/#website",
  },

  about: [
    {
      "@type": "Thing",
      name: "Numeroloji",
    },
    {
      "@type": "Thing",
      name: "Yaşam Yolu",
    },
    {
      "@type": "Thing",
      name: "Kişisel Sayı Haritası",
    },
    {
      "@type": "Thing",
      name: "Karakter Eğilimleri",
    },
    {
      "@type": "Thing",
      name: "İlişki Dinamikleri",
    },
    {
      "@type": "Thing",
      name: "Yaşam Dönemleri",
    },
    {
      "@type": "Thing",
      name: "Kişisel Farkındalık",
    },
  ],

  mainEntity: {
    "@type": "Service",
    name: "Numeroloji Analizi",

    serviceType:
      "Kişiye özel dijital numeroloji ve sembolik farkındalık analizi",

    provider: {
      "@id": "https://goldkozmos.com/#organization",
    },

    offers: {
      "@type": "Offer",
      price: "350",
      priceCurrency: "TRY",
      url: "https://goldkozmos.com/randevu",
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

type AnalysisArea = {
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

type NumerologyCard = {
  number: string;
  eyebrow: string;
  title: string;
  intro: string;
  focusAreas?: FocusArea[];
  closing?: string;
  days?: AnalysisArea[];
  details?: Detail[];
  benefits?: Benefit[];
};

const numerologyCards: NumerologyCard[] = [
  {
    number: "01",
    eyebrow: "ANALİZİN İÇERİĞİ",
    title: "Numeroloji Analizi’nde ne var?",

    intro:
      "Doğum tarihi ve isim bilgilerinden hesaplanan kişisel sayılarını; karakter eğilimlerin, ilişkilerin, yeteneklerin ve yaşam temaların üzerinden inceleyen dijital sembolik analiz.",

    focusAreas: [
      {
        number: "01",
        title: "Yaşam Yolu",
        text: "Doğum tarihinden hesaplanan ana sayı üzerinden yaşamındaki temel eğilimleri ve tekrar eden temaları inceleme.",
      },
      {
        number: "02",
        title: "Karakter Eğilimleri",
        text: "Kendini ifade etme biçimini, güçlü taraflarını ve zorlandığın alanları sembolik bir çerçevede değerlendirme.",
      },
      {
        number: "03",
        title: "İlişki Dinamikleri",
        text: "Yakın ilişkilerdeki ihtiyaçlarını, yaklaşım biçimini ve tekrar eden bazı eğilimlerini fark etme.",
      },
      {
        number: "04",
        title: "Yetenek ve Potansiyel",
        text: "Doğal olarak yöneldiğin alanları, üretim biçimini ve öne çıkan kişisel kapasiteni inceleme.",
      },
      {
        number: "05",
        title: "Döngüler",
        text: "İçinde bulunduğun yaşam dönemini ve belirli zamanlarda öne çıkan temaları daha görünür hâle getirme.",
      },
      {
        number: "06",
        title: "Kişisel Harita",
        text: "Farklı sayıların birbirleriyle nasıl bir bütün oluşturduğunu kişisel hikâyen üzerinden değerlendirme.",
      },
    ],

    closing:
      "Amaç sayılardan kesin bir kader çıkarmak değil; kişisel eğilimlerine ve yaşamındaki tekrar eden temalara farklı bir pencereden bakabilmek.",
  },

  {
    number: "02",
    eyebrow: "ANALİZ ALANLARI",
    title: "Neleri inceliyoruz?",

    intro:
      "Numeroloji haritasındaki sayılar tek başına değil, birbirleriyle kurdukları ilişki ve senin yaşam hikâyenle birlikte değerlendirilir.",

    days: [
      {
        day: "01",
        title: "Kendilik ve Karakter",
        text: "Kendini nasıl ifade ettiğin, doğal eğilimlerin, güçlü tarafların ve zorlandığın alanlar.",
      },
      {
        day: "02",
        title: "İlişkiler",
        text: "Yakınlık, iletişim, duygusal ihtiyaçlar ve ilişki içinde tekrar edebilen kişisel eğilimler.",
      },
      {
        day: "03",
        title: "Yetenekler ve Üretim",
        text: "Doğal olarak kolaylaştığın alanlar, çalışma biçimin ve üretkenliğini destekleyen özellikler.",
      },
      {
        day: "04",
        title: "Para ve Değer",
        text: "Değer algın, üretimle kurduğun ilişki ve maddi konulara yaklaşımındaki sembolik eğilimler.",
      },
      {
        day: "05",
        title: "Yaşam Dönemleri",
        text: "İçinde bulunduğun dönemde öne çıkan temalar ve kişisel gelişim alanları.",
      },
    ],
  },

  {
    number: "03",
    eyebrow: "ANALİZ SÜRECİ",
    title: "Nasıl gerçekleşiyor?",

    intro:
      "Analiz için gerekli bilgiler alındıktan sonra kişisel sayı haritan hesaplanır, yorumlanır ve dijital olarak hazırlanır.",

    details: [
      {
        label: "01 · BİLGİLERİNİ PAYLAŞ",
        value:
          "Ad, soyad ve doğum tarihi bilgilerin alınır.",
      },
      {
        label: "02 · SAYILAR HESAPLANIR",
        value:
          "İsim ve doğum tarihi üzerinden kişisel numeroloji haritan oluşturulur.",
      },
      {
        label: "03 · HARİTA YORUMLANIR",
        value:
          "Sayıların tek tek anlamları ve birbirleriyle oluşturduğu bütün değerlendirilir.",
      },
      {
        label: "04 · ANALİZ HAZIRLANIR",
        value:
          "Kişisel yorumların düzenlenerek dijital analiz hâline getirilir.",
      },
      {
        label: "FORMAT",
        value: "Kişiye özel dijital analiz",
      },
      {
        label: "TESLİM",
        value: "Çevrim içi",
      },
    ],
  },

  {
    number: "04",
    eyebrow: "ANALİZ ÖNCESİ",
    title: "Neler gerekli?",

    intro:
      "Numeroloji analizinin doğru hesaplanabilmesi için temel kişisel bilgilerin eksiksiz paylaşılması gerekir.",

    benefits: [
      {
        title: "Ad ve Soyad",
        text: "İsim üzerinden yapılan hesaplamalarda kullanılır.",
      },
      {
        title: "Doğum Tarihi",
        text: "Gün, ay ve yıl bilgisi yaşam yolu ve dönem hesaplamalarının temelini oluşturur.",
      },
      {
        title: "Kullanılan İsim",
        text: "Günlük yaşamda kullandığın isim ile resmi adın farklıysa bu bilgi ayrıca belirtilebilir.",
      },
      {
        title: "Odaklanmak İstediğin Alan",
        text: "İlişki, kariyer, para, kendilik veya yaşam dönemi gibi özellikle incelemek istediğin bir konu varsa paylaşabilirsin.",
      },
    ],
  },
];

export default function NumerologyAnalysisPage() {
  return (
    <main
      className="homePage kendilikSnapshotPage kendilikShowcasePage numerologyShowcasePage"
      id="top"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            numerologyJsonLd
          ),
        }}
      />

      <Navbar />

      <section className="kendilikShowcaseSection numerologyShowcaseSection">
        <div className="kendilikShowcaseContainer">
          {/* ÜST TANITIM */}

          <header className="kendilikShowcaseHeader">
            <p className="kendilikShowcaseEyebrow">
              NUMEROLOJİ ANALİZİ
            </p>

            <h1>
              Sayılarındaki izleri
              <span> kendi hikâyenle buluştur.</span>
            </h1>

            <p>
              Doğum tarihi ve isim bilgilerinden hesaplanan
              kişisel sayı haritanı; karakter, ilişkiler,
              yetenekler ve yaşam dönemleri üzerinden inceleyen
              kişiye özel dijital numeroloji analizi.
            </p>

            <div className="kendilikShowcaseMiniMeta">
              <span>Kişiye Özel</span>
              <span>Dijital Analiz</span>
              <span>İsim + Doğum Tarihi</span>
              <span>Sembolik Harita</span>
            </div>
          </header>

          {/* GÖRSEL */}

          <div className="kendilikShowcaseVisual numerologyShowcaseVisual">
            <img
              src="/images/services/numeroloji-analizi.webp"
              alt="Numeroloji Analizi yaşam yolu ve kişisel sayı haritası"
            />
          </div>

          {/* KAYDIRMALI BİLGİ KARTLARI */}

          <section className="kendilikShowcaseInfo">
            <div className="kendilikShowcaseInfoHead">
              <div>
                <p>NUMEROLOJİ ANALİZİ</p>

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
              {numerologyCards.map((card) => (
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

                  {/* 01 · ANALİZİN İÇERİĞİ */}

                  {card.focusAreas && (
                    <div className="kendilikShowcaseFocusAreas">
                      {card.focusAreas.map((item) => (
                        <div key={item.number}>
                          <span>{item.number}</span>

                          <div>
                            <strong>{item.title}</strong>
                            <p>{item.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {card.closing && (
                    <div className="kendilikShowcaseFocusClosing">
                      <span>✦</span>
                      <p>{card.closing}</p>
                    </div>
                  )}

                  {/* 02 · ANALİZ ALANLARI */}

                  {card.days && (
                    <div className="kendilikShowcaseDays">
                      {card.days.map((item) => (
                        <div key={item.day}>
                          <span>{item.day}</span>

                          <div>
                            <strong>{item.title}</strong>
                            <p>{item.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 03 · SÜREÇ */}

                  {card.details && (
                    <div className="kendilikShowcaseDetails">
                      {card.details.map((item) => (
                        <div key={item.label}>
                          <small>{item.label}</small>
                          <strong>{item.value}</strong>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 04 · GEREKLİ BİLGİLER */}

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

          {/* ALT BAŞVURU ALANI */}

          <section className="kendilikShowcaseCta numerologyShowcaseCta">
            <div className="kendilikShowcaseCtaCopy">
              <p>NUMEROLOJİ ANALİZİ</p>

              <h2>
                Sayılarını okumak değil,
                <span> kendindeki karşılığını görmek.</span>
              </h2>

              <div className="kendilikShowcasePrice">
                <small>ANALİZ ÜCRETİ</small>
                <strong>350 TL</strong>
              </div>
            </div>

            <div className="kendilikShowcaseActions">
              <a
                className="kendilikShowcaseShopier"
                href={APPLICATION_URL}
              >
                Numeroloji Analizi İçin Başvur
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

                  Merak Ettiklerini WhatsApp’tan Sor
                </span>

                <b>↗</b>
              </a>
            </div>
          </section>

          {/* YASAL NOT */}

          <p className="kendilikShowcaseLegal">
            Numeroloji analizi sembolik öz farkındalık amacıyla
            hazırlanır. Kişilik, gelecek, ilişki, kariyer veya
            finans alanında kesin hüküm ya da sonuç garantisi
            sunmaz. Psikolojik değerlendirme, tıbbi görüş,
            hukuki veya finansal danışmanlık yerine geçmez.
          </p>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}