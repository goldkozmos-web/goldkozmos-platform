import Navbar from "../../../components/Navbar";
import FooterSection from "../../../components/FooterSection";
import "../../../styles/home.css";

const shopierUrl =
  "https://www.shopier.com/goldkozmos/49716360";

const program = [
  {
    number: "01",
    title: "Partner Seçimi",
    text: "Seni belirli kişilere çeken seçim ve çekim dinamiklerini fark et.",
  },
  {
    number: "02",
    title: "İlişki Örüntüleri",
    text: "Kişiler değişse de tekrar eden ilişki senaryolarına bak.",
  },
  {
    number: "03",
    title: "İhtiyaçlar ve İletişim",
    text: "İlişkide ne istediğini ve bunu nasıl ifade ettiğini fark et.",
  },
  {
    number: "04",
    title: "Güven ve Sınırlar",
    text: "Yakınlık kurarken kendi alanını ve sınırlarını nasıl koruduğunu gör.",
  },
  {
    number: "05",
    title: "İlişki Sözlüğün",
    text: "Nasıl bir ilişki istediğini ve istemediğini daha net tanımla.",
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

export default function IliskiRezonansiPage() {
  return (
    <main
      className="kendilikSnapshotPage iliskiSnapshotPage"
      id="top"
    >
      {/* ORTAK GOLDKOZMOS NAVBAR */}

      <Navbar />

      {/* TEK ANA KART */}

      <section className="kendilikSnapshotSection">
        <div className="kendilikSnapshotContainer">
          <article className="kendilikSnapshotCard">
            {/* ÜST HERO */}

            <div className="kendilikSnapshotHero">
              <div className="kendilikSnapshotHeroCopy">
                <p className="kendilikSnapshotEyebrow">
                  İLİŞKİ REZONANSI · 5 GÜNLÜK ATÖLYE
                </p>

                <h1>
                  İlişkilerinde aynı
                  <span> hikâye mi tekrar ediyor?</span>
                </h1>

                <p className="kendilikSnapshotLead">
                  Partner seçimlerini, tekrar eden ilişki
                  örüntülerini, ihtiyaçlarını ve sınırlarını
                  daha yakından görmeye odaklanan 5 günlük
                  canlı çalışma.
                </p>

                <div className="kendilikSnapshotTags">
                  <span>Partner Seçimi</span>
                  <span>İlişki Örüntüleri</span>
                  <span>İletişim</span>
                  <span>Güven &amp; Sınırlar</span>
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

              <div className="kendilikSnapshotVisual iliskiSnapshotVisual">
                <img
                  src="/images/services/iliski-rezonansi.webp"
                  alt="İlişki Rezonansı"
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
                  Kişi değişiyor,
                  <span> hikâye neden değişmiyor?</span>
                </h2>

                <div className="kendilikSnapshotReasonFlow">
                  <div>
                    <span>01</span>
                    <strong>Benzer seçimler</strong>
                  </div>

                  <b>→</b>

                  <div>
                    <span>02</span>
                    <strong>Benzer ilişki dinamikleri</strong>
                  </div>

                  <b>→</b>

                  <div>
                    <span>03</span>
                    <strong>Benzer sonuçlar</strong>
                  </div>
                </div>

                <p className="kendilikSnapshotReasonText">
                  Amaç karşındaki kişiyi çözmek değil;
                  kendi seçimlerini, sınırlarını ve ilişkide
                  aldığın yeri daha görünür hale getirmektir.
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

            <div className="kendilikSnapshotBottom iliskiSnapshotBottomSimple">
              <div className="kendilikSnapshotBottomCopy">
                <p className="kendilikSnapshotEyebrow">
                  İLİŞKİ REZONANSI
                </p>

                <h2>
                  İlişkide önce
                  <span> kendi yerini gör.</span>
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
            amacıyla hazırlanmıştır. Psikoterapi, çift terapisi,
            psikolojik danışmanlık, teşhis veya tedavi yerine
            geçmez. Numeroloji içeriği sembolik öz farkındalık
            amacıyla sunulur. Katılım belgesi mesleki yeterlilik
            veya eğitim sertifikası değildir.
          </p>
        </div>
      </section>

      {/* DETAYLI GOLDKOZMOS FOOTER */}

      <FooterSection />
    </main>
  );
}