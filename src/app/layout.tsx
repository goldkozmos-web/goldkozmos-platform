import SiteChat from "../components/SiteChat";
import LaunchIntro from "../components/LaunchIntro";
import SiteAnalytics from "../components/analytics/SiteAnalytics";
import "../styles/analytics-consent.css";
import type {
  Metadata,
  Viewport,
} from "next";

import GlobalContactDock from "../components/GlobalContactDock";
import MobileBottomBar from "../components/MobileBottomBar";
import PlatformFlowRoot from "../components/platform/PlatformFlowRoot";
import "../styles/daily-practice.css";
import PresenceTracker from "../components/presence/PresenceTracker";
import RouteFade from "../components/RouteFade";
import MemberInvite from "../components/MemberInvite";
import PublicOnly from "../components/panel/PublicOnly";
import TelegramInvite from "../components/TelegramInvite";
import PublicLiveActivity from "../components/PublicLiveActivity";
import SiteZoom from "../components/SiteZoom";

import "../styles/home.css";
import "../styles/mobile-v2.css";
import "../styles/platform-flow.css";
import "../styles/mobile-bottom-bar.css";

const siteUrl = "https://goldkozmos.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  applicationName: "Goldkozmos",

  title: {
    default:
      "Goldkozmos® | Kozmik Enerji ve Kişisel Gelişim",
    template: "%s | Goldkozmos®",
  },

  description:
    "Özge Batıgün ile online kozmik enerji ve kişisel gelişim çalışmaları. Çakra dengeleme ve birebir seansları incele, çalışma satın al veya randevu talebi oluştur.",

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName: "Goldkozmos",

    title:
      "Goldkozmos® | Kozmik Enerji ve Kişisel Gelişim",

    description:
      "Online kozmik enerji ve kişisel gelişim çalışmaları, birebir seanslar ve farkındalık içerikleri.",

    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Goldkozmos Rezonans Ekolü",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Goldkozmos® | Kozmik Enerji ve Kişisel Gelişim",

    description:
      "Kozmik enerji ve kişisel gelişim: online çalışmalar, seanslar ve dijital içerikler.",

    images: ["/opengraph-image"],
  },

  appleWebApp: {
    capable: true,
    title: "Goldkozmos",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,

  themeColor: "#1b1009",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,

  url: siteUrl,

  name: "Goldkozmos",

  alternateName:
    "Goldkozmos® Rezonans Ekolü",

  inLanguage: "tr-TR",

  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,

  name: "Goldkozmos",

  alternateName:
    "Goldkozmos® Rezonans Ekolü",

  url: siteUrl,

  founder: { "@type": "Person", "@id": `${siteUrl}/hakkimda#ozge-batigun`, name: "Özge Batıgün", url: `${siteUrl}/hakkimda` },
  sameAs: ["https://www.instagram.com/goldkozmos/", "https://youtube.com/@goldkozmos", "https://www.tiktok.com/@goldkozmos", "https://x.com/GoldKozmos"],
  contactPoint: { "@type": "ContactPoint", telephone: "+90-505-472-2153", contactType: "customer service", availableLanguage: "Turkish", url: `${siteUrl}/iletisim` },
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/icon.png`,
  },

  description:
    "Özge Batıgün tarafından kurulan Goldkozmos: kozmik enerji, online birebir çalışmalar ve kişisel gelişim içerikleri.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>
        <PublicOnly><LaunchIntro /></PublicOnly>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              websiteJsonLd
            ),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              organizationJsonLd
            ),
          }}
        />

        <PlatformFlowRoot>
          <PresenceTracker />
          <SiteAnalytics measurementId={process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID} />
          <RouteFade>{children}</RouteFade>
          <PublicOnly><GlobalContactDock />
          <MobileBottomBar />
          <MemberInvite />
          <TelegramInvite /><PublicLiveActivity /><SiteChat /></PublicOnly>
        </PlatformFlowRoot>
        <SiteZoom />
      </body>
    </html>
  );
}
