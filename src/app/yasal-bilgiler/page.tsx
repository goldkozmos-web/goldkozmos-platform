import Navbar from "../../components/Navbar";
import LegalSection from "../../components/LegalSection";
import FooterSection from "../../components/FooterSection";
import "../../styles/home.css";

export default function LegalInformationPage() {
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

            <span>YASAL BİLGİLER</span>
          </p>

          <h1>
            Güvenli ve şeffaf
            <span> bir dijital deneyim.</span>
          </h1>

          <p>
            Kişisel verilerin korunması, site kullanımı, satın alma süreçleri,
            iptal ve iade koşulları ile diğer yasal bilgilere bu sayfadan
            ulaşabilirsin.
          </p>

          <div className="innerPageHeroActions">
            <a href="#yasal-bilgiler">
              Yasal Metinleri İncele
              <span aria-hidden="true">↓</span>
            </a>

            <a href="/iletisim">
              İletişime Geç
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <LegalSection />
      <FooterSection />
    </main>
  );
}