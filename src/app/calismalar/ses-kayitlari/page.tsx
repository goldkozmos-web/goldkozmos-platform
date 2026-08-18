import type { Metadata } from "next";

import Navbar from "../../../components/Navbar";
import AudioWorkDetailSection from "../../../components/AudioWorkDetailSection";
import TestimonialsSection from "../../../components/TestimonialsSection";
import FAQSection from "../../../components/FAQSection";
import FooterSection from "../../../components/FooterSection";
import "../../../styles/home.css";

const pageUrl =
  "https://goldkozmos.com/calismalar/ses-kayitlari";

export const metadata: Metadata = {
  title: {
    absolute:
      "Dijital Ses Çalışmaları | Meditasyon, Özdeğer ve Enerji",
  },

  description:
    "Goldkozmos® dijital ses çalışmaları; aşk, ilişki, özdeğer, para, refah, enerji ve içsel denge alanlarında kendi zamanında uygulayabileceğin yönlendirmeli ses kayıtlarıdır.",

  alternates: {
    canonical: pageUrl,
  },

  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: pageUrl,
    siteName: "Goldkozmos",

    title:
      "Dijital Ses Çalışmaları | Meditasyon, Özdeğer ve Enerji",

    description:
      "Aşk, ilişki, özdeğer, para, refah ve enerji alanlarında kendi hızında uygulayabileceğin Goldkozmos® yönlendirmeli dijital ses çalışmaları.",

    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Goldkozmos Dijital Ses Çalışmaları",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Dijital Ses Çalışmaları | Goldkozmos®",

    description:
      "Özdeğer, ilişki, para, refah, enerji ve içsel denge alanlarına odaklanan yönlendirmeli dijital ses kayıtları.",

    images: ["/opengraph-image"],
  },
};

const audioWorksJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${pageUrl}#webpage`,
  url: pageUrl,

  name: "Goldkozmos® Dijital Ses Çalışmaları",

  description:
    "Aşk, ilişki, özdeğer, para, refah, enerji ve içsel denge alanlarında kişinin kendi zamanında uygulayabileceği yönlendirmeli dijital ses çalışmaları.",

  inLanguage: "tr-TR",

  isPartOf: {
    "@id": "https://goldkozmos.com/#website",
  },

  about: [
    {
      "@type": "Thing",
      name: "Yönlendirmeli Ses Çalışmaları",
    },
    {
      "@type": "Thing",
      name: "Meditasyon",
    },
    {
      "@type": "Thing",
      name: "Özdeğer",
    },
    {
      "@type": "Thing",
      name: "İlişki Farkındalığı",
    },
    {
      "@type": "Thing",
      name: "Para ve Refah Bilinci",
    },
    {
      "@type": "Thing",
      name: "Enerji Farkındalığı",
    },
    {
      "@type": "Thing",
      name: "İçsel Denge",
    },
  ],

  mainEntity: {
    "@type": "Service",
    name: "Goldkozmos® Dijital Ses Çalışmaları",

    serviceType:
      "Yönlendirmeli dijital ses ve kişisel farkındalık çalışmaları",

    provider: {
      "@id": "https://goldkozmos.com/#organization",
    },

    url: pageUrl,
  },
};

export default function AudioWorksPage() {
  return (
    <main className="homePage" id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            audioWorksJsonLd
          ),
        }}
      />

      <Navbar />

      <section className="innerPageHero">
        <div className="innerPageHeroContainer">
          <p className="sectionEyebrow">
            <span>
              GOLDKOZMOS
              <sup className="registeredSymbol">
                ®
              </sup>
            </span>

            <br />

            <span>REZONANS EKOLÜ</span>

            <br />

            <span>DİJİTAL SES ÇALIŞMALARI</span>
          </p>

          <h1>
            Kendi zamanında dinle,
            <span>
              {" "}
              içsel alanına yeniden dön.
            </span>
          </h1>

          <p>
            Aşk, ilişki, para, özdeğer ve enerji
            alanlarına odaklanan, kendi hızında
            uygulayabileceğin yönlendirmeli dijital
            ses çalışmalarını keşfet.
          </p>

          <div className="innerPageHeroActions">
            <a href="#ses-kayitlari">
              Ses Çalışmalarını İncele
              <span aria-hidden="true">↓</span>
            </a>

            <a href="/randevu">
              Ses Kaydı İçin Bilgi Al
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <AudioWorkDetailSection />

      <TestimonialsSection />

      <FAQSection />

      <FooterSection />
    </main>
  );
}