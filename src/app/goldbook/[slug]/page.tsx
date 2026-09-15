import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import FooterSection from "../../../components/FooterSection";
import Navbar from "../../../components/Navbar";
import {
  GOLDBOOKS,
  goldBookBySlug,
  otherGoldBooks,
} from "../../../data/goldbook/books";
import { breadcrumbJsonLd } from "../../../lib/jsonld";
import { OG_IMAGE, SITE_NAME, indexFollow } from "../../../lib/seo";
import { SITE_ORIGIN } from "../../../lib/site";
import "../../../styles/home.css";
import "../../../styles/hub-seo.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return GOLDBOOKS.map((book) => ({ slug: book.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = goldBookBySlug(slug);
  if (!book) return { robots: { index: false, follow: false } };
  const url = `${SITE_ORIGIN}/goldbook/${book.slug}`;
  return {
    title: { absolute: book.seoTitle },
    description: book.metaDescription,
    alternates: { canonical: url },
    robots: indexFollow,
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url,
      siteName: SITE_NAME,
      title: book.seoTitle,
      description: book.metaDescription,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: book.seoTitle,
      description: book.metaDescription,
      images: [OG_IMAGE.url],
    },
  };
}

export default async function GoldBookLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const book = goldBookBySlug(slug);
  if (!book) notFound();
  const others = otherGoldBooks(book.slug);
  const path = `/goldbook/${book.slug}`;
  const jsonLd = breadcrumbJsonLd([
    { name: "Ana Sayfa", path: "/" },
    { name: "GoldBook", path: "/goldbook" },
    { name: book.title, path },
  ]);

  return (
    <main className="goldbookCompactPage homePage" id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <article className="goldbookLanding">
        <nav aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span> / </span>
          <Link href="/goldbook">GoldBook</Link>
          <span> / </span>
          <span>{book.title}</span>
        </nav>
        <p>{book.category}</p>
        <h1>{book.h1}</h1>
        <img src={book.image} alt="" width={220} height={320} />
        {book.landing.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
        <h2>Kitabın odağı</h2>
        <ul>
          {book.focus.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h2>Kitap bilgileri</h2>
        <ul>
          {book.info.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>{book.price}</p>
        <p>
          <a href={book.shopier} target="_blank" rel="noreferrer">
            Shopier’den Al
          </a>
        </p>
        {others.length > 0 ? (
          <>
            <h2>Diğer GoldBook</h2>
            <ul>
              {others.map((item) => (
                <li key={item.slug}>
                  <Link href={`/goldbook/${item.slug}`}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}
        <p>
          <Link href="/goldbook">GoldBook kütüphanesine dön</Link>
        </p>
      </article>
      <FooterSection />
    </main>
  );
}
