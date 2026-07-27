const testimonials = [
  {
    number: "01",
    category: "AŞK VE İLİŞKİ",
    title: "Danışan Deneyimi",
    placeholder:
      "Gerçek danışan yorumu veya WhatsApp ekran görüntüsü daha sonra eklenecek.",
  },
  {
    number: "02",
    category: "BİREBİR SEANS",
    title: "Danışan Deneyimi",
    placeholder:
      "Gerçek danışan yorumu veya WhatsApp ekran görüntüsü daha sonra eklenecek.",
  },
  {
    number: "03",
    category: "PARA VE BOLLUK",
    title: "Danışan Deneyimi",
    placeholder:
      "Gerçek danışan yorumu veya WhatsApp ekran görüntüsü daha sonra eklenecek.",
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

              <span>DANIŞAN DENEYİMLERİ</span>
            </p>

            <h2>
              Dönüşümün hayata
              <span> nasıl yansıdığını keşfet.</span>
            </h2>
          </div>

          <div className="testimonialsHeadingContent">
            <p>
              Goldkozmos® Enerji Ekolü çalışmalarına katılan danışanların
              süreç boyunca yaşadığı farkındalıkları ve deneyimleri incele.
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
              className="testimonialCard"
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
                <span>İçerik daha sonra eklenecek</span>
                <span aria-hidden="true">✦</span>
              </div>
            </article>
          ))}
        </div>

        <div className="testimonialsNote">
          <p>
            Paylaşılan deneyimler kişilere özeldir. Her çalışma ve dönüşüm
            süreci kişinin ihtiyacına ve deneyimine göre farklılık
            gösterebilir.
          </p>
        </div>
      </div>
    </section>
  );
}