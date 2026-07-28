import Navbar from "../../../components/Navbar";
import TarotDetailSection from "../../../components/TarotDetailSection";
import TestimonialsSection from "../../../components/TestimonialsSection";
import FAQSection from "../../../components/FAQSection";
import FooterSection from "../../../components/FooterSection";
import "../../../styles/home.css";

export default function TarotAnalysisPage() {
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

            <span>TAROT ANALİZİ</span>
          </p>

          <h1>
            Yaşadığın konuya
            <span> başka bir pencereden bak.</span>
          </h1>

          <p>
            Aşk, ilişki, kariyer, para veya kişisel yolculuğundaki bir konuyu
            semboller ve ihtimaller üzerinden değerlendirmene yardımcı olan
            kişiye özel sesli tarot yorumu.
          </p>

          <div className="innerPageHeroActions">
            <a href="#tarot-analizi">
              Tarot Analizini İncele
              <span aria-hidden="true">↓</span>
            </a>

            <a href="/randevu">
              Tarot Analizi İçin Başvur
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <TarotDetailSection />

      <TestimonialsSection />

      <FAQSection />

      <FooterSection />
    </main>
  );
}