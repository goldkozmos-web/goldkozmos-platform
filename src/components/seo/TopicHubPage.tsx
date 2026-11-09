import Image from "next/image";
import ChakraLifeGuide from "./ChakraLifeGuide";
import Link from "next/link";
import HomeNavbar from "../../components/HomeNavbar";
import FooterSection from "../../components/FooterSection";
import EnergyDiscoveryLinks from "../../components/energy/EnergyDiscoveryLinks";
import { jsonLd } from "../../lib/seo";
import "../../styles/home.css";
import "../../styles/energy-discovery.css";
import "../../styles/topic-hub.css";
import "../../styles/topic-cards-premium.css";
import "../../styles/chakra-detail.css";

export type TopicCard = { href: string; eyebrow: string; title: string; description: string; image?: string };
export type TopicFaq = { question: string; answer: string };

function CleansingSymbol({ index }: { index: number }) {
  const paths = [
    <><path d="M5 24s8-12 19-12 19 12 19 12-8 12-19 12S5 24 5 24Z" /><circle cx="24" cy="24" r="6" /></>,
    <><path d="m9 23 15-13 15 13v17H9V23Z M20 40V27h8v13" /><path d="M35 7v8M31 11h8" /></>,
    <><path d="M24 10a14 14 0 1 1-14 14 M24 10l-6-5 M24 10l-6 5" /><circle cx="24" cy="24" r="5" /></>,
    <><path d="M24 40V20 M24 25 13 15 M24 29l11-12" /><circle cx="24" cy="12" r="5" /><circle cx="10" cy="12" r="4" /><circle cx="38" cy="13" r="4" /></>,
    <>{[9,14,19,24,29,34,39].map((cy) => <circle key={cy} cx="24" cy={cy} r="2" />)}<path d="M15 8C5 18 5 30 15 40 M33 8c10 10 10 22 0 32" /></>,
    <><path d="M24 6c-2 9-13 17-13 25a13 13 0 0 0 26 0C37 23 26 15 24 6Z M17 32c0 4 3 7 7 7" /></>,
  ];
  return <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[index % paths.length]}</svg>;
}

type HubProps = {
  url: string;
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  image: string;
  introTitle: string;
  intro: string[];
  cards: TopicCard[];
  guideTitle: string;
  guide: string[];
  faqs?: TopicFaq[];
  ctaTitle: string;
  ctaDescription: string;
  ctaHref: string;
  ctaLabel: string;
};

export function TopicHubPage(props: HubProps) {
  const illustratedCards = props.cards.some((card) => card.image);
  const isRenewal = props.url.endsWith('/ruhsal-arinma');
  const premiumCards = isRenewal || props.url.endsWith('/enerji-temizligi');
  const cardFolder = isRenewal ? 'renewal-cards' : 'cleansing-cards';
  const cardNames = isRenewal ? ['alan','beden','kozmos','yazi','pratik','birebir'] : ['nazar','mekan','karma','atalar','cakra','arinma'];
  const schema = [
    { "@context": "https://schema.org", "@type": "CollectionPage", "@id": `${props.url}#page`, url: props.url, name: props.title, description: props.description, inLanguage: "tr-TR" },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://goldkozmos.com/" }, { "@type": "ListItem", position: 2, name: props.title, item: props.url }] },
    ...(props.faqs?.length ? [{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: props.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }] : []),
  ];
  return <main className={`homeV3Page topicHubPage${premiumCards ? ' cleansingPremium' : ''}`} id="top">
    <HomeNavbar />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
    <header className="topicHubHero">
      <Image src={props.image} alt="" fill priority sizes="100vw" className="topicHubHeroImage" />
      <div className="topicHubHeroShade" aria-hidden="true" />
      <div className="topicHubHeroCopy"><p className="topicHubEyebrow">{props.eyebrow}</p><h1>{props.title}<br /><em>{props.accent}</em></h1><p>{props.description}</p><div className="topicHubHeroLinks"><Link href="#rehber">Rehbere başla ↓</Link><Link href="/calismalar/enerji-calismalari">Çalışmaları incele ↗</Link></div></div>
    </header>
    <div className="topicHubContainer">
      <section className="topicHubSection topicHubIntro" id="rehber"><p className="topicHubEyebrow">GOLDKOZMOS · REHBER</p><h2>{props.introTitle}</h2>{props.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>
      <section className="topicHubSection" aria-labelledby="topic-hub-paths"><p className="topicHubEyebrow">İLGİLİ BAŞLIKLAR</p><h2 id="topic-hub-paths">Kendi keşif yolunu seç.</h2><div className={`topicHubCards${illustratedCards ? " topicHubIllustratedRail" : ""}${premiumCards ? ' topicHubCardsScroller' : ''}`}>{props.cards.map((card, index) => <Link className="topicHubCard" href={card.href} key={card.href}>{card.image && <div className="topicHubCardImage"><Image src={card.image} alt="" fill sizes="(max-width:700px) 76vw, 320px" /><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span></div>}{premiumCards && <div className="cleansingCardMedia"><Image src={`/images/${cardFolder}/${cardNames[index]}.webp`} alt="" fill sizes="(max-width:700px) 90vw, 350px" /><span className="cleansingCardNumber">{String(index + 1).padStart(2, '0')}</span></div>}<span>{card.eyebrow}</span><h3>{card.title}</h3><p>{card.description}</p><b>Keşfet <span aria-hidden="true">↗</span></b></Link>)}</div></section>
      <section className="topicHubSection topicHubGuide"><p className="topicHubEyebrow">YAKLAŞIMIMIZ</p><h2>{props.guideTitle}</h2>{props.guide.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>
      {props.faqs?.length ? <section className="topicHubSection topicHubFaq" id="sik-sorulanlar"><p className="topicHubEyebrow">KISA YANITLAR</p><h2>Sık sorulanlar</h2>{props.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</section> : null}
      <section className="topicHubCta"><div><p className="topicHubEyebrow">KENDİNE BİR ALAN AÇ</p><h2>{props.ctaTitle}</h2><p>{props.ctaDescription}</p></div><Link href={props.ctaHref}>{props.ctaLabel} <span aria-hidden="true">↗</span></Link></section>
      <EnergyDiscoveryLinks />
    </div>
    <FooterSection />
  </main>;
}

export function TopicDetailPage(props: { url: string; breadcrumb: string; eyebrow: string; title: string; subtitle: string; color: string; description: string; signals: string[]; practice: string; related: TopicCard[] }) {
  const schema = [
    { "@context": "https://schema.org", "@type": "Article", "@id": `${props.url}#article`, url: props.url, headline: props.title, description: props.description, inLanguage: "tr-TR", author: { "@type": "Organization", name: "Goldkozmos", url: "https://goldkozmos.com/hakkimda" }, publisher: { "@id": "https://goldkozmos.com/#organization" } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://goldkozmos.com/" }, { "@type": "ListItem", position: 2, name: props.breadcrumb, item: "https://goldkozmos.com/cakralar" }, { "@type": "ListItem", position: 3, name: props.title, item: props.url }] },
  ];
  return <main className="homeV3Page topicHubPage topicDetailPage" id="top"><HomeNavbar /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} /><div className="topicDetailContainer"><nav className="topicDetailBreadcrumb" aria-label="Sayfa yolu"><Link href="/">Ana Sayfa</Link><span aria-hidden="true">/</span><Link href="/cakralar">{props.breadcrumb}</Link><span aria-hidden="true">/</span><span>{props.title}</span></nav><header className="topicDetailHeader"><span className="topicDetailMark" style={{ background: props.color }} aria-hidden="true" /><p className="topicHubEyebrow">{props.eyebrow}</p><h1>{props.title}</h1><p className="topicDetailSubtitle">{props.subtitle}</p><p className="topicDetailLead">{props.description}</p></header><ChakraLifeGuide name={props.title} /><section className="topicDetailBody"><h2>Kendini gözlemlemek için küçük bir pratik</h2><p>{props.practice}</p><p>Bir çakra dengesizliği fikrini kullanırken yaşadığın durumu tek nedene bağlama. Uzun süren fiziksel veya duygusal yakınmalar için uygun sağlık uzmanından destek al; spiritüel farkındalık çalışmaları tıbbi ya da psikolojik tedavinin yerine geçmez.</p></section><section className="topicHubSection topicDetailRelated"><p className="topicHubEyebrow">DEVAM ET</p><h2>İlgili rehberler</h2><div className="topicHubCards">{props.related.map((card) => <Link className="topicHubCard" href={card.href} key={card.href}><span>{card.eyebrow}</span><h3>{card.title}</h3><p>{card.description}</p><b>Keşfet ↗</b></Link>)}</div></section><section className="topicHubCta"><div><p className="topicHubEyebrow">ENERJİ ÇALIŞMASI</p><h2>7 Çakra Dengeleme</h2><p>Çakra kavramlarını kişisel farkındalık çerçevesinde ele alan 30 dakikalık online birebir çalışmanın kapsamını incele.</p></div><Link href="/calismalar/detay/7-cakra-dengeleme">Çalışmayı incele <span aria-hidden="true">↗</span></Link></section><EnergyDiscoveryLinks /></div><FooterSection /></main>;
}
