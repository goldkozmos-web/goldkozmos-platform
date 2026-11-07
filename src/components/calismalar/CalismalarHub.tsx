import HomeNavbar from "../HomeNavbar";
import FooterSection from "../FooterSection";
import { WORK_THEMES } from "../../data/simplifiedWorks";
import "../../styles/home.css";
import "../../styles/simplified-works.css";

export default function CalismalarHub() {
  return (
    <main className="homeV3Page gkSimpleWorks" id="top">
      <HomeNavbar />
      <section className="gkSimpleIntro">
        <p className="gkSimpleKicker">GOLDKOZMOS · KOZMİK ENERJİ ÇALIŞMALARI</p>
        <h1>İhtiyacına uygun çalışma alanını seç.</h1>
        <p>Her alan belirli bir konuya odaklanır. Kendine yakın hissettiğin çalışmayı seç; tek günlük veya paket seçeneklerini incele. Kısa bir enerji çalışması tercih ediyorsan özel konu kataloğuna geçebilirsin.</p>
        <div className="gkSimpleEnergy">
          <div>
            <p className="gkSimpleKicker">01 · KISA ENERJİ ÇALIŞMASI</p>
            <h2>Kısa Enerji Çalışması</h2>
            <p>Çakra dengeleme, karma, nazar, mekân enerjisi ve diğer konulardan sana uygun olanı seç. Konu bazlı çalışma seçenekleri mevcut katalogda yer alır.</p>
          </div>
          <a href="/calismalar/enerji-calismalari">Çalışmaları Seç →</a>
        </div>
        <div className="gkSimpleCards">
          {WORK_THEMES.map((work, index) => (
            <article className="gkSimpleCard" key={work.slug}>
              <img src={work.image} alt={work.title} loading="lazy" />
              <div className="gkSimpleCardBody">
                <p className="gkSimpleKicker">{String(index + 2).padStart(2, "0")} · {work.eyebrow}</p>
                <h2>{work.title}</h2>
                <p className="gkSimpleCardSummary">{work.description}</p>
                <p>Tek Günlük Çalışma · Paket Çalışması</p>
                <a href={work.href}>Çalışmayı İncele →</a>
              </div>
            </article>
          ))}
        </div>
        <p className="gkSimpleDisclaimer">Çalışmalar kişisel ve spiritüel farkındalık amaçlıdır. Eğitim ses kayıtları hazırlanma aşamasında olduğundan bu sayfada satışa sunulmaz.</p>
      </section>
      <FooterSection />
    </main>
  );
}
