import type { Metadata } from "next";

import HomeNavbar from "../../components/HomeNavbar";
import ResonanceTrainingsSection from "../../components/ResonanceTrainingsSection";
import FooterSection from "../../components/FooterSection";
import "../../styles/home.css";

const pageUrl = "https://goldkozmos.com/rezonans-egitimleri";

const pageTitle = "Rezonans Eğitimleri | GoldKozmos";

const pageDescription =
  "GoldKozmos Rezonans Eğitimleri ile kendilik, ilişkiler ve bolluk alanındaki davranış kalıplarını keşfetmeye yönelik eğitim içeriklerini inceleyin.";

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
        alt: "GoldKozmos Rezonans Eğitimleri",
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

const educationPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${pageUrl}/#webpage`,
  url: pageUrl,
  name: pageTitle,
  description: pageDescription,
  inLanguage: "tr-TR",

  isPartOf: {
    "@id": "https://goldkozmos.com/#website",
  },

  publisher: {
    "@id": "https://goldkozmos.com/#organization",
  },
};

export default function ResonanceTrainingsPage() {
  return (
    <main
      className="homeV3Page rezonansEgitimleriPage"
      id="top"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(educationPageJsonLd),
        }}
      />

      <HomeNavbar />

      <ResonanceTrainingsSection
        headingLevel="h1"
        showComingSoonPanel
        description="Kendini, ilişkilerini ve hayatındaki tekrar eden kalıpları daha derinden anlamana yardımcı olacak kapsamlı eğitim alanı."
      />

      <FooterSection />
    </main>
  );
}
