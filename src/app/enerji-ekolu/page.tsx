import type { Metadata } from "next";

import Navbar from "../../components/Navbar";
import FooterSection from "../../components/FooterSection";
import "../../styles/home.css";

const pageUrl = "https://goldkozmos.com/enerji-ekolu";

export const metadata: Metadata = {
  title:
    "Rezonans Ekolü | Kişisel Gelişim, Stoa ve Spiritüel Farkındalık",

  description:
    "Goldkozmos® Rezonans Ekolü; kişisel gelişim, Stoa, sosyoloji, kendilik, ilişkiler, bolluk, enerji ve spiritüel farkındalığı birlikte ele alan özgün bir farkındalık yaklaşımıdır.",

  alternates: {
    canonical: pageUrl,
  },

  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: pageUrl,
    siteName: "Goldkozmos",

    title:
      "Goldkozmos® Rezonans Ekolü | Kişisel Gelişim ve Stoa",

    description:
      "Kişisel gelişim, Stoa, sosyoloji, enerji, kendilik, ilişkiler ve spiritüel farkındalığı bir araya getiren Goldkozmos® Rezonans Ekolü.",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Goldkozmos® Rezonans Ekolü | Kişisel Gelişim ve Stoa",

    description:
      "Kişisel gelişim, Stoa, sosyoloji, enerji ve spiritüel farkındalık üzerine Goldkozmos® yaklaşımını keşfet.",
  },
};

const resonanceSchoolJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${pageUrl}/#webpage`,
  url: pageUrl,
  name: "Goldkozmos® Rezonans Ekolü",
  description:
    "Kişisel gelişim, Stoa, sosyoloji, kendilik, ilişkiler, bolluk, enerji ve spiritüel farkındalığı birlikte ele alan Goldkozmos® yaklaşımı.",
  inLanguage: "tr-TR",

  isPartOf: {
    "@id": "https://goldkozmos.com/#website",
  },

  about: [
    {
      "@type": "Thing",
      name: "Kişisel Gelişim",
    },
    {
      "@type": "Thing",
      name: "Stoa Felsefesi",
    },
    {
      "@type": "Thing",
      name: "Sosyoloji",
    },
    {
      "@type": "Thing",
      name: "Öz Farkındalık",
    },
    {
      "@type": "Thing",
      name: "Enerji Farkındalığı",
    },
    {
      "@type": "Thing",
      name: "Spiritüel Farkındalık",
    },
    {
      "@type": "Thing",
      name: "İnsan Davranışları",
    },
  ],
};

type FocusArea = {
  number: string;
  title: string;
  text: string;
};

type SchoolStep = {
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

type SchoolCard = {
  number: string;
  eyebrow: string;
  title: string;
  intro: string;
  focusAreas?: FocusArea[];
  closing?: string;
  days?: SchoolStep[];
  details?: Detail[];
  benefits?: Benefit[];
};

const schoolCards: SchoolCard[] = [
  {
    number: "01",
    eyebrow: "REZONANS EKOLÜ",
    title: "Goldkozmos® Rezonans Ekolü nedir?",
    intro:
      "İnsanı yalnızca tek bir davranış, duygu ya da yaşam alanı üzerinden değil; kendilik, ilişkiler, düşünce kalıpları, sosyal çevre ve içsel farkındalık üzerinden birlikte ele alan Goldkozmos® yaklaşımı.",
    focusAreas: [
      {
        number: "01",
        title: "Kendilik",
        text: "Özdeğerini, sınırlarını, ihtiyaçlarını ve kendinle kurduğun ilişkiyi daha yakından görme.",
      },
      {
        number: "02",
        title: "İlişkiler",
        text: "Partner seçimlerini, tekrar eden ilişki örüntülerini ve ilişkide aldığın rolleri inceleme.",
      },
      {
        number: "03",
        title: "Bolluk",
        text: "Para, değer, üretkenlik ve kıtlık düşüncesiyle kurduğun ilişkiyi fark etme.",
      },
      {
        number: "04",
        title: "Stoa",
        text: "Kontrol alanını, düşüncelerini ve olaylara verdiğin tepkileri daha bilinçli değerlendirme.",
      },
      {
        number: "05",
        title: "Sosyolojik Bakış",
        text: "Aile, toplum, kültür ve çevreden öğrendiğin kalıpların seçimlerine nasıl yansıdığını görme.",
      },
      {
        number: "06",
        title: "Spiritüel Farkındalık",
        text: "İç dünyanı, sezgilerini, sembolleri ve yaşamındaki anlam arayışını daha geniş bir perspektifle inceleme.",
      },
    ],
    closing:
      "Amaç sana kim olman gerektiğini söylemek değil; kendini, seçimlerini ve tekrar eden örüntülerini daha görünür hâle getirebileceğin bir alan oluşturmak.",
  },

  {
    number: "02",
    eyebrow: "YAKLAŞIM",
    title: "Değişim nereden başlıyor?",
    intro:
      "Rezonans Ekolü’nde dışarıdaki sonucu değiştirmeden önce, o sonuca eşlik eden düşünceyi, davranışı ve içsel örüntüyü anlamaya odaklanılır.",
    days: [
      {
        day: "01",
        title: "Gözlemle",
        text: "Yaşadığın duruma yalnızca sonuç üzerinden değil, kendi düşünce ve davranışların üzerinden de bak.",
      },
      {
        day: "02",
        title: "Örüntüyü Fark Et",
        text: "Hayatında benzer biçimde tekrar eden seçimleri, ilişkileri ve tepkileri görünür hâle getir.",
      },
      {
        day: "03",
        title: "Bağlamı Anla",
        text: "Bu davranışın aile, geçmiş deneyimler, sosyal çevre veya kişisel inançlarla ilişkisini incele.",
      },
      {
        day: "04",
        title: "Seçim Alanını Genişlet",
        text: "Otomatik biçimde verdiğin tepkiler yerine başka hangi seçeneklerin mümkün olduğunu gör.",
      },
      {
        day: "05",
        title: "Hayata Taşı",
        text: "Fark ettiğin noktaları küçük, uygulanabilir ve gerçek yaşam seçimleriyle destekle.",
      },
    ],
  },

  {
    number: "03",
    eyebrow: "GOLDKOZMOS® EKOSİSTEMİ",
    title: "Hangi çalışmalar var?",
    intro:
      "Rezonans Ekolü tek bir çalışma biçiminden oluşmaz. İhtiyacına ve ilerlemek istediğin alana göre farklı başlangıç noktaları bulunur.",
    details: [
      {
        label: "REZONANS ATÖLYELERİ",
        value: "Kendilik · İlişki · Bolluk",
      },
      {
        label: "BİREBİR ÇALIŞMALAR",
        value: "Kişisel ihtiyaca göre ilerleyen bireysel süreçler",
      },
      {
        label: "TAROT",
        value: "Sembolik farkındalık ve farklı bakış açısı",
      },
      {
        label: "NUMEROLOJİ",
        value: "İsim ve doğum tarihi üzerinden kişisel sayı haritası",
      },
      {
        label: "GOLDBOOK",
        value: "Dijital rehberler ve kişisel gelişim kitapları",
      },
      {
        label: "GOLDCAST",
        value: "İnsanı ve yaşam örüntülerini anlamaya yönelik içerikler",
      },
    ],
  },

  {
    number: "04",
    eyebrow: "BAŞLANGIÇ NOKTASI",
    title: "Nereden başlamalısın?",
    intro:
      "Başlangıç noktası herkes için aynı olmak zorunda değil. Şu anda hayatında en çok görünür hâle getirmek istediğin alan sana ilk yönü gösterebilir.",
    benefits: [
      {
        title: "Kendilik Rezonansı",
        text: "Özdeğer, onay ihtiyacı, sınırlar ve kendinle kurduğun ilişki daha baskınsa.",
      },
      {
        title: "İlişki Rezonansı",
        text: "Partner seçimleri, iletişim, güven ve tekrar eden ilişki döngüleri öne çıkıyorsa.",
      },
      {
        title: "Bolluk Rezonansı",
        text: "Para algısı, değer, kıtlık düşüncesi ve üretkenlik alanını incelemek istiyorsan.",
      },
      {
        title: "Sana Uygun Çalışmayı Bul",
        text: "Hangi alandan başlaman gerektiğinden emin değilsen ücretsiz yönlendirme testini kullanabilirsin.",
      },
    ],
  },
];

export default function EnergySchoolPage() {
  return (
    <main
      className="homePage kendilikSnapshotPage kendilikShowcasePage resonanceSchoolShowcasePage"
      id="top"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(resonanceSchoolJsonLd),
        }}
      />

      <Navbar />

      <section className="kendilikShowcaseSection resonanceSchoolShowcaseSection">
        <div className="kendilikShowcaseContainer">
          <header className="kendilikShowcaseHeader">
            <p className="kendilikShowcaseEyebrow">
              GOLDKOZMOS® REZONANS EKOLÜ
            </p>

            <h1>
              İnsan değişmeden
              <span> hayat değişmez.</span>
            </h1>

            <p>
              İnsan davranışlarını, düşünce kalıplarını,
              ilişkileri ve yaşam seçimlerini kişisel gelişim,
              Stoa, sosyoloji ve spiritüel farkındalıkla
              birlikte ele alan Goldkozmos® yaklaşımı.
            </p>

            <div className="kendilikShowcaseMiniMeta">
              <span>Kendilik</span>
              <span>İlişki</span>
              <span>Bolluk</span>
              <span>Farkındalık</span>
            </div>
          </header>

          <div className="kendilikShowcaseVisual resonanceSchoolShowcaseVisual">
            <img
              src="/images/services/ozge-batigun-hakkimda.webp"
              alt="Goldkozmos Rezonans Ekolü kişisel gelişim ve farkındalık yaklaşımı"
            />
          </div>

          <section className="kendilikShowcaseInfo">
            <div className="kendilikShowcaseInfoHead">
              <div>
                <p>GOLDKOZMOS® REZONANS EKOLÜ</p>

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
              {schoolCards.map((card) => (
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
                      {card.benefits.map((item, index) => (
                        <div key={item.title}>
                          <span>
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <div>
                            <strong>{item.title}</strong>
                            <p>{item.text}</p>
                          </div>
                        </div>
                      ))}
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

          <section className="kendilikShowcaseCta resonanceSchoolShowcaseCta">
            <div className="kendilikShowcaseCtaCopy">
              <p>KENDİ KOZMOSUNU BUL</p>

              <h2>
                Nereden başlayacağını
                <span> birlikte bulalım.</span>
              </h2>

              <p>
                Kendilik, ilişki, bolluk veya birebir
                çalışmalar arasında sana en yakın başlangıç
                noktasını keşfet.
              </p>
            </div>

            <div className="kendilikShowcaseActions">
              <a
                className="kendilikShowcaseShopier"
                href="/sana-uygun-calismayi-bul"
              >
                Ücretsiz Testi Çöz
                <span>↗</span>
              </a>

              <a
                className="kendilikShowcaseWhatsapp"
                href="/#rezonans"
              >
                <span>
                  <small>ÇALIŞMALARI İNCELE</small>
                  Rezonans Atölyelerini Keşfet
                </span>

                <b>↗</b>
              </a>
            </div>
          </section>

          <p className="kendilikShowcaseLegal">
            Goldkozmos® içerikleri kişisel farkındalık ve
            bireysel gelişim amacı taşır. Tıbbi, psikolojik,
            psikiyatrik, hukuki veya finansal danışmanlık
            yerine geçmez.
          </p>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}