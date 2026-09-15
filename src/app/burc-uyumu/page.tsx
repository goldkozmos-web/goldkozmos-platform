import type { Metadata } from "next";
import Link from "next/link";

import FooterSection from "../../components/FooterSection";
import HomeNavbar from "../../components/HomeNavbar";
import SignPicker from "../../components/burclar/SignPicker";
import { SIGNS, signById } from "../../data/burclar/signs";
import type { SignId } from "../../data/burclar/types";
import { uyumUrl } from "../../lib/burclar/urls";
import { indexFollow, noIndexFollow, SITE_NAME } from "../../lib/seo";
import { SITE_ORIGIN } from "../../lib/site";
import "../../styles/home.css";
import "../../styles/burclar.css";

const pageUrl = uyumUrl();

type PageProps = {
  searchParams: Promise<{ bir?: string; iki?: string }>;
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const query = await searchParams;
  const filtered = Boolean(query.bir || query.iki);
  return {
    title: { absolute: "Burç Aşk Uyumu | GoldKozmos" },
    description:
      "İki burç seç, aşk uyumunu oku. Tek canonical çift sayfası; ters sıra aynı içeriğe gider.",
    alternates: { canonical: pageUrl },
    robots: filtered ? noIndexFollow : indexFollow,
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url: pageUrl,
      siteName: SITE_NAME,
      title: "Burç Aşk Uyumu | GoldKozmos",
      description:
        "İki burç seç, aşk uyumunu oku. Editorial astroloji; bilimsel ölçüm değil.",
    },
    twitter: {
      card: "summary_large_image",
      title: "Burç Aşk Uyumu | GoldKozmos",
      description: "İki burç seç, aşk uyumunu oku.",
    },
  };
}

export default async function BurcUyumuHubPage({ searchParams }: PageProps) {
  const query = await searchParams;
  const initialA = signById(query.bir ?? "")?.id;
  const initialB = signById(query.iki ?? "")?.id ?? ("koc" as SignId);
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
        item: pageUrl,
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
          <span>Aşk Uyumu</span>
        </nav>
        <p className="burcEyebrow">GOLDKOZMOS®</p>
        <h1>Burç Aşk Uyumu</h1>
        <p className="burcLead">
          İki burç seç. Koç–Akrep ile Akrep–Koç aynı canonical sayfaya gider.
        </p>
        <SignPicker initialA={initialA} initialB={initialB} />
        <p className="burcNote" style={{ marginTop: 28 }}>
          {SIGNS.length} burç, self-match dahil {((SIGNS.length * (SIGNS.length + 1)) / 2)} benzersiz çift.
        </p>
      </div>
      <FooterSection />
    </main>
  );
}
