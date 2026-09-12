import type { Metadata } from "next";

import FooterSection from "../../components/FooterSection";
import HomeNavbar from "../../components/HomeNavbar";
import RitualHub from "../../components/goldrituel/RitualHub";
import { goldrituelUrl } from "../../lib/goldrituel/urls";
import "../../styles/home.css";
import "../../styles/goldrituel.css";

const pageUrl = goldrituelUrl();

export const metadata: Metadata = {
  title: { absolute: "GoldRitüel | GoldKozmos" },
  description:
    "Niyet, farkındalık ve enerji odağında uygulanabilir ritüeller. GoldRitüel ile sade ritüelleri keşfet.",
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: pageUrl,
    siteName: "Goldkozmos",
    title: "GoldRitüel | GoldKozmos",
    description:
      "Niyet, farkındalık ve enerji odağında uygulanabilir ritüeller.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GoldRitüel | GoldKozmos",
    description:
      "Niyet, farkındalık ve enerji odağında uygulanabilir ritüeller.",
  },
  robots: { index: true, follow: true },
};

export default function GoldRituelPage() {
  return (
    <main className="homeV3Page grPage" id="top">
      <HomeNavbar />
      <div className="grWrap">
        <p className="grEyebrow">GOLDKOZMOS®</p>
        <h1>GoldRitüel</h1>
        <p className="grLead">
          Niyet, farkındalık ve enerji odağında uygulanabilir ritüeller.
        </p>
        <p className="grIntro">
          Kalabalık bir kategori ağacı yok. Ritüeli seç, süresine ve malzemesine bak,
          adımları sakin uygula. Niyetin net olsun; sahne kalmasın.
        </p>
        <RitualHub />
      </div>
      <FooterSection />
    </main>
  );
}
