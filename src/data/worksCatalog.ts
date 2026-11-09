import { energyWorks } from "./energyWorks";
import { getEducationCourses } from "./education";

export type WorkCard = {
  slug: string;
  group: "analiz" | "birebir" | "enerji" | "rezonans" | "dijital";
  title: string;
  text: string;
  image: string;
  href: string;
  eyebrow?: string;
  price?: string;
  duration?: string;
  cta: string;
  buyHref?: string;
};

export function allWorkCards(): WorkCard[] {
  const analiz: WorkCard[] = [
    {
      group: "analiz",
      slug: "numeroloji-analizi",

      title: "Numeroloji Analizi",
      text: "Doğum tarihi ve isim üzerinden kişisel eğilimlerini sembolik olarak incele.",
      image: "/images/services/numeroloji-yazisiz-altin.webp",
      href: "/calismalar/detay/numeroloji-analizi",
      eyebrow: "01 · NUMEROLOJİ",
      price: "700 TL",
      cta: "Detayları Gör",
    },
    {
      group: "analiz",
      slug: "tarot-bakimi",

      title: "Tarot Bakımı",
      text: "Kartların sembolik dili üzerinden mevcut durumuna farklı bir açıdan bak.",
      image: "/images/services/tarot-yazisiz-altin.webp",
      href: "/calismalar/detay/tarot-bakimi",
      eyebrow: "02 · TAROT",
      price: "600 TL",
      cta: "Detayları Gör",
    },
  ];

  const birebir: WorkCard[] = [
    {
      group: "birebir",
      slug: "tek-birebir-seans",

      title: "Tek Birebir Çalışma",
      text: "Anlatmak istediğin konuya odaklandığımız, konuşma ve enerji çalışmasını bir araya getiren 90 dakika.",
      image: "/images/services/birebir-enerji-bagi-premium-v2.webp",
      href: "/calismalar/detay/tek-birebir-seans",
      price: "2.000 TL",
      eyebrow: "01 · SEANS",
      duration: "90 dk",
      cta: "Detayları Gör",
    },
    {
      group: "birebir",
      slug: "4-haftalik-calisma-paketi",

      title: "4 Haftalık Çalışma Paketi",
      text: "Haftada bir gün, konuşma ve enerji çalışmasıyla yavaş ama sağlam temeller kurduğumuz 4 görüşme.",
      image: "/images/services/dort-hafta-lotus-premium-v2.webp",
      href: "/calismalar/detay/4-haftalik-calisma-paketi",
      eyebrow: "02 · 4 HAFTA",
      price: "6.000 TL",
      duration: "4 × 90 dk",
      cta: "Detayları Gör",
    },
  ];

  birebir.push({ group: "birebir", slug: "5-gunluk-yogun-calisma", title: "5 Günlük Yoğun Çalışma", text: "Aynı konu üzerinde beş gün art arda, her gün birebir çalışarak ilerle.", image: "/images/services/bes-gun-kristal-premium-v2.webp", href: "/calismalar/detay/5-gunluk-yogun-calisma", eyebrow: "03 · ART ARDA 5 GÜN", price: "3.600 TL", duration: "5 gün · Günde 60 dk", cta: "Detayları Gör" });
  const enerji: WorkCard[] = energyWorks.map((work, index) => ({
    group: "enerji" as const,
    slug: work.slug,
    title: work.title,
    text: work.shortDescription,
    image: work.imageSrc,
    href: `/calismalar/detay/${work.slug}`,
    eyebrow: `${String(index + 1).padStart(2, "0")} · ${work.title.split(" ").slice(0, 2).join(" ").toUpperCase()}`,
    price: work.priceLabel,
    duration: work.duration,
    cta: "Detayları Gör",
    buyHref: work.shopierUrl,
  }));

  const rezonans: WorkCard[] = getEducationCourses().map((course) => ({
    group: "rezonans" as const,
    slug: course.slug,
    title: course.title,
    text: course.homeSummary,
    image: course.coverImage,
    href: `/calismalar/detay/${course.slug}`,
    eyebrow: course.eyebrow,
    cta: "Detayları Gör",
    duration: "Hazırlanıyor · 15 farkındalık ses kaydı",
  }));

  const dijital: WorkCard[] = [
    {
      group: "dijital",
      slug: "7-cakra-dengeleme-kaydi",
      title: "7 Çakra Dengeleme Çalışması",
      text: "Canlı çalışmanın kayıtlı versiyonuna kendi zamanında eriş.",
      image: "/images/services/7-cakra-dengeleme-kaydi.webp",
      href: "/calismalar/detay/7-cakra-dengeleme-kaydi",
      eyebrow: "01 · KAYIT",
      price: "750 TL",
      cta: "Detayları Gör",

    },
    {
      group: "dijital",
      slug: "8-frekans-yuklemesi",
      title: "8 Frekans Yüklemesi",
      text: "Aşk ve ilişkiden bolluğa, özdeğerden kariyere uzanan sekiz yaşam alanına odaklanan canlı kayıt.",
      image: "/images/services/8-frekans-yuklemesi-canli-kayit.webp",
      href: "/calismalar/detay/8-frekans-yuklemesi",
      eyebrow: "02 · KAYIT",
      price: "300 TL",
      cta: "Detayları Gör",

    },
  ];

  return [...analiz, ...birebir, ...enerji, ...rezonans, ...dijital].map(card => ({ ...card, buyHref: `https://wa.me/905054722153?text=${encodeURIComponent(`Merhaba, ${card.title} için randevu almak istiyorum.`)}` }));
}

export const WORK_GROUPS: { id: WorkCard["group"]; title: string }[] = [
  { id: "analiz", title: "Analizler" },
  { id: "birebir", title: "Birebir" },
  { id: "enerji", title: "Enerji çalışmaları" },
  { id: "rezonans", title: "Rezonans" },
  { id: "dijital", title: "Dijital" },
];

export const WORK_HUB_SECTIONS: {
  id: string;
  group: WorkCard["group"];
  duration?: string;
  tone: "cream" | "brown";
  variant: "resonance" | "other" | "archive" | "energy";
  eyebrow: string;
  title: string;
  accent: string;
  lead: string;
}[] = [
  {
    id: "birebir",
    group: "birebir",
    duration: "90 dk",
    tone: "brown",
    variant: "resonance",
    eyebrow: "90 DAKİKA · BİREBİR ÇALIŞMA",
    title: "Birebir",
    accent: "çalışma.",
    lead: "Belirli bir konuya odaklanan, sana özel 90 dakikalık birebir görüşme.",
  },
  {
    id: "yogun-calisma",
    group: "birebir",
    duration: "4 hafta",
    tone: "cream",
    variant: "other",
    eyebrow: "4 HAFTA · BİREBİR ÇALIŞMA",
    title: "4 haftalık",
    accent: "çalışma paketi.",
    lead: "Haftada bir gün, 90 dakikalık dört görüşmeyle ilerleyen birebir çalışma paketi.",
  },
  {
    id: "enerji",
    group: "enerji",
    tone: "brown",
    variant: "energy",
    eyebrow: "30 DAKİKA · ENERJİ ODAKLI ÇALIŞMALAR",
    title: "Enerji odaklı",
    accent: "çalışmalar.",
    lead: "İhtiyacına uygun alanı seç, 30 dakikalık enerji odaklı çalışmaları incele.",
  },
  {
    id: "rezonans",
    group: "rezonans",
    tone: "cream",
    variant: "resonance",
    eyebrow: "REZONANS EĞİTİMLERİ",
    title: "3 eğitim",
    accent: "alanı.",
    lead: "Kendilik, ilişki ve bolluk alanlarında ses kaydı temelli çalışmalar hazırlanıyor. Ocak–Şubat döneminde yayına alınması planlanıyor.",
  },
  {
    id: "analiz",
    group: "analiz",
    tone: "brown",
    variant: "archive",
    eyebrow: "ANALİZLER",
    title: "Sayılar ve kartlar",
    accent: "üzerinden bak.",
    lead: "Numeroloji ve tarot ile mevcut durumuna farklı bir açıdan bak.",
  },
  {
    id: "dijital",
    group: "dijital",
    tone: "cream",
    variant: "archive",
    eyebrow: "DİJİTAL",
    title: "Kendi zamanında",
    accent: "uygula.",
    lead: "Canlı çalışmaların kayıtlı versiyonları, kendi ritminde.",
  },
];

