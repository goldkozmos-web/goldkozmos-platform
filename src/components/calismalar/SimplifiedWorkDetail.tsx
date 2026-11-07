import HomeNavbar from "../HomeNavbar";
import FooterSection from "../FooterSection";
import { bookingHref, themeBySlug, type WorkTheme } from "../../data/simplifiedWorks";
import "../../styles/home.css";
import "../../styles/simplified-works.css";

export default function SimplifiedWorkDetail({ slug }: { slug: WorkTheme["slug"] }) {
  const work = themeBySlug(slug);
  return (
    <main className="homeV3Page gkSimpleWorks" id="top">
      <HomeNavbar />
      <div className="gkSimpleDetail">
        <a className="gkSimpleBack" href="/calismalar">← Tüm çalışmalara dön</a>
        <div className="gkSimpleDetailHero">
          <div>
            <p className="gkSimpleKicker">{work.eyebrow}</p>
            <h1>{work.title}</h1>
            <p className="gkSimpleLead">{work.lead}</p>
            <p>{work.description}</p>
            <a className="gkSimpleTextLink" href="#secenekler">Seans seçeneklerini incele ↓</a>
          </div>
          <img src={work.image} alt={work.title} />
        </div>
        <div className="gkSimpleDetailColumns">
          <section>
            <h2>Bu çalışma kimler için?</h2>
            <ul>{work.suitableFor.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
          <section>
            <h2>Hangi alanlara odaklanıyoruz?</h2>
            <ul>{work.focusAreas.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
        </div>
        <section id="secenekler" className="gkSimpleOptions">
          <p className="gkSimpleKicker">SÜRE VE FİYAT BİLGİLERİ</p>
          <h2>Çalışma seçeneğini belirle.</h2>
          <div className="gkSimpleOptionGrid">
            {work.options.map((option, index) => (
              <article key={option.id}>
                <span>{String(index + 1).padStart(2, "0")} · {option.duration}</span>
                <h3>{option.title}</h3>
                <strong className="gkSimpleOptionPrice">{option.price}</strong>
                <p>{option.description}</p>
                <a href={bookingHref(work, option.id)}>{option.title} için randevu talep et →</a>
              </article>
            ))}
          </div>
          <p className="gkSimpleDisclaimer">Tarih seçimi randevu talebidir; kesin saat ve katılım bilgileri görüşme sırasında netleşir.</p>
        </section>
        <p className="gkSimpleDisclaimer">GoldKozmos çalışmaları spiritüel farkındalık ve kişisel gelişim amaçlıdır; tıbbi tedavi veya psikoterapi yerine geçmez. Belirli bir sonuç vaat edilmez.</p>
      </div>
      <FooterSection />
    </main>
  );
}
