import Navbar from "../../components/Navbar";
import GoldCastSection from "../../components/GoldCastSection";
import FAQSection from "../../components/FAQSection";
import FooterSection from "../../components/FooterSection";
import "../../styles/home.css";

export default function GoldCastPage() {
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

            <span>GOLDCAST</span>
          </p>

          <h1>
            Dinledikçe düşün,
            <span> düşündükçe kendine yaklaş.</span>
          </h1>

          <p>
            Spiritüel Stoa, sosyoloji, aşk, ilişkiler, enerji ve kişisel
            dönüşüm üzerine hazırlanan Goldkozmos® Enerji Ekolü podcast
            içeriklerini keşfet.
          </p>

          <div className="innerPageHeroActions">
            <a href="#goldcast">
              GoldCast Bölümlerini Keşfet
              <span aria-hidden="true">↓</span>
            </a>

            <a href="/iletisim">
              GoldCast Hakkında Bilgi Al
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <GoldCastSection />
      <FAQSection />
      <FooterSection />
    </main>
  );
}