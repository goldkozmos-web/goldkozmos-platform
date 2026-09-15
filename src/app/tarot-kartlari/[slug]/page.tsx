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
      siteName: "GoldKozmos",
      title: card.seoTitle,
      description: card.metaDescription,
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: card.seoTitle,
      description: card.metaDescription,
      images: ["/opengraph-image"],
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
          width={280}
          height={460}
          fetchPriority="high"
          style={{ width: "min(280px, 100%)", height: "auto", margin: "22px 0", borderRadius: 18 }}
        />
        <article className="tarotArticle">
          <h2 id="genel-anlam">Genel Anlamı</h2>
          {paras(card.generalMeaning).map((item) => (
            <p key={`g-${item.slice(0, 40)}`}>{item}</p>
          ))}
          <h2>Spiritüel Anlamı</h2>
          {paras(card.spiritualMeaning).map((item) => (
            <p key={`sp-${item.slice(0, 40)}`}>{item}</p>
          ))}
          <h2 id="ask">Aşk ve İlişkiler</h2>
          {paras(card.loveMeaning).map((item) => (
            <p key={`l-${item.slice(0, 40)}`}>{item}</p>
          ))}
          <h2 id="dusunceler">Birinin Düşüncelerinde</h2>
          {paras(card.thoughtsMeaning).map((item) => (
            <p key={`t-${item.slice(0, 40)}`}>{item}</p>
          ))}
          <h2 id="duygular">Birinin Duygularında</h2>
          {paras(card.feelingsMeaning).map((item) => (
            <p key={`f-${item.slice(0, 40)}`}>{item}</p>
          ))}
          <h2 id="olasi-hareket">Olası Hareketinde</h2>
          {paras(card.actionMeaning).map((item) => (
            <p key={`a-${item.slice(0, 40)}`}>{item}</p>
          ))}
          <h2 id="kariyer">Kariyer ve Para</h2>
          {paras(`${card.careerMeaning}\n\n${card.moneyMeaning}`).map((item) => (
            <p key={`c-${item.slice(0, 40)}`}>{item}</p>
          ))}
          <h2>Gelecek Potansiyeli</h2>
          {paras(card.futurePotential).map((item) => (
            <p key={`fu-${item.slice(0, 40)}`}>{item}</p>
          ))}
          <h2 id="tavsiye">Tavsiye</h2>
          {paras(card.adviceMeaning).map((item) => (
            <p key={`ad-${item.slice(0, 40)}`}>{item}</p>
          ))}
          <h2>Gölge Yönü</h2>
          {paras(card.shadowMeaning).map((item) => (
            <p key={`sh-${item.slice(0, 40)}`}>{item}</p>
          ))}
          <h2 id="ters-anlam">Ters Anlamı</h2>
          {paras(card.reversedMeaning).map((item) => (
            <p key={`r-${item.slice(0, 40)}`}>{item}</p>
          ))}
          <h2>Semboller</h2>
          {paras(card.symbols).map((item) => (
            <p key={`sy-${item.slice(0, 40)}`}>{item}</p>
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
          <Link href="/tarot-kartlari">Tarot Kartları sözlüğüne dön</Link>
          {" · "}
          <Link href={TAROT_CARE_PATH}>Online Tarot Bakımı Yap</Link>
        </p>
      </div>
      <FooterSection />
    </main>
  );
}
