import type { Metadata } from "next";
import Link from "next/link";

import FooterSection from "../../components/FooterSection";
import HomeNavbar from "../../components/HomeNavbar";
import RuyaSearch from "../../components/ruya/RuyaSearch";
import {
  dreamsByLetter,
  indexableDreams,
} from "../../data/ruya-tabirleri/catalog";
import { ruyaPath, ruyaUrl } from "../../lib/ruya-tabirleri/urls";
import "../../styles/home.css";
import "../../styles/ruya-tabirleri.css";

const pageUrl = ruyaUrl();

const hubMeta = {
  title: { absolute: "Rüya Tabirleri | GoldKozmos" as const },
  description:
    "Rüyanda ne gördüğünü yaz, anlamını keşfet. GoldKozmos Rüya Tabirleri; spiritüel, sembolik ve enerjisel rüya yorumları.",
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<{ harf?: string; q?: string }>;
}): Promise<Metadata> {
  const params = (await searchParams) ?? {};
  const lettered = Boolean(params.harf?.trim());
  return {
    ...hubMeta,
    alternates: { canonical: pageUrl },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url: pageUrl,
      siteName: "Goldkozmos",
      title: hubMeta.title.absolute,
      description: hubMeta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: hubMeta.title.absolute,
      description: hubMeta.description,
    },
    robots: lettered
      ? { index: false, follow: true }
      : { index: true, follow: true },
  };
}

export default async function RuyaTabirleriPage({
  searchParams,
}: {
  searchParams?: Promise<{ harf?: string; q?: string }>;
}) {
  const params = (await searchParams) ?? {};
  const letter = params.harf?.trim() ?? "";
  const letters = "ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ".split("");
  const letterDreams = letter ? dreamsByLetter(letter) : [];
  const featured = indexableDreams();

  return (
    <main className="homeV3Page ruyaPage" id="top">
      <HomeNavbar />
      <div className="ruyaWrap">
        <p className="ruyaEyebrow">GOLDKOZMOS®</p>
        <h1>Rüya Tabirleri</h1>
        <p className="ruyaLead">Rüyanda ne gördüğünü yaz, anlamını keşfet.</p>
        <RuyaSearch initialQuery={params.q ?? ""} />
        <div className="ruyaAlpha" aria-label="A'dan Z'ye">
          {letters.map((item) => (
            <a
              key={item}
              href={`/ruya-tabirleri?harf=${encodeURIComponent(item)}`}
              className={letter === item ? "isOn" : undefined}
            >
              {item}
            </a>
          ))}
        </div>
        {letter ? (
          <>
            <h2 className="ruyaLead" style={{ marginTop: 36, fontSize: 22 }}>
              {letter} harfi
            </h2>
            <ul className="ruyaRelated">
              {letterDreams.map((dream) => (
                <li key={dream.slug}>
                  <Link href={ruyaPath(dream.slug)}>{dream.title}</Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <h2 className="ruyaLead" style={{ marginTop: 36, fontSize: 22 }}>
              Yayınlanan rüya tabirleri
            </h2>
            <ul className="ruyaRelated">
              {featured.map((dream) => (
                <li key={dream.slug}>
                  <Link href={ruyaPath(dream.slug)}>{dream.h1}</Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <FooterSection />
    </main>
  );
}
