import Link from "next/link";

const workshops = [
  {
    number: "01",
    title: "Kendilik Rezonansı",
    description:
      "Özdeğer, sınırlar, onay ihtiyacı ve kendilik algısı üzerine 5 günlük farkındalık atölyesi.",
    themes: ["Özdeğer", "Sınırlar", "Onay Bağımlılığı", "Kendilik Algısı"],
    meta: "5 Gün · 75–90 dk · Google Meet",
    price: "1.500 TL",
    href: "/calismalar",
  },
  {
    number: "02",
    title: "İlişki Rezonansı",
    description:
      "Partner seçimi, tekrar eden ilişki örüntüleri, iletişim ve güven alanlarını birlikte inceleyen 5 günlük atölye.",
    themes: ["Partner Seçimi", "İlişki Örüntüleri", "İletişim", "Güven"],
    meta: "5 Gün · 75–90 dk · Google Meet",
    price: "1.500 TL",
    href: "/calismalar/iliski",
  },
  {
    number: "03",
    title: "Bolluk Rezonansı",
    description:
      "Para algısı, değer, kıtlık düşüncesi ve üretkenlik alışkanlıklarını görünür kılmaya odaklanan 5 günlük atölye.",
    themes: ["Para Algısı", "Değer", "Kıtlık Döngüsü", "Üretkenlik"],
    meta: "5 Gün · 75–90 dk · Google Meet",
    price: "1.500 TL",
    href: "/calismalar/para",
  },
];

export default function ResonanceWorkshopsSection() {
  return (
    <section className="resonanceSection" id="rezonans-atolyeleri">
      <div className="resonanceContainer">
        <div className="resonanceHeader">
          <p className="sectionEyebrow">REZONANS ATÖLYELERİ</p>

          <h2>
            Hayatında en çok
            <span> hangi alan tekrar ediyor?</span>
          </h2>

          <p>
            Üç ana atölyeden sana en yakın olan alanı seç ve detaylarını
            incele.
          </p>
        </div>

        <div className="resonanceGrid">
          {workshops.map((workshop) => (
            <article className="resonanceCard" key={workshop.title}>
              <div className="resonanceCardTop">
                <span>{workshop.number}</span>
                <span aria-hidden="true">✦</span>
              </div>

              <h3>{workshop.title}</h3>

              <p className="resonanceCardDescription">
                {workshop.description}
              </p>

              <div className="resonanceTags" aria-label="Atölye başlıkları">
                {workshop.themes.map((theme) => (
                  <span key={theme}>{theme}</span>
                ))}
              </div>

              <div className="resonanceMeta">
                <p>{workshop.meta}</p>
                <strong>{workshop.price}</strong>
              </div>

              <Link className="resonanceCardButton" href={workshop.href}>
                Atölyeyi İncele
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}