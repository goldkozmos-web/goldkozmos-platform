import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../../components/Navbar";
import FooterSection from "../../../components/FooterSection";
import GoldBlogComments from "../../../components/GoldBlogComments";
import BlogQuoteShare from "../../../components/BlogQuoteShare";
import { goldBlogArticles } from "../../../data/goldblogArticles";
import "../../../styles/home.css";
import "../../../styles/blog-article.css";
import EnergyDiscoveryLinks from "../../../components/energy/EnergyDiscoveryLinks";
import "../../../styles/energy-discovery.css";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return goldBlogArticles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = goldBlogArticles.find((item) => item.slug === slug);
  if (!article) notFound();
  const url = `https://goldkozmos.com/goldblog/${slug}`;
  return {
    title: article.title, description: article.description,
    alternates: { canonical: url },
    openGraph: { type: "article", title: article.title, description: article.description, url, locale: "tr_TR", publishedTime: article.publishedAt, modifiedTime: article.updatedAt, ...(article.image ? { images: [{ url: article.image, alt: article.title }] } : {}) },
    twitter: { card: "summary_large_image", title: article.title, description: article.description, ...(article.image ? { images: [article.image] } : {}) },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = goldBlogArticles.find((item) => item.slug === slug);
  if (!article) notFound();
  const url = `https://goldkozmos.com/goldblog/${slug}`;
  const others = goldBlogArticles.filter((item) => item.slug !== slug);
  const related = [...others.filter((item) => item.categoryKey === article.categoryKey), ...others.filter((item) => item.categoryKey !== article.categoryKey)].slice(0, 3);
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BlogPosting", "@id": `${url}#article`, headline: article.title, description: article.description, mainEntityOfPage: url, inLanguage: "tr-TR", author: { "@type": "Organization", name: "Goldkozmos", url: "https://goldkozmos.com/hakkimda" }, publisher: { "@id": "https://goldkozmos.com/#organization" }, ...(article.publishedAt ? { datePublished: article.publishedAt, dateModified: article.updatedAt ?? article.publishedAt } : {}), ...(article.image ? { image: `https://goldkozmos.com${article.image}` } : {}) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name: "GoldBlog", item: "https://goldkozmos.com/goldblog" }, { "@type": "ListItem", position: 2, name: article.title, item: url } ] },
  ];
  return (
    <main className="homePage goldblogPage blogArticlePage" id="top">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Navbar />
      <article className="blogArticle">
        <nav className="blogBreadcrumb" aria-label="İçerik yolu"><Link href="/goldblog">GoldBlog</Link><span aria-hidden="true">/</span><span>{article.category}</span></nav>
        <header className={`blogArticleHero${article.image ? " hasImage" : ""}`}>
          <div><p className="blogEyebrow">{article.category}</p><h1>{article.title}</h1><p className="blogDeck">{article.description}</p><div className="blogByline"><Link href="/hakkimda">Goldkozmos Editoryal</Link><span>{article.readingTime} okuma</span>{article.publishedAt && <time dateTime={article.publishedAt}>{new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(article.publishedAt))}</time>}</div></div>
          {article.image && <div className="blogHeroImage"><Image src={article.image} alt={slug.includes("cakra") ? "Yedi çakrayı temsil eden renkli kristaller ve altın halkalar" : "Yıldızlarla çevrili altın bulutsu ve gökyüzünün suya yansıması"} fill sizes="(max-width: 760px) 100vw, 430px" priority /></div>}
        </header>
        <p className="blogEditorialIdentity">Goldkozmos, Özge Batıgün tarafından kurulan kozmik enerji ve kişisel gelişim platformudur. <Link href="/hakkimda">Kurucuyu ve yaklaşımımızı tanı →</Link></p>
        <BlogQuoteShare title={article.title} slug={article.slug} defaultQuote={article.description} />
        <div className="blogArticleLayout">
          {article.sections && <aside className="blogContents"><p>BU REHBERDE</p><nav aria-label="Yazı içindekiler">{article.sections.map((section) => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}</nav></aside>}
          <div className="blogReading">
            <div className="blogLead">{article.content.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
            {article.sections?.map((section) => <section key={section.id} id={section.id} className={`blogTextSection${section.color ? " blogChakraCard" : ""}`}>
              {section.color && <span className="blogChakraMark" style={{ background: section.color }} aria-hidden="true"><svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="12"/><path d="M20 5 33 27H7L20 5ZM20 35 7 13h26L20 35Z"/><circle cx="20" cy="20" r="4"/></svg></span>}
              <h2>{section.title}</h2>{section.subtitle && <p className="blogSectionSubtitle">{section.subtitle}</p>}{section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </section>)}
            {article.cta && <section className="blogWorkCta"><p className="blogEyebrow">KENDİNE BİR ALAN AÇ</p><h2>Okuduklarını kendi yolculuğunla buluştur.</h2><p>{article.cta.description}</p><Link className="blogCtaButton" href={article.cta.href}>{article.cta.label}<span aria-hidden="true">↗</span></Link><Link className="blogCtaSecondary" href="/calismalar/enerji-calismalari">Enerji odaklı çalışmaların detaylarını incele →</Link></section>}
            {article.sources && <div className="blogSources"><h2>Kaynak ve okuma notu</h2><p>Geleneksel çerçeve için aşağıdaki kaynaktan yararlanılmıştır. Günlük yaşam soruları Goldkozmos’un farkındalık odaklı yorumlarıdır.</p>{article.sources.map((source) => <a href={source.href} key={source.href} target="_blank" rel="noopener noreferrer">{source.title} ↗</a>)}</div>}
            <GoldBlogComments postId={article.slug} />
          </div>
        </div>
        <EnergyDiscoveryLinks />
        <section className="blogRelated"><p className="blogEyebrow">OKUMAYA DEVAM ET</p><h2>Bir sonraki keşfin</h2><div>{related.map((item) => <Link href={`/goldblog/${item.slug}`} key={item.slug}><span>{item.category}</span><h3>{item.title}</h3><p>{item.description}</p><b>Yazıyı oku ↗</b></Link>)}</div></section>
      </article>
      <FooterSection />
    </main>
  );
}
