import Navbar from "../../components/Navbar";
import WorkFinderSection from "../../components/WorkFinderSection";
import ServicesSection from "../../components/ServicesSection";
import FAQSection from "../../components/FAQSection";
import FooterSection from "../../components/FooterSection";
import "../../styles/home.css";

export default function WorkFinderPage() {
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

            <span>SANA UYGUN ÇALIŞMAYI BUL</span>
          </p>

          <h1>
            Nereden başlayacağını
            <span> birlikte netleştirelim.</span>
          </h1>

          <p>
            Birkaç kısa seçim yaparak şu anda ihtiyaç duyduğun alana en yakın
            Goldkozmos® Enerji Ekolü çalışmasını keşfet.
          </p>

          <div className="innerPageHeroActions">
            <a href="#calisma-bul">
              Yönlendirmeyi Başlat
              <span aria-hidden="true">↓</span>
            </a>

            <a href="/calismalar">
              Tüm Çalışmaları Gör
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <WorkFinderSection />
      <ServicesSection />
      <FAQSection />
      <FooterSection />
    </main>
  );
}