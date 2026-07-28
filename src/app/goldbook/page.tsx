import Navbar from "../../components/Navbar";
import GoldBookSection from "../../components/GoldBookSection";
import FAQSection from "../../components/FAQSection";
import FooterSection from "../../components/FooterSection";
import "../../styles/home.css";

export default function GoldBookPage() {
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

            <span>GOLDBOOK</span>
          </p>

          <h1>
            Okudukça kendine
            <span> biraz daha yaklaş.</span>
          </h1>

          <p>
            Aşk, ilişkiler, para, enerji, farkındalık ve kişisel dönüşüm
            konularında hazırlanan Goldkozmos® dijital kitaplarını keşfet.
          </p>

          <div className="innerPageHeroActions">
            <a href="#goldbook">
              GoldBook Kütüphanesini Keşfet
              <span aria-hidden="true">↓</span>
            </a>

            <a href="/iletisim">
              Bilgi Al
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <GoldBookSection />
      <FAQSection />
      <FooterSection />
    </main>
  );
}