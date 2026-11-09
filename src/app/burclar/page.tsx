import Link from "next/link";
import Image from "next/image";
import HomeNavbar from "../../components/HomeNavbar";
import FooterSection from "../../components/FooterSection";
import EnergyDiscoveryLinks from "../../components/energy/EnergyDiscoveryLinks";
import ZodiacExplorer from "../../components/ZodiacExplorer";
import { pageMetadata, jsonLd } from "../../lib/seo";
import "../../styles/home.css";
import "../../styles/energy-discovery.css";
import "../../styles/symbol-library.css";
import "../../styles/zodiac-compatibility-premium.css";
import "../../styles/zodiac-atlas-premium.css";

export const metadata = pageMetadata("/burclar", "Burç Yorumları ve Burç Uyumu — 12 Burç Rehberi", "12 burcun aşk, iş ve iletişim yorumlarını keşfet. İki burç seçerek burç uyumunu, ilişkinin güçlü yanlarını ve denge isteyen alanlarını incele.");
export default function ZodiacPage() {
  return <main className="homeV3Page symbolPage" id="top"><HomeNavbar />
    <header className="symbolHero"><Image src="/images/goldmind/categories/tumu-premium.webp" alt="" fill sizes="100vw" preload className="symbolHeroImage" /><div className="symbolHeroContent"><p className="symbolKicker">GOLDKOZMOS · ZODYAK ATLASI</p><h1>Burç yorumları.<br /><em>İki dünya, bir uyum.</em></h1><p>Aşkta, iletişimde ve hayatın ritminde burçların sembolik dilini keşfet.</p><div className="symbolHeroLinks"><Link href="#burc-yorumlari">Burcunu seç ↓</Link><Link href="#burc-uyumu">Burç uyumunu keşfet ↗</Link></div></div><span className="symbolHeroSeal" aria-hidden="true">✦<small>12 BURÇ</small></span></header>
    <div className="symbolContainer"><ZodiacExplorer />

      <section className="symbolSection symbolGuide"><h2>Burç uyumu nasıl yorumlanır?</h2><p>Geleneksel astrolojide Ateş hareketi, Toprak somut güveni, Hava iletişimi, Su duygusal yakınlığı temsil eder. Bu bölüm, elementlerin birlikte nasıl bir ilişki dili kurabileceğini ele alır. Aynı element ortak ritim sunabilir; farklı elementler birbirini tamamlayabileceği gibi farklı beklentileri de görünür kılabilir.</p><p>Güneş burcu yalnızca genel bir çerçevedir. Ay, Venüs, Mars ve yükselen gibi doğum haritası yerleşimleri burada hesaplanmaz. Bu yüzden bir ilişkiyi tek burç eşleşmesine göre değerlendirmek yerine, yorumu konuşmaya açılan bir kapı gibi kullanabilirsin.</p><p className="symbolEditorialNote">Örnek yapı ve astroloji terminolojisi: <a href="https://www.astrology.com/zodiac-signs" target="_blank" rel="noopener noreferrer">Astrology.com burç rehberi</a> ve <a href="https://www.astrology.com/us/index-compatibility.aspx" target="_blank" rel="noopener noreferrer">uyum bölümü</a>. Türkçe yorumlar Goldkozmos için özgün olarak hazırlanmıştır.</p></section>
      <EnergyDiscoveryLinks />
    </div><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd({ "@context": "https://schema.org", "@type": "CollectionPage", name: "Burç Yorumları ve Burç Uyumu", url: "https://goldkozmos.com/burclar", inLanguage: "tr-TR" }) }} /><FooterSection /></main>;
}
