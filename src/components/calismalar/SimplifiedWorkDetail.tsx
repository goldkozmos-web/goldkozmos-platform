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
            <a className="gkSimpleTextLink" href="#secenekler">Çalışma seçeneklerini incele ↓</a>
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
          <p className="gkSimpleKicker">ÇALIŞMA BİÇİMİNİ SEÇ</p>
          <h2>Sana uygun ilerleme şeklini belirle.</h2>
          <div className="gkSimpleOptionGrid">
            <article>
              <span>01 · TEK GÜNLÜK</span>
              <h3>Tek Günlük Çalışma</h3>
              <p>Seçtiğin konuya bir görüşmede odaklanmak ve bu alanda kişisel bir farkındalık süreci başlatmak isteyenler için.</p>
              <p className="gkSimplePriceNote">Ücret ve görüşme ayrıntıları randevu öncesinde paylaşılır.</p>
              <a href={bookingHref(work, "single")}>Tek Günlük Çalışmayı Seç →</a>
            </article>
            <article>
              <span>02 · PAKET</span>
              <h3>Paket Çalışması</h3>
              <p>Aynı konuya birden fazla görüşmede daha kapsamlı odaklanmak isteyenler için. İçerik ve görüşme sayısı talep üzerine netleştirilir.</p>
              <p className="gkSimplePriceNote">Paket kapsamı ve ücreti randevu öncesinde paylaşılır.</p>
              <a href={bookingHref(work, "package")}>Paket Çalışmasını Seç →</a>
            </article>
          </div>
        </section>
        <p className="gkSimpleDisclaimer">GoldKozmos çalışmaları spiritüel farkındalık ve kişisel gelişim amaçlıdır; tıbbi tedavi veya psikoterapi yerine geçmez. Belirli bir sonuç vaat edilmez.</p>
      </div>
      <FooterSection />
    </main>
  );
}
