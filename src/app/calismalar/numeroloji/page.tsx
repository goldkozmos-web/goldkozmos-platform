import Navbar from "../../../components/Navbar";
import NumerologyDetailSection from "../../../components/NumerologyDetailSection";
import TestimonialsSection from "../../../components/TestimonialsSection";
import FAQSection from "../../../components/FAQSection";
import FooterSection from "../../../components/FooterSection";
import "../../../styles/home.css";

export default function NumerologyAnalysisPage() {
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

            <span>NUMEROLOJİ ANALİZİ</span>
          </p>

          <h1>
            Sayılarındaki izleri
            <span> kendi hikâyenle buluştur.</span>
          </h1>

          <p>
            Doğum tarihi ve isim bilgilerinden hesaplanan kişisel sayı
            haritanı; karakter, ilişkiler, yetenekler ve yaşam dönemleri
            üzerinden inceleyen dijital numeroloji analizi.
          </p>

          <div className="innerPageHeroActions">
            <a href="#numeroloji-analizi">
              Numeroloji Analizini İncele
              <span aria-hidden="true">↓</span>
            </a>

            <a href="/randevu">
              Numeroloji Analizi İçin Başvur
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <NumerologyDetailSection />

      <TestimonialsSection />

      <FAQSection />

      <FooterSection />
    </main>
  );
}