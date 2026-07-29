import Link from "next/link";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import "../styles/home.css";

export default function NotFoundPage() {
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

            <span>404 · SAYFA BULUNAMADI</span>
          </p>

          <h1>
            Aradığın sayfa
            <span> bu kozmosta görünmüyor.</span>
          </h1>

          <p>
            Bağlantı değiştirilmiş, kaldırılmış veya adres yanlış yazılmış
            olabilir. Ana sayfaya dönebilir ya da çalışmalar arasından sana
            uygun olan yolu seçebilirsin.
          </p>

          <div className="innerPageHeroActions">
            <Link href="/">
              Ana Sayfaya Dön
              <span aria-hidden="true">→</span>
            </Link>

            <Link href="/calismalar">
              Çalışmaları İncele
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}