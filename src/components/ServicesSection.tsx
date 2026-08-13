import Link from "next/link";

const services = [
  {
    number: "01",
    category: "5 GÜNLÜK ONLINE ATÖLYELER",
    title: "Rezonans Atölyeleri",
    description:
      "Kendilik, ilişki ve bolluk alanındaki tekrar eden örüntüleri daha yakından incelemek için hazırlanan üç farklı atölye.",
    image: "/images/services/kendilik-rezonansi.webp",
    href: "/#rezonans",
  },
  {
    number: "02",
    category: "KİŞİYE ÖZEL",
    title: "Birebir Seanslar",
    description:
      "Belirli bir konuya odaklanan, kişisel ihtiyacına göre şekillenen birebir görüşmeler.",
    image: "/images/services/birebir-seanslar.jpeg",
    href: "/calismalar/birebir-seanslar",
  },
  {
    number: "03",
    category: "SEMBOLİK FARKINDALIK",
    title: "Tarot Analizi",
    description:
      "İçinde bulunduğun duruma, seçeneklerine ve tekrar eden temalarına farklı bir açıdan bak.",
    image: "/images/services/tarot-analizi.jpeg",
    href: "/calismalar/tarot",
  },
  {
    number: "04",
    category: "KİŞİSEL ANALİZ",
    title: "Numeroloji Analizi",
    description:
      "Doğum tarihi ve isim verileri üzerinden kişisel eğilimlerini ve tekrar eden temalarını incele.",
    image: "/images/services/numeroloji-analizi.jpeg",
    href: "/calismalar/numeroloji",
  },
  {
    number: "05",
    category: "DİJİTAL İÇERİKLER",
    title: "Dijital Çalışmalar",
    description:
      "Kendi zamanında erişebileceğin kayıtlar, rehberler ve dijital Goldkozmos içerikleri.",
    image: "/images/services/ses-kayitlari.jpeg",
    href: "/calismalar",
  },
];

export default function ServicesSection() {
  return (
    <section className="servicesSliderSection" id="calismalar">
      <div className="servicesSliderContainer">
        <div className="servicesSliderHeader">
          <div>
            <p className="servicesSliderEyebrow">GOLDKOZMOS® ÇALIŞMALARI</p>

            <h2>
              Sana uygun
              <span> alanı keşfet.</span>
            </h2>
          </div>

          <div className="servicesSliderHeaderRight">
            <p>
              Kartları yana kaydırarak tüm çalışma alanlarını inceleyebilirsin.
            </p>

            <span className="servicesSliderHint">
              Kaydır
              <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>

        <div className="servicesSliderTrack">
          {services.map((service) => (
            <article className="servicesSliderCard" key={service.title}>
              <Link href={service.href} className="servicesSliderImage">
                <img src={service.image} alt={service.title} />

                <div className="servicesSliderShade" />

                <div className="servicesSliderNumber">
                  {service.number}
                </div>

                <div className="servicesSliderContent">
                  <p>{service.category}</p>

                  <h3>{service.title}</h3>

                  <span className="servicesSliderDescription">
                    {service.description}
                  </span>

                  <div className="servicesSliderButton">
                    Çalışmayı Keşfet
                    <span aria-hidden="true">↗</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}