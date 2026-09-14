import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import Link from "next/link";

import FooterSection from "../../../components/FooterSection";
import HomeNavbar from "../../../components/HomeNavbar";
import MatchArticleView from "../../../components/burclar/MatchArticle";
import { matchBySlug } from "../../../lib/burclar/compose-match";
import { allCanonicalPairs, canonicalPair, parsePairSlug } from "../../../lib/burclar/pairs";
import { uyumUrl } from "../../../lib/burclar/urls";
import { SITE_ORIGIN } from "../../../lib/site";
import "../../../styles/home.css";
import "../../../styles/burclar.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const canonical = allCanonicalPairs().map((pair) => ({ slug: pair.slug }));
  const aliases = allCanonicalPairs()
    .filter((pair) => pair.a.id !== pair.b.id)
    .map((pair) => ({ slug: `${pair.b.id}-${pair.a.id}` }));
  return [...canonical, ...aliases];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parsePairSlug(slug);
  if (!parsed) return { robots: { index: false, follow: false } };
  const pair = canonicalPair(parsed[0], parsed[1]);
  if (pair.slug !== slug) {
    return {
      robots: { index: false, follow: true },
      alternates: { canonical: uyumUrl(pair.slug) },
    };
  }
  const match = matchBySlug(slug);
  if (!match) return { robots: { index: false, follow: false } };
  const url = uyumUrl(match.slug);
  return {
    title: { absolute: match.seoTitle },
    description: match.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "tr_TR",
      url,
      siteName: "Goldkozmos",
      title: match.seoTitle,
      description: match.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: match.seoTitle,
      description: match.metaDescription,
    },
    robots: { index: true, follow: true },
  };
}

export default async function BurcUyumuPage({ params }: PageProps) {
  const { slug } = await params;
  const parsed = parsePairSlug(slug);
  if (!parsed) notFound();
  const pair = canonicalPair(parsed[0], parsed[1]);
  if (pair.slug !== slug) {
    permanentRedirect(`/burc-uyumu/${pair.slug}`);
  }
  const match = matchBySlug(slug);
  if (!match) notFound();
  const url = uyumUrl(match.slug);
  const jsonLd = {
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
        name: "Burç Aşk Uyumu",
        item: uyumUrl(),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: match.h1,
        item: url,
      },
    ],
  };

  return (
    <main className="homeV3Page burcPage" id="top">
      <HomeNavbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="burcWrap">
        <nav className="burcCrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span>/</span>
          <Link href="/burclar">Burç Yorumları</Link>
          <span>/</span>
          <Link href="/burc-uyumu">Aşk Uyumu</Link>
          <span>/</span>
          <span>{match.h1}</span>
        </nav>
        <p className="burcEyebrow">
          {match.a.symbol} {match.a.name} · {match.b.symbol} {match.b.name}
        </p>
        <h1>{match.h1}</h1>
        <MatchArticleView match={match} />
      </div>
      <FooterSection />
    </main>
  );
}
