import Navbar from "../../../components/Navbar";
import LoveDetailSection from "../../../components/LoveDetailSection";
import TestimonialsSection from "../../../components/TestimonialsSection";
import FAQSection from "../../../components/FAQSection";
import FooterSection from "../../../components/FooterSection";
import "../../../styles/home.css";

export default function LoveWorkPage() {
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

            <span>AŞKI HAYATINA ÇAĞIR</span>
          </p>

          <h1>
            Yeni bir aşka hazırlanırken
            <span> önce kendine alan aç.</span>
          </h1>

          <p>
            Geçmiş ilişkilerden kalan duygusal yükleri fark etmek, özdeğer
            alanını güçlendirmek ve daha sağlıklı bir ilişkiye hazırlanmak
            için oluşturulan beş günlük çevrim içi grup çalışması.
          </p>

          <div className="innerPageHeroActions">
            <a href="#ask-calismasi">
              Programı İncele
              <span aria-hidden="true">↓</span>
            </a>

            <a href="/randevu">
              Kayıt ve Bilgi Al
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <LoveDetailSection />

      <TestimonialsSection />

      <FAQSection />

      <FooterSection />
    </main>
  );
}