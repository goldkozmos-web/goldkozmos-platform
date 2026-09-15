import type { Metadata } from "next";
import Link from "next/link";

import BurcSearch from "../../components/burclar/BurcSearch";
import FooterSection from "../../components/FooterSection";
import HomeNavbar from "../../components/HomeNavbar";
import { SIGNS } from "../../data/burclar/signs";
import { profileHref } from "../../lib/burclar/search";
import { burclarUrl } from "../../lib/burclar/urls";
import { SITE_ORIGIN } from "../../lib/site";
import "../../styles/home.css";
import "../../styles/burclar.css";

const pageUrl = burclarUrl();

export const metadata: Metadata = {
  title: { absolute: "Burç Yorumları | GoldKozmos" },
  description:
    "Burçların karakterini, ilişkilerdeki yaklaşımını ve aşk uyumlarını keşfet.",
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: pageUrl,
    siteName: "Goldkozmos",
    title: "Burç Yorumları | GoldKozmos",
    description:
      "Burçların karakterini, ilişkilerdeki yaklaşımını ve aşk uyumlarını keşfet.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Burç Yorumları | GoldKozmos",
    description:
      "Burçların karakterini, ilişkilerdeki yaklaşımını ve aşk uyumlarını keşfet.",
  },
  robots: { index: true, follow: true },
};

export default function BurclarPage() {
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
        <p className="burcEyebrow">GOLDKOZMOS®</p>
        <h1>Burç Yorumları</h1>
        <p className="burcLead">
          Burçların karakterini, ilişkilerdeki yaklaşımını ve aşk uyumlarını keşfet.
        </p>
        <BurcSearch />
        <ul className="burcGrid">
          {SIGNS.map((sign) => (
            <li className="burcCard" key={sign.id}>
              <span className="burcGlyph" aria-hidden>
                {sign.symbol}
              </span>
              <strong>{sign.name}</strong>
              <nav>
                <Link href={profileHref(sign, "kadin")}>Kadını</Link>
                <Link href={profileHref(sign, "erkek")}>Erkeği</Link>
                <Link href={`/burc-uyumu?bir=${sign.id}`}>Aşk Uyumu</Link>
              </nav>
            </li>
          ))}
        </ul>
      </div>
      <FooterSection />
    </main>
  );
}
