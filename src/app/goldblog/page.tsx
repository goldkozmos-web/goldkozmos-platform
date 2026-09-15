import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

import Navbar from "../../components/Navbar";
import GoldBlogSection from "../../components/GoldBlogSection";
import FooterSection from "../../components/FooterSection";
import ContinueGlance from "../../components/platform/ContinueGlance";
import { isGoldBlogPostId } from "../../lib/goldblog/posts";
import { publicPageMetadata } from "../../lib/seo";
import { breadcrumbJsonLd } from "../../lib/jsonld";
import "../../styles/home.css";
import "../../styles/hub-seo.css";

const pageUrl = "https://goldkozmos.com/goldblog";

export const metadata: Metadata = publicPageMetadata({
  title: "Kişisel Gelişim, İlişkiler ve Farkındalık Yazıları | GoldBlog",
  description:
    "GoldBlog: kendilik, ilişkiler, sınırlar, özdeğer, Stoa, farkındalık, bolluk, alışkanlıklar ve iletişim üzerine editoryal yazılar.",
  path: "/goldblog",
  absoluteTitle: true,
});

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
          __html: JSON.stringify([
            blogJsonLd,
            breadcrumbJsonLd([
              { name: "Ana Sayfa", path: "/" },
              { name: "GoldBlog", path: "/goldblog" },
            ]),
          ]),
        }}
      />

      <Navbar />

      <header className="goldblogSeoIntro">
        <h1>GoldBlog – Kişisel Gelişim Yazıları</h1>
        <p>
          GoldBlog, GoldKozmos’un editoryal yazı alanıdır. Meditasyon uygulaması,
          frekans kaydı veya tarot sözlüğü değildir. Kendilik, ilişkiler,
          sınırlar, özdeğer, Stoa, farkındalık, bolluk, alışkanlıklar ve
          iletişim konularında uzun form metinler yayınlanır. Kümeler yazıların
          etiketleriyle birbirine bağlanır; ayrı boş kategori sayfası yoktur.
        </p>
      </header>

      <ContinueGlance platformId="goldblog" variant="page" />

      <GoldBlogSection />

      <FooterSection />
    </main>
  );
}