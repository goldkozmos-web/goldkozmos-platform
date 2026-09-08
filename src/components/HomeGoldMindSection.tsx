import { MEDITATION_CATEGORIES } from "../data/meditation";

export default function HomeGoldMindSection() {
  return (
    <section className="homeV3GoldMind" id="goldmind">
      <div className="homeV3GoldMindInner">
        <div className="homeV3GoldMindHeading">
          <p className="homeV3Eyebrow">GOLDMIND</p>

          <h2>GoldMind</h2>

          <p className="homeV3GoldMindKicker">
            Meditasyon & Nefes Alanı
          </p>

          <p>
            Odaklanmak, sakinleşmek, nefesini düzenlemek ve
            kendine dönmek için hazırlanan sesli pratikler.
          </p>
        </div>

        <div className="homeV3GoldMindSlider">
          {MEDITATION_CATEGORIES.map((category, index) => (
            <article
              className="homeV3GoldMindCard"
              key={category}
            >
              <div
                className="homeV3GoldMindCardMedia"
                aria-hidden="true"
              >
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <strong>✦</strong>
              </div>

              <div className="homeV3GoldMindCardBody">
                <h3>{category}</h3>
                <p>Yeni pratikler hazırlanıyor.</p>
              </div>
            </article>
          ))}
        </div>

        <a className="homeV3GoldMindCta" href="/goldmind">
          GoldMind’ı Keşfet
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
