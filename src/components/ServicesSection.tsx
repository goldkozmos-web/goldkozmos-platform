const trainings = [
  {
    number: "01",
    title: "Kendilik Rezonansı",
    description:
      "Kendinle kurduğun ilişkiyi, özdeğerini, sınırlarını ve tekrar eden kişisel örüntülerini daha yakından incelemeye odaklanan kayıtlı eğitim.",
    themes: ["Özdeğer", "Sınırlar", "Onay İhtiyacı", "Kendilik Algısı"],
    price: "1.500 TL",
  },
  {
    number: "02",
    title: "İlişki Rezonansı",
    description:
      "İlişkilerde tekrar eden döngüleri, bağlanma biçimlerini, sınırları ve partner seçimlerini daha yakından görmeye odaklanan kayıtlı eğitim.",
    themes: ["Partner Seçimi", "İlişki Örüntüleri", "Sınırlar", "İletişim"],
    price: "1.500 TL",
  },
  {
    number: "03",
    title: "Bolluk Rezonansı",
    description:
      "Para, üretkenlik, değer algısı ve bollukla kurulan ilişkiyi daha yakından incelemeye odaklanan kayıtlı eğitim.",
    themes: ["Para Algısı", "Değer", "Kıtlık Döngüsü", "Üretkenlik"],
    price: "1.500 TL",
  },
];

export default function ResonanceWorkshopsSection() {
  return (
    <section
      className="resonanceSection resonanceEducationSection"
      id="rezonans-atolyeleri"
    >
      <div className="resonanceContainer">
        <div className="resonanceHeader">
          <p className="sectionEyebrow">REZONANS EĞİTİMLERİ</p>

          <h2>
            Kendi alanını seç,
            <span> kendi hızında ilerle.</span>
          </h2>

          <p>
            Kendilik, ilişki ve bolluk alanlarına odaklanan kayıtlı eğitimler
            hazırlanıyor. Eğitimler tamamlandığında bu alan üzerinden erişime
            açılacak.
          </p>
        </div>

        <div
          className="resonanceEducationNotice"
          role="status"
          aria-label="Rezonans Eğitimleri erişim durumu"
        >
          <div>
            <span>YAKINDA</span>
            <strong>Eğitim alanı hazırlanıyor.</strong>
          </div>

          <p>
            Rezonans Eğitimleri henüz satışa ve erişime açılmadı. İçerikler
            tamamlandığında bu bölüm aktif hale gelecek.
          </p>
        </div>

        <div className="resonanceGrid">
          {trainings.map((training) => (
            <article
              className="resonanceCard resonanceEducationCard"
              key={training.title}
            >
              <div className="resonanceCardTop">
                <span>{training.number}</span>
                <span className="resonanceEducationCardStatus">
                  YAKINDA
                </span>
              </div>

              <h3>{training.title}</h3>

              <p className="resonanceCardDescription">
                {training.description}
              </p>

              <div
                className="resonanceTags"
                aria-label={`${training.title} eğitim başlıkları`}
              >
                {training.themes.map((theme) => (
                  <span key={theme}>{theme}</span>
                ))}
              </div>

              <div className="resonanceMeta">
                <p>Kayıtlı eğitim · Kendi hızında erişim</p>
                <strong>{training.price}</strong>
              </div>

              <div
                className="resonanceCardButton resonanceCardButtonDisabled"
                aria-disabled="true"
              >
                Yakında Açılacak
                <span aria-hidden="true">○</span>
              </div>
            </article>
          ))}
        </div>

        <div className="resonanceEducationPackage">
          <div className="resonanceEducationPackageCopy">
            <p className="sectionEyebrow">REZONANS EĞİTİM PAKETİ</p>

            <h3>
              Üç eğitimi
              <span> tek pakette bir araya getir.</span>
            </h3>

            <p>
              Kendilik Rezonansı, İlişki Rezonansı ve Bolluk Rezonansı
              eğitimlerinin tamamına erişim sağlayacak toplu paket.
            </p>
          </div>

          <div className="resonanceEducationPrices">
            <div>
              <span>TEK EĞİTİM</span>
              <strong>1.500 TL</strong>
            </div>

            <div className="isFeatured">
              <span>3 EĞİTİM BİRLİKTE</span>
              <strong>3.000 TL</strong>
            </div>
          </div>

          <div className="resonanceEducationPackageBottom">
            <p>
              Toplu paket üç Rezonans Eğitimi’ne erişim içerir. Satış henüz
              başlamamıştır.
            </p>

            <div
              className="resonanceEducationPackageButton"
              aria-disabled="true"
            >
              Yakında Açılıyor
              <span aria-hidden="true">→</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
