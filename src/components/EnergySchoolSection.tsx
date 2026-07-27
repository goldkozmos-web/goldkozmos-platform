const schoolPillars = [
  {
    number: "01",
    title: "Spiritüel Stoa",
    description:
      "Duygular kadar düşünce biçiminin de dönüşümde belirleyici olduğuna odaklanır.",
  },
  {
    number: "02",
    title: "Goldkozmos® Enerji Sistemi",
    description:
      "Goldkozmos®’a özgü enerji yaklaşımıyla hazırlanan uygulamalar, içsel farkındalığı desteklemeyi amaçlar.",
  },
  {
    number: "03",
    title: "Sosyoloji",
    description:
      "İnsanı yalnızca bireysel hikâyesiyle değil; ailesi, çevresi ve yaşadığı toplumla birlikte ele alır.",
  },
  {
    number: "04",
    title: "Farkındalık",
    description:
      "Amaç geleceği söylemek değil, kişinin kendisini daha net görebileceği bir alan oluşturmaktır.",
  },
];

export default function EnergySchoolSection() {
  return (
    <section className="energySchoolSection" id="enerji-ekolu">
      <div className="energySchoolContainer">
        <div className="energySchoolHeading">
          <p className="sectionEyebrow">
            <span>
              GOLDKOZMOS
              <sup className="registeredSymbol">®</sup>
            </span>

            <br />

            <span>ENERJİ EKOLÜ</span>
          </p>

          <h2>
            Spiritüel yaklaşımı,
            <span> düşünce ve toplumla buluşturan bir sistem.</span>
          </h2>

          <p className="energySchoolIntro">
            Goldkozmos® Enerji Ekolü; Spiritüel Stoa, sosyoloji ve
            Goldkozmos®’a özgü enerji yaklaşımını bir araya getirerek
            farkındalık odaklı içsel dönüşümü desteklemeyi amaçlar.
          </p>
        </div>

        <div className="energySchoolGrid">
          {schoolPillars.map((pillar) => (
            <article className="energySchoolCard" key={pillar.number}>
              <span className="energySchoolNumber">{pillar.number}</span>

              <div className="energySchoolIcon" aria-hidden="true">
                <span />
                <span />
              </div>

              <h3>{pillar.title}</h3>

              <p>{pillar.description}</p>

              <div className="energySchoolLine" />

              <span className="energySchoolLink">Yaklaşımı Keşfet</span>
            </article>
          ))}
        </div>

        <div className="energySchoolJourney">
          <div className="journeyItem">
            <span>01</span>
            <p>Problemi Fark Et</p>
          </div>

          <div className="journeyConnector" />

          <div className="journeyItem">
            <span>02</span>
            <p>Kendini Tanı</p>
          </div>

          <div className="journeyConnector" />

          <div className="journeyItem">
            <span>03</span>
            <p>Dönüşümü Başlat</p>
          </div>

          <div className="journeyConnector" />

          <div className="journeyItem">
            <span>04</span>
            <p>Hayatına Yansıt</p>
          </div>
        </div>

        <div className="energySchoolManifesto">
          <p className="manifestoEyebrow">
            GOLDKOZMOS
            <sup className="registeredSymbol">®</sup> MANİFESTOSU
          </p>

          <h3>İnsan Değişmeden Hayat Değişmez.</h3>

          <p>
            Goldkozmos® Enerji Ekolü, yalnızca cevap arayanlar için değil;
            kendisini anlamaya ve dönüşümü hayatına yansıtmaya hazır olanlar
            için geliştirilmiştir.
          </p>
        </div>
      </div>
    </section>
  );
}