import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

import Navbar from "../../components/Navbar";
import GoldBlogSection from "../../components/GoldBlogSection";
import FooterSection from "../../components/FooterSection";
import ContinueGlance from "../../components/platform/ContinueGlance";
import { isGoldBlogPostId } from "../../lib/goldblog/posts";
import { SITE_NAME } from "../../lib/seo";
import "../../styles/home.css";

const pageUrl = "https://goldkozmos.com/goldblog";

export const metadata: Metadata = {
  title: "GoldBlog | Kişisel Gelişim, Stoa ve Öz Farkındalık",

  description:
    "GoldBlog'da kişisel gelişim, Stoa felsefesi, özdeğer, ilişkiler, insan davranışları, bolluk, sosyoloji ve spiritüel farkındalık üzerine içerikleri keşfet.",

  alternates: {
    canonical: pageUrl,
  },

  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: pageUrl,
    siteName: SITE_NAME,

    title:
      "GoldBlog | Kişisel Gelişim, Stoa ve Öz Farkındalık",

    description:
      "Kişisel gelişim, Stoa, özdeğer, ilişkiler, sosyoloji, insan davranışları ve spiritüel farkındalık üzerine Goldkozmos® içerikleri.",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "GoldBlog | Kişisel Gelişim, Stoa ve Öz Farkındalık",

    description:
      "Kişisel gelişim, Stoa, ilişkiler, özdeğer ve insanı anlamaya yönelik Goldkozmos® içeriklerini keşfet.",
  },
};

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${pageUrl}/#blog`,
  url: pageUrl,
  name: "GoldBlog",
  description:
    "Kişisel gelişim, Stoa, sosyoloji, özdeğer, ilişkiler, insan davranışları, bolluk ve spiritüel farkındalık üzerine Goldkozmos® içerikleri.",
  inLanguage: "tr-TR",

  publisher: {
    "@id": "https://goldkozmos.com/#organization",
  },

  isPartOf: {
    "@id": "https://goldkozmos.com/#website",
  },

  about: [
    {
      "@type": "Thing",
      name: "Kişisel Gelişim",
    },
    {
      "@type": "Thing",
      name: "Stoa Felsefesi",
    },
    {
      "@type": "Thing",
      name: "Öz Farkındalık",
    },
    {
      "@type": "Thing",
      name: "Özdeğer",
    },
    {
      "@type": "Thing",
      name: "İlişkiler",
    },
    {
      "@type": "Thing",
      name: "İnsan Davranışları",
    },
    {
      "@type": "Thing",
      name: "Sosyoloji",
    },
    {
      "@type": "Thing",
      name: "Spiritüel Farkındalık",
    },
  ],
};

type PageProps = {
  searchParams: Promise<{ yazi?: string | string[] }>;
};

export default async function GoldBlogPage({ searchParams }: PageProps) {
  const query = await searchParams;
  const raw = Array.isArray(query.yazi) ? query.yazi[0] : query.yazi;
  if (raw && isGoldBlogPostId(raw)) {
    permanentRedirect(`/goldblog/${raw}`);
  }

  return (
    <main
      className="homePage goldblogPage"
      id="top"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogJsonLd),
        }}
      />

      <Navbar />

      <ContinueGlance platformId="goldblog" variant="page" />

      <GoldBlogSection />

      <FooterSection />
    </main>
  );
}