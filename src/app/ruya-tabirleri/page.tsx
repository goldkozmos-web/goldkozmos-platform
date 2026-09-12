import type { Metadata } from "next";

import FooterSection from "../../components/FooterSection";
import HomeNavbar from "../../components/HomeNavbar";
import RuyaSearch from "../../components/ruya/RuyaSearch";
import { ruyaUrl } from "../../lib/ruya-tabirleri/urls";
import "../../styles/home.css";
import "../../styles/ruya-tabirleri.css";

const pageUrl = ruyaUrl();

export const metadata: Metadata = {
  title: { absolute: "Rüya Tabirleri | GoldKozmos" },
  description:
    "Rüyanda ne gördüğünü yaz, anlamını keşfet. GoldKozmos Rüya Tabirleri; spiritüel, sembolik ve enerjisel rüya yorumları.",
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: pageUrl,
    siteName: "Goldkozmos",
    title: "Rüya Tabirleri | GoldKozmos",
    description:
      "Rüyanda ne gördüğünü yaz, anlamını keşfet. Spiritüel ve sembolik rüya yorumları.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rüya Tabirleri | GoldKozmos",
    description:
      "Rüyanda ne gördüğünü yaz, anlamını keşfet. GoldKozmos rüya tabirleri.",
  },
  robots: { index: true, follow: true },
};

export default function RuyaTabirleriPage() {
  return (
    <main className="homeV3Page ruyaPage" id="top">
      <HomeNavbar />
      <div className="ruyaWrap">
        <p className="ruyaEyebrow">GOLDKOZMOS®</p>
        <h1>Rüya Tabirleri</h1>
        <p className="ruyaLead">Rüyanda ne gördüğünü yaz, anlamını keşfet.</p>
        <RuyaSearch />
      </div>
      <FooterSection />
    </main>
  );
}
