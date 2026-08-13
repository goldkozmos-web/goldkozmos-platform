import FooterSection from "../../components/FooterSection";
import "../../styles/home.css";

const books = [
  {
    number: "01",
    category: "KİŞİSEL DÖNÜŞÜM",
    title: "İçindeki Kozmosu Kucakla",
    description:
      "Özdeğer, sınırlar, sezgi, geçmişten taşınan kalıplar ve içsel özgürlük üzerine hazırlanmış dijital GoldBook.",
    image: "/goldbook/icindeki-kozmosu-kucakla.webp",
    price: "300 TL",
    shopier:
      "https://www.shopier.com/goldkozmos/46435030",
    focus: [
      "Başkalarının yargılarından özgürleşmek",
      "Kendi değerini yeniden hatırlamak",
      "Sağlıklı sınırlar oluşturmak",
      "Sezgi ve teslimiyet alanını keşfetmek",
    ],
    info: [
      "20 bölümlük içsel yolculuk",
      "5 ana kısım ve son söz",
      "Dijital kitap formatı",
      "Özge Batıgün imzalı",
    ],
  },
  {
    number: "02",
    category: "AŞK VE İLİŞKİLER",
    title: "Aşk Manifestosu",
    description:
      "Geçmiş ilişkiler, tekrar eden senaryolar, sınırlar, flört dinamikleri ve doğru ilişkiyi seçme üzerine hazırlanmış dijital GoldBook.",
    image: "/goldbook/ask-manifestosu.webp",
    price: "300 TL",
    shopier:
      "https://www.shopier.com/goldkozmos/47631093",
    focus: [
      "Aşk ihtiyacını seçime taşımak",
      "Tekrarlayan ilişki döngülerini görmek",
      "Flörtte kendi merkezini korumak",
      "Gerçek ilgiyi ayırt etmek",
    ],
    info: [
      "20 bölümlük ilişki rehberi",
      "6 ana kısım",
      "Dijital kitap formatı",
      "Özge Batıgün imzalı",
    ],
  },
];

export default function GoldBookPage() {
  return (
    <main className="goldbookCompactPage homePage" id="top">
      <header className="goldbookCompactNav">
        <div className="goldbookCompactNavInner">
          <a href="/" className="goldbookCompactBrand">
            <strong>
              Goldkozmos<sup>®</sup>
            </strong>

            <span>ENERJİ EKOLÜ</span>
          </a>

          <nav className="goldbookCompactMenu">
            <a href="/">Ana Sayfa</a>
            <a href="/enerji-ekolu">Enerji Ekolü</a>
            <a href="/calismalar">Çalışmalar</a>
            <a href="/goldbook">GoldBook</a>
            <a href="/goldcast">GoldCast</a>
            <a href="/goldblog">GoldBlog</a>
            <a href="/etkinlikler">Etkinlikler</a>
            <a href="/hakkimda">Hakkımda</a>
          </nav>

          <a
            href="/calismalar"
            className="goldbookCompactNavButton"
          >
            Çalışmaları Gör
          </a>
        </div>
      </header>

      <section className="goldbookCompactHero">
        <div className="goldbookCompactContainer">
          <div className="goldbookCompactHeroGrid">
            <div>
              <p className="goldbookCompactEyebrow">
                GOLDBOOK KÜTÜPHANESİ
              </p>

              <h1>
                Okudukça kendine
                <span> biraz daha yaklaş.</span>
              </h1>
            </div>

            <div className="goldbookCompactHeroText">
              <p>
                GoldBook, Goldkozmos® Enerji Ekolü
                içerisinde kişisel farkındalık ve içsel
                dönüşüm konularında hazırlanan dijital
                kitap koleksiyonudur.
              </p>

              <p>
                Kütüphanede şu anda iki GoldBook
                bulunuyor. Yeni çalışmalar yayımlandıkça
                koleksiyona eklenecek.
              </p>
            </div>
          </div>

          <div className="goldbookCompactGrid">
            {books.map((book) => (
              <article
                className="goldbookCompactCard"
                key={book.title}
              >
                <div className="goldbookCompactCardTop">
                  <div className="goldbookCompactCover">
                    <img
                      src={book.image}
                      alt={book.title}
                    />
                  </div>

                  <div className="goldbookCompactMainInfo">
                    <div className="goldbookCompactNumber">
                      <span>{book.number}</span>
                      <span>✦</span>
                    </div>

                    <p className="goldbookCompactCategory">
                      {book.category}
                    </p>

                    <h2>{book.title}</h2>

                    <p className="goldbookCompactDescription">
                      {book.description}
                    </p>

                    <div className="goldbookCompactPrice">
                      {book.price}
                    </div>
                  </div>
                </div>

                <div className="goldbookCompactDetails">
                  <div>
                    <h3>Kitabın odağı</h3>

                    <ul>
                      {book.focus.map((item) => (
                        <li key={item}>
                          <span>✦</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3>Kitap bilgileri</h3>

                    <ul>
                      {book.info.map((item) => (
                        <li key={item}>
                          <span>✦</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <a
                  className="goldbookCompactButton"
                  href={book.shopier}
                  target="_blank"
                  rel="noreferrer"
                >
                  Shopier’den Al
                  <span>→</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}