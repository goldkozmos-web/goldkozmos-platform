import Navbar from "../../../components/Navbar";
import RelationshipHealingDetailSection from "../../../components/RelationshipHealingDetailSection";
import TestimonialsSection from "../../../components/TestimonialsSection";
import FAQSection from "../../../components/FAQSection";
import FooterSection from "../../../components/FooterSection";
import "../../../styles/home.css";

export default function RelationshipHealingPage() {
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

            <span>İLİŞKİNİ ŞİFALANDIR</span>
          </p>

          <h1>
            Mevcut ilişkine
            <span> daha bilinçli bir yerden yaklaş.</span>
          </h1>

          <p>
            İletişim sorunlarını, biriken kırgınlıkları, güven alanını ve
            ilişki içinde tekrar eden döngüleri fark etmeye yönelik beş günlük
            çevrim içi grup çalışması.
          </p>

          <div className="innerPageHeroActions">
            <a href="#iliski-calismasi">
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

      <RelationshipHealingDetailSection />

      <TestimonialsSection />

      <FAQSection />

      <FooterSection />
    </main>
  );
}