import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import HomeNavbar from "../../../../components/HomeNavbar";
import FooterSection from "../../../../components/FooterSection";
import EnergyReadingLinks from "../../../../components/energy/EnergyReadingLinks";
import PersonalClientMessages from "../../../../components/energy/PersonalClientMessages";
import IntensiveClientMessages from "../../../../components/energy/IntensiveClientMessages";
import MonthlyClientMessages from "../../../../components/energy/MonthlyClientMessages";
import { getWorkDetail, getWorkDetails } from "../../../../data/workDetails";
import { energyWorkDescriptions } from "../../../../data/energyWorkDescriptions";
import { nazarPageContent } from "../../../../data/nazarPageContent";
import { chakraPageContent } from "../../../../data/chakraPageContent";
import { pageMetadata, jsonLd } from "../../../../lib/seo";
import "../../../../styles/home.css";
import "../../../../styles/work-detail.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getWorkDetails().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const work = getWorkDetail(slug);
  if (!work) return {};
  if (slug === "nazar-temizligi") return pageMetadata(work.href, nazarPageContent.title, nazarPageContent.description, work.image);
  if (slug === "7-cakra-dengeleme") return pageMetadata(work.href, chakraPageContent.title, chakraPageContent.description, work.image);
  return pageMetadata(work.href, `${work.title}${work.group === "enerji" ? " — Kozmik Enerji Seansı" : ""}`, work.text, work.image);
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const work = getWorkDetail(slug);
  if (!work) notFound();
  const preparing = work.group === "rezonans";
  const birebir = work.group === "birebir";
  const energy = work.group === "enerji";
  const monthlyOptions = birebir && slug !== "5-gunluk-yogun-calisma";
  const whatsapp = `https://wa.me/905054722153?text=${encodeURIComponent(`Merhaba, ${work.title} için randevu almak istiyorum.`)}`;
  const url = `https://goldkozmos.com${work.href}`;
  const schema = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://goldkozmos.com/" }, { "@type": "ListItem", position: 2, name: "Çalışmalar", item: "https://goldkozmos.com/calismalar" }, { "@type": "ListItem", position: 3, name: work.title, item: url }] },
    ...(work.group === "enerji" || work.group === "birebir" ? [{ "@context": "https://schema.org", "@type": "Service", "@id": `${url}#service`, name: work.title, description: work.text, url, image: `https://goldkozmos.com${work.image}`, serviceType: work.group === "enerji" ? "Online kozmik enerji çalışması" : "Online kişisel gelişim çalışması", provider: { "@id": "https://goldkozmos.com/#organization" }, ...(work.price ? { offers: { "@type": "Offer", priceCurrency: "TRY", price: work.price.replace(/[^0-9]/g, ""), url: whatsapp } } : {}) }] : []),
  ];

  return (
    <main className={`homeV3Page workDetailPage${birebir ? " workDetailBirebir" : ""}${energy ? " workDetailSimple" : ""}`} id="top">
      <HomeNavbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <section className="workDetailHero">
        <div className="workDetailContainer">
          <Link className="workDetailBack" href={work.group === "enerji" ? "/calismalar/enerji-calismalari" : "/calismalar"}>← Tüm {work.group === "enerji" ? "enerji çalışmalarına" : "çalışmalara"} dön</Link>
          <div className="workDetailHeroGrid">
            <div className="workDetailImage">
              <Image src={work.image} alt={work.title} fill sizes="(max-width: 700px) 90vw, 440px" priority />
            </div>
            <header>
              <p className="workDetailEyebrow">GOLDKOZMOS · ÇALIŞMA DETAYI</p>
              <h1>{monthlyOptions ? "Birebir Çalışmalar" : work.title}</h1>
              <p className="workDetailLead">{work.text}</p>
              <div className="workDetailMeta">
                {work.duration ? <span>{work.duration}</span> : null}
                <span>{work.format}</span>
              </div>
              {work.price ? <p className="workDetailPrice">{work.price}</p> : null}
              <a className="workDetailRead" href="#calisma-detaylari">Çalışmayı keşfet ↓</a>
              {!preparing && work.group === "enerji" ? <div className="workDetailActions"><Link className="workDetailBuy" href={whatsapp}>Randevu al →</Link></div> : null}
            </header>
          </div>
        </div>
      </section>
      <section className="workDetailBody" id="calisma-detaylari">
        <div className="workDetailReading">
          {slug === "nazar-temizligi" ? <>
            {nazarPageContent.sections.map((section) => <article className="workDetailSection" key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </article>)}
            <p className="workNazarMeta">30 dakika · Online birebir · 1.000 TL</p>
            <div className="workDetailActions"><Link className="workDetailBuy" href={whatsapp}>WhatsApp’tan randevu al →</Link></div>
          </> : slug === "7-cakra-dengeleme" ? <>
            {chakraPageContent.sections.map((section) => <article className="workDetailSection" key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </article>)}
            <p className="workNazarMeta">30 dakika · Online birebir · 1.000 TL</p>
            <Link className="workChakraGuide" href="/cakralar">7 çakranın özelliklerini incele →</Link>
            <div className="workDetailActions"><Link className="workDetailBuy" href={whatsapp}>WhatsApp’tan randevu al →</Link></div>
          </> : energy && energyWorkDescriptions[slug] ? <article className="workDetailSection">
            <h2>{work.title}</h2>
            {energyWorkDescriptions[slug].map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <p className="workChakraDuration">30 dakika · Online birebir</p>
          </article> : work.sections.map((section) => (
            <article className="workDetailSection" key={section.title}>
              <div>
                <h2>{section.title}</h2>
                <p>{section.text}</p>
                {section.points ? <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul> : null}
              </div>
            </article>
          ))}
          {monthlyOptions ? <Link className="workEnergyGuideLink" href="/kozmik-enerji">Kozmik enerji çalışması nedir? İncele →</Link> : null}
          {monthlyOptions ? <div className="workBirebirOptions">
            <article className="workVisualOption"><div className="workOptionArtwork"><Image src="/images/services/birebir-enerji-bagi-premium-v2.webp" alt="" fill sizes="(max-width: 700px) 90vw, 760px" /><span aria-hidden="true">01</span></div><small>TEK GÖRÜŞME</small><h2>Tek Birebir Çalışma</h2><p className="workOptionMeta">90 dakika · Online</p><strong className="workOptionPrice">2.000 TL</strong><p>Anlatmak istediğin konuya odaklandığımız tek görüşme. Konuşma, kişisel gelişim desteği ve ardından sana özel enerji çalışması dahildir.</p><a href="https://wa.me/905054722153?text=Merhaba%2C%2090%20dakikal%C4%B1k%20birebir%20%C3%A7al%C4%B1%C5%9Fma%20i%C3%A7in%20randevu%20almak%20istiyorum." target="_blank" rel="noopener noreferrer">Randevu al <span aria-hidden="true">↗</span></a></article>
            <article className="workVisualOption"><div className="workOptionArtwork isMonthly"><Image src="/images/services/dort-hafta-lotus-premium-v2.webp" alt="" fill sizes="(max-width: 700px) 90vw, 760px" /><span aria-hidden="true">04 <i>görüşme</i></span></div><small>HAFTADA BİR GÜN</small><h2>4 Haftalık Çalışma Paketi</h2><p className="workOptionMeta">90 dakikalık 4 görüşme · Online</p><strong className="workOptionPrice">6.000 TL</strong><p>Yavaş ama sağlam temellerle ilerlemek için bir ay boyunca, haftada bir gün birlikte çalışırız. Her görüşmede önce sen anlatırsın, ardından enerji çalışması yaparım.</p><p className="workOptionTerms">Paket ücreti iade edilmez.</p><a href="https://wa.me/905054722153?text=Merhaba%2C%206.000%20TL%204%20haftal%C4%B1k%20%C3%A7al%C4%B1%C5%9Fma%20paketi%20i%C3%A7in%20randevu%20almak%20istiyorum." target="_blank" rel="noopener noreferrer">Randevu al <span aria-hidden="true">↗</span></a></article>
            <p className="workOptionsContact">Randevu ve paket için WhatsApp üzerinden bana yazabilirsin.</p>
          </div> : energy ? null : <div className="workDetailPurchase">
            <div className="workDetailPurchaseHeader">
              <p className="workDetailEyebrow">{preparing ? "YENİ BİR ALAN HAZIRLANIYOR" : "KATILIM & İLETİŞİM"}</p>
              <h2>{work.title}</h2>
              <p className="workDetailPurchaseMeta">{work.duration ? `${work.duration} · ` : ""}{work.format}</p>
            </div>
            <div className="workDetailPurchaseContent">
              {work.price ? <div className="workDetailPurchaseSummary"><span>Katılım bedeli</span><strong className="workDetailPurchasePrice">{work.price}</strong></div> : null}
              <p>{preparing ? "Ocak–Şubat döneminde yayına alınması planlanıyor. Henüz satın almaya açık değil; çalışma hakkında sorularını WhatsApp üzerinden iletebilirsin." : "Randevu ve çalışma detayları için WhatsApp üzerinden bana yazabilirsin."}</p>
            <div className="workDetailActions">
              <a className="workDetailWhatsapp" href={whatsapp} target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-4-.9L3 21l1.8-4.6A8.5 8.5 0 1 1 20 11.5Z" /><path d="M8 8h8M8 12h5" /></svg><span>{preparing ? "WhatsApp’ta Sor" : "Randevu al"}</span><span className="workDetailActionArrow" aria-hidden="true">↗</span></a>
            </div>
            </div>
          </div>}
          {energy && slug !== "7-cakra-dengeleme" ? <EnergyReadingLinks slug={slug} /> : null}
        </div>
      </section>
      {slug === "tek-birebir-seans" ? <PersonalClientMessages /> : null}
      {slug === "5-gunluk-yogun-calisma" ? <IntensiveClientMessages /> : null}
      {slug === "4-haftalik-calisma-paketi" ? <MonthlyClientMessages /> : null}
      <FooterSection />
    </main>
  );
}
