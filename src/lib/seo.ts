import type { Metadata } from "next";
import { SITE_ORIGIN } from "./site";

export function pageMetadata(path: string, title: string, description: string, image = "/opengraph-image"): Metadata {
  const url = `${SITE_ORIGIN}${path}`;
  const fullTitle = `${title} | Goldkozmos®`;
  return {
    title: { absolute: fullTitle }, description,
    alternates: { canonical: url },
    openGraph: { type: "website", locale: "tr_TR", siteName: "Goldkozmos", url, title: fullTitle, description, images: [{ url: image, alt: title }] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image] },
  };
}

export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
