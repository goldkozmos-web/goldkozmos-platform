export default function Hero() {
  return (
    <section className="heroSection">
      <div className="heroContainer">
        <div className="heroContent">
          <p className="brandName">GOLDKOZMOS ENERJİ EKOLÜ™</p>

          <h1 className="heroTitle">
            İnsan Değişmeden
            <span>Hayat Değişmez.</span>
          </h1>

          <p className="heroDescription">
            Goldkozmos Enerji Ekolü, Spiritüel Stoa ve sosyoloji bakış
            açısıyla geliştirilen, Goldkozmos&apos;a özgü enerji sistemiyle
            farkındalık odaklı içsel dönüşümünü desteklemeyi amaçlayan özgün
            bir yaklaşımdır.
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
            WhatsApp&apos;tan Bilgi Al
          </a>

          <p className="heroNote">KENDİ KOZMOSUNU BUL</p>
        </div>

        <div className="heroVisual">
          <div className="heroImagePlaceholder">
            <div className="heroBrandPanel">
              <span className="heroPanelEyebrow">GOLDKOZMOS</span>

              <h2>
                Enerji
                <br />
                Ekolü™
              </h2>

              <p>
                Spiritüel Stoa
                <span>•</span>
                Sosyoloji
                <span>•</span>
                Enerji
              </p>

              <div className="heroPanelLine" />

              <small>Kendi Kozmosunu Bul.</small>
            </div>
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
  );
}