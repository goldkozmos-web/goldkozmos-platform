import Navbar from "../../../components/Navbar";
import AnalysisHubSection from "../../../components/AnalysisHubSection";
import FAQSection from "../../../components/FAQSection";
import FooterSection from "../../../components/FooterSection";
import "../../../styles/home.css";

export default function AnalysesPage() {
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

            <span>KİŞİSEL ANALİZLER</span>
          </p>

          <h1>
            Kendine farklı bir dilden
            <span> bakmaya alan aç.</span>
          </h1>

          <p>
            Tarotun sembolik diliyle güncel bir konuyu incele veya
            numerolojiyle kişisel sayı haritanı keşfet. Sana uygun analiz
            türünü karşılaştırarak seç.
          </p>

          <div className="innerPageHeroActions">
            <a href="#analizler">
              Analizleri Karşılaştır
              <span aria-hidden="true">↓</span>
            </a>

            <a href="/sana-uygun-calismayi-bul">
              Sana Uygun Analizi Bul
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <AnalysisHubSection />

      <FAQSection />

      <FooterSection />
    </main>
  );
}