import Navbar from "../../components/Navbar";
import ContactSection from "../../components/ContactSection";
import WhatsAppSection from "../../components/WhatsAppSection";
import FAQSection from "../../components/FAQSection";
import FooterSection from "../../components/FooterSection";
import "../../styles/home.css";

export default function ContactPage() {
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

            <span>İLETİŞİM</span>
          </p>

          <h1>
            Sana uygun kanaldan
            <span> iletişime geç.</span>
          </h1>

          <p>
            Çalışmalar, randevu süreci, program tarihleri ve Goldkozmos®
            Enerji Ekolü içerikleri hakkında bilgi almak için iletişim
            seçeneklerini incele.
          </p>

          <div className="innerPageHeroActions">
            <a href="#iletisim-secenekleri">
              İletişim Seçeneklerini Gör
              <span aria-hidden="true">↓</span>
            </a>

            <a href="/sana-uygun-calismayi-bul">
              Önce Çalışmamı Bul
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <ContactSection />
      <WhatsAppSection />
      <FAQSection />
      <FooterSection />
    </main>
  );
}