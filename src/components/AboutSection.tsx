const approachItems = [
  {
    number: "01",
    title: "Farkındalık",
    description:
      "Değişimin ilk adımı, yaşadığın döngüleri ve kendinle kurduğun ilişkiyi fark etmektir.",
  },
  {
    number: "02",
    title: "Bütüncül Bakış",
    description:
      "İlişkiler, düşünceler, toplumsal etkiler ve enerji alanı birbirinden ayrı değil, bir bütün olarak ele alınır.",
  },
  {
    number: "03",
    title: "Kişiye Özgü Yolculuk",
    description:
      "Her insanın ihtiyacı, hikâyesi ve dönüşüm süreci farklıdır. Çalışmalar tek bir kalıba dayanmaz.",
  },
];

export default function AboutSection() {
  return (
    <section className="aboutSection" id="hakkimda">
      <div className="aboutContainer">
        <div className="aboutVisual">
          <div className="aboutPortraitPlaceholder">
            <div className="aboutPortraitGlow" />

            <div className="aboutPortraitFrame">
              <span>Profesyonel portre daha sonra eklenecek</span>
            </div>

            <div className="aboutFounderCard">
              <span>KURUCU</span>

              <strong>Özge Batıgün</strong>

              <p className="aboutBrandName">
                <span>
                  Goldkozmos
                  <sup className="registeredSymbol">®</sup>
                </span>

                <span>Enerji Ekolü</span>
              </p>
            </div>
          </div>
        </div>

        <div className="aboutContent">
          <p className="sectionEyebrow">
            GOLDKOZMOS®’UN ARKASINDAKİ YOLCULUK
          </p>

          <h2>
            Kendini tanımadan
            <span> hayatını değiştiremezsin.</span>
          </h2>

          <p className="aboutLead">
            Goldkozmos®, insanın kendi iç dünyasını fark etmeden dış dünyasında
            kalıcı bir değişim oluşturamayacağı düşüncesiyle doğdu.
          </p>

          <p className="aboutDescription">
            Goldkozmos® Enerji Ekolü; Spiritüel Stoa ve sosyoloji bakış açısıyla
            geliştirilen, Goldkozmos®’a özgü enerji sistemiyle farkındalık
            odaklı içsel dönüşümünü desteklemeyi amaçlayan özgün bir
            yaklaşımdır.
          </p>

          <div className="aboutApproach">
            {approachItems.map((item) => (
              <div className="aboutApproachItem" key={item.number}>
                <span>{item.number}</span>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="aboutManifesto">
            <p>GOLDKOZMOS® MANİFESTOSU</p>

            <blockquote>
              “İnsan değişmeden hayat değişmez.”
            </blockquote>

            <span>Kendi Kozmosunu Bul.</span>
          </div>

          <div className="aboutActions">
            <a className="aboutPrimaryButton" href="/hakkimda">
              Hikâyemi Keşfet
              <span aria-hidden="true">→</span>
            </a>

            <a className="aboutSecondaryButton" href="/calismalar">
              Çalışmaları İncele
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}