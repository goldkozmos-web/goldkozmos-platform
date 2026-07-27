const services = [
  {
    number: "01",
    category: "AŞK & İLİŞKİ",
    title: "Aşk ve İlişki Çalışmaları",
    description:
      "Geçmiş ilişkilerden kalan duygusal yükleri fark etmeye, ilişki dinamiklerini anlamaya ve yeni bir başlangıç için içsel alan oluşturmaya yönelik çalışmalar.",
    href: "/calismalar/ask-ve-iliski",
    featured: true,
  },
  {
    number: "02",
    category: "PARA & BOLLUK",
    title: "Para Enerjisi Çalışmaları",
    description:
      "Para ile kurduğun ilişkiyi, bolluk algını ve görünmez sınırlayıcı döngülerini fark etmeyi destekleyen grup ve bireysel çalışmalar.",
    href: "/calismalar/para-ve-bolluk",
    featured: false,
  },
  {
    number: "03",
    category: "BİREBİR",
    title: "Birebir Seanslar",
    description:
      "Kişisel ihtiyacına göre planlanan, süreç boyunca sana özel ilerleyen farkındalık ve enerji seansları.",
    href: "/calismalar/birebir-seanslar",
    featured: false,
  },
  {
    number: "04",
    category: "TAROT",
    title: "Tarot Analizi",
    description:
      "İçinde bulunduğun durumu, seçeneklerini ve tekrar eden temaları daha net görebilmeni amaçlayan kişisel tarot analizi.",
    href: "/calismalar/tarot",
    featured: false,
  },
  {
    number: "05",
    category: "NUMEROLOJİ",
    title: "Numeroloji Analizi",
    description:
      "Doğum tarihindeki sayıların sembolik anlamları üzerinden karakterini, potansiyellerini ve yaşam temalarını keşfet.",
    href: "/calismalar/numeroloji",
    featured: false,
  },
  {
    number: "06",
    category: "DİJİTAL ÇALIŞMALAR",
    title: "Ses Kayıtları ve Frekanslar",
    description:
      "Kendi alanında uygulayabileceğin meditasyon, dengeleme ve farkındalık odaklı dijital ses çalışmaları.",
    href: "/calismalar/ses-kayitlari",
    featured: false,
  },
];

export default function ServicesSection() {
  return (
    <section className="servicesSection" id="calismalar">
      <div className="servicesContainer">
        <header className="servicesHeading">
          <div>
            <p className="sectionEyebrow">
              <span>
                GOLDKOZMOS
                <sup className="registeredSymbol">®</sup>
              </span>

              <br />

              <span>ENERJİ EKOLÜ ÇALIŞMALARI</span>
            </p>

            <h2>
              İhtiyacına uygun
              <span> dönüşüm yolunu keşfet.</span>
            </h2>
          </div>

          <p className="servicesIntro">
            Bireysel seanslardan grup programlarına, analizlerden dijital
            çalışmalara kadar farklı ihtiyaçlara göre hazırlanan Goldkozmos®
            Enerji Ekolü deneyimlerini keşfet.
          </p>
        </header>

        <div className="servicesGrid">
          {services.map((service) => (
            <article
              className={`serviceCard ${
                service.featured ? "serviceCardFeatured" : ""
              }`}
              key={service.number}
            >
              <div className="serviceCardBackground" aria-hidden="true">
                <span>Görsel daha sonra eklenecek</span>
              </div>

              <div className="serviceCardOverlay" />

              <div className="serviceCardTop">
                <span className="serviceNumber">{service.number}</span>

                <span className="serviceCategory">
                  {service.category}
                </span>
              </div>

              <div className="serviceCardContent">
                <h3>{service.title}</h3>

                <p>{service.description}</p>

                <a href={service.href}>
                  <span>Çalışmayı Keşfet</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="servicesFooter">
          <p>Hangi çalışmanın sana uygun olduğundan emin değil misin?</p>

          <a href="/sana-uygun-calismayi-bul">
            Sana Uygun Çalışmayı Bul
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}