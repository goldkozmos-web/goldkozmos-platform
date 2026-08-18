import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";

export function generateMetadata(): Metadata {
  return {
    alternates: {
      canonical: "https://goldkozmos.com",
    },
  };
}

export default function HomePage() {
  return <HomePageClient />;
}