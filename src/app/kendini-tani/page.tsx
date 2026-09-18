import type { Metadata } from "next";
import Link from "next/link";

import FooterSection from "../../components/FooterSection";
import HomeNavbar from "../../components/HomeNavbar";
import { breadcrumbJsonLd } from "../../lib/jsonld";
import { publicPageMetadata } from "../../lib/seo";
import "../../styles/home.css";
import "../../styles/daily-practice.css";
import "../../styles/hub-seo.css";

export const metadata: Metadata = publicPageMetadata({
  title: "Kendini Tanı | Öz-farkındalık Testleri | GoldKozmos",
  description:
    "Kendini Tanı: Arketip Testi, Karakter Analizi, Gölge Yan, İlişki Örüntüsü ve 21 Günlük Kendilik Yolculuğu. Test sonuçları private kalır.",
  path: "/kendini-tani",
  absoluteTitle: true,
});

const TESTS = [
  {
    title: "Arketip Testi",
    text: "Baskın üç arketipini gör.",
    href: "/arketip-testi",
  },
  {
    title: "Karakter Analizi",
    text: "Karar, sınır, stres ve ilişki ritmin.",
    href: "/testler/karakter-analizi",
  },
  {
    title: "Gölge Yan Testi",
    text: "Zorlandığın eğilimleri suçlamadan fark et.",
    href: "/testler/golge-yan",
  },
  {
    title: "İlişki Örüntüsü",
    text: "Yakınlık, mesafe ve tekrar eden kalıplar.",
    href: "/testler/iliski-oruntusu",
  },
  {
    title: "21 Günlük Kendilik Yolculuğu",
    text: "Günde birkaç dakikalık gözlem.",
    href: "/kendilik-yolculugu",
  },
];

export default function KendiniTaniPage() {
  const jsonLd = breadcrumbJsonLd([
    { name: "Ana Sayfa", path: "/" },
    { name: "Kendini Tanı", path: "/kendini-tani" },
  ]);

  return (
    <main className="homeV3Page kendiniTaniPage" id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeNavbar />
      <section className="kendiniTaniRail" style={{ paddingTop: 28 }}>
        <div className="kendiniTaniHead">
          <p className="dailyEyebrow">KENDİNİ TANI</p>
          <h1>Kendini Tanı</h1>
        </div>
        <p className="kendiniTaniLead">
          Öz-farkındalık testleri burada. Arketip, karakter, gölge yan ve ilişki
          örüntüsü. Klinik teşhis değil. Sonuçların yalnızca sende kalır.
        </p>
        <Link className="kendiniTaniAbout" href="/hakkimda">
          <img
            src="/images/services/ozge-batigun-hakkimda.webp"
            alt=""
            width={120}
            height={120}
          />
          <div>
            <p>Hakkımda</p>
            <strong>Özge Batıgün</strong>
            <span>
              Kendi yolumu ararken Goldkozmos® doğdu. Yaklaşımı ve hikâyeyi
              buradan oku.
            </span>
            <em>Oku</em>
          </div>
        </Link>
        <h2 className="kendiniTaniTestsTitle">Öz-farkındalık testleri</h2>
        <div className="kendiniTaniTrack">
          {TESTS.map((test) => (
            <Link key={test.href} className="kendiniTaniCard" href={test.href}>
              <strong>{test.title}</strong>
              <span>{test.text}</span>
            </Link>
          ))}
        </div>
      </section>
      <FooterSection />
    </main>
  );
}
