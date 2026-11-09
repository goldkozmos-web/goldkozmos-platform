import Link from 'next/link';
import EnergyDiscoveryLinks from '../../components/energy/EnergyDiscoveryLinks';
import FooterSection from '../../components/FooterSection';
import HomeNavbar from '../../components/HomeNavbar';
import DreamDictionary from '../../components/ruya/DreamDictionary';
import { publishedDreams } from '../../data/ruya-tabirleri/catalog';
import { pageMetadata } from '../../lib/seo';
import '../../styles/home.css';
import '../../styles/ruya-tabirleri.css';
import '../../styles/energy-discovery.css';
import '../../styles/symbol-library.css';
import '../../styles/dream-dictionary-text.css';
export const metadata = pageMetadata('/ruya-tabirleri', 'Rüya Tabirleri A–Z — Rüya Yorumları ve Sembol Sözlüğü', 'Rüya tabirlerini A’dan Z’ye keşfet. Hayvanlar, kişiler, doğa ve günlük yaşam sembollerini ara; rüyanın detayına ve duygusuna göre özgün yorumları oku.');
export default function RuyaTabirleriPage() {
  const entries = publishedDreams().map(dream => ({ slug: dream.slug, title: dream.title, aliases: dream.searchAliases, summary: dream.summary })).sort((a, b) => a.title.localeCompare(b.title, 'tr'));
  return <main className="homeV3Page symbolPage dreamTextPage" id="top"><HomeNavbar />
    <header className="symbolHero dreamTextHero"><div className="symbolHeroContent"><p className="symbolKicker">GOLDKOZMOS · RÜYA SÖZLÜĞÜ</p><h1>Rüya tabirleri.<br /><em>A’dan Z’ye anlamlar.</em></h1><p>Rüyanda kalan kişi, nesne veya olayı bul. Ayrıntılarıyla birlikte oku, kendi deneyiminle anlamlandır.</p><div className="symbolHeroLinks"><Link href="#ruya-sozlugu">Sözlüğü keşfet ↓</Link><span>{entries.length} sembol ve rüya başlığı</span></div></div></header>
    <div className="symbolContainer"><DreamDictionary entries={entries} />
      <section className="symbolSection symbolGuide"><p className="symbolKicker">YORUMLAMA REHBERİ</p><h2>Sembolü, sahneyi ve duyguyu birlikte oku.</h2><div className="symbolGuideGrid"><article><span>01</span><h3>Sembolü seç</h3><p>Aklında kalan kişi, nesne veya olayı yaz. Tek bir rüyada birden çok sembol olabilir.</p></article><article><span>02</span><h3>Ayrıntıya bak</h3><p>Kapı açık mıydı, hayvan yaklaşıyor muydu? Detay yorumlarını kendi sahnenle karşılaştır.</p></article><article><span>03</span><h3>Duygunu dinle</h3><p>Huzur, korku veya merak aynı görüntüyü farklı kılabilir. Yorumu günlük deneyiminle birlikte düşün.</p></article></div><p>Bu sözlükteki yorumlar özgün sembolik okumalardır. Bir tabir gelecekte olacak bir olayın kesin haberi değildir; rüyanın sana çağrıştırdığı şeyleri anlamlandırmana yardımcı bir başlangıçtır.</p></section>
      <EnergyDiscoveryLinks /></div><FooterSection /></main>;
}
