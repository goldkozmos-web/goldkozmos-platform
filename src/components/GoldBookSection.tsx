import Image from "next/image";
import Link from "next/link";

const publishedBooks = [
  {
    number: "01",
    category: "KİŞİSEL DÖNÜŞÜM",
    title: "İçindeki Kozmosu Kucakla",
    description:
      "Özdeğer, sınırlar, sezgi, geçmişten taşınan kalıplar ve içsel özgürlük üzerine hazırlanan dijital GoldBook.",
    image: "/goldbook/icindeki-kozmosu-kucakla.jpeg",
    imageAlt: "İçindeki Kozmosu Kucakla GoldBook kapağı",
    themes: [
      "Başkalarının yargılarından özgürleşmek",
      "Kendi değerini yeniden hatırlamak",
      "Sağlıklı sınırlar oluşturmak",
      "Sezgi ve teslimiyet alanını keşfetmek",
    ],
    details: [
      "20 bölümlük içsel yolculuk",
      "5 ana kısım ve son söz",
      "Dijital kitap formatı",
      "Özge Batıgün imzalı",
    ],
    href: "/goldbook/icindeki-kozmosu-kucakla",
    button: "Kitabı İncele",
  },
  {
    number: "02",
    category: "AŞK VE İLİŞKİLER",
    title: "Aşk Manifestosu",
    description:
      "Geçmiş ilişkiler, tekrar eden senaryolar, sınırlar, flört dinamikleri ve doğru kişiye hazırlanma üzerine hazırlanan dijital GoldBook.",
    image: "/goldbook/ask-manifestosu.jpeg",
    imageAlt: "Aşk Manifestosu GoldBook kapağı",
    themes: [
      "Aşkı ihtiyaçtan seçime taşımak",
      "Tekrarlayan ilişki döngülerini görmek",
      "Flörtte kendi merkezini korumak",
      "Gerçek ilgiyi ayırt etmek",
    ],
    details: [
      "20 bölümlük ilişki rehberi",
      "6 ana kısım",
      "Dijital kitap formatı",
      "Özge Batıgün imzalı",
    ],
    href: "/goldbook/ask-manifestosu",
    button: "Kitabı İncele",
  },
];

const readingBenefits = [
  {
    title: "Kendi Hızında Oku",
    description:
      "Kitapları kendi zamanında okuyabilir, dikkatini çeken bölümlere yeniden dönebilirsin.",
  },
  {
    title: "Farkındalıklarını Not Al",
    description:
      "Okurken ortaya çıkan düşünceleri, duyguları ve yaşamındaki karşılıkları gözlemleyebilirsin.",
  },
  {
    title: "Dijital Olarak Eriş",
    description:
      "GoldBook içerikleri dijital formatta hazırlanır ve çevrim içi olarak teslim edilir.",
  },
  {
    title: "Yolculuğunu Derinleştir",
    description:
      "Kitapları birebir seans veya grup çalışmalarının yanında destekleyici içerik olarak kullanabilirsin.",
  },
];

export default function GoldBookSection() {
  return (
    <section className="analysisHubSection" id="goldbook">
      <div className="analysisHubContainer">
        <div className="analysisHubIntro">
          <div>
            <p className="sectionEyebrow">GOLDBOOK KÜTÜPHANESİ</p>

            <h2>
              Okudukça kendine
              <span> biraz daha yaklaş.</span>
            </h2>
          </div>

          <div className="analysisHubIntroText">
            <p>
              GoldBook, Goldkozmos® Enerji Ekolü içerisinde kişisel
              farkındalık ve içsel dönüşüm konularında hazırlanan dijital
              kitap koleksiyonudur.
            </p>

            <p>
              Kütüphanede şu anda yayımlanmış iki kitap bulunuyor. Yeni
              kitaplar yayımlandıkça bu alana eklenecek.
            </p>
          </div>
        </div>

        <div className="analysisHubGrid">
          {publishedBooks.map((book) => (
            <article className="analysisHubCard" key={book.title}>
              <div className="goldBookCoverStage">
                <div className="goldBookCoverRing" aria-hidden="true" />

                <div className="goldBookCoverFrame">
                  <Image
                    className="goldBookCoverImage"
                    src={book.image}
                    alt={book.imageAlt}
                    width={1054}
                    height={1492}
                    sizes="(max-width: 700px) 68vw, 310px"
                    priority={book.number === "01"}
                  />
                </div>
              </div>

              <div className="analysisHubCardTop">
                <span>{book.number}</span>
                <span aria-hidden="true">✦</span>
              </div>

              <p className="analysisHubCardEyebrow">
                {book.category}
              </p>

              <h3>{book.title}</h3>

              <p className="analysisHubCardDescription">
                {book.description}
              </p>

              <div className="analysisHubCardColumns">
                <div>
                  <h4>Kitabın odağı</h4>

                  <ul>
                    {book.themes.map((theme) => (
                      <li key={theme}>
                        <span aria-hidden="true">✦</span>
                        {theme}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4>Kitap bilgileri</h4>

                  <ul>
                    {book.details.map((detail) => (
                      <li key={detail}>
                        <span aria-hidden="true">✦</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link href={book.href}>
                {book.button}
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>

        <div className="analysisHubComparison">
          <div className="analysisHubComparisonIntro">
            <p className="sectionEyebrow">
              GOLDBOOK DENEYİMİ
            </p>

            <h2>
              Kitabı yalnızca okuma,
              <span> kendi yaşamında da gözlemle.</span>
            </h2>
          </div>

          <div className="analysisHubComparisonGrid">
            {readingBenefits.map((benefit, index) => (
              <article key={benefit.title}>
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3>{benefit.title}</h3>

                <p>{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="analysisHubNotice">
          <div>
            <p className="sectionEyebrow">
              ÖNEMLİ BİLGİLENDİRME
            </p>

            <h2>
              GoldBook içerikleri
              <span> kişisel farkındalık amacıyla hazırlanır.</span>
            </h2>
          </div>

          <div>
            <p>
              Kitaplar psikoterapi, psikolojik danışmanlık, tıbbi teşhis
              veya tedavi yerine geçmez.
            </p>

            <p>
              Sağlık veya psikolojiyle ilgili konularda gerektiğinde yetkili
              bir uzmandan profesyonel destek alınmalıdır.
            </p>
          </div>
        </div>

        <div className="analysisHubActions">
          <Link href="/iletisim">
            GoldBook Hakkında Bilgi Al
            <span aria-hidden="true">→</span>
          </Link>

          <Link href="/calismalar">
            Tüm Çalışmaları İncele
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}