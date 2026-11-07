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
        <h1>İhtiyacına uygun rezonans alanını seç.</h1>
        <p>Dört kişisel çalışma alanı ve önceki danışanlarımıza özel Enerji Rezonansı tek yerde. Her alanın seans süresi, kapsamı ve fiyatı kendi sayfasında açıkça belirtilir.</p>
        <div className="gkSimpleEnergy">
          <div>
            <p className="gkSimpleKicker">01 · MEVCUT DANIŞANLARA ÖZEL</p>
            <h2>Enerji Rezonansı</h2>
            <p>Yalnızca daha önce GoldKozmos’tan çalışma almış danışanlara yönelik. Çakra, karma, nazar, mekân enerjisi ve diğer konulardan ihtiyacına uygun olanı seçebilir, mevcut tekil çalışmaların yanında paket talebinde bulunabilirsin.</p>
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
                <p>Tanışma Seansı · {work.options[1].title} · {work.options[2].title}</p>
                <a href={work.href}>Seçenekleri ve fiyatları gör →</a>
              </div>
            </article>
          ))}
        </div>
        <p className="gkSimpleDisclaimer">Çalışmalar kişisel ve spiritüel farkındalık amaçlıdır. Henüz hazırlanmayan rezonans eğitim ses kayıtları burada satışa sunulmaz.</p>
      </section>
      <FooterSection />
    </main>
  );
}
