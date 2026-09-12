import type { Metadata } from "next";
import Link from "next/link";

import FooterSection from "../../components/FooterSection";
import HomeNavbar from "../../components/HomeNavbar";
import TarotCardGrid from "../../components/tarot/TarotCardGrid";
import { TAROT_DECK } from "../../data/tarot/deck";
import { SITE_ORIGIN } from "../../lib/site";
import { TAROT_CARE_PATH, tarotCardsUrl } from "../../lib/tarot/urls";
import "../../styles/home.css";
import "../../styles/tarot-bakimi.css";

const pageUrl = tarotCardsUrl();

export const metadata: Metadata = {
  title: { absolute: "Tarot Kartları Anlamları | 78 Kart | GoldKozmos" },
  description:
    "78 tarot kartının sembollerini, enerjilerini ve spiritüel anlamlarını keşfet. Büyük Arkana ve Küçük Arkana kartlarını incele.",
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: pageUrl,
    siteName: "Goldkozmos",
    title: "Tarot Kartları Anlamları | GoldKozmos",
    description:
      "78 tarot kartının spiritüel ve sembolik anlamlarını incele.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarot Kartları | GoldKozmos",
    description: "Büyücü, Güneş, Kupa Prensi ve tüm deste anlamları.",
  },
  robots: { index: true, follow: true },
};

export default function TarotKartlariPage() {
  const jsonLd = {
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
        name: "Tarot Kartları",
        item: pageUrl,
      },
    ],
  };

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
          <Link href="/tarot-bakimi">Tarot Bakımı</Link>
          <span>/</span>
          <span>Tarot Kartları</span>
        </nav>
        <p className="tarotEyebrow">78 KART</p>
        <h1>Tarot Kartları</h1>
        <p className="tarotLead">
          78 tarot kartının sembollerini, enerjilerini ve spiritüel anlamlarını
          keşfet. Destede {TAROT_DECK.length} kart yer alır.
        </p>
        <TarotCardGrid />
        <p style={{ marginTop: 28 }}>
          <Link href={TAROT_CARE_PATH}>Online Tarot Bakımı Yap</Link>
        </p>
      </div>
      <FooterSection />
    </main>
  );
}
