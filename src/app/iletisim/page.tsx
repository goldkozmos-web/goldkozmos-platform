import Navbar from "../../components/Navbar";
import ContactSection from "../../components/ContactSection";
import WhatsAppSection from "../../components/WhatsAppSection";
import FAQSection from "../../components/FAQSection";
import FooterSection from "../../components/FooterSection";
import "../../styles/home.css";

export default function ContactPage() {
  return (
    <main className="homePage contactPage" id="top">
      {/* NAVBAR */}

      <div className="contactNavShell">
        <Navbar />

        <details className="contactMobileMenu">
          <summary aria-label="Menüyü aç">
            <span />
            <span />
            <span />
          </summary>

          <div className="contactMobileMenuPanel">
            <nav>
              <a href="/">Ana Sayfa</a>
              <a href="/#rezonans">Atölyeler</a>
              <a href="/#diger">Çalışmalar</a>
              <a href="/goldbook">GoldBook</a>
              <a href="/goldcast">GoldCast</a>
              <a href="/goldblog">GoldBlog</a>
              <a href="/hakkimda">Hakkımda</a>
              <a href="/iletisim">İletişim</a>
            </nav>

            <a
              className="contactMobileMenuTest"
              href="/sana-uygun-calismayi-bul"
            >
              Ücretsiz Test
              <span>→</span>
            </a>
          </div>
        </details>
      </div>

      {/* ANA İLETİŞİM ALANI */}

      <ContactSection />

      {/* WHATSAPP KANALI */}

      <WhatsAppSection />

      {/* SIKÇA SORULAN SORULAR */}

      <FAQSection />

      {/* FOOTER */}

      <FooterSection />

      {/* MOBİL SABİT YUKARI OK */}

      <a
        href="#top"
        className="contactFloatingTop"
        aria-label="Sayfanın başına dön"
      >
        ↑
      </a>
    </main>
  );
}