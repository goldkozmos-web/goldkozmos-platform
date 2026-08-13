import Navbar from "../../../components/Navbar";
import FooterSection from "../../../components/FooterSection";
import "../../../styles/home.css";

const shopierUrl = "https://www.shopier.com/goldkozmos";

const programItems = [
  {
    number: "01",
    title: "Kendilik Algısı",
    description:
      "Kendine nasıl baktığını ve bunun seçimlerine nasıl yansıdığını fark etme.",
  },
  {
    number: "02",
    title: "Özdeğer ve Onay",
    description:
      "Değerini başkalarının ilgisi, takdiri veya onayı üzerinden ölçtüğün alanlara bakma.",
  },
  {
    number: "03",
    title: "Sınırlar",
    description:
      "Hayır diyemediğin ve kendi ihtiyaçlarını geri plana attığın alanları görme.",
  },
  {
    number: "04",
    title: "Tekrar Eden Roller",
    description:
      "Günlük yaşamda ve ilişkilerde tekrar ettiğin davranış ve sorumluluk rollerini fark etme.",
  },
  {
    number: "05",
    title: "Kendilik Envanterin",
    description:
      "Kendi değerlerini, sınırlarını ve ihtiyaçlarını daha net bir çerçevede bir araya getirme.",
  },
];

const includedItems = [
  {
    number: "01",
    title: "Dijital Rehber Kitap",
    description:
      "Program sonrasında kendi zamanında kullanabileceğin dijital çalışma rehberi.",
  },
  {
    number: "02",
    title: "Numeroloji Analizi",
    description:
      "Kişisel eğilimlerini sembolik bir çerçevede inceleyen ek analiz.",
  },
  {
    number: "03",
    title: "Katılım Belgesi",
    description:
      "Kendilik Rezonansı programına katılımını gösteren dijital belge.",
  },
];

export default function KendilikPage() {
  return (
    <main className="kendilikSnapshotPage" id="top">
      {/* ORTAK GOLDKOZMOS NAVBAR */}

      <Navbar />

      {/* KENDİLİK REZONANSI */}

      <section className="kendilikSnapshotSection">
        <div className="kendilikSnapshotContainer">
          <div className="kendilikSnapshotCard">
            {/* ÜST HERO */}

            <div className="kendilikSnapshotHero">
              <div className="kendilikSnapshotHeroCopy">
                <p className="kendilikSnapshotEyebrow">
                  KENDİLİK REZONANSI · 5 GÜNLÜK ATÖLYE
                </p>

                <h1>
                  Kendine verdiğin
                  <br />
                  değer
                  <span> hayatına nasıl yansıyor?</span>
                </h1>

                <p className="kendilikSnapshotLead">
                  Özdeğerini, onay ihtiyacını, sınırlarını ve kendinle
                  kurduğun ilişkiyi daha yakından görmeye odaklanan
                  5 günlük canlı çalışma.
                </p>

                {/* ETİKETLER */}

                <div className="kendilikSnapshotTags">
                  <span>Özdeğer</span>
                  <span>Onay İhtiyacı</span>
                  <span>Sınırlar</span>
                  <span>Kendilik Algısı</span>
                </div>

                {/* PROGRAM BİLGİLERİ */}

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

                {/* FİYAT + SHOPIER */}

                <div className="kendilikSnapshotBuy">
                  <div>
                    <small>ATÖLYE ÜCRETİ</small>
                    <strong>1.500 TL</strong>
                  </div>

                  <a
                    className="kendilikSnapshotShopier"
                    href={shopierUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Shopier’den Katıl
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>

              {/* 1:1 GÖRSEL */}

              <div className="kendilikSnapshotVisual">
                <img
                  src="/images/services/kendilik-rezonansi.webp"
                  alt="Kendilik Rezonansı"
                />
              </div>
            </div>

            {/* ORTA 3 SÜTUN */}

            <div className="kendilikSnapshotMiddle">
              {/* SEBEP SONUÇ */}

              <div>
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
                    <strong>
                      Sınırların
                      <br />
                      bulanıklaşması
                    </strong>
                  </div>

                  <b>→</b>

                  <div>
                    <span>03</span>
                    <strong>
                      Kendini geri
                      <br />
                      plana atmak
                    </strong>
                  </div>
                </div>

                <p className="kendilikSnapshotReasonText">
                  Amaç sana nasıl biri olman gerektiğini söylemek değil;
                  kendi değerini ve sınırlarını hangi noktalarda geri plana
                  bıraktığını fark etmektir.
                </p>
              </div>

              {/* 5 GÜNLÜK PROGRAM */}

              <div>
                <p className="kendilikSnapshotEyebrow">
                  5 GÜNLÜK PROGRAM
                </p>

                <h2>
                  Neye
                  <span> bakacağız?</span>
                </h2>

                <div className="kendilikSnapshotProgramList">
                  {programItems.map((item) => (
                    <div key={item.number}>
                      <span>{item.number}</span>

                      <strong>{item.title}</strong>

                      <p>{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* PROGRAMA DAHİL */}

              <div>
                <p className="kendilikSnapshotEyebrow">
                  PROGRAMA DAHİL
                </p>

                <h2>
                  Program sonunda
                  <span> seninle kalanlar.</span>
                </h2>

                <div className="kendilikSnapshotIncludedList">
                  {includedItems.map((item) => (
                    <div key={item.number}>
                      <span>{item.number}</span>

                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ALT KAPANIŞ */}

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
                <span>✦</span>

                <span>Dijital rehber</span>
                <span>✦</span>

                <span>Numeroloji analizi</span>
                <span>✦</span>

                <span>Katılım belgesi</span>
              </div>
            </div>
          </div>

          {/* YASAL NOT */}

          <p className="kendilikSnapshotLegal">
            Bu çalışma kişisel farkındalık ve bireysel gelişim amacıyla
            hazırlanmıştır. Psikoterapi, psikolojik danışmanlık, teşhis veya
            tedavi yerine geçmez. Numeroloji içeriği sembolik öz farkındalık
            amacıyla sunulur. Katılım belgesi mesleki yeterlilik veya eğitim
            sertifikası değildir.
          </p>
        </div>
      </section>

      {/* DETAYLI FOOTER */}

      <FooterSection />
    </main>
  );
}