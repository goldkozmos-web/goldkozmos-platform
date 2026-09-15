import type { Metadata } from "next";

import FooterSection from "../../components/FooterSection";
import HomeNavbar from "../../components/HomeNavbar";
import RitualHub from "../../components/goldrituel/RitualHub";
import { publishedRituals } from "../../data/goldrituel/catalog";
import { breadcrumbJsonLd } from "../../lib/jsonld";
import { goldrituelPath } from "../../lib/goldrituel/urls";
import { publicPageMetadata } from "../../lib/seo";
import Link from "next/link";
import "../../styles/home.css";
import "../../styles/goldrituel.css";
import "../../styles/hub-seo.css";

export const metadata: Metadata = publicPageMetadata({
  title: "GoldRitüel – Uygulanabilir Ritüeller | GoldKozmos",
  description:
    "GoldRitüel: amaç, malzeme, adımlar ve niyet cümlesi olan uygulanabilir ritüeller. Her ritüelin kendi sayfası vardır.",
  path: "/goldrituel",
  absoluteTitle: true,
});

export default function GoldRituelPage() {
  const rituals = publishedRituals();
  const jsonLd = breadcrumbJsonLd([
    { name: "Ana Sayfa", path: "/" },
    { name: "GoldRitüel", path: "/goldrituel" },
  ]);

  return (
    <main className="homeV3Page grPage" id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeNavbar />
      <div className="grWrap">
        <p className="grEyebrow">GOLDKOZMOS®</p>
        <h1>GoldRitüel – Uygulanabilir Ritüeller</h1>
        <p className="grLead">
          Niyet, farkındalık ve enerji odağında uygulanabilir ritüeller.
        </p>
        <p className="grIntro">
          GoldRitüel, GoldKozmos içindeki uygulama alanıdır. Tarot sözlüğü,
          blog yazısı veya frekans kaydı değildir. Her ritüelin amacı,
          malzemesi, adımları, zamanı, niyet cümlesi ve sonrası kendi
          sayfasındadır; aynı metin kopyalanmaz.
        </p>
        <ul className="tarotSuitList">
          {rituals.map((ritual) => (
            <li key={ritual.slug}>
              <Link href={goldrituelPath(ritual.slug)}>{ritual.title}</Link>
            </li>
          ))}
        </ul>
        <RitualHub />
      </div>
      <FooterSection />
    </main>
  );
}
