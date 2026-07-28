const contactOptions = [
  {
    number: "01",
    category: "HIZLI İLETİŞİM",
    title: "WhatsApp",
    description:
      "Çalışmalar, randevu süreci ve başvuru detayları hakkında bilgi almak için WhatsApp üzerinden iletişime geç.",
    linkText: "WhatsApp’tan Yaz",
    href: "/whatsapp-kanali",
    external: false,
  },
  {
    number: "02",
    category: "GÜNLÜK İÇERİKLER",
    title: "Instagram",
    description:
      "Goldkozmos® Enerji Ekolü içeriklerini, yeni çalışma duyurularını ve güncel paylaşımları takip et.",
    linkText: "Instagram’a Git",
    href: "https://www.instagram.com/goldkozmos/",
    external: true,
  },
  {
    number: "03",
    category: "RANDEVU VE BAŞVURU",
    title: "Randevu Oluştur",
    description:
      "Birebir seanslar, grup çalışmaları, tarot ve numeroloji hizmetleri için başvuru sayfasına ilerle.",
    linkText: "Randevu Sayfasına Git",
    href: "/randevu",
    external: false,
  },
];

export default function ContactSection() {
  return (
    <section className="contactSection" id="iletisim-secenekleri">
      <div className="contactContainer">
        <header className="contactHeading">
          <div>
            <p className="sectionEyebrow">
              <span>
                GOLDKOZMOS
                <sup className="registeredSymbol">®</sup>
              </span>

              <br />

              <span>ENERJİ EKOLÜ</span>

              <br />

              <span>İLETİŞİM</span>
            </p>

            <h2>
              Sana uygun kanaldan
              <span> iletişime geç.</span>
            </h2>
          </div>

          <div className="contactHeadingContent">
            <p>
              Çalışmalar, randevu süreci, dijital içerikler ve programlar
              hakkında bilgi almak için aşağıdaki iletişim seçeneklerinden
              birini kullanabilirsin.
            </p>

            <a href="/sana-uygun-calismayi-bul">
              Önce Çalışmamı Bul
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </header>

        <div className="contactGrid">
          {contactOptions.map((option) => (
            <article className="contactCard" key={option.number}>
              <div className="contactCardTop">
                <span className="contactCardNumber">
                  {option.number}
                </span>

                <span className="contactCardCategory">
                  {option.category}
                </span>
              </div>

              <div className="contactCardContent">
                <h3>{option.title}</h3>

                <p>{option.description}</p>

                <a
                  href={option.href}
                  target={option.external ? "_blank" : undefined}
                  rel={option.external ? "noreferrer" : undefined}
                >
                  {option.linkText}
                  <span aria-hidden="true">
                    {option.external ? "↗" : "→"}
                  </span>
                </a>
              </div>

              <span className="contactCardLine" />
            </article>
          ))}
        </div>

        <div className="contactNote">
          <div className="contactNoteIcon" aria-hidden="true">
            ✦
          </div>

          <div>
            <p>İLETİŞİM NOTU</p>

            <h3>
              Mesajında ilgilendiğin çalışma alanını belirtmen, sana daha
              hızlı dönüş yapılmasını sağlar.
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}