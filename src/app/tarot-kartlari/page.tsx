import type { Metadata } from "next";
import Link from "next/link";

import FooterSection from "../../components/FooterSection";
import HomeNavbar from "../../components/HomeNavbar";
import TarotCardGrid from "../../components/tarot/TarotCardGrid";
import TarotHubIntro from "../../components/tarot/TarotHubIntro";
import { TAROT_DECK } from "../../data/tarot/deck";
import { breadcrumbJsonLd } from "../../lib/jsonld";
import { TAROT_CARE_PATH } from "../../lib/tarot/urls";
import { publicPageMetadata } from "../../lib/seo";
import "../../styles/home.css";
import "../../styles/tarot-bakimi.css";
import "../../styles/hub-seo.css";

export const metadata: Metadata = publicPageMetadata({
  title: "Tarot Kartları ve Anlamları: 78 Kartın Detaylı Yorumu | GoldKozmos",
  description:
    "78 tarot kartının anlamları: Büyük Arkana ve Küçük Arkana. Aşk, duygu, düşünce, kariyer ve ters kart yorumları tek canonical sayfada.",
  path: "/tarot-kartlari",
  absoluteTitle: true,
});

export default function TarotKartlariPage() {
  const jsonLd = breadcrumbJsonLd([
    { name: "Ana Sayfa", path: "/" },
    { name: "Tarot Kartları", path: "/tarot-kartlari" },
  ]);

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
        <h1>Tarot Kartları ve Anlamları</h1>
        <p className="tarotLead">
          Destede {TAROT_DECK.length} kart yer alır. Her kart kendi sayfasına
          gider; niyetler için ayrı kopya URL yoktur.
        </p>
        <TarotHubIntro />
        <TarotCardGrid />
        <p style={{ marginTop: 28 }}>
          <Link href={TAROT_CARE_PATH}>Online Tarot Bakımı Yap</Link>
        </p>
      </div>
      <FooterSection />
    </main>
  );
}
