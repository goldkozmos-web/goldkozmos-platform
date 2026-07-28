import Navbar from "../../components/Navbar";
import GoldFrekansSection from "../../components/GoldFrekansSection";
import FAQSection from "../../components/FAQSection";
import FooterSection from "../../components/FooterSection";
import "../../styles/home.css";

export default function GoldFrekansPage() {
  return (
    <main className="homePage" id="top">
      <Navbar />

      <section className="innerPageHero">
        <div className="innerPageHeroContainer">
          <p className="sectionEyebrow">
            <span>
              GOLDKOZMOS
              <sup className="registeredSymbol">®</sup>
            </span>

            <br />

            <span>ENERJİ EKOLÜ</span>

            <br />

            <span>GOLDFREKANS</span>
          </p>

          <h1>
            Dinle, alanını kur
            <span> ve kendine dön.</span>
          </h1>

          <p>
            Kendi zamanında uygulayabileceğin yönlendirmeli ses kayıtlarını,
            meditasyonları ve farkındalık odaklı dijital çalışmaları keşfet.
          </p>

          <div className="innerPageHeroActions">
            <a href="#goldfrekans">
              Ses Çalışmalarını Keşfet
              <span aria-hidden="true">↓</span>
            </a>

            <a href="/sana-uygun-calismayi-bul">
              Sana Uygun Çalışmayı Bul
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <GoldFrekansSection />
      <FAQSection />
      <FooterSection />
    </main>
  );
}