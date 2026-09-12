import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import FooterSection from "../../../components/FooterSection";
import HomeNavbar from "../../../components/HomeNavbar";
import { relatedTarotOf, tarotBySlug } from "../../../data/tarot/catalog";
import { TAROT_DECK } from "../../../data/tarot/deck";
import { SITE_ORIGIN } from "../../../lib/site";
import {
  TAROT_CARE_PATH,
  tarotCardPath,
  tarotCardsUrl,
  tarotImagePath,
} from "../../../lib/tarot/urls";
import "../../../styles/home.css";
import "../../../styles/tarot-bakimi.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return TAROT_DECK.map((card) => ({ slug: card.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const card = tarotBySlug(slug);
  if (!card) return { robots: { index: false, follow: false } };
  const url = tarotCardsUrl(card.slug);
  return {
    title: { absolute: card.seoTitle },
    description: card.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "tr_TR",
      url,
      siteName: "Goldkozmos",
      title: card.seoTitle,
      description: card.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: card.seoTitle,
      description: card.metaDescription,
    },
    robots: { index: true, follow: true },
  };
}

function paras(text: string) {
  return text
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export default async function TarotKartDetayPage({ params }: PageProps) {
  const { slug } = await params;
  const card = tarotBySlug(slug);
  if (!card) notFound();

  const url = tarotCardsUrl(card.slug);
  const related = relatedTarotOf(card);
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
        name: "Tarot Kartları",
        item: tarotCardsUrl(),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: card.name,
        item: url,
      },
    ],
  };

  return (
    <main className="homeV3Page tarotPage" id="top">
      <HomeNavbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="tarotWrap">
        <nav className="tarotCrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span>/</span>
          <Link href="/tarot-kartlari">Tarot Kartları</Link>
          <span>/</span>
          <span>{card.name}</span>
        </nav>
        <p className="tarotEyebrow">TAROT KARTI</p>
        <h1>{card.h1}</h1>
        <img
          src={tarotImagePath(card.slug)}
          alt={`${card.name} tarot kartı`}
          style={{ width: "min(280px, 100%)", margin: "22px 0", borderRadius: 18 }}
        />
        <article className="tarotArticle">
          <h2>Genel Anlamı</h2>
          {paras(card.general).map((item) => (
            <p key={item.slice(0, 40)}>{item}</p>
          ))}
          <h2>Spiritüel Anlamı</h2>
          {paras(card.spiritual).map((item) => (
            <p key={item.slice(0, 40)}>{item}</p>
          ))}
          <h2>Enerjisi</h2>
          {paras(card.energy).map((item) => (
            <p key={item.slice(0, 40)}>{item}</p>
          ))}
          <h2>Aşk ve İlişkilerde Anlamı</h2>
          {paras(card.love).map((item) => (
            <p key={item.slice(0, 40)}>{item}</p>
          ))}
          <h2>Karşı Tarafın Duygularında Anlamı</h2>
          {paras(card.otherFeelings).map((item) => (
            <p key={item.slice(0, 40)}>{item}</p>
          ))}
          <h2>Kariyer ve Para Açısından</h2>
          {paras(card.career).map((item) => (
            <p key={item.slice(0, 40)}>{item}</p>
          ))}
          <h2>Olası Gelecek Açısından</h2>
          {paras(card.future).map((item) => (
            <p key={item.slice(0, 40)}>{item}</p>
          ))}
          <h2>Tavsiye Olarak Geldiğinde</h2>
          {paras(card.advice).map((item) => (
            <p key={item.slice(0, 40)}>{item}</p>
          ))}
          <h2>Ters Geldiğinde Anlamı</h2>
          {paras(card.reversed).map((item) => (
            <p key={item.slice(0, 40)}>{item}</p>
          ))}
          <h2>Kartın Sembolleri</h2>
          {paras(card.symbols).map((item) => (
            <p key={item.slice(0, 40)}>{item}</p>
          ))}
          {related.length > 0 ? (
            <>
              <h2>Benzer / ilişkili kartlar</h2>
              <ul className="tarotRelated">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link href={tarotCardPath(item.slug)}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </article>
        <p style={{ marginTop: 28 }}>
          <Link href={TAROT_CARE_PATH}>Online Tarot Bakımı Yap</Link>
        </p>
      </div>
      <FooterSection />
    </main>
  );
}
