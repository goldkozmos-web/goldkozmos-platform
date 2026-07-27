const goldBookFeatures = [
  {
    number: "01",
    title: "Kısa ve Uygulanabilir",
    description:
      "Yoğun teoriler yerine günlük hayatına taşıyabileceğin anlaşılır farkındalıklar.",
  },
  {
    number: "02",
    title: "Kendi Zamanında Oku",
    description:
      "Dijital format sayesinde istediğin yerde, kendi hızında ilerleyebilirsin.",
  },
  {
    number: "03",
    title: "Dönüşümü Destekle",
    description:
      "Seanslar ve grup çalışmaları arasında içsel sürecini destekleyen rehber içerikler.",
  },
];

export default function GoldBookSection() {
  return (
    <section className="goldBookSection" id="goldbook">
      <div className="goldBookContainer">
        <div className="goldBookVisual">
          <div className="goldBookCoverPlaceholder">
            <div className="goldBookCoverGlow" />

            <div className="goldBookCoverContent">
              <p>
                GOLDKOZMOS
                <sup className="registeredSymbol">®</sup>
                <br />
                ENERJİ EKOLÜ
              </p>

              <h3>GoldBook</h3>

              <span>Dijital Dönüşüm Kitapları</span>
            </div>

            <small>Kapak görseli daha sonra eklenecek</small>
          </div>
        </div>

        <div className="goldBookContent">
          <p className="sectionEyebrow">
            GOLDKOZMOS
            <sup className="registeredSymbol">®</sup> GOLDBOOK
          </p>

          <h2>
            Okudukça kendine
            <span> biraz daha yaklaş.</span>
          </h2>

          <p className="goldBookDescription">
            GoldBook; farkındalık ve içsel dönüşüm konularını sade,
            uygulanabilir ve kitap tadında içeriklerle buluşturan Goldkozmos®
            dijital kütüphanesidir.
          </p>

          <div className="goldBookFeatures">
            {goldBookFeatures.map((feature) => (
              <div className="goldBookFeature" key={feature.number}>
                <span>{feature.number}</span>

                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="goldBookActions">
            <a className="goldBookPrimaryButton" href="/goldbook">
              GoldBook Kütüphanesini Keşfet
              <span aria-hidden="true">↗</span>
            </a>

            <a className="goldBookSecondaryButton" href="/goldbook/hakkinda">
              GoldBook Nedir?
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <p className="goldBookNote">
            Dijital kitaplar ve rehberler, kişisel farkındalık sürecini
            desteklemek amacıyla hazırlanır.
          </p>
        </div>
      </div>
    </section>
  );
}