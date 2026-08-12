import Image from "next/image";
import Link from "next/link";

const books = [
  {
    number: "01",
    category: "KİŞİSEL DÖNÜŞÜM",
    title: "İçindeki Kozmosu Kucakla",
    description:
      "Özdeğer, sınırlar, sezgi, geçmişten taşınan kalıplar ve içsel özgürlük üzerine hazırlanan dijital GoldBook.",
    image: "/images/icindeki-kozmosu-kucakla.webp",
    price: "300 TL",
    href: "/goldbook/icindeki-kozmosu-kucakla",
  },
  {
    number: "02",
    category: "AŞK VE İLİŞKİLER",
    title: "Aşk Manifestosu",
    description:
      "Geçmiş ilişkiler, tekrar eden senaryolar, sınırlar ve flört dinamikleri üzerine hazırlanan 20 bölümlük dijital GoldBook.",
    image: "/images/ask-manifestosu.webp",
    price: "300 TL",
    href: "/goldbook/ask-manifestosu",
  },
];

export default function HomeGoldBookSection() {
  return (
    <section className="homeGoldBookSection" id="goldbook">
      <div className="homeGoldBookContainer">
        <div className="homeGoldBookHeader">
          <div>
            <p className="sectionEyebrow">GOLDBOOK</p>

            <h2>
              Okudukça kendine
              <span> biraz daha yaklaş.</span>
            </h2>
          </div>

          <div className="homeGoldBookHeaderSide">
            <p>
              Goldkozmos® dünyasında yayımlanan dijital kitapları kendi
              zamanında okuyabilir, sana dokunan bölümlere yeniden
              dönebilirsin.
            </p>

            <Link href="/goldbook">
              Tüm GoldBookları Gör
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="homeGoldBookGrid">
          {books.map((book) => (
            <article className="homeGoldBookCard" key={book.title}>
              <Link
                className="homeGoldBookCoverLink"
                href={book.href}
                aria-label={`${book.title} kitabını incele`}
              >
                <div className="homeGoldBookCoverFrame">
                  <Image
                    src={book.image}
                    alt={`${book.title} kitap kapağı`}
                    fill
                    sizes="(max-width: 760px) 72vw, 320px"
                    className="homeGoldBookCover"
                  />
                </div>
              </Link>

              <div className="homeGoldBookInfo">
                <div className="homeGoldBookMeta">
                  <span>{book.number}</span>
                  <span>{book.category}</span>
                </div>

                <h3>{book.title}</h3>

                <p>{book.description}</p>

                <strong className="homeGoldBookPrice">{book.price}</strong>

                <Link className="homeGoldBookButton" href={book.href}>
                  Kitabı İncele
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}