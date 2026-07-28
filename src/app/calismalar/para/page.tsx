import Navbar from "../../../components/Navbar";
import MoneyDetailSection from "../../../components/MoneyDetailSection";
import TestimonialsSection from "../../../components/TestimonialsSection";
import FAQSection from "../../../components/FAQSection";
import FooterSection from "../../../components/FooterSection";
import "../../../styles/home.css";

export default function MoneyWorkPage() {
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

            <span>PARA ENERJİSİ AKTİVASYONU</span>
          </p>

          <h1>
            Parayla kurduğun ilişkiyi
            <span> daha bilinçli bir yerden dönüştür.</span>
          </h1>

          <p>
            Özdeğer, hak etme, alma, üretme ve para tutma alanındaki içsel
            kalıpları fark etmeye yönelik beş günlük çevrim içi grup
            çalışması.
          </p>

          <div className="innerPageHeroActions">
            <a href="#para-calismasi">
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

      <MoneyDetailSection />

      <TestimonialsSection />

      <FAQSection />

      <FooterSection />
    </main>
  );
}