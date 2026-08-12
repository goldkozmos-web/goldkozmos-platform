const shopierUrl =
  "https://www.shopier.com/goldkozmos/49716246";

const program = [
  {
    number: "01",
    title: "Para Hikâyen",
    text: "Para hakkında öğrendiğin düşüncelerin bugünkü seçimlerine nasıl yansıdığını fark et.",
  },
  {
    number: "02",
    title: "Değer Algısı",
    text: "Ürettiğin şey ile kendine biçtiğin değer arasındaki ilişkiye bak.",
  },
  {
    number: "03",
    title: "Kıtlık Döngüsü",
    text: "Yetmezlik ve kaybetme düşüncesinin tekrar ettiği alanları fark et.",
  },
  {
    number: "04",
    title: "Üretkenlik",
    text: "Gelir üretimini destekleyen veya zorlaştıran günlük alışkanlıklarına bak.",
  },
  {
    number: "05",
    title: "Bolluk Planın",
    text: "Para, değer ve üretim alanında kendi yol haritanı oluştur.",
  },
];

const included = [
  {
    number: "01",
    title: "Dijital Rehber Kitap",
    text: "Program sonrasında kendi zamanında kullanabileceğin çalışma rehberi.",
  },
  {
    number: "02",
    title: "Numeroloji Analizi",
    text: "Kişisel eğilimlerini sembolik bir çerçevede inceleyen ek analiz.",
  },
  {
    number: "03",
    title: "Katılım Belgesi",
    text: "Programa katılımını gösteren dijital belge.",
  },
];

export default function BollukRezonansiPage() {
  return (
    <main
      className="kendilikSnapshotPage bollukSnapshotPage"
      id="top"
    >
      {/* ÜST NAV */}

      <header className="kendilikSnapshotNav">
        <div className="kendilikSnapshotNavInner">
          <a href="/" className="kendilikSnapshotBrand">
            <strong>
              GOLDKOZMOS<sup>®</sup>
            </strong>

            <span>ENERJİ EKOLÜ</span>
          </a>

          <a href="/" className="kendilikSnapshotHome">
            Ana Sayfa
          </a>
        </div>
      </header>

      {/* TEK ANA KART */}

      <section className="kendilikSnapshotSection bollukSnapshotSection">
        <div className="kendilikSnapshotContainer">
          <article className="kendilikSnapshotCard">
            {/* ÜST HERO */}

            <div className="kendilikSnapshotHero">
              <div className="kendilikSnapshotHeroCopy">
                <p className="kendilikSnapshotEyebrow">
                  BOLLUK REZONANSI · 5 GÜNLÜK ATÖLYE
                </p>

                <h1>
                  Para ile ilişkin
                  <span> hayatını nasıl şekillendiriyor?</span>
                </h1>

                <p className="kendilikSnapshotLead">
                  Para algını, kişisel değerini, kıtlık
                  düşüncelerini ve üretkenlik alışkanlıklarını
                  daha yakından görmeye odaklanan 5 günlük
                  canlı çalışma.
                </p>

                <div className="kendilikSnapshotTags">
                  <span>Para Algısı</span>
                  <span>Değer</span>
                  <span>Kıtlık Döngüsü</span>
                  <span>Üretkenlik</span>
                </div>

                <div className="kendilikSnapshotMeta">
                  <div>
                    <small>SÜRE</small>
                    <strong>5 Gün</strong>
                  </div>

                  <div>
                    <small>GÖRÜŞME</small>
                    <strong>75–90 dk</strong>
                  </div>

                  <div>
                    <small>FORMAT</small>
                    <strong>Google Meet</strong>
                  </div>
                </div>

                <div className="kendilikSnapshotBuy">
                  <div>
                    <small>ATÖLYE ÜCRETİ</small>
                    <strong>1.500 TL</strong>
                  </div>

                  <a
                    href={shopierUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="kendilikSnapshotShopier"
                  >
                    Shopier’den Katıl
                    <span>→</span>
                  </a>
                </div>
              </div>

              {/* GÖRSEL */}

              <div className="kendilikSnapshotVisual bollukSnapshotVisual">
                <img
                  src="/images/services/bolluk-rezonansi.webp"
                  alt="Bolluk Rezonansı"
                />
              </div>
            </div>

            {/* ORTA 3 SÜTUN */}

            <div className="kendilikSnapshotMiddle">
              {/* SEBEP SONUÇ */}

              <div className="kendilikSnapshotReason">
                <p className="kendilikSnapshotEyebrow">
                  SEBEP → SONUÇ
                </p>

                <h2>
                  Para geliyor,
                  <span> neden aynı döngü devam ediyor?</span>
                </h2>

                <div className="kendilikSnapshotReasonFlow">
                  <div>
                    <span>01</span>
                    <strong>Kıtlık düşüncesi</strong>
                  </div>

                  <b>→</b>

                  <div>
                    <span>02</span>
                    <strong>Değeri küçültmek</strong>
                  </div>

                  <b>→</b>

                  <div>
                    <span>03</span>
                    <strong>Tekrar eden döngü</strong>
                  </div>
                </div>

                <p className="kendilikSnapshotReasonText">
                  Amaç sana nasıl zengin olunacağını anlatmak değil;
                  para, değer ve üretim alanında tekrar ettiğin
                  düşünce ve davranışları daha görünür hale getirmektir.
                </p>
              </div>

              {/* PROGRAM */}

              <div className="kendilikSnapshotProgram">
                <p className="kendilikSnapshotEyebrow">
                  5 GÜNLÜK PROGRAM
                </p>

                <h2>
                  Neye
                  <span> bakacağız?</span>
                </h2>

                <div className="kendilikSnapshotProgramList">
                  {program.map((item) => (
                    <div key={item.number}>
                      <span>{item.number}</span>

                      <strong>{item.title}</strong>

                      <p>{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* PROGRAMA DAHİL */}

              <div className="kendilikSnapshotIncluded">
                <p className="kendilikSnapshotEyebrow">
                  PROGRAMA DAHİL
                </p>

                <h2>
                  Program sonunda
                  <span> seninle kalanlar.</span>
                </h2>

                <div className="kendilikSnapshotIncludedList">
                  {included.map((item) => (
                    <div key={item.number}>
                      <span>{item.number}</span>

                      <div>
                        <strong>{item.title}</strong>

                        <p>{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ALT KAPANIŞ */}

            <div className="kendilikSnapshotBottom bollukSnapshotBottomSimple">
              <div className="kendilikSnapshotBottomCopy">
                <p className="kendilikSnapshotEyebrow">
                  BOLLUK REZONANSI
                </p>

                <h2>
                  Para değişmeden önce
                  <span> para ile ilişkini gör.</span>
                </h2>
              </div>

              <div className="kendilikSnapshotBottomInfo">
                <span>5 günlük canlı çalışma</span>
                <span>•</span>
                <span>Dijital rehber</span>
                <span>•</span>
                <span>Numeroloji analizi</span>
                <span>•</span>
                <span>Katılım belgesi</span>
              </div>
            </div>
          </article>

          <p className="kendilikSnapshotLegal">
            Bu çalışma kişisel farkındalık ve bireysel gelişim
            amacıyla hazırlanmıştır. Finansal danışmanlık,
            yatırım tavsiyesi veya gelir garantisi sunmaz.
            Numeroloji içeriği sembolik öz farkındalık amacıyla
            sunulur. Katılım belgesi mesleki yeterlilik veya
            eğitim sertifikası değildir.
          </p>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="kendilikSnapshotFooter">
        <div className="kendilikSnapshotFooterInner">
          <div>
            <strong>
              GOLDKOZMOS<sup>®</sup>
            </strong>

            <span>ENERJİ EKOLÜ</span>
          </div>

          <a href="/">
            Ana Sayfa
          </a>

          <a href="#top">
            Yukarı ↑
          </a>
        </div>
      </footer>
    </main>
  );
}