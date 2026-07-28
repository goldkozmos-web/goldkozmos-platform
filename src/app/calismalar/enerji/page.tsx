import Navbar from "../../../components/Navbar";
import EnergyDetailSection from "../../../components/EnergyDetailSection";
import TestimonialsSection from "../../../components/TestimonialsSection";
import FAQSection from "../../../components/FAQSection";
import FooterSection from "../../../components/FooterSection";
import "../../../styles/home.css";

export default function EnergyWorksPage() {
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

            <span>ENERJİ ÇALIŞMALARI</span>
          </p>

          <h1>
            Kendi enerji alanını
            <span> daha yakından keşfet.</span>
          </h1>

          <p>
            Çakra, aura, dişil-eril denge, geçmiş bağlar ve mekân enerjisi
            gibi farklı alanlara odaklanan Goldkozmos® Enerji Ekolü
            çalışmalarını incele.
          </p>

          <div className="innerPageHeroActions">
            <a href="#enerji-calismalari">
              Çalışmaları İncele
              <span aria-hidden="true">↓</span>
            </a>

            <a href="/sana-uygun-calismayi-bul">
              Sana Uygun Çalışmayı Bul
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <EnergyDetailSection />

      <TestimonialsSection />

      <FAQSection />

      <FooterSection />
    </main>
  );
}