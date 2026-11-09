import { APPOINTMENT_WHATSAPP_URL } from "../../lib/appointments";
import Link from "next/link";
import { getEnergyWorks } from "../../data/energyWorks";
import EnergyWorkImage from "./EnergyWorkImage";
import EnergyCardsScroller from "./EnergyCardsScroller";

export default function EnergyWorksCatalog() {
  const works = getEnergyWorks();
  return (
    <>
      <header className="energyWorksHeader">
        <Link className="energyCatalogBack" href="/calismalar">← Tüm çalışmalara dön</Link>
        <p className="energyWorksEyebrow">30 DAKİKA · BİREBİR ENERJİ ÇALIŞMALARI</p>
        <h1>Kozmik enerji çalışmaları</h1>
        <div className="energyWorksIntro">
          <p>Daha önce benden enerji çalışması aldıysan bu alan sana uygun. Bu kısa çalışmalar, aldığın çalışmaya yeniden uyumlanmana, enerji alanını yükseltmene ve ruhsal olarak arınmana destek olmak için hazırlanır.</p>
          <p>İlk kez çalışma alacaksan enerjiyi deneyimlemek ve süreci tanımak için de tercih edebilirsin. Ancak tek bir kısa çalışmada tüm blokajlarının çözülmesini beklememelisin. Daha kapsamlı bir süreç için <Link className="energyIntroDeepLink" href="/calismalar/detay/5-gunluk-yogun-calisma">birebir 5 Günlük Yoğun Çalışmayı incele →</Link></p>
        </div>
        <div className="energyDiscoveryActions"><Link href={APPOINTMENT_WHATSAPP_URL}>Randevu al →</Link><Link href="/kozmik-enerji">Kozmik enerji yaklaşımını tanı</Link></div>
      </header>
      <EnergyCardsScroller>
        {works.map((work, index) => (
          <article className="energyWorkCard" key={work.id}>
            <Link className="energyWorkCardMedia" href={`/calismalar/detay/${work.slug}`}>
              <EnergyWorkImage work={work} className="energyWorkCardImage" />
              <span className="energyWorkCardNumber">{String(index + 1).padStart(2, "0")}</span>
            </Link>
            <div className="energyWorkCardBody">
              <h2>{work.title}</h2>
              <p>{work.shortDescription}</p>
              <p className="energyWorkCardPrice">{work.priceLabel} · {work.duration}</p>
              <Link className="energyWorkCardCta" href={`/calismalar/detay/${work.slug}`}>Detayları Gör <span aria-hidden="true">→</span></Link>
            </div>
          </article>
        ))}
      </EnergyCardsScroller>
    </>
  );
}
