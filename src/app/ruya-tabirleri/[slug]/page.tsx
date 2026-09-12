import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import FooterSection from "../../../components/FooterSection";
import Navbar from "../../../components/Navbar";
import RuyaArticle from "../../../components/ruya/RuyaArticle";
import RuyaNoteForm from "../../../components/ruya/RuyaNoteForm";
import RuyaSearch from "../../../components/ruya/RuyaSearch";
import {
  dreamBySlug,
  publishedDreams,
} from "../../../data/ruya-tabirleri/catalog";
import { SITE_ORIGIN } from "../../../lib/site";
import { ruyaPath, ruyaUrl } from "../../../lib/ruya-tabirleri/urls";
import "../../../styles/home.css";
import "../../../styles/ruya-tabirleri.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return publishedDreams().map((dream) => ({ slug: dream.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const dream = dreamBySlug(slug);
  if (!dream) {
    return { robots: { index: false, follow: false } };
  }

  const url = ruyaUrl(dream.slug);
  return {
    title: { absolute: dream.seoTitle },
    description: dream.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "tr_TR",
      url,
      siteName: "Goldkozmos",
      title: dream.seoTitle,
      description: dream.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: dream.seoTitle,
      description: dream.metaDescription,
    },
    robots: { index: true, follow: true },
  };
}

export default async function RuyaDetayPage({ params }: PageProps) {
  const { slug } = await params;
  const dream = dreamBySlug(slug);
  if (!dream) notFound();

  const url = ruyaUrl(dream.slug);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Ana Sayfa",
          item: SITE_ORIGIN,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Rüya Tabirleri",
          item: ruyaUrl(),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: dream.title,
          item: url,
        },
      ],
    },
    ...(dream.faqs.length > 0
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: dream.faqs.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          },
        ]
      : []),
  ];

  return (
    <main className="homePage ruyaPage" id="top">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="ruyaWrap">
        <nav className="ruyaCrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span>/</span>
          <Link href={ruyaPath()}>Rüya Tabirleri</Link>
          <span>/</span>
          <span>{dream.title}</span>
        </nav>
        <RuyaSearch />
        <p className="ruyaEyebrow" style={{ marginTop: 28 }}>
          RÜYA TABİRİ
        </p>
        <h1>{dream.h1}</h1>
        <RuyaArticle dream={dream} />
        <RuyaNoteForm relatedSlug={dream.slug} />
      </div>
      <FooterSection />
    </main>
  );
}
