import Image from "next/image";
import Link from "next/link";
import { consultationOptions, consultationWhatsapp } from "../../data/consultationOptions";
import "../../styles/home-consultation-start.css";

export default function HomeConsultationStart() {
  const personal = consultationOptions[0];
  return <section className="homeConsultationStart" id="calismaya-basla" aria-labelledby="home-consultation-start-title">
    <div className="homeConsultationStartInner">
      <header><p>KENDİNE UYGUN BAŞLANGICI SEÇ</p><h2 id="home-consultation-start-title">Bugün neye alan açmak istiyorsun?</h2><p>Belirli bir enerji alanına odaklanmak veya yaşadıklarını konuşarak ele almak için iki farklı başlangıç.</p></header>
      <div className="homeConsultationStartGrid">
        <article><div className="homeConsultationStartHeading"><Image src="/images/services/enerji-odakli-siyah-altin.webp" alt="" width={88} height={104} /><div><p>ENERJİ ODAKLI</p><h3>30 dakikalık enerji çalışması</h3><span>Online · Birebir</span></div></div><p>Çakra dengeleme, nazar temizliği veya başka bir enerji alanına odaklanmak istiyorsan çalışma seçeneklerini incele.</p><div className="homeConsultationStartPrice"><strong>1.000 TL</strong><span>30 dakika</span></div><Link className="homeConsultationStartPrimary" href="/calismalar/enerji-calismalari">Enerji çalışmanı seç <span aria-hidden="true">→</span></Link><Link className="homeConsultationStartGuide" href="/kozmik-enerji">Kozmik enerji nedir, nasıl uygulanır? →</Link></article>
        <article><div className="homeConsultationStartHeading"><Image src="/images/services/birebir-calisma-siyah-altin.webp" alt="" width={88} height={104} /><div><p>KONUŞMA & ENERJİ ÇALIŞMASI</p><h3>90 dakikalık birebir görüşme</h3><span>Online · Özge Batıgün ile</span></div></div><p>Seni yoran ilişkileri, kararsızlıklarını veya içine attıklarını anlat. Önce konuşuruz; ardından konuna yönelik enerji çalışması yaparım.</p><div className="homeConsultationStartPrice"><strong>{personal.price}</strong><span>90 dakika</span></div><a className="homeConsultationStartPrimary" href={consultationWhatsapp(personal.message)} target="_blank" rel="noopener noreferrer">Birebir görüşme için randevu al <span aria-hidden="true">↗</span></a><Link className="homeConsultationStartGuide" href="/kisisel-gelisim">Kişisel gelişim görüşmesini ve paketleri incele →</Link></article>
      </div>
      <footer><p>İlk kez mi geliyorsun? <Link href="/hakkimda">Beni ve eğitimlerimi tanı.</Link></p><Link href="/calismalar">Tüm çalışmalar ve ücretler →</Link></footer>
    </div>
  </section>;
}
