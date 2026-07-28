import Navbar from "../../components/Navbar";
import EnergySchoolSection from "../../components/EnergySchoolSection";
import WhyGoldkozmos from "../../components/WhyGoldkozmos";
import WorkFinderSection from "../../components/WorkFinderSection";
import FAQSection from "../../components/FAQSection";
import FooterSection from "../../components/FooterSection";
import "../../styles/home.css";

export default function EnergySchoolPage() {
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
          </p>

          <h1>
            Kendini anlamaya,
            <span> enerjini fark etmeye başla.</span>
          </h1>

          <p>
            Spiritüel Stoa, sosyoloji ve Goldkozmos® Enerji Ekolü’ne özgü
            enerji yaklaşımının bir araya geldiği bütüncül bir farkındalık
            sistemi.
          </p>

          <div className="innerPageHeroActions">
            <a href="#enerji-ekolu">
              Enerji Ekolünü Keşfet
              <span aria-hidden="true">↓</span>
            </a>

            <a href="/sana-uygun-calismayi-bul">
              Sana Uygun Çalışmayı Bul
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <EnergySchoolSection />
      <WhyGoldkozmos />
      <WorkFinderSection />
      <FAQSection />
      <FooterSection />
    </main>
  );
}