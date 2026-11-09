"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";

import s from "./home-announcements.module.css";
import { createSupabaseBrowserClient } from "../../lib/supabase/browser";
import { useJourneyProgress } from "./HomeJourneyCard";
import "../../styles/daily-practice.css";

type Slide = {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  cta: string;
  href: string;
  image: string;
  clubId?: "kitap" | "gelisim";
};

export type FeaturedBlogArticle = { slug: string; title: string; description: string; image?: string };

export default function HomeSpotlightCarousel({ featuredArticles = [] }: { featuredArticles?: FeaturedBlogArticle[] }) {
  const router = useRouter();
  const { started, done } = useJourneyProgress();
  const completed = new Set(done).size;
  const current = Math.min(21, completed + 1);

  const slides: Slide[] = [
    ...featuredArticles.map((article):Slide=>({id:"blog-"+article.slug,eyebrow:"GOLDBLOG · SON YAZILAR",title:article.title,text:article.description,cta:"Yazıyı oku",href:`/goldblog/${article.slug}`,image:article.image??"/images/home-spotlight/goldblog-modern.webp"})),
    {id:"goldbook",eyebrow:"GOLDBOOK · MİNİ KİTAPLAR",title:"Özdeğer ve Onay Bağımlılığı",text:"Kendi değerini hatırlamak, onay ihtiyacını anlamak ve sınırlarını keşfetmek için mini kitabı incele.",cta:"GoldBook’ları keşfet",href:"/goldbook",image:"/goldbook/ozdeger-ve-onay-bagimliligi.webp"},
    {id:"goldcast",eyebrow:"GOLDCAST · SOHBETLER",title:"Kendine kulak vereceğin bir ara",text:"Kendilik, ilişkiler ve günlük hayata eşlik eden GoldKozmos sohbetlerini keşfet.",cta:"GoldCast’i aç",href:"/goldcast",image:"/images/platform/goldcast-premium.webp"},
    {id:"goldmind",eyebrow:"GOLDMIND · KENDİNE DÖN",title:"Meditasyon ve nefes alanın",text:"Günün içinde yavaşlamak, dikkatini toplamak ve kendine alan açmak için GoldMind’i tanı.",cta:"GoldMind’i keşfet",href:"/goldmind",image:"/images/goldmind/hero-desktop.webp"},
    {id:"goldfrekans",eyebrow:"GOLDFREKANS · DİNLEME ALANI",title:"Gününe eşlik edecek sesleri seç",text:"Doğa sesleri, meditasyon müzikleri ve GoldKozmos dinleme kütüphanesi bir arada.",cta:"GoldFrekans’ı aç",href:"/goldfrekans",image:"/images/platform/goldfrekans-premium.webp"},

    {id:"goldrituel",eyebrow:"GOLDRİTÜEL · GÜNLÜK NİYETLER",title:"Kendine küçük bir ritüel alanı aç",text:"Niyet, farkındalık ve günlük hayatına eşlik edecek sade uygulamaları keşfet.",cta:"GoldRitüel’i keşfet",href:"/goldrituel",image:"/images/goldrituel/yeni-ay-niyet-editorial.webp"},
    {
      id: "kitap",
      eyebrow: "YAKINDA · TOPLULUK",
      title: "Kitap Kulübü",
      text: "Birlikte okuyacağımız, konuşacağımız ve uygulayacağımız kişisel gelişim kitapları.",
      cta: "Haberdar Olmak İstiyorum",
      href: "/profilim",
      image: "/images/home-spotlight/kitap-kulubu-modern.webp",
      clubId: "kitap",
    },
    {
      id: "archetype",
      eyebrow: "ÖZ-FARKINDALIK",
      title: "GoldKozmos Arketip Testi",
      text: "Kendine hangi arketipten baktığını gör. 24 soru, baskın üç sonuç.",
      cta: "Arketip Testine Başla",
      href: "/arketip-testi",
      image: "/images/home-spotlight/arketip-testi-modern.webp",
    },
    {
      id: "energy",
      eyebrow: "ENERJİ ÇALIŞMALARI",
      title: "Sana uygun kozmik enerji çalışmasını bul",
      text: "Kendilik, aşk ve bolluk alanlarını keşfet. Seans içeriklerini, süreleri ve ücretleri karşılaştır.",
      cta: "Enerji Çalışmalarını Gör",
      href: "/calismalar",
      image: "/images/home-spotlight/enerji-calismalari-modern.webp",
    },
    {
      id: "gelisim",
      eyebrow: "YAKINDA · TOPLULUK",
      title: "Kişisel Gelişim Kulübü",
      text: "Farkındalık, alışkanlıklar ve kendilik üzerine ortak gelişim alanı.",
      cta: "Haberdar Olmak İstiyorum",
      href: "/profilim",
      image: "/images/home-spotlight/kisisel-gelisim-kulubu-modern.webp",
      clubId: "gelisim",
    },
    {
      id: "journey",
      eyebrow: "21 GÜNLÜK KENDİLİK YOLCULUĞU",
      title: started ? `Gün ${current} / 21` : "21 Günlük Kendilik Yolculuğu",
      text: started
        ? "Kaldığın yerden devam et. Kaçırılan gün seriyi sıfırlamaz."
        : "Günde 5–10 dakika. Gözlem, küçük uygulama, tek soru.",
      cta: started ? "Devam Et" : "Yolculuğa Başla",
      href: "/kendilik-yolculugu",
      image: "/images/home-spotlight/kendilik-yolculugu-modern.webp",
    },
  ];

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [manualPaused,setManualPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    if (manualPaused || paused || !visible || slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % slides.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [manualPaused, paused, visible, slides.length]);

  const slide = slides[index] ?? slides[0];

  async function onClubCta(event: MouseEvent<HTMLAnchorElement>) {
    if (!slide.clubId) return;
    event.preventDefault();
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      router.push("/profilim");
      return;
    }
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      router.push("/profilim");
      return;
    }
    await supabase.from("community_waitlist").insert({
      user_id: data.user.id,
      club_id: slide.clubId,
    });
  }

  return (
    <section
      ref={sectionRef}
      className="homeSpotlight"
      aria-roledescription="carousel"
      aria-label="GoldKozmos duyuruları"
      id="duyurular"
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false); }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(event) => {
        touchX.current = event.changedTouches[0]?.clientX ?? null;
        setPaused(true);
      }}
      onTouchEnd={(event) => {
        const start = touchX.current;
        const end = event.changedTouches[0]?.clientX;
        touchX.current = null;
        setPaused(false);
        if (start == null || end == null) return;
        const delta = end - start;
        if (Math.abs(delta) < 40) return;
        setIndex((value) =>
          delta < 0
            ? (value + 1) % slides.length
            : (value - 1 + slides.length) % slides.length,
        );
      }}
    >
      <div className={s.heading}><p>GOLDKOZMOS · DUYURULAR</p><h2>Yeni yazılar, keşifler ve sana açılan alanlar.</h2></div>
      <article className={`homeSpotlightSlide ${s.slide}`} key={slide.id}>
        <Image src={slide.image} alt="" fill sizes="(max-width:700px) 94vw, 1100px" />
        <div className="homeSpotlightWash" aria-hidden="true" />
        <div className="homeSpotlightCopy">
          <p>{slide.eyebrow}</p>
          <h2>{slide.title}</h2>
          <span>{slide.text}</span>
          <Link href={slide.href} onClick={(event) => void onClubCta(event)}>
            {slide.cta}
          </Link>
        </div>
      <div className={s.controls} aria-label="Duyuru seçimi"><button type="button" aria-label="Önceki duyuru" onClick={()=>setIndex(value=>(value-1+slides.length)%slides.length)}>←</button><span aria-live="off">{index+1} / {slides.length}</span><button type="button" aria-label="Sonraki duyuru" onClick={()=>setIndex(value=>(value+1)%slides.length)}>→</button><button type="button" aria-label={manualPaused?"Duyuruları otomatik oynat":"Duyuruları duraklat"} onClick={()=>setManualPaused(value=>!value)}>{manualPaused?"▷":"Ⅱ"}</button></div>
      </article>
      <details className="homeSpotlightDirectory">
        <summary>Tüm duyurular ve keşif alanları <span aria-hidden="true">＋</span></summary>
        <nav className="homeSpotlightIndex" aria-label="Öne çıkan alanlara doğrudan erişim">
        {slides.filter((item) => !item.clubId).map((item) => (
          <Link key={item.id} href={item.href}>{item.title}</Link>
        ))}
          <Link href="/goldblog">GoldBlog</Link>
          <Link href="/ruya-tabirleri">Rüya tabirleri</Link>
          <Link href="/burclar">Burçlar</Link>
        </nav>
      </details>
    </section>
  );
}

