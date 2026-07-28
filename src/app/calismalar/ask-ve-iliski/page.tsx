import Navbar from "../../../components/Navbar";
import LoveRelationshipChoiceSection from "../../../components/LoveRelationshipChoiceSection";
import FAQSection from "../../../components/FAQSection";
import FooterSection from "../../../components/FooterSection";
import "../../../styles/home.css";

export default function LoveRelationshipChoicePage() {
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

            <span>AŞK VE İLİŞKİ ÇALIŞMALARI</span>
          </p>

          <h1>
            Bulunduğun yere göre
            <span> doğru çalışmayı seç.</span>
          </h1>

          <p>
            Yeni bir ilişkiye hazırlanmak için Aşkı Hayatına Çağır
            çalışmasını, mevcut romantik ilişkini dönüştürmek için ise
            İlişkini Şifalandır programını incele.
          </p>

          <div className="innerPageHeroActions">
            <a href="#ask-ve-iliski-secimi">
              Çalışmaları Karşılaştır
              <span aria-hidden="true">↓</span>
            </a>

            <a href="/sana-uygun-calismayi-bul">
              Sana Uygun Çalışmayı Bul
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <LoveRelationshipChoiceSection />

      <FAQSection />

      <FooterSection />
    </main>
  );
}