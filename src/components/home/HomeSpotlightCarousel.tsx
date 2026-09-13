"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";

import { goldBlogArticles } from "../../data/goldblogArticles";
import { energyWorks } from "../../data/energyWorks";
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

export default function HomeSpotlightCarousel() {
  const { started, done } = useJourneyProgress();
  const completed = new Set(done).size;
  const current = Math.min(21, completed + 1);
  const article = goldBlogArticles.find((item) => item.isNew) ?? goldBlogArticles[0];
  const energy = energyWorks[0];

  const slides: Slide[] = [
    {
      id: "blog",
      eyebrow: "GOLDBLOG",
      title: article?.title ?? "GoldBlog",
      text: article?.description ?? "Bugün okuman için bir yazı.",
      cta: "Oku",
      href: article ? `/goldblog#${article.slug}` : "/goldblog",
      image: "/images/home-spotlight/goldblog.jpg",
    },
    {
      id: "kitap",
      eyebrow: "YAKINDA · TOPLULUK",
      title: "Kitap Kulübü",
      text: "Birlikte okuyacağımız, konuşacağımız ve uygulayacağımız kişisel gelişim kitapları.",
      cta: "Haberdar Olmak İstiyorum",
      href: "/profilim",
      image: "/images/home-spotlight/kitap-kulubu.jpg",
      clubId: "kitap",
    },
    {
      id: "archetype",
      eyebrow: "ÖZ-FARKINDALIK",
      title: "GoldKozmos Arketip Testi",
      text: "Kendine hangi arketipten baktığını gör. 24 soru, baskın üç sonuç.",
      cta: "Arketip Testine Başla",
      href: "/arketip-testi",
      image: "/images/home-spotlight/arketip-testi.jpg",
    },
    {
      id: "energy",
      eyebrow: "ENERJİ ÇALIŞMALARI",
      title: energy?.title ?? "Enerji çalışmaları",
      text:
        energy?.shortDescription ??
        "Birebir enerji çalışmalarını incele, detayına geç.",
      cta: "Enerji Çalışmalarını Gör",
      href: "/calismalar/enerji-calismalari",
      image: "/images/home-spotlight/enerji-calismalari.jpg",
    },
    {
      id: "gelisim",
      eyebrow: "YAKINDA · TOPLULUK",
      title: "Kişisel Gelişim Kulübü",
      text: "Farkındalık, alışkanlıklar ve kendilik üzerine ortak gelişim alanı.",
      cta: "Haberdar Olmak İstiyorum",
      href: "/profilim",
      image: "/images/home-spotlight/kisisel-gelisim-kulubu.jpg",
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
      image: "/images/home-spotlight/kendilik-yolculugu.jpg",
    },
  ];

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % slides.length);
    }, 2000);
    return () => window.clearInterval(timer);
  }, [paused, slides.length]);

  const slide = slides[index] ?? slides[0];

  async function onClubCta(event: MouseEvent<HTMLAnchorElement>) {
    if (!slide.clubId) return;
    event.preventDefault();
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      window.location.assign("/profilim");
      return;
    }
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      window.location.assign("/profilim");
      return;
    }
    await supabase.from("community_waitlist").insert({
      user_id: data.user.id,
      club_id: slide.clubId,
    });
  }

  return (
    <section
      className="homeSpotlight"
      aria-roledescription="carousel"
      aria-label="Öne çıkanlar"
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
      <article className="homeSpotlightSlide" key={slide.id}>
        <img src={slide.image} alt="" />
        <div className="homeSpotlightWash" aria-hidden="true" />
        <div className="homeSpotlightCopy">
          <p>{slide.eyebrow}</p>
          <h2>{slide.title}</h2>
          <span>{slide.text}</span>
          <a href={slide.href} onClick={(event) => void onClubCta(event)}>
            {slide.cta}
          </a>
        </div>
      </article>

      <div className="homeSpotlightDots" role="tablist" aria-label="Slaytlar">
        {slides.map((item, itemIndex) => (
          <button
            key={item.id}
            type="button"
            aria-label={item.eyebrow}
            aria-selected={itemIndex === index}
            className={itemIndex === index ? "isOn" : undefined}
            onClick={() => setIndex(itemIndex)}
          />
        ))}
      </div>
    </section>
  );
}
