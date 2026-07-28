import Navbar from "../../components/Navbar";
import WhatsAppSection from "../../components/WhatsAppSection";
import FAQSection from "../../components/FAQSection";
import FooterSection from "../../components/FooterSection";
import "../../styles/home.css";

export default function WhatsAppChannelPage() {
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

            <span>WHATSAPP KANALI</span>
          </p>

          <h1>
            Duyuruları kaçırma,
            <span> topluluğun içinde kal.</span>
          </h1>

          <p>
            Yeni çalışmalar, program tarihleri, ücretsiz içerikler,
            olumlamalar ve Goldkozmos® Enerji Ekolü duyurularından haberdar
            olmak için WhatsApp kanalına katıl.
          </p>

          <div className="innerPageHeroActions">
            <a href="#whatsapp">
              Kanalı Keşfet
              <span aria-hidden="true">↓</span>
            </a>

            <a href="/iletisim">
              İletişime Geç
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