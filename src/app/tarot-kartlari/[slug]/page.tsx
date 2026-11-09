import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import FooterSection from "../../../components/FooterSection";
import HomeNavbar from "../../../components/HomeNavbar";
import EnergyDiscoveryLinks from "../../../components/energy/EnergyDiscoveryLinks";
import "../../../styles/energy-discovery.css";
import { relatedTarotOf, tarotBySlug } from "../../../data/tarot/catalog";
import { TAROT_DECK } from "../../../data/tarot/deck";
import { tarotSearchImprovements } from "../../../data/tarot/searchImprovements";
import { SITE_ORIGIN } from "../../../lib/site";
import {
  TAROT_CARE_PATH,
  tarotCardPath,
  tarotCardsUrl,
  tarotImagePath,
} from "../../../lib/tarot/urls";
import "../../../styles/home.css";
import "../../../styles/tarot-bakimi.css";
import "../../../styles/tarot-premium.css";

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
  const search = tarotSearchImprovements[card.slug];
  const title = search?.title ?? card.seoTitle;
  const description = search?.description ?? card.metaDescription;
  const imagePath = tarotImagePath(card.slug);
  const shareImage = `${SITE_ORIGIN}${imagePath.endsWith(".webp") ? imagePath : "/images/home/shortcuts/tarot.webp"}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "tr_TR",
      url,
      siteName: "Goldkozmos",
      title,
      description,
      images: [{ url: shareImage, alt: `${card.name} tarot kartı` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage],
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
    <main className="homeV3Page tarotPage tarotDetailPage" id="top">
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
        <header className="tarotDetailHero"><div className="tarotDetailPortrait"><Image src={tarotImagePath(card.slug)} alt={`${card.name} tarot kartı`} width={300} height={500} sizes="(max-width:600px) 180px, 250px" preload /></div><div><p className="tarotEyebrow">{card.arcana === "major" ? "BÜYÜK ARKANA" : "KÜÇÜK ARKANA"} · {card.number}</p><h1>{card.h1}</h1><div className="tarotThemeTags">{card.coreThemes.map(theme => <span key={theme}>{theme}</span>)}</div><p>{card.generalMeaning.split(/[.!?]/)[0]}.</p></div></header>
        <nav className="tarotDetailNav" aria-label="Kartın yorum alanları"><Link href="#genel">Genel anlam</Link><Link href="#ask">Aşk & ilişki</Link><Link href="#kariyer">Kariyer & para</Link><Link href="#ters">Ters anlam</Link><Link href="#semboller">Semboller</Link></nav>
        <article className="tarotArticle">
          <section className="tarotContextNote"><h2>Bu kartı okurken</h2><p>{card.name} açılımında önce <strong>{card.coreThemes[0]}</strong> temasının hangi yaşam alanında belirdiğine bak. Düz yorum temayla doğrudan teması; ters yorum aynı temada gecikme, aşırılık veya içe dönmeyi düşündürebilir. Sonucu kartın konumu ve çevresindeki kartlarla birlikte değerlendir.</p><p>Kartlar bir kişinin düşüncelerini doğrulamaz veya geleceği kesinleştirmez. Aşağıdaki yorumlar ilişkide gözlemleyebileceğin olasılıkları konuşmak için sembolik bir çerçevedir.</p></section>
          <h2 id="genel">Genel Anlamı</h2>
          {paras(card.generalMeaning).map((item) => (
            <p key={`g-${item.slice(0, 40)}`}>{item}</p>
          ))}
          <h2>Spiritüel Anlamı</h2>
          {paras(card.spiritualMeaning).map((item) => (
            <p key={`sp-${item.slice(0, 40)}`}>{item}</p>
          ))}
          <h2 id="ask">Aşk ve İlişkilerde</h2>
          {paras(card.loveMeaning).map((item) => (
            <p key={`l-${item.slice(0, 40)}`}>{item}</p>
          ))}
          <h2>Birinin Düşüncelerinde</h2>
          {paras(card.thoughtsMeaning).map((item) => (
            <p key={`t-${item.slice(0, 40)}`}>{item}</p>
          ))}
          <h2>Birinin Duygularında</h2>
          {paras(card.feelingsMeaning).map((item) => (
            <p key={`f-${item.slice(0, 40)}`}>{item}</p>
          ))}
          <h2>Birinin Olası Hareketinde</h2>
          {paras(card.actionMeaning).map((item) => (
            <p key={`a-${item.slice(0, 40)}`}>{item}</p>
          ))}
          <h2 id="kariyer">Kariyer ve Para</h2>
          {paras(`${card.careerMeaning}\n\n${card.moneyMeaning}`).map((item) => (
            <p key={`c-${item.slice(0, 40)}`}>{item}</p>
          ))}
          <h2>Olası Gelecek</h2>
          {paras(card.futurePotential).map((item) => (
            <p key={`fu-${item.slice(0, 40)}`}>{item}</p>
          ))}
          <h2>Tavsiye Olarak</h2>
          {paras(card.adviceMeaning).map((item) => (
            <p key={`ad-${item.slice(0, 40)}`}>{item}</p>
          ))}
          <h2>Gölge Yönü</h2>
          {paras(card.shadowMeaning).map((item) => (
            <p key={`sh-${item.slice(0, 40)}`}>{item}</p>
          ))}
          <h2 id="ters">Ters Geldiğinde</h2>
          {paras(card.reversedMeaning).map((item) => (
            <p key={`r-${item.slice(0, 40)}`}>{item}</p>
          ))}
          <h2 id="semboller">Kartın Sembolleri</h2>
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
          {tarotSearchImprovements[card.slug] && <section><h2>{tarotSearchImprovements[card.slug].question}</h2><p>{tarotSearchImprovements[card.slug].answer}</p></section>}
          <p className="tarotEditorialAttribution">GoldKozmos’un sembolik tarot rehberi. <Link href="/hakkimda">Özge Batıgün ve yaklaşımını tanı →</Link></p>
        </article>
        <EnergyDiscoveryLinks />
        <p style={{ marginTop: 28 }}>
          <Link href={TAROT_CARE_PATH}>Online Tarot Bakımı Yap</Link>
        </p>
      </div>
      <FooterSection />
    </main>
  );
}
