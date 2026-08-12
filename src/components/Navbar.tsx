export default function Navbar() {
  return (
    <header className="siteGlobalNav">
      <div className="siteGlobalNavInner">
        <a href="/" className="siteGlobalBrand">
          <strong>
            GOLDKOZMOS<sup>®</sup>
          </strong>

          <span>ENERJİ EKOLÜ</span>
        </a>

        <nav className="siteGlobalMenu">
          <a href="/">Ana Sayfa</a>

          <a href="/calismalar">
            Atölyeler
          </a>

          <a href="/calismalar#diger">
            Çalışmalar
          </a>

          <a href="/goldbook">
            GoldBook
          </a>

          <a href="/goldcast">
            GoldCast
          </a>

          <a href="/goldblog">
            GoldBlog
          </a>

          <a href="/hakkimda">
            Hakkımda
          </a>
        </nav>

        <a
          href="/sana-uygun-calismayi-bul"
          className="siteGlobalTest"
        >
          Ücretsiz Test
          <span>→</span>
        </a>
      </div>
    </header>
  );
}