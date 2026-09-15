import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import FooterSection from "../../../components/FooterSection";
import HomeNavbar from "../../../components/HomeNavbar";
import BurcSearch from "../../../components/burclar/BurcSearch";
import ProfileArticle from "../../../components/burclar/ProfileArticle";
import SignOverviewArticle from "../../../components/burclar/SignOverviewArticle";
import { SIGNS, signBySlug } from "../../../data/burclar/signs";
import {
  composeOverviewMeta,
  composeProfileMeta,
  resolveGenderPage,
} from "../../../lib/burclar/search";
import { burclarUrl } from "../../../lib/burclar/urls";
import { OG_IMAGE, SITE_NAME, indexFollow } from "../../../lib/seo";
import { SITE_ORIGIN } from "../../../lib/site";
import "../../../styles/home.css";
import "../../../styles/burclar.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SIGNS.flatMap((sign) => [
    { slug: sign.slug },
    { slug: `${sign.slug}-kadini` },
    { slug: `${sign.slug}-erkegi` },
  ]);
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const gender = resolveGenderPage(slug);
  if (gender) {
    const page = composeProfileMeta(gender.sign, gender.gender);
    const url = burclarUrl(page.slug);
    return {
      title: { absolute: page.seoTitle },
      description: page.metaDescription,
      alternates: { canonical: url },
      openGraph: {
        type: "article",
        locale: "tr_TR",
        url,
        siteName: SITE_NAME,
        title: page.seoTitle,
        description: page.metaDescription,
        images: [OG_IMAGE],
      },
      twitter: {
        card: "summary_large_image",
        title: page.seoTitle,
        description: page.metaDescription,
        images: [OG_IMAGE.url],
      },
      robots: indexFollow,
    };
  }

  const sign = signBySlug(slug);
  if (!sign) {
    return { robots: { index: false, follow: false } };
  }
  const page = composeOverviewMeta(sign);
  const url = burclarUrl(page.slug);
  return {
    title: { absolute: page.seoTitle },
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "tr_TR",
      url,
      siteName: SITE_NAME,
      title: page.seoTitle,
      description: page.metaDescription,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: page.seoTitle,
      description: page.metaDescription,
      images: [OG_IMAGE.url],
    },
    robots: indexFollow,
  };
}

export default async function BurcProfilPage({ params }: PageProps) {
  const { slug } = await params;
  const gender = resolveGenderPage(slug);
  if (gender) {
    const page = composeProfileMeta(gender.sign, gender.gender);
    const url = burclarUrl(page.slug);
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
          name: "Burç Yorumları",
          item: burclarUrl(),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: gender.sign.name,
          item: burclarUrl(gender.sign.slug),
        },
        {
          "@type": "ListItem",
          position: 4,
          name: page.h1,
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
            <Link href={`/burclar/${gender.sign.slug}`}>{gender.sign.name}</Link>
            <span>/</span>
            <span>{page.h1}</span>
          </nav>
          <BurcSearch />
          <p className="burcEyebrow" style={{ marginTop: 28 }}>
            {page.sign.symbol} {page.sign.elementLabel} · {page.sign.modalityLabel}
          </p>
          <h1>{page.h1}</h1>
          <p className="burcMeta">
            {page.sign.dateRange} · {page.sign.rulingPlanets.join(" / ")}
          </p>
          <ProfileArticle
            sign={page.sign}
            gender={page.gender}
            profile={page.profile}
          />
        </div>
        <FooterSection />
      </main>
    );
  }

  const sign = signBySlug(slug);
  if (!sign) notFound();
  const page = composeOverviewMeta(sign);
  const url = burclarUrl(page.slug);
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
        name: "Burç Yorumları",
        item: burclarUrl(),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.h1,
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
          <span>{page.h1}</span>
        </nav>
        <BurcSearch />
        <p className="burcEyebrow" style={{ marginTop: 28 }}>
          {sign.symbol} {sign.elementLabel} · {sign.modalityLabel}
        </p>
        <h1>{page.h1}</h1>
        <p className="burcMeta">
          {sign.dateRange} · {sign.rulingPlanets.join(" / ")}
        </p>
        <SignOverviewArticle sign={sign} />
      </div>
      <FooterSection />
    </main>
  );
}
