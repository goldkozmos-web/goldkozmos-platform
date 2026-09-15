import type { Metadata } from "next";

import { SITE_ORIGIN } from "./site";

export const SITE_NAME = "GoldKozmos";

export const DEFAULT_TITLE =
  "GoldKozmos® | Kişisel Gelişim, Stoa ve Rezonans";

export const DEFAULT_DESCRIPTION =
  "GoldKozmos®; kişisel gelişim, Stoa, kendilik, ilişkiler, bolluk ve rezonans çalışmaları. Rüya tabirleri, tarot, burçlar ve GoldBlog yazıları.";

export const AUTHOR_NAME = "Özge Batıgün";

export const SOCIAL_SAME_AS = [
  "https://www.instagram.com/goldkozmos",
  "https://x.com/GoldKozmos",
  "https://www.tiktok.com/@goldkozmos",
  "https://www.youtube.com/@goldkozmos",
  "https://www.threads.com/@goldkozmos",
] as const;

export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "GoldKozmos",
};

export const noIndexFollow = {
  index: false,
  follow: true,
  googleBot: {
    index: false,
    follow: true,
  },
} satisfies Metadata["robots"];

export const indexFollow = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large" as const,
    "max-snippet": -1,
    "max-video-preview": -1,
  },
} satisfies Metadata["robots"];

export function absoluteUrl(path = "/") {
  if (!path || path === "/") return SITE_ORIGIN;
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

export function publicPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = absoluteTitle ? title : undefined;
  return {
    title: fullTitle ? { absolute: fullTitle } : title,
    description,
    alternates: { canonical: url },
    robots: indexFollow,
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url,
      siteName: SITE_NAME,
      title: fullTitle ?? title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle ?? title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

export function googleSiteVerification(): Metadata["verification"] {
  const code = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
  if (!code) return undefined;
  return { google: code };
}
