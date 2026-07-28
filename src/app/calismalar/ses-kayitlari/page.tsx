import Navbar from "../../../components/Navbar";
import AudioWorkDetailSection from "../../../components/AudioWorkDetailSection";
import TestimonialsSection from "../../../components/TestimonialsSection";
import FAQSection from "../../../components/FAQSection";
import FooterSection from "../../../components/FooterSection";
import "../../../styles/home.css";

export default function AudioWorksPage() {
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

            <span>DİJİTAL SES ÇALIŞMALARI</span>
          </p>

          <h1>
            Kendi zamanında dinle,
            <span> içsel alanına yeniden dön.</span>
          </h1>

          <p>
            Aşk, ilişki, para, özdeğer ve enerji alanlarına odaklanan,
            kendi hızında uygulayabileceğin yönlendirmeli dijital ses
            çalışmalarını keşfet.
          </p>

          <div className="innerPageHeroActions">
            <a href="#ses-kayitlari">
              Ses Çalışmalarını İncele
              <span aria-hidden="true">↓</span>
            </a>

            <a href="/randevu">
              Ses Kaydı İçin Bilgi Al
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <AudioWorkDetailSection />

      <TestimonialsSection />

      <FAQSection />

      <FooterSection />
    </main>
  );
}