const shopierUrl =
  "https://www.shopier.com/goldkozmos/49716325";

const program = [
  {
    number: "01",
    title: "Kendilik Algısı",
    text: "Kendine nasıl baktığını ve bunun seçimlerine nasıl yansıdığını fark et.",
  },
  {
    number: "02",
    title: "Özdeğer ve Onay",
    text: "Değerini başkalarının ilgisi veya onayı üzerinden ölçtüğün alanlara bak.",
  },
  {
    number: "03",
    title: "Sınırlar",
    text: "Hayır diyemediğin ve kendi ihtiyaçlarını geri plana attığın alanları gör.",
  },
  {
    number: "04",
    title: "Tekrar Eden Roller",
    text: "Günlük yaşamda ve ilişkilerde tekrar ettiğin davranış rollerini fark et.",
  },
  {
    number: "05",
    title: "Kendilik Envanteri",
    text: "Değerlerini, sınırlarını ve ihtiyaçlarını daha net bir çerçevede birleştir.",
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

export default function KendilikRezonansiPage() {
  return (
    <main className="kendilikSnapshotPage" id="top">
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

      <section className="kendilikSnapshotSection">
        <div className="kendilikSnapshotContainer">
          <article className="kendilikSnapshotCard">
            <div className="kendilikSnapshotHero">
              <div className="kendilikSnapshotHeroCopy">
                <p className="kendilikSnapshotEyebrow">
                  KENDİLİK REZONANSI · 5 GÜNLÜK ATÖLYE
                </p>

                <h1>
                  Kendine verdiğin değer
                  <span> hayatına nasıl yansıyor?</span>
                </h1>

                <p className="kendilikSnapshotLead">
                  Özdeğerini, onay ihtiyacını, sınırlarını ve
                  kendinle kurduğun ilişkiyi daha yakından görmeye
                  odaklanan 5 günlük canlı çalışma.
                </p>

                <div className="kendilikSnapshotTags">
                  <span>Özdeğer</span>
                  <span>Onay İhtiyacı</span>
                  <span>Sınırlar</span>
                  <span>Kendilik Algısı</span>
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

              <div className="kendilikSnapshotVisual">
                <img
                  src="/images/services/kendilik-rezonansi.webp"
                  alt="Kendilik Rezonansı"
                />
              </div>
            </div>

            <div className="kendilikSnapshotMiddle">
              <div className="kendilikSnapshotReason">
                <p className="kendilikSnapshotEyebrow">
                  SEBEP → SONUÇ
                </p>

                <h2>
                  Kendini geri plana atmak
                  <span> nerede başlıyor?</span>
                </h2>

                <div className="kendilikSnapshotReasonFlow">
                  <div>
                    <span>01</span>
                    <strong>Onay ihtiyacı</strong>
                  </div>

                  <b>→</b>

                  <div>
                    <span>02</span>
                    <strong>Sınırların bulanıklaşması</strong>
                  </div>

                  <b>→</b>

                  <div>
                    <span>03</span>
                    <strong>Kendini geri plana atmak</strong>
                  </div>
                </div>

                <p className="kendilikSnapshotReasonText">
                  Amaç sana nasıl biri olman gerektiğini söylemek değil;
                  kendi değerini ve sınırlarını hangi noktalarda geri
                  plana bıraktığını fark etmektir.
                </p>
              </div>

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

            <div className="kendilikSnapshotBottom kendilikSnapshotBottomSimple">
              <div className="kendilikSnapshotBottomCopy">
                <p className="kendilikSnapshotEyebrow">
                  KENDİLİK REZONANSI
                </p>

                <h2>
                  Hayatını değiştirmeden önce
                  <span> kendine nasıl baktığını gör.</span>
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
            amacıyla hazırlanmıştır. Psikoterapi, psikolojik
            danışmanlık, teşhis veya tedavi yerine geçmez.
            Numeroloji içeriği sembolik öz farkındalık amacıyla
            sunulur. Katılım belgesi mesleki yeterlilik veya
            eğitim sertifikası değildir.
          </p>
        </div>
      </section>

      <footer className="kendilikSnapshotFooter">
        <div className="kendilikSnapshotFooterInner">
          <div>
            <strong>
              GOLDKOZMOS<sup>®</sup>
            </strong>

            <span>ENERJİ EKOLÜ</span>
          </div>

          <a href="/">Ana Sayfa</a>
          <a href="#top">Yukarı ↑</a>
        </div>
      </footer>
    </main>
  );
}