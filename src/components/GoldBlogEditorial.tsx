"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { goldBlogArticles, goldBlogCategories } from "../data/goldblogArticles";
import GoldBlogNotifications from "./GoldBlogNotifications";

const blogDate = (date: string) => new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(date));

const categoryImages = {
  "genel-rehber": "/images/services/goldblog/categories/spirituel-stoa.webp",
  "spirituel-stoa": "/images/services/goldblog/categories/spirituel-stoa.webp",
  "iliski-rezonansi": "/images/services/goldblog/categories/iliski-rezonansi.webp",
  "kendilik-rezonansi": "/images/services/goldblog/categories/kendilik-rezonansi.webp",
  "bolluk-rezonansi": "/images/services/goldblog/categories/bolluk-rezonansi.webp",
  "goldkozmos-gunlugu": "/images/services/goldblog/categories/goldkozmos-gunlugu.webp",
};

export default function GoldBlogEditorial() {
  const [category, setCategory] = useState("all");
  const router = useRouter();
  // Keep previously shared reader links and comment sign-in return links working.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("yazi");
    if (slug && goldBlogArticles.some((article) => article.slug === slug)) {
      router.replace(`/goldblog/${slug}`);
    }
  }, [router]);
  const guides = goldBlogArticles.filter((article) => article.sections);
  const visibleArticles = goldBlogArticles.filter((article) => category === "all" || (category === "energy" ? article.categoryKey === 'genel-rehber' : article.categoryKey === category));
  return (
    <div className="goldBlogEditorial">
      <header className="gbeHero">
        <div className="gbeHeroArt" aria-hidden="true"><Image src="/images/platform/goldblog-premium.webp" alt="" fill sizes="(max-width:760px) 100vw, 65vw" priority /></div>
        <div className="gbeHeroInner">
          <p className="gbeEyebrow">GOLDKOZMOS · DÜŞÜNCE VE KEŞİF</p>
          <h1>Gold<span>Blog</span><i aria-hidden="true">✦</i></h1>
          <p className="gbeIntro">Kendini anlamaya bir sayfa aç.</p>
          <p className="gbeHeroNote">Enerji, ilişkiler ve içsel farkındalık üzerine<br />durup düşünmeye değer yazılar.</p>
          <a className="gbeHeroLink" href="#yazilar">Yazıları keşfet <span aria-hidden="true">↓</span></a>
        </div>
      </header>
      <section className="gbeFeatured" aria-labelledby="featured-title">
        <div className="gbeSectionHead"><div><p className="gbeEyebrow">SON EKLENENLER · GOLDBLOG SEÇKİSİ</p><h2 id="featured-title">Yeni bir bakış.<em>Yeni bir alan.</em></h2><p className="gbeSectionNote">İç dünyanı keşfetmek için özenle hazırlanmış rehberler.</p></div><GoldBlogNotifications onOpenPost={(slug) => { if (goldBlogArticles.some((article) => article.slug === slug)) router.push(`/goldblog/${slug}`); }} /></div>
        <div className="gbeFeatureGrid">{guides.map((article, index) => <Link className="gbeFeatureCard" href={`/goldblog/${article.slug}`} key={article.slug}>
          <div className="gbeCover">{article.image && <Image src={article.image} alt={article.slug.includes("cakra") ? "Yedi renkli kristal ve altın halkalar" : "Altın bulutsu ve yıldızlı gökyüzü"} fill sizes="(max-width: 760px) 92vw, 540px" priority={index === 0} />}<span className="gbeCoverBadge">YENİ REHBER</span><span className="gbeCoverArrow" aria-hidden="true">↗</span></div>
          <div className="gbeFeatureBody"><div className="gbeCardMeta"><span>{article.category}</span><span>{article.readingTime}</span></div>{article.publishedAt && <time className="gbeCardDate" dateTime={article.publishedAt}>{blogDate(article.publishedAt)}</time>}<h3>{article.title}</h3><p>{article.description}</p><span className="gbeRead">Rehberi oku <span aria-hidden="true">→</span></span></div>
        </Link>)}</div>
      </section>
      <section className="gbeLibrary" id="yazilar" aria-labelledby="library-title">
        <div className="gbeSectionHead"><div><p className="gbeEyebrow">SANA BİR SATIR UZAKLIKTA</p><h2 id="library-title">Okumak için bir alan seç.</h2><p className="gbeSectionNote">Sana yakın gelen konudan başla.</p></div><span className="gbeCount" aria-live="polite">{visibleArticles.length} yazı</span></div>
        <div className="gbeFilters" aria-label="Yazı kategorileri"><button type="button" aria-pressed={category === "all"} onClick={() => setCategory("all")}>Tümü</button><button type="button" aria-pressed={category === "energy"} onClick={() => setCategory("energy")}>Enerji & Kişisel Gelişim</button>{goldBlogCategories.map((item) => <button key={item.key} type="button" aria-pressed={category === item.key} onClick={() => setCategory(item.key)}>{item.title}</button>)}</div>
        <div className="gbeArticleGrid" key={category} role="region" aria-label="Kaydırılabilir yazı kartları" tabIndex={0}>{visibleArticles.map((article) => <Link className="gbeArticleCard" key={article.slug} href={`/goldblog/${article.slug}`}>
          <div className="gbeArticleImage"><Image src={article.image || categoryImages[article.categoryKey]} alt="" fill sizes="(max-width: 760px) 92vw, 520px" /><span className="gbeArticleCategory">{article.category}</span><span className="gbeArticleEmblem" aria-hidden="true">✦</span></div><div className="gbeArticleBody"><h3>{article.title}</h3><p className="gbeArticleDescription">{article.description}</p>{article.publishedAt && <time className="gbeCardDate" dateTime={article.publishedAt}>{blogDate(article.publishedAt)}</time>}<div className="gbeArticleBottom"><span><svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7"/><path d="M10 6v4l3 2"/></svg>{article.readingTime} okuma</span><b>Yazıyı oku <span aria-hidden="true">↗</span></b></div></div>
        </Link>)}</div>
      </section>
      <div className="gbeClosing"><span aria-hidden="true">✦</span><p>Her fark ediş,<br /><em>kendine bir adım daha.</em></p><Link href="/calismalar">Kendi yolculuğuna alan aç →</Link></div>
    </div>
  );
}
