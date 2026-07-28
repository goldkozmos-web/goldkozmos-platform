import Navbar from "../../components/Navbar";
import EventCalendarSection from "../../components/EventCalendarSection";
import TestimonialsSection from "../../components/TestimonialsSection";
import WhatsAppSection from "../../components/WhatsAppSection";
import FAQSection from "../../components/FAQSection";
import FooterSection from "../../components/FooterSection";
import "../../styles/home.css";

export default function EventsPage() {
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

            <span>ETKİNLİKLER</span>
          </p>

          <h1>
            Birlikte dönüşmek için
            <span> kendine bir alan aç.</span>
          </h1>

          <p>
            Goldkozmos® Enerji Ekolü kapsamında düzenlenen çevrim içi grup
            çalışmaları, özel programlar ve yeni etkinlik tarihlerini
            incele.
          </p>

          <div className="innerPageHeroActions">
            <a href="#etkinlikler">
              Etkinlik Takvimini İncele
              <span aria-hidden="true">↓</span>
            </a>

            <a href="#whatsapp">
              Duyuruları Takip Et
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <EventCalendarSection />
      <TestimonialsSection />
      <WhatsAppSection />
      <FAQSection />
      <FooterSection />
    </main>
  );
}