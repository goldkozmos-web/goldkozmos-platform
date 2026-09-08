import type { Metadata } from "next";

import HomeNavbar from "../../../components/HomeNavbar";
import FooterSection from "../../../components/FooterSection";
import EnergyWorksCatalog from "../../../components/energy/EnergyWorksCatalog";
import "../../../styles/home.css";

const pageUrl =
  "https://goldkozmos.com/calismalar/enerji-calismalari";

const pageTitle = "Birebir Enerji Çalışmaları | GoldKozmos";

const pageDescription =
  "GoldKozmos birebir enerji çalışmaları: çakra dengeleme, arınma, bolluk, ilişki ve sezgi alanına yönelik online seansları inceleyin.";

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
        alt: "GoldKozmos Birebir Enerji Çalışmaları",
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
