import type { Metadata } from "next";

import Navbar from "../../../components/Navbar";
import OneToOneDetailSection from "../../../components/OneToOneDetailSection";
import FooterSection from "../../../components/FooterSection";
import "../../../styles/home.css";

const pageUrl =
  "https://goldkozmos.com/calismalar/birebir-seanslar";

export const metadata: Metadata = {
  title: {
    absolute:
      "Birebir Seanslar | Kişisel Farkındalık ve Bireysel Çalışma",
  },

  description:
    "Goldkozmos® Birebir Seanslar; belirli bir konuya odaklanmak, tekrar eden düşünce ve davranış örüntülerini incelemek ve kişisel bir yön belirlemek için sunulan online bireysel çalışmalardır.",

  alternates: {
    canonical: pageUrl,
  },

  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: pageUrl,
    siteName: "Goldkozmos",

    title:
      "Birebir Seanslar | Kişisel Farkındalık ve Bireysel Çalışma",

    description:
      "Tek seans veya 5 günlük yoğun süreç ile belirli bir konuya odaklanabileceğin Goldkozmos® birebir çalışmaları.",

    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Goldkozmos Birebir Seanslar",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Birebir Seanslar | Goldkozmos®",

    description:
      "Belirli bir konuya odaklanmak ve tekrar eden düşünce, duygu ve davranış örüntülerini incelemek için online birebir çalışmalar.",

    images: ["/opengraph-image"],
  },
};

const oneToOneJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${pageUrl}#webpage`,
  url: pageUrl,
  name: "Goldkozmos® Birebir Seanslar",

  description:
    "Belirli bir konuya odaklanmak, tekrar eden düşünce ve davranış örüntülerini incelemek ve kişisel bir yön belirlemek için sunulan online bireysel çalışmalar.",

  inLanguage: "tr-TR",

  isPartOf: {
    "@id": "https://goldkozmos.com/#website",
  },

  about: [
    {
      "@type": "Thing",
      name: "Kişisel Farkındalık",
    },
    {
      "@type": "Thing",
      name: "Bireysel Gelişim",
    },
    {
      "@type": "Thing",
      name: "Düşünce Kalıpları",
    },
    {
      "@type": "Thing",
      name: "Davranış Örüntüleri",
    },
  ],
};

export default function OneToOneSessionsPage() {
  return (
    <main
      className="homePage oneToOnePage"
      id="top"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(oneToOneJsonLd),
        }}
      />

      <Navbar />

      <OneToOneDetailSection />

      <FooterSection />
    </main>
  );
}