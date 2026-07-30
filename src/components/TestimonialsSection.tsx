const testimonials = [
  {
    number: "01",
    category: "AŞK VE İLİŞKİ",
    title: "Danışan Deneyimi",
    placeholder:
      "Gerçek danışan yorumu veya WhatsApp ekran görüntüsü daha sonra eklenecek.",
    footer: "Aşk ve ilişki çalışmaları",
    href: "/calismalar/ask-ve-iliski",
  },
  {
    number: "02",
    category: "BİREBİR SEANS",
    title: "Danışan Deneyimi",
    placeholder:
      "Gerçek danışan yorumu veya WhatsApp ekran görüntüsü daha sonra eklenecek.",
    footer: "Birebir dönüşüm süreci",
    href: "/calismalar/birebir-seanslar",
  },
  {
    number: "03",
    category: "PARA VE BOLLUK",
    title: "Danışan Deneyimi",
    placeholder:
      "Gerçek danışan yorumu veya WhatsApp ekran görüntüsü daha sonra eklenecek.",
    footer: "Para enerjisi çalışmaları",
    href: "/calismalar/para",
  },
  {
    number: "04",
    category: "TAROT ANALİZİ",
    title: "Tarot Danışan Deneyimi",
    placeholder:
      "Gerçek tarot danışanı yorumu veya WhatsApp ekran görüntüsü daha sonra eklenecek.",
    footer: "Tarot analizleri",
    href: "/calismalar/tarot",
  },
  {
    number: "05",
    category: "NUMEROLOJİ ANALİZİ",
    title: "Numeroloji Danışan Deneyimi",
    placeholder:
      "Gerçek numeroloji danışanı yorumu veya WhatsApp ekran görüntüsü daha sonra eklenecek.",
    footer: "Numeroloji analizleri",
    href: "/calismalar/numeroloji",
  },
  {
    number: "06",
    category: "GOLDBOOK",
    title: "Okur Deneyimi",
    placeholder:
      "Gerçek GoldBook okur yorumu veya mesaj ekran görüntüsü daha sonra eklenecek.",
    footer: "GoldBook dijital kitapları",
    href: "/goldbook",
  },
  {
    number: "07",
    category: "SES KAYITLARI",
    title: "Dinleyici Deneyimi",
    placeholder:
      "Gerçek ses kaydı deneyimi veya danışan mesajı daha sonra eklenecek.",
    footer: "Meditasyon ve enerji ses kayıtları",
    href: "/calismalar/ses-kayitlari",
    featured: true,
  },
];

export default function TestimonialsSection() {
  return (
    <section
      className="testimonialsSection"
      id="danisan-deneyimleri"
    >
      <div className="testimonialsContainer">
        <header className="testimonialsHeading">
          <div>
            <p className="sectionEyebrow">
              <span>
                GOLDKOZMOS
                <sup className="registeredSymbol">®</sup>
              </span>

              <br />

              <span>ENERJİ EKOLÜ</span>

              <br />

              <span>DANIŞAN VE OKUR DENEYİMLERİ</span>
            </p>

            <h2>
              Dönüşümün hayata
              <span> nasıl yansıdığını keşfet.</span>
            </h2>
          </div>

          <div className="testimonialsHeadingContent">
            <p>
              Goldkozmos® Enerji Ekolü çalışmalarına katılan danışanların,
              analiz hizmeti alanların, GoldBook okurlarının ve ses
              kayıtlarını deneyimleyenlerin paylaşımlarını incele.
            </p>

            <a href="/danisan-deneyimleri">
              Tüm Deneyimleri Gör
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </header>

        <div className="testimonialsGrid">
          {testimonials.map((testimonial) => (
            <article
              className={`testimonialCard ${
                testimonial.featured
                  ? "testimonialCardFeatured"
                  : ""
              }`}
              key={testimonial.number}
            >
              <div className="testimonialCardTop">
                <span className="testimonialNumber">
                  {testimonial.number}
                </span>

                <span className="testimonialCategory">
                  {testimonial.category}
                </span>
              </div>

              <div
                className="testimonialQuoteMark"
                aria-hidden="true"
              >
                “
              </div>

              <div className="testimonialCardContent">
                <h3>{testimonial.title}</h3>

                <p>{testimonial.placeholder}</p>
              </div>

              <div className="testimonialCardFooter">
                <span>{testimonial.footer}</span>

                <a
                  href={testimonial.href}
                  aria-label={`${testimonial.category} çalışmalarını incele`}
                >
                  İncele
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="testimonialsNote">
          <p>
            Paylaşılan deneyimler kişilere özeldir. Her çalışma, analiz,
            okuma ve dönüşüm süreci kişinin ihtiyacına ve deneyimine göre
            farklılık gösterebilir.
          </p>
        </div>
      </div>
    </section>
  );
}