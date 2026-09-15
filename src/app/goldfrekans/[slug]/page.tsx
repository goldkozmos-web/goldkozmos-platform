import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import FooterSection from "../../../components/FooterSection";
import HomeNavbar from "../../../components/HomeNavbar";
import GoldFrekansPlayButton from "../../../components/goldfrekans/GoldFrekansPlayButton";
import {
  GOLDFREKANS_TRACKS,
  goldFrekansBySlug,
  relatedGoldFrekans,
} from "../../../data/goldfrekans/tracks";
import { breadcrumbJsonLd } from "../../../lib/jsonld";
import { OG_IMAGE, SITE_NAME, indexFollow } from "../../../lib/seo";
import { SITE_ORIGIN } from "../../../lib/site";
import "../../../styles/home.css";
import "../../../styles/hub-seo.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return GOLDFREKANS_TRACKS.map((track) => ({ slug: track.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const track = goldFrekansBySlug(slug);
  if (!track) return { robots: { index: false, follow: false } };
  const url = `${SITE_ORIGIN}/goldfrekans/${track.slug}`;
  return {
    title: { absolute: track.seoTitle },
    description: track.metaDescription,
    alternates: { canonical: url },
    robots: indexFollow,
    openGraph: {
      type: "article",
      locale: "tr_TR",
      url,
      siteName: SITE_NAME,
      title: track.seoTitle,
      description: track.metaDescription,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: track.seoTitle,
      description: track.metaDescription,
      images: [OG_IMAGE.url],
    },
  };
}

export default async function GoldFrekansTrackPage({ params }: PageProps) {
  const { slug } = await params;
  const track = goldFrekansBySlug(slug);
  if (!track) notFound();
  const related = relatedGoldFrekans(track.slug);
  const path = `/goldfrekans/${track.slug}`;
  const jsonLd = breadcrumbJsonLd([
    { name: "Ana Sayfa", path: "/" },
    { name: "GoldFrekans", path: "/goldfrekans" },
    { name: track.h1, path },
  ]);

  return (
    <main className="homeV3Page goldFrekansPage" id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeNavbar />
      <article className="goldbookLanding tarotArticle">
        <nav aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span> / </span>
          <Link href="/goldfrekans">GoldFrekans</Link>
          <span> / </span>
          <span>{track.h1}</span>
        </nav>
        <p className="goldFrekansEyebrow">{track.category}</p>
        <h1>{track.h1}</h1>
        <img
          src={track.thumbnail}
          alt=""
          width={480}
          height={270}
          style={{ width: "min(480px, 100%)", height: "auto", margin: "20px 0" }}
        />
        <h2>Bu ses nedir?</h2>
        <p>{track.about}</p>
        <h2>Nasıl dinlenir?</h2>
        <p>{track.howToListen}</p>
        <GoldFrekansPlayButton track={track} />
        <h2>Önerilen kullanım</h2>
        <p>{track.context}</p>
        <h2>Benzer GoldFrekans içerikleri</h2>
        <ul>
          {related.map((item) => (
            <li key={item.slug}>
              <Link href={`/goldfrekans/${item.slug}`}>{item.title}</Link>
            </li>
          ))}
        </ul>
        <p>
          <Link href="/goldfrekans">GoldFrekans ana sayfasına dön</Link>
        </p>
      </article>
      <FooterSection />
    </main>
  );
}
