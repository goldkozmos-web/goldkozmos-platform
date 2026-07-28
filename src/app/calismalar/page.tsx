import Navbar from "../../components/Navbar";
import ServicesSection from "../../components/ServicesSection";
import WorkFinderSection from "../../components/WorkFinderSection";
import TestimonialsSection from "../../components/TestimonialsSection";
import FAQSection from "../../components/FAQSection";
import FooterSection from "../../components/FooterSection";
import "../../styles/home.css";

export default function WorksPage() {
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

            <span>ÇALIŞMALAR</span>
          </p>

          <h1>
            İhtiyacına uygun
            <span> dönüşüm yolunu keşfet.</span>
          </h1>

          <p>
            Aşk ve ilişkilerden para ve refah alanına, birebir seanslardan
            tarot, numeroloji ve dijital ses çalışmalarına kadar farklı
            ihtiyaçlara göre hazırlanan çalışma seçeneklerini incele.
          </p>

          <div className="innerPageHeroActions">
            <a href="#calismalar">
              Çalışmaları İncele
              <span aria-hidden="true">↓</span>
            </a>

            <a href="#calisma-bul">
              Sana Uygun Çalışmayı Bul
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <ServicesSection />
      <WorkFinderSection />
      <TestimonialsSection />
      <FAQSection />
      <FooterSection />
    </main>
  );
}