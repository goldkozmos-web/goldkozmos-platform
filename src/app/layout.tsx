import type {
  Metadata,
  Viewport,
} from "next";

import GlobalContactDock from "../components/GlobalContactDock";
import MobileBottomBar from "../components/MobileBottomBar";
import PlatformFlowRoot from "../components/platform/PlatformFlowRoot";

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
      "Goldkozmos® | Kişisel Gelişim, Stoa ve Rezonans Ekolü",
    template: "%s | Goldkozmos®",
  },

  description:
    "Goldkozmos® Rezonans Ekolü; kişisel gelişim, Stoa, sosyoloji, kendilik, ilişkiler, bolluk, öz farkındalık, enerji ve spiritüel farkındalık alanlarını bir araya getiren içerik ve çalışma ekosistemidir.",

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
      "Goldkozmos® | Kişisel Gelişim, Stoa ve Rezonans Ekolü",

    description:
      "Kendilik, ilişkiler, bolluk, kişisel gelişim, Stoa, sosyoloji, enerji ve öz farkındalık üzerine Goldkozmos® Rezonans Ekolü içerikleri ve çalışmaları.",

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
      "Goldkozmos® | Kişisel Gelişim, Stoa ve Rezonans Ekolü",

    description:
      "Kendilik, ilişkiler, bolluk, Stoa, sosyoloji, enerji ve kişisel farkındalık üzerine Goldkozmos® içerikleri.",

    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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

  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/icon.png`,
  },

  description:
    "Kişisel gelişim, Stoa, sosyoloji, kendilik, ilişkiler, bolluk, enerji ve öz farkındalık alanlarını bir araya getiren Goldkozmos® Rezonans Ekolü.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>
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
          {children}
          <GlobalContactDock />
          <MobileBottomBar />
        </PlatformFlowRoot>
      </body>
    </html>
  );
}