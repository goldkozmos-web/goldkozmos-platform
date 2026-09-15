import type { Metadata, Viewport } from "next";

import GlobalContactDock from "../components/GlobalContactDock";
import MobileBottomBar from "../components/MobileBottomBar";
import PlatformFlowRoot from "../components/platform/PlatformFlowRoot";
import "../styles/daily-practice.css";
import PresenceTracker from "../components/presence/PresenceTracker";
import ServiceWorkerRegister from "../components/ServiceWorkerRegister";
import RouteFade from "../components/RouteFade";

import "../styles/home.css";
import "../styles/mobile-v2.css";
import "../styles/platform-flow.css";
import "../styles/mobile-bottom-bar.css";
import { organizationJsonLd, websiteJsonLd } from "../lib/jsonld";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  OG_IMAGE,
  SITE_NAME,
  googleSiteVerification,
  indexFollow,
} from "../lib/seo";
import { SITE_ORIGIN } from "../lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  applicationName: SITE_NAME,
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  robots: indexFollow,
  verification: googleSiteVerification(),
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE_ORIGIN,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#1b1009",
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
            __html: JSON.stringify(websiteJsonLd()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
        <PlatformFlowRoot>
          <PresenceTracker />
          <ServiceWorkerRegister />
          <RouteFade>{children}</RouteFade>
          <GlobalContactDock />
          <MobileBottomBar />
        </PlatformFlowRoot>
      </body>
    </html>
  );
}
