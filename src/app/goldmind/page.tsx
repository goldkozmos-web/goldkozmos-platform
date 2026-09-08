import type { Metadata } from "next";

import HomeNavbar from "../../components/HomeNavbar";
import FooterSection from "../../components/FooterSection";
import MeditationLibrary from "../../components/meditation/MeditationLibrary";
import "../../styles/home.css";
import "../../styles/live-activity.css";
import "../../styles/goldmind-flow.css";

const pageUrl = "https://goldkozmos.com/goldmind";

const pageTitle = "GoldMind | Meditasyon & Nefes Alanı | GoldKozmos";

const pageDescription =
  "GoldKozmos meditasyon, nefes, gevşeme ve farkındalık pratiklerini keşfet.";

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
        alt: "GoldMind Meditasyon ve Nefes Alanı",
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

export default function GoldMindPage() {
  return (
    <main
      className="homeV3Page meditationPage"
      id="top"
    >
      <HomeNavbar />

      <section className="meditationSection">
        <div className="meditationInner">
          <MeditationLibrary />
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
