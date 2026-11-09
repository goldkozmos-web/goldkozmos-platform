import type { Metadata } from "next";

import Navbar from "../../components/Navbar";
import GoldBlogEditorial from "../../components/GoldBlogEditorial";
import FooterSection from "../../components/FooterSection";
import ContinueGlance from "../../components/platform/ContinueGlance";
import "../../styles/home.css";
import "../../styles/blog-article.css";
import "../../styles/goldblog-editorial.css";
import "../../styles/goldblog-compact-guides.css";

const pageUrl = "https://goldkozmos.com/goldblog";

export const metadata: Metadata = {
  title: "GoldBlog | Çakralar, Kozmik Enerji ve Farkındalık",

  description:
    "Çakralar nedir, kozmik enerji nasıl anlatılır? Enerji çalışmaları, 7 çakra, Stoa, ilişkiler ve öz farkındalık üzerine GoldBlog rehberlerini keşfet.",

  alternates: {
    canonical: pageUrl,
  },

  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: pageUrl,
    siteName: "Goldkozmos",

    title:
      "GoldBlog | Çakralar, Kozmik Enerji ve Farkındalık",

    description:
      "Kişisel gelişim, Stoa, özdeğer, ilişkiler, sosyoloji, insan davranışları ve spiritüel farkındalık üzerine Goldkozmos® içerikleri.",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "GoldBlog | Çakralar, Kozmik Enerji ve Farkındalık",

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

export default function GoldBlogPage() {
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

      <GoldBlogEditorial />

      <FooterSection />
    </main>
  );
}
