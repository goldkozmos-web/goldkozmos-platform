import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="newHeroSection" aria-labelledby="home-hero-title">
      <div className="newHeroMedia" aria-hidden="true">
        <Image
          src="/images/goldkozmos-hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="newHeroImage"
        />
      </div>

      <div className="newHeroShade" aria-hidden="true" />

      <div className="newHeroContainer">
        <div className="newHeroContent">
          <p className="newHeroEyebrow">
            GOLDKOZMOS
            <sup className="registeredSymbol">®</sup>
            <span> ENERJİ EKOLÜ</span>
          </p>

          <h1 id="home-hero-title">Kendi kozmosunu bul.</h1>

          <p className="newHeroDescription">
            Kendilik, ilişkiler ve bolluk alanında tekrar eden döngülerini
            fark etmene yardımcı olan atölyeler, birebir çalışmalar ve
            dijital içerikler.
          </p>

          <div className="newHeroActions">
            <Link className="newHeroPrimaryButton" href="/calismalar">
              Çalışmaları İncele
              <span aria-hidden="true">→</span>
            </Link>

            <Link
              className="newHeroSecondaryButton"
              href="/sana-uygun-calismayi-bul"
            >
              Ücretsiz Testi Çöz
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="newHeroBottomLine" aria-hidden="true">
        <span>İnsan değişmeden hayat değişmez.</span>
      </div>
    </section>
  );
}