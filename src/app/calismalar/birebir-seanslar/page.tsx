import Navbar from "../../../components/Navbar";
import OneToOneDetailSection from "../../../components/OneToOneDetailSection";
import TestimonialsSection from "../../../components/TestimonialsSection";
import FAQSection from "../../../components/FAQSection";
import FooterSection from "../../../components/FooterSection";
import "../../../styles/home.css";

export default function OneToOneSessionsPage() {
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

            <span>BİREBİR SEANSLAR</span>
          </p>

          <h1>
            Sana özel bir alanda
            <span> kendi sürecine odaklan.</span>
          </h1>

          <p>
            Aşk, ilişki, para, özdeğer ve enerji alanındaki tekrarlarını daha
            yakından incelemeye yönelik, ihtiyacına göre şekillenen çevrim içi
            birebir seanslar.
          </p>

          <div className="innerPageHeroActions">
            <a href="#birebir-seanslar">
              Seansları İncele
              <span aria-hidden="true">↓</span>
            </a>

            <a href="/randevu">
              Randevu ve Bilgi Al
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <OneToOneDetailSection />

      <TestimonialsSection />

      <FAQSection />

      <FooterSection />
    </main>
  );
}