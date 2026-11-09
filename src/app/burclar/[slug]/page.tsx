import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import HomeNavbar from "../../../components/HomeNavbar";
import FooterSection from "../../../components/FooterSection";
import EnergyDiscoveryLinks from "../../../components/energy/EnergyDiscoveryLinks";
import ZodiacTileArtwork from "../../../components/ZodiacTileArtwork";
import { zodiacReadings } from "../../../data/zodiacReadings";
import { pageMetadata, jsonLd } from "../../../lib/seo";
import "../../../styles/home.css";
import "../../../styles/energy-discovery.css";
import "../../../styles/symbol-library.css";
import "../../../styles/zodiac-atlas-premium.css";
import "../../../styles/zodiac-detail.css";

type PageProps = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return zodiacReadings.map(sign => ({ slug: sign.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sign = zodiacReadings.find(item => item.slug === slug);
  if (!sign) notFound();
  return pageMetadata(`/burclar/${sign.slug}`, `${sign.name} Burcu Yorumu ve Özellikleri — Aşk, İş ve İletişim`, `${sign.name} burcu yorumu: genel özellikleri, aşk ve ilişkilerdeki yaklaşımı, iş yaşamı ve iletişim dili. ${sign.dates} tarihleri ve ${sign.element.toLocaleLowerCase("tr-TR")} elementi için özgün rehber.`);
}

export default async function ZodiacDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const sign = zodiacReadings.find(item => item.slug === slug);
  if (!sign) notFound();
  const url = `https://goldkozmos.com/burclar/${sign.slug}`;
  const related = zodiacReadings.filter(item => item.element === sign.element && item.slug !== sign.slug);
  const breadcrumbs = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://goldkozmos.com/" },
    { "@type": "ListItem", position: 2, name: "Burç Yorumları", item: "https://goldkozmos.com/burclar" },
    { "@type": "ListItem", position: 3, name: `${sign.name} Burcu`, item: url }
  ] };
  const article = { "@context": "https://schema.org", "@type": "Article", headline: `${sign.name} burcu yorumu ve özellikleri`, description: sign.general, articleBody: sign.reading.join("\n\n"), inLanguage: "tr-TR", mainEntityOfPage: url, author: { "@type": "Organization", name: "Goldkozmos", url: "https://goldkozmos.com" }, publisher: { "@type": "Organization", name: "Goldkozmos", url: "https://goldkozmos.com" } };
  return <main className="homeV3Page symbolPage zodiacDetailPage" id="top">
    <HomeNavbar />
    <header className="zodiacDetailHero">
      <nav className="zodiacDetailBreadcrumbs" aria-label="Sayfa yolu"><Link href="/">Ana Sayfa</Link><span aria-hidden="true">/</span><Link href="/burclar">Burçlar</Link><span aria-hidden="true">/</span><span>{sign.name}</span></nav>
      <div className="zodiacDetailHeroInner"><div><p className="symbolKicker">GOLDKOZMOS · BURÇ REHBERİ</p><h1>{sign.name} burcu<br /><em>yorumu ve özellikleri.</em></h1><p>{sign.theme}</p><div className="zodiacDetailTags"><span>{sign.dates}</span><span>{sign.element}</span><span>{sign.ruler}</span></div></div><div className="zodiacDetailEmblem" aria-hidden="true"><ZodiacTileArtwork slug={sign.slug} /><span>{sign.symbol}</span></div></div>
    </header>
    <div className="symbolContainer zodiacDetailContainer">
      <article className="zodiacDetailReading"><p className="symbolKicker">{sign.name.toLocaleUpperCase("tr-TR")} · AŞK, İŞ VE İLETİŞİM</p><h2>{sign.name} burcunun dünyası</h2><div className="zodiacNarrative">{sign.reading.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div><p className="symbolEditorialNote">Bu yorum, geleneksel Güneş burcu sembolizmini temel alan özgün bir editoryal okumadır. Günlük veya haftalık gelecek tahmini ve kişisel doğum haritası analizi değildir.</p><Link className="zodiacDetailCompatibilityLink" href="/burclar#burc-uyumu"><span>İki burç arasındaki uyumu keşfet</span><span aria-hidden="true">↗</span></Link></article>
      <section className="symbolSection zodiacDetailFacts"><h2>{sign.name} burcu hakkında kısa yanıtlar</h2><details><summary>{sign.name} burcu hangi tarihler arasındadır?</summary><p>Geleneksel tropikal zodyakta {sign.name} burcu için genel tarih aralığı {sign.dates} olarak kabul edilir. Burç geçişi doğum yılına ve saatine göre değişebildiğinden, sınır günlerinde doğanlar için doğum haritasının hesaplanması gerekir.</p></details><details><summary>{sign.name} burcunun elementi ve yöneticisi nedir?</summary><p>{sign.name}, {sign.element.toLocaleLowerCase("tr-TR")} elementiyle ilişkilendirilir. Geleneksel ve modern astroloji terminolojisinde yöneticisi ve niteliği {sign.ruler} olarak ifade edilir. Bunlar astrolojik sembolizmin parçalarıdır; kişinin özelliklerini tek başına belirlemez.</p></details></section>
      <section className="symbolSection zodiacDetailRelated"><p className="symbolKicker">AYNI ELEMENT · FARKLI DÜNYALAR</p><h2>{sign.element} burçlarını keşfet.</h2><div>{related.map(item => <Link key={item.slug} href={`/burclar/${item.slug}`}><span aria-hidden="true">{item.symbol}</span><strong>{item.name} burcu</strong><span aria-hidden="true">↗</span></Link>)}</div><Link className="zodiacDetailBack" href="/burclar#burc-yorumlari">Tüm burç kartlarına dön ←</Link></section>
      <EnergyDiscoveryLinks />
    </div>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd([breadcrumbs, article]) }} />
    <FooterSection />
  </main>;
}
