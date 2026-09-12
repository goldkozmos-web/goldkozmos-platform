import type { Metadata } from "next";
import Link from "next/link";

import FooterSection from "../../components/FooterSection";
import HomeNavbar from "../../components/HomeNavbar";
import TarotConvert from "../../components/tarot/TarotConvert";
import TarotReading from "../../components/tarot/TarotReading";
import TarotSeoCopy from "../../components/tarot/TarotSeoCopy";
import { SITE_ORIGIN } from "../../lib/site";
import { tarotCareUrl } from "../../lib/tarot/urls";
import "../../styles/home.css";
import "../../styles/tarot-bakimi.css";

const pageUrl = tarotCareUrl();

export const metadata: Metadata = {
  title: {
    absolute:
      "Tarot Bakımı | Online Tarot Kartı Seç ve Yorumunu Gör | GoldKozmos",
  },
  description:
    "Online tarot bakımı ile konunu seç, kartlarını çek ve yorumunu keşfet. 78 tarot kartının anlamlarını incele veya kişisel tarot bakımı için randevu oluştur.",
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: pageUrl,
    siteName: "Goldkozmos",
    title: "Tarot Bakımı | GoldKozmos",
    description:
      "Konunu seç, kartlarını çek ve mevcut enerjinin sana ne anlattığını keşfet.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarot Bakımı | GoldKozmos",
    description:
      "Online tarot bakımı, ücretsiz tarot yorumu ve 78 tarot kartının anlamları.",
  },
  robots: { index: true, follow: true },
};

export default function TarotBakimiPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Ana Sayfa",
          item: SITE_ORIGIN,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Tarot Bakımı",
          item: pageUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Tarot Bakımı",
      url: pageUrl,
      description:
        "Online tarot bakımı ile konunu seç, kartlarını çek ve yorumunu keşfet.",
      inLanguage: "tr-TR",
    },
  ];

  return (
    <main className="homeV3Page tarotPage" id="top">
      <HomeNavbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="tarotWrap">
        <nav className="tarotCrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span>/</span>
          <span>Tarot Bakımı</span>
        </nav>
        <p className="tarotEyebrow">GOLDKOZMOS®</p>
        <h1>Tarot Bakımı</h1>
        <p className="tarotLead">
          Konunu seç, kartlarını çek ve mevcut enerjinin sana ne anlattığını
          keşfet.
        </p>
        <TarotReading />
        <TarotConvert />
        <TarotSeoCopy />
      </div>
      <FooterSection />
    </main>
  );
}
