import Link from "next/link";

const works = [
  {
    number: "01",
    eyebrow: "BİREBİR ÇALIŞMA",
    title: "Tek Birebir Seans",
    description:
      "Belirli bir konuya odaklanmak, mevcut durumunu daha net görmek ve sana özel bir yön oluşturmak için birebir çalışma.",
    meta: "90 dk · Online",
    price: "2.500 TL",
    href: "/calismalar/birebir-seanslar",
    button: "Seansı İncele",
  },
  {
    number: "02",
    eyebrow: "YOĞUN BİREBİR SÜREÇ",
    title: "5 Günlük Yoğun Paket",
    description:
      "Aynı konu üzerinde ardışık 5 gün boyunca çalışmak ve süreci bölmeden ilerlemek isteyenler için yapılandırılmış birebir paket.",
    meta: "5 Ardışık Gün · Online",
    price: "5.000 TL",
    href: "/calismalar/birebir-seanslar",
    button: "Paketi İncele",
  },
  {
    number: "03",
    eyebrow: "SEMBOLİK FARKINDALIK",
    title: "Tarot Farkındalık Okuması",
    description:
      "Geleceğe dair kesin sonuçlar vermek yerine, içinde bulunduğun duruma farklı bir açıdan bakmana ve düşüncelerini görünür kılmana alan açan sembolik okuma.",
    meta: "Bireysel · Online",
    price: "600 TL",
    href: "/calismalar/tarot",
    button: "Tarotu İncele",
  },
  {
    number: "04",
    eyebrow: "KİŞİSEL ANALİZ",
    title: "Numeroloji Analizi",
    description:
      "Doğum tarihi ve isim verileri üzerinden kişisel eğilimleri, tekrar eden temaları ve karakter dinamiklerini sembolik bir çerçevede inceleyen farkındalık çalışması.",
    meta: "Kişisel Analiz · Dijital",
    price: "350 TL",
    href: "/calismalar/numeroloji",
    button: "Analizi İncele",
  },
];

export default function OtherWorksSection() {
  return (
    <section className="otherWorksSection" id="diger-calismalar">
      <div className="otherWorksContainer">
        <div className="otherWorksHeader">
          <div>
            <p className="sectionEyebrow">DİĞER ÇALIŞMALAR</p>

            <h2>
              İhtiyacına göre
              <span> farklı bir kapı seç.</span>
            </h2>
          </div>

          <p>
            Birebir çalışmalardan sembolik farkındalık araçlarına kadar,
            sana en yakın alanı inceleyebilirsin.
          </p>
        </div>

        <div className="otherWorksGrid">
          {works.map((work) => (
            <article className="otherWorkCard" key={work.title}>
              <div className="otherWorkCardIndex">
                <span>{work.number}</span>
                <span aria-hidden="true">✦</span>
              </div>

              <p className="otherWorkEyebrow">{work.eyebrow}</p>

              <h3>{work.title}</h3>

              <p className="otherWorkDescription">
                {work.description}
              </p>

              <div className="otherWorkFooter">
                <div>
                  <span>{work.meta}</span>
                  {work.price && <strong>{work.price}</strong>}
                </div>

                <Link href={work.href}>
                  {work.button}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className="otherWorksNote">
          Tarot ve numeroloji içerikleri kesin gelecek öngörüsü, garanti veya
          psikolojik değerlendirme sunmaz; öz farkındalık amacıyla ele alınır.
        </p>
      </div>
    </section>
  );
}