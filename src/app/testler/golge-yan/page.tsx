import HomeNavbar from "../../../components/HomeNavbar";
import Image from "next/image";
import FooterSection from "../../../components/FooterSection";
import GolgeYanReflection from "../../../components/GolgeYanReflection";
import { pageMetadata } from "../../../lib/seo";
import "../../../styles/home.css";
import "../../../styles/energy-discovery.css";

export const metadata = pageMetadata("/testler/golge-yan", "Gölge Yan Testi — 5 Soruyla Kişisel Farkındalık", "Eleştiri, sınırlar, kıyas ve kendine yaklaşımın üzerine beş soruluk ücretsiz farkındalık çalışması. Yanıtlarını düşünme notlarıyla değerlendir, birebir kişisel gelişim seçeneklerini keşfet.");
export default function ShadowReflectionPage() {
  return <main className="homeV3Page energyDiscovery" id="top"><HomeNavbar /><header className="energyDiscoveryHero"><div className="energyDiscoveryHeroArt"><Image src="/images/goldmind/categories/odaklan-premium.webp" alt="" fill sizes="100vw" preload /></div><div className="energyDiscoveryInner"><p className="energyDiscoveryEyebrow">ÜCRETSİZ · KİŞİSEL FARKINDALIK</p><h1>Gölge yan testi.<br /><span>Kendine dürüstçe bak.</span></h1><p>Kolayca fark etmediğin tepkilerine beş soruyla yaklaş. Doğru ya da yanlış bir yanıt aramadan, son dönemdeki deneyimine bak.</p></div></header><div className="energyDiscoveryInner energyDiscoveryBody"><GolgeYanReflection /></div><FooterSection /></main>;
}
