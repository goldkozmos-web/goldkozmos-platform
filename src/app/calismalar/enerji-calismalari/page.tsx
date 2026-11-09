import type { Metadata } from "next";


import HomeNavbar from "../../../components/HomeNavbar";
import FooterSection from "../../../components/FooterSection";
import EnergyWorksCatalog from "../../../components/energy/EnergyWorksCatalog";
import EnergyExampleMessages from "../../../components/energy/EnergyExampleMessages";
import "../../../styles/home.css";
import "../../../styles/energy-catalog.css";
import "../../../styles/energy-discovery.css";
import "../../../styles/energy-deeper-premium.css";

const pageUrl =
  "https://goldkozmos.com/calismalar/enerji-calismalari";

const pageTitle = "Online Enerji Çalışmaları — 30 Dakika ve Ücretler | Goldkozmos®";

const pageDescription =
  "30 dakikalık online enerji çalışmaları: çakra dengeleme, karma, nazar ve mekân temizliği. 1.000 TL katılım ücretini ve detayları incele, WhatsApp’tan randevu al.";

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

      <EnergyExampleMessages />
      <FooterSection />
    </main>
  );
}


