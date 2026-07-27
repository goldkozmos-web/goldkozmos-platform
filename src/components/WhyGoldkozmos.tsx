const differences = [
  {
    number: "01",
    title: "Kişiye Uygun Başlangıç",
    description:
      "Herkesin ihtiyacı aynı değildir. Goldkozmos® Enerji Ekolü, sana uygun çalışma ve içerik yolunu daha net görebileceğin bir başlangıç alanı sunar.",
  },
  {
    number: "02",
    title: "Bütüncül Bakış Açısı",
    description:
      "Spiritüel Stoa, sosyoloji ve Goldkozmos® Enerji Ekolü’ne özgü enerji yaklaşımı tek bir sistem içinde birlikte ele alınır.",
  },
  {
    number: "03",
    title: "Farklı Çalışma Seçenekleri",
    description:
      "Birebir seanslar, grup programları, tarot, numeroloji ve dijital içerikler farklı ihtiyaçlara göre bir araya gelir.",
  },
  {
    number: "04",
    title: "Tek Platformda Ekosistem",
    description:
      "Çalışmalar, GoldBook, GoldCast, GoldBlog ve GoldFrekans içerikleri tek bir dijital yapı içinde birbirini tamamlar.",
  },
];

export default function WhyGoldkozmos() {
  return (
    <section className="whyGoldkozmosSection" id="neden-goldkozmos">
      <div className="whyGoldkozmosContainer">
        <div className="whyGoldkozmosHeading">
          <p className="sectionEyebrow">
            <span>
              NEDEN GOLDKOZMOS
              <sup className="registeredSymbol">®</sup>
            </span>

            <br />

            <span>ENERJİ EKOLÜ?</span>
          </p>

          <h2>
            Tek bir hizmet değil,
            <span> birbirini tamamlayan bir dönüşüm ekosistemi.</span>
          </h2>

          <p>
            Goldkozmos® Enerji Ekolü, yalnızca bir çalışma seçmeni değil;
            ihtiyacını daha iyi anlamanı ve sana uygun başlangıç yolunu
            keşfetmeni amaçlayan bütünlüklü bir yapı sunar.
          </p>
        </div>

        <div className="whyGoldkozmosGrid">
          {differences.map((item) => (
            <article
              className="whyGoldkozmosCard"
              key={item.number}
            >
              <span className="whyGoldkozmosNumber">
                {item.number}
              </span>

              <h3>{item.title}</h3>

              <p>{item.description}</p>

              <div className="whyGoldkozmosCardLine" />
            </article>
          ))}
        </div>

        <div className="whyGoldkozmosCta">
          <div>
            <p className="whyGoldkozmosCtaEyebrow">
              NEREDEN BAŞLAYACAĞINI BİLMİYOR MUSUN?
            </p>

            <h3>
              Sana uygun başlangıç noktasını birlikte keşfedelim.
            </h3>
          </div>

          <a href="/sana-uygun-calismayi-bul">
            Sana Uygun Çalışmayı Bul
          </a>
        </div>
      </div>
    </section>
  );
}