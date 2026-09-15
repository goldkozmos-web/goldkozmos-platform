import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, OG_IMAGE, SITE_NAME } from "../lib/seo";
import { SITE_ORIGIN } from "../lib/site";
import "../styles/hub-seo.css";

export function generateMetadata(): Metadata {
  return {
    title: { absolute: DEFAULT_TITLE },
    description: DEFAULT_DESCRIPTION,
    alternates: {
      canonical: SITE_ORIGIN,
    },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url: SITE_ORIGIN,
      siteName: SITE_NAME,
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      images: [OG_IMAGE],
    },
  };
}

export default function HomePage() {
  return <HomePageClient />;
}