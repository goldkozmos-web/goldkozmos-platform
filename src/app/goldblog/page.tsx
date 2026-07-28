import Navbar from "../../components/Navbar";
import GoldBlogSection from "../../components/GoldBlogSection";
import FAQSection from "../../components/FAQSection";
import FooterSection from "../../components/FooterSection";
import "../../styles/home.css";

export default function GoldBlogPage() {
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

            <span>GOLDBLOG</span>
          </p>

          <h1>
            Okudukça sorgula,
            <span> sorguladıkça kendine yaklaş.</span>
          </h1>

          <p>
            Spiritüel Stoa, sosyoloji, aşk, ilişkiler, enerji ve kişisel
            dönüşüm üzerine hazırlanan Goldkozmos® Enerji Ekolü yazılarını
            keşfet.
          </p>

          <div className="innerPageHeroActions">
            <a href="#goldblog">
              GoldBlog Yazılarını Keşfet
              <span aria-hidden="true">↓</span>
            </a>

            <a href="/iletisim">
              İletişime Geç
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <GoldBlogSection />
      <FAQSection />
      <FooterSection />
    </main>
  );
}