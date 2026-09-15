import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import FooterSection from "../../../components/FooterSection";
import HomeNavbar from "../../../components/HomeNavbar";
import RitualDetailActions from "../../../components/goldrituel/RitualDetailActions";
import {
  publishedRituals,
  ritualBySlug,
} from "../../../data/goldrituel/catalog";
import { SITE_ORIGIN } from "../../../lib/site";
import { similarRituals } from "../../../lib/goldrituel/search";
import { goldrituelPath, goldrituelUrl } from "../../../lib/goldrituel/urls";
import "../../../styles/home.css";
import "../../../styles/goldrituel.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return publishedRituals().map((ritual) => ({ slug: ritual.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const ritual = ritualBySlug(slug);
  if (!ritual) {
    return { robots: { index: false, follow: false } };
  }

  const url = goldrituelUrl(ritual.slug);
  const title = `${ritual.title} | GoldRitüel`;
  return {
    title: { absolute: title },
    description: ritual.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "tr_TR",
      url,
      siteName: "Goldkozmos",
      title,
      description: ritual.summary,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: ritual.summary,
    },
    robots: { index: true, follow: true },
  };
}

export default async function GoldRituelDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const ritual = ritualBySlug(slug);
  if (!ritual) notFound();

  const similar = similarRituals(ritual, publishedRituals());
  const url = goldrituelUrl(ritual.slug);

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
          name: "GoldRitüel",
          item: goldrituelUrl(),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: ritual.title,
          item: url,
        },
      ],
    },
    {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: ritual.title,
    description: ritual.summary,
    url,
    totalTime: ritual.duration,
    image: `${SITE_ORIGIN}${ritual.image}`,
    step: ritual.steps.map((text, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      text,
    })),
    },
  ];

  return (
    <main className="homeV3Page grPage" id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeNavbar />
      <div className="grWrap">
        <nav className="grCrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span>/</span>
          <Link href={goldrituelPath()}>GoldRitüel</Link>
          <span>/</span>
          <span>{ritual.title}</span>
        </nav>

        <p className="grEyebrow">GOLDRİTÜEL</p>
        <h1>{ritual.title}</h1>
        <p className="grLead">{ritual.summary}</p>

        <div className="grHero">
          <img src={ritual.image} alt={`${ritual.title} görseli`} />
        </div>
        <div className="grMeta" style={{ marginTop: 14 }}>
          <span>{ritual.duration}</span>
          <span>{ritual.materials.length} malzeme</span>
        </div>

        <section className="grSection">
          <h2>Kısa tanıtım</h2>
          <p>{ritual.intro}</p>
        </section>
        <section className="grSection">
          <h2>Bu ritüelin amacı</h2>
          <p>{ritual.purpose}</p>
        </section>
        <section className="grSection">
          <h2>Ne zaman yapılır</h2>
          <p>{ritual.when}</p>
        </section>
        <section className="grSection">
          <h2>Gerekli malzemeler</h2>
          <ul>
            {ritual.materials.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="grSection">
          <h2>Uygulama adımları</h2>
          <ol>
            {ritual.steps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </section>

        <blockquote className="grIntent">{ritual.intention}</blockquote>

        <section className="grSection">
          <h2>Ritüelden sonra</h2>
          <p>{ritual.after}</p>
        </section>

        <RitualDetailActions ritual={ritual} />

        {similar.length > 0 ? (
          <section className="grSection">
            <h2>Benzer ritüeller</h2>
            <div className="grSimilar">
              {similar.map((item) => (
                <Link key={item.slug} href={goldrituelPath(item.slug)}>
                  <strong>{item.title}</strong>
                  <span>{item.summary}</span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
      <FooterSection />
    </main>
  );
}
