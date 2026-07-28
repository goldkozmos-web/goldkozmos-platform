const legalPages = [
  {
    number: "01",
    title: "Gizlilik Politikası",
    description:
      "Siteyi kullanırken paylaştığın bilgilerin hangi amaçlarla işlendiğini ve nasıl korunduğunu incele.",
    href: "/gizlilik-politikasi",
  },
  {
    number: "02",
    title: "KVKK Aydınlatma Metni",
    description:
      "Kişisel verilerin işlenmesi, saklanması ve sahip olduğun yasal haklar hakkında bilgi al.",
    href: "/kvkk-aydinlatma-metni",
  },
  {
    number: "03",
    title: "Kullanım Koşulları",
    description:
      "Goldkozmos® Enerji Ekolü web sitesinin kullanımına ilişkin temel koşulları incele.",
    href: "/kullanim-kosullari",
  },
  {
    number: "04",
    title: "İptal ve İade Politikası",
    description:
      "Seanslar, dijital içerikler ve programlar için geçerli iptal ve iade koşullarını öğren.",
    href: "/iptal-ve-iade-politikasi",
  },
  {
    number: "05",
    title: "Mesafeli Satış Sözleşmesi",
    description:
      "Çevrim içi satın alma işlemlerine ilişkin tarafların hak ve sorumluluklarını incele.",
    href: "/mesafeli-satis-sozlesmesi",
  },
  {
    number: "06",
    title: "Erişilebilirlik Bildirimi",
    description:
      "Goldkozmos® dijital platformunun daha erişilebilir bir deneyim sunmak için benimsediği yaklaşımı keşfet.",
    href: "/erisilebilirlik",
  },
];

export default function LegalSection() {
  return (
    <section className="legalSection" id="yasal-bilgiler">
      <div className="legalContainer">
        <header className="legalHeading">
          <div>
            <p className="sectionEyebrow">
              <span>
                GOLDKOZMOS
                <sup className="registeredSymbol">®</sup>
              </span>

              <br />

              <span>ENERJİ EKOLÜ</span>

              <br />

              <span>YASAL VE ŞEFFAFLIK</span>
            </p>

            <h2>
              Güvenli ve şeffaf
              <span> bir dijital deneyim.</span>
            </h2>
          </div>

          <div className="legalHeadingContent">
            <p>
              Kişisel veriler, site kullanımı, satın alma süreçleri ve
              hizmetlere ilişkin temel bilgilere bu alandan ulaşabilirsin.
            </p>

            <a href="/yasal-bilgiler">
              Tüm Yasal Metinleri Gör
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </header>

        <div className="legalGrid">
          {legalPages.map((page) => (
            <a
              className="legalCard"
              href={page.href}
              key={page.number}
            >
              <div className="legalCardTop">
                <span className="legalCardNumber">
                  {page.number}
                </span>

                <span
                  className="legalCardArrow"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </div>

              <div className="legalCardContent">
                <h3>{page.title}</h3>
                <p>{page.description}</p>
              </div>

              <span className="legalCardLine" />
            </a>
          ))}
        </div>

        <div className="legalNotice">
          <div className="legalNoticeIcon" aria-hidden="true">
            i
          </div>

          <p>
            Goldkozmos® Enerji Ekolü kapsamında sunulan enerji, tarot,
            numeroloji ve farkındalık çalışmaları tıbbi teşhis, psikoterapi
            veya sağlık hizmeti yerine geçmez. Fiziksel ya da ruhsal bir
            sağlık sorununda ilgili sağlık uzmanına başvurulmalıdır.
          </p>
        </div>
      </div>
    </section>
  );
}