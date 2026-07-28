import Navbar from "../../components/Navbar";
import TestimonialsSection from "../../components/TestimonialsSection";
import WorkFinderSection from "../../components/WorkFinderSection";
import FAQSection from "../../components/FAQSection";
import FooterSection from "../../components/FooterSection";
import "../../styles/home.css";

export default function TestimonialsPage() {
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

            <span>DANIŞAN DENEYİMLERİ</span>
          </p>

          <h1>
            Dönüşümün hayata
            <span> nasıl yansıdığını keşfet.</span>
          </h1>

          <p>
            Goldkozmos® Enerji Ekolü çalışmalarına katılan danışanların
            süreç boyunca yaşadığı farkındalıkları ve kişisel deneyimleri
            incele.
          </p>

          <div className="innerPageHeroActions">
            <a href="#danisan-deneyimleri">
              Deneyimleri İncele
              <span aria-hidden="true">↓</span>
            </a>

            <a href="/sana-uygun-calismayi-bul">
              Sana Uygun Çalışmayı Bul
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <WorkFinderSection />
      <FAQSection />
      <FooterSection />
    </main>
  );
}