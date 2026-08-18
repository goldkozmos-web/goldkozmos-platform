import type { Metadata } from "next";

import Navbar from "../../../components/Navbar";
import FooterSection from "../../../components/FooterSection";
import "../../../styles/home.css";

const pageUrl =
  "https://goldkozmos.com/calismalar/tarot";

const APPLICATION_URL = "/randevu";

const WHATSAPP_URL =
  "https://wa.me/905054722153?text=Merhaba%2C%20Tarot%20Fark%C4%B1ndal%C4%B1k%20Okumas%C4%B1%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.";

export const metadata: Metadata = {
  title: {
    absolute:
      "Tarot Farkındalık Okuması | Sembolik Tarot Analizi",
  },

  description:
    "Goldkozmos® Tarot Farkındalık Okuması; aşk, ilişki, kariyer, para ve kişisel yolculuk konularını kartların sembolik dili üzerinden değerlendiren kişiye özel sesli tarot yorumudur.",

  alternates: {
    canonical: pageUrl,
  },

  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: pageUrl,
    siteName: "Goldkozmos",

    title:
      "Tarot Farkındalık Okuması | Sembolik Tarot Analizi",

    description:
      "Aşk, ilişki, kariyer, para ve kişisel yolculuk konularına kartların sembolik dili üzerinden farklı bir açıdan bakabileceğin kişiye özel sesli tarot yorumu.",

    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Goldkozmos Tarot Farkındalık Okuması",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Tarot Farkındalık Okuması | Goldkozmos®",

    description:
      "Kartların sembolik dili üzerinden mevcut durumuna, ilişkilerine, kararlarına ve tekrar eden yaşam temalarına farklı bir açıdan bak.",

    images: ["/opengraph-image"],
  },
};

const tarotJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${pageUrl}#webpage`,
  url: pageUrl,

  name: "Goldkozmos® Tarot Farkındalık Okuması",

  description:
    "Aşk, ilişki, kariyer, para ve kişisel yolculuk konularını kartların sembolik dili üzerinden değerlendiren kişiye özel sesli tarot yorumu.",

  inLanguage: "tr-TR",

  isPartOf: {
    "@id": "https://goldkozmos.com/#website",
  },

  about: [
    {
      "@type": "Thing",
      name: "Tarot",
    },
    {
      "@type": "Thing",
      name: "Sembolik Farkındalık",
    },
    {
      "@type": "Thing",
      name: "İlişki Dinamikleri",
    },
    {
      "@type": "Thing",
      name: "Karar ve Seçenekler",
    },
    {
      "@type": "Thing",
      name: "Tekrar Eden Yaşam Döngüleri",
    },
    {
      "@type": "Thing",
      name: "Kişisel Farkındalık",
    },
  ],

  mainEntity: {
    "@type": "Service",
    name: "Tarot Farkındalık Okuması",

    serviceType:
      "Kişiye özel sembolik tarot farkındalık yorumu",

    provider: {
      "@id": "https://goldkozmos.com/#organization",
    },

    offers: {
      "@type": "Offer",
      price: "600",
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

type ProgramStep = {
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

type TarotCard = {
  number: string;
  eyebrow: string;
  title: string;
  intro: string;
  focusAreas?: FocusArea[];
  closing?: string;
  days?: ProgramStep[];
  details?: Detail[];
  benefits?: Benefit[];
};

const tarotCards: TarotCard[] = [
  {
    number: "01",
    eyebrow: "TAROT ANALİZİNİN İÇERİĞİ",
    title: "Tarot Analizi’nde ne var?",

    intro:
      "Yaşadığın bir konuya kartların sembolik dili üzerinden farklı açılardan bakmana ve mevcut durumu daha geniş bir çerçevede değerlendirmeni destekleyen kişiye özel sesli yorum çalışması.",

    focusAreas: [
      {
        number: "01",
        title: "Sembolik Bakış",
        text: "Kartların tek tek anlamlarından çok, ortaya çıkan bütünsel temayı ve sorunun bağlamını değerlendirme.",
      },
      {
        number: "02",
        title: "Mevcut Durum",
        text: "Şu anda içinde bulunduğun koşulları, duyguları ve dikkatinden kaçan noktaları farklı bir açıdan inceleme.",
      },
      {
        number: "03",
        title: "İlişki Dinamikleri",
        text: "Aşk ve ilişki alanındaki mevcut iletişimi, duygusal atmosferi ve kendi ilişki örüntülerini gözlemleme.",
      },
      {
        number: "04",
        title: "Karar ve Seçenekler",
        text: "Bir kararın önündeki seçenekleri kesin hüküm vermeden daha görünür hâle getirme.",
      },
      {
        number: "05",
        title: "Tekrar Eden Döngüler",
        text: "Benzer durumların neden yeniden karşına çıktığını düşündüren temaları fark etme.",
      },
      {
        number: "06",
        title: "Sesli Yorum",
        text: "Açılımın ana temaları ve dikkat edilmesi gereken noktalar kişiye özel ses kaydı olarak paylaşılır.",
      },
    ],

    closing:
      "Tarot geleceği senin yerine yazmaz; bulunduğun yeri başka bir ışık altında görmene yardımcı olan sembolik bir farkındalık alanıdır.",
  },

  {
    number: "02",
    eyebrow: "TAROT AÇILIMI ALANLARI",
    title: "Hangi konulara bakılabilir?",

    intro:
      "Tarot analizi tek bir yaşam alanıyla sınırlı değildir. Üzerinde durmak istediğin konuya göre açılım şekillendirilebilir.",

    days: [
      {
        day: "01",
        title: "Aşk ve İlişkiler",
        text: "Mevcut ilişki dinamikleri, iletişim, duygusal mesafe, geçmiş ilişkilerin etkileri ve yeni ilişkilere yaklaşım.",
      },
      {
        day: "02",
        title: "Kariyer ve Üretim",
        text: "Kariyer yönü, iş değişikliği düşüncesi, üretkenlik, motivasyon ve karar seçenekleri.",
      },
      {
        day: "03",
        title: "Para ve Refah",
        text: "Parayla kurduğun ilişki, kazanç ve özdeğer temaları, finansal kararların arkasındaki duygusal kalıplar.",
      },
      {
        day: "04",
        title: "Kişisel Yolculuk",
        text: "İçinde bulunduğun dönem, tekrar eden yaşam temaları, içsel ihtiyaçlar ve önündeki alternatif yollar.",
      },
      {
        day: "05",
        title: "Belirli Bir Konu",
        text: "Aklındaki tek bir soru, karar süreci veya belirli bir yaşam alanı üzerinden daha odaklı açılım.",
      },
    ],
  },

  {
    number: "03",
    eyebrow: "ANALİZ SÜRECİ",
    title: "Nasıl ilerliyor?",

    intro:
      "Açılımın daha net ve odaklı ilerlemesi için konu, sorular ve gerekli bilgiler analiz öncesinde belirlenir.",

    details: [
      {
        label: "01 · SORUNU NETLEŞTİR",
        value:
          "Üzerinde durmak istediğin konu veya sorular belirlenir.",
      },
      {
        label: "02 · BİLGİLERİNİ PAYLAŞ",
        value:
          "Analiz için gereken temel bilgiler güvenli iletişim kanalı üzerinden alınır.",
      },
      {
        label: "03 · AÇILIM HAZIRLANIR",
        value:
          "Kartlar seçilen konu doğrultusunda açılır ve bütünsel olarak değerlendirilir.",
      },
      {
        label: "04 · TESLİM",
        value:
          "Yorum ve açılımın ana temaları ses kaydı olarak paylaşılır.",
      },
      {
        label: "FORMAT",
        value: "Kişiye özel sesli yorum",
      },
      {
        label: "İLETİŞİM",
        value: "Çevrim içi",
      },
    ],
  },

  {
    number: "04",
    eyebrow: "ANALİZ ÖNCESİ",
    title: "Neler gerekli?",

    intro:
      "Sorunun ne kadar açık ve net olursa yorum da o kadar odaklı ilerler. Yalnızca analiz için gerekli bilgiler istenir.",

    benefits: [
      {
        title: "Ad ve Soyad",
        text: "Analizin doğru kişi için hazırlanabilmesi adına temel kimlik bilgisi.",
      },
      {
        title: "Çalışılacak Konu",
        text: "Aşk, ilişki, kariyer, para, kişisel yolculuk veya üzerinde durmak istediğin başka bir alan.",
      },
      {
        title: "Net Sorular",
        text: "Açılımın dağılmaması için mümkün olduğunca açık ve anlaşılır sorular hazırlanır.",
      },
      {
        title: "Gerekli Ek Bilgiler",
        text: "İlişki açılımlarında gerekli olduğunda partner bilgileri veya açılım için ihtiyaç duyulan ek detaylar paylaşılabilir.",
      },
    ],
  },
];

export default function TarotAnalysisPage() {
  return (
    <main
      className="homePage kendilikSnapshotPage kendilikShowcasePage tarotShowcasePage"
      id="top"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(tarotJsonLd),
        }}
      />

      <Navbar />

      <section className="kendilikShowcaseSection tarotShowcaseSection">
        <div className="kendilikShowcaseContainer">
          {/* ÜST TANITIM */}

          <header className="kendilikShowcaseHeader">
            <p className="kendilikShowcaseEyebrow">
              TAROT FARKINDALIK OKUMASI
            </p>

            <h1>
              Yaşadığın konuya
              <span> başka bir pencereden bak.</span>
            </h1>

            <p>
              Aşk, ilişki, kariyer, para veya kişisel
              yolculuğundaki bir konuyu kartların sembolik
              dili üzerinden daha geniş bir çerçevede
              değerlendiren kişiye özel sesli tarot yorumu.
            </p>

            <div className="kendilikShowcaseMiniMeta">
              <span>Kişiye Özel</span>
              <span>Sesli Yorum</span>
              <span>Çevrim İçi</span>
              <span>Sembolik Analiz</span>
            </div>
          </header>

          {/* GÖRSEL */}

          <div className="kendilikShowcaseVisual tarotShowcaseVisual">
            <img
              src="/images/services/tarot-farkindalik.webp"
              alt="Tarot Farkındalık Okuması sembolik tarot analizi ve kişiye özel sesli yorum"
            />
          </div>

          {/* KAYDIRMALI KARTLAR */}

          <section className="kendilikShowcaseInfo">
            <div className="kendilikShowcaseInfoHead">
              <div>
                <p>TAROT FARKINDALIK OKUMASI</p>

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
              {tarotCards.map((card) => (
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

          {/* KATILIM / BAŞVURU */}

          <section className="kendilikShowcaseCta tarotShowcaseCta">
            <div className="kendilikShowcaseCtaCopy">
              <p>TAROT FARKINDALIK OKUMASI</p>

              <h2>
                Cevabı zorlamak yerine
                <span> soruna başka bir açıdan bak.</span>
              </h2>

              <div className="kendilikShowcasePrice">
                <small>ANALİZ ÜCRETİ</small>
                <strong>600 TL</strong>
              </div>
            </div>

            <div className="kendilikShowcaseActions">
              <a
                className="kendilikShowcaseShopier"
                href={APPLICATION_URL}
              >
                Tarot Analizi İçin Başvur
                <span>↗</span>
              </a>

              <a
                className="kendilikShowcaseWhatsapp"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  <small>AKLINDA SORU MU VAR?</small>
                  Merak Ettiklerini WhatsApp’tan Sor
                </span>

                <b>↗</b>
              </a>
            </div>
          </section>

          {/* YASAL NOT */}

          <p className="kendilikShowcaseLegal">
            Tarot yorumları sembolik ve yorumsal niteliktedir.
            Belirli bir olayın gerçekleşeceğini, bir kişinin
            geri döneceğini veya ilişkinin belirli bir şekilde
            devam edeceğini garanti etmez. Sağlık, hukuk,
            yatırım ve finans konularında profesyonel
            danışmanlık yerine kullanılmamalıdır. Hayatına
            ilişkin kararların sorumluluğu sana aittir.
          </p>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}