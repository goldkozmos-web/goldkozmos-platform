import Navbar from "../../components/Navbar";
import AboutSection from "../../components/AboutSection";
import WhyGoldkozmos from "../../components/WhyGoldkozmos";
import TestimonialsSection from "../../components/TestimonialsSection";
import FAQSection from "../../components/FAQSection";
import FooterSection from "../../components/FooterSection";
import "../../styles/home.css";

export default function AboutPage() {
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

            <span>HAKKIMDA</span>
          </p>

          <h1>
            Her dönüşüm,
            <span> kendini fark etmekle başlar.</span>
          </h1>

          <p>
            Goldkozmos® Enerji Ekolü’nün ortaya çıkışını, yaklaşımını ve
            Spiritüel Stoa ile sosyoloji perspektifinden şekillenen
            yolculuğunu keşfet.
          </p>

          <div className="innerPageHeroActions">
            <a href="#hakkimda">
              Yolculuğu Keşfet
              <span aria-hidden="true">↓</span>
            </a>

            <a href="/calismalar">
              Çalışmaları İncele
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <AboutSection />
      <WhyGoldkozmos />
      <TestimonialsSection />
      <FAQSection />
      <FooterSection />
    </main>
  );
}