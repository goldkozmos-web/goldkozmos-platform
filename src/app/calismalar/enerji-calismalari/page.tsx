import type { Metadata } from "next";

import HomeNavbar from "../../../components/HomeNavbar";
import FooterSection from "../../../components/FooterSection";
import EnergyWorksCatalog from "../../../components/energy/EnergyWorksCatalog";
import "../../../styles/home.css";

const pageUrl =
  "https://goldkozmos.com/calismalar/enerji-calismalari";

const pageTitle = "Enerji Rezonansı | GoldKozmos";

const pageDescription =
  "Enerji Rezonansı: daha önce GoldKozmos çalışmasına katılmış danışanlara özel çakra, nazar, karma ve diğer enerji konuları.";

export const metadata: Metadata = {
  title: {
    absolute: pageTitle,
  },

  description: pageDescription,

  alternates: {
    canonical: pageUrl,
  },

  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: pageUrl,
    siteName: "Goldkozmos",
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "GoldKozmos Enerji Rezonansı",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/opengraph-image"],
  },
};

export default function EnergyWorksCatalogPage() {
  return (
    <main
      className="homeV3Page energyWorksPage"
      id="top"
    >
      <HomeNavbar />

      <section className="energyWorksSection">
        <div className="energyWorksInner">
          <EnergyWorksCatalog />
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
