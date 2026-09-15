import type { Metadata } from "next";
import Link from "next/link";

import FooterSection from "../../components/FooterSection";
import HomeNavbar from "../../components/HomeNavbar";
import TarotConvert from "../../components/tarot/TarotConvert";
import TarotReading from "../../components/tarot/TarotReading";
import TarotSeoCopy from "../../components/tarot/TarotSeoCopy";
import { SITE_ORIGIN } from "../../lib/site";
import { publicPageMetadata } from "../../lib/seo";
import { tarotCareUrl } from "../../lib/tarot/urls";
import "../../styles/home.css";
import "../../styles/tarot-bakimi.css";

const pageUrl = tarotCareUrl();

export const metadata: Metadata = publicPageMetadata({
  title: "Online Tarot Bakımı | Kart Seç ve Yorumunu Gör | GoldKozmos",
  description:
    "Online tarot bakımı: konunu seç, tarot kartı seç, üç kartlık açılımı oku. Aşk tarot bakımı ve tarot yorumu deneyimi; kart sözlüğü ayrı sayfadadır.",
  path: "/tarot-bakimi",
  absoluteTitle: true,
});

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
        <h1>Online Tarot Bakımı</h1>
        <p className="tarotLead">
        Online tarot bakımı, tarot baktır veya tarot kartı seç arayanlar için
        interaktif bir açılımdır. Kart sözlüğü değildir.
        </p>
        <TarotReading />
        <TarotConvert />
        <TarotSeoCopy />
      </div>
      <FooterSection />
    </main>
  );
}
