import Link from "next/link";

import FooterSection from "../../components/FooterSection";
import GoldFrekansLibrary from "../../components/goldfrekans/GoldFrekansLibrary";
import { GOLDFREKANS_TRACKS } from "../../data/goldfrekans/tracks";
import { breadcrumbJsonLd } from "../../lib/jsonld";
import "../../styles/home.css";
import "../../styles/hub-seo.css";

export default function GoldFrekansPage() {
  const jsonLd = breadcrumbJsonLd([
    { name: "Ana Sayfa", path: "/" },
    { name: "GoldFrekans", path: "/goldfrekans" },
  ]);

  return (
    <main className="homeV3Page goldFrekansPage" id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GoldFrekansLibrary>
      <section className="goldFrekansHero">
        <div className="goldFrekansHeroInner">
          <div>
            <p className="goldFrekansEyebrow">GOLDKOZMOS®</p>
            <h1>GoldFrekans</h1>
            <p className="goldFrekansHeroLead">
              Frekans, ses ve odak deneyimlerinin yer aldığı GoldKozmos alanı.
              Burada rehberli meditasyon yok; yağmur, deniz ve mevcut frekans
              kayıtları dinlenir. 432 Hz kaydı kütüphanede yoktur. Sesler
              hastalık tedavisi vaat etmez.
            </p>
            <ul className="goldFrekansTrackList">
              {GOLDFREKANS_TRACKS.map((track) => (
                <li key={track.slug}>
                  <Link href={`/goldfrekans/${track.slug}`}>{track.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="goldFrekansHeroNote">
            <strong>NASIL DİNLENİR</strong>
            <p>
              Aşağıdaki kartlar YouTube kaydını oynatır. Her kaydın kendi
              sayfasında ne olduğu, hangi bağlamda dinlenebileceği ve benzer
              parçalar yazılıdır. GoldMind nefes pratikleri ayrı bir alandır.
            </p>
          </div>
        </div>
      </section>
      </GoldFrekansLibrary>
      <FooterSection />
    </main>
  );
}
