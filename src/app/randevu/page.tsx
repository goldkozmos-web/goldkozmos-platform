import Navbar from "../../components/Navbar";
import WhatsAppSection from "../../components/WhatsAppSection";
import FAQSection from "../../components/FAQSection";
import FooterSection from "../../components/FooterSection";
import "../../styles/home.css";

export default function AppointmentPage() {
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

            <span>RANDEVU VE BAŞVURU</span>
          </p>

          <h1>
            Kendin için
            <span> yeni bir alan aç.</span>
          </h1>

          <p>
            Birebir seanslar, grup çalışmaları, tarot, numeroloji ve diğer
            Goldkozmos® Enerji Ekolü hizmetleri hakkında bilgi almak veya
            başvuru oluşturmak için iletişime geç.
          </p>

          <div className="innerPageHeroActions">
            <a href="#whatsapp">
              WhatsApp’tan Bilgi Al
              <span aria-hidden="true">↓</span>
            </a>

            <a href="/sana-uygun-calismayi-bul">
              Önce Çalışmamı Bul
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <WhatsAppSection />
      <FAQSection />
      <FooterSection />
    </main>
  );
}