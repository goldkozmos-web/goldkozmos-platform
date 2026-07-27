import Navbar from "../components/Navbar";
import "../styles/home.css";

export default function Home() {
  return (
    <main className="homePage">
      <Navbar />

      <section className="heroSection">
        <div className="heroContainer">
          <div className="heroContent">
            <p className="brandName">
              GOLDKOZMOS ENERJİ EKOLÜ™
            </p>

            <h1 className="heroTitle">
              İnsan Değişmeden
              <span>Hayat Değişmez.</span>
            </h1>

            <p className="heroDescription">
              Spiritüel Stoa ve sosyoloji bakış açısıyla geliştirilen
              Goldkozmos Enerji Ekolü, farkındalık odaklı içsel dönüşümünü
              destekleyen özgün bir yaklaşımdır.
            </p>

            <div className="heroButtons">
              <a href="/sana-uygun-calismayi-bul" className="primaryButton">
                Sana Uygun Çalışmayı Bul
              </a>

              <a href="/calismalar" className="secondaryButton">
                Çalışmaları Keşfet
              </a>
            </div>

            <a
              href="https://wa.me/"
              className="whatsappLink"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp’tan Bilgi Al
            </a>

            <p className="heroNote">KENDİ KOZMOSUNU BUL</p>
          </div>

          <div className="heroVisual">
            <div className="heroImagePlaceholder">
              <span>GOLDKOZMOS</span>
            </div>
          </div>
        </div>

        <div className="trustBar">
          <span>Online Çalışmalar</span>
          <span>Google Meet</span>
          <span>Bireysel ve Grup Programları</span>
          <span>Tarot ve Numeroloji</span>
          <span>Dijital İçerik Ekosistemi</span>
        </div>
      </section>
    </main>
  );
}