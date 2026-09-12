import { energyWorks } from "./energyWorks";
import { getEducationCourses } from "./education";
import { publishedRituals } from "./goldrituel/catalog";

export type WorkCard = {
  group: "analiz" | "birebir" | "enerji" | "rezonans" | "dijital";
  title: string;
  text: string;
  image: string;
  href: string;
  price?: string;
  duration?: string;
  cta: string;
  buyHref?: string;
};

export function allWorkCards(): WorkCard[] {
  const analiz: WorkCard[] = [
    {
      group: "analiz",
      title: "Numeroloji Analizi",
      text: "Doğum tarihi ve isim üzerinden kişisel eğilimlerini sembolik olarak incele.",
      image: "/images/services/numeroloji-analizi.webp",
      href: "/calismalar/numeroloji",
      price: "350 TL",
      cta: "Detayları Gör",
    },
    {
      group: "analiz",
      title: "Tarot Bakımı",
      text: "Kartların sembolik dili üzerinden mevcut durumuna farklı bir açıdan bak.",
      image: "/images/services/tarot-farkindalik.webp",
      href: "/tarot-bakimi",
      price: "600 TL",
      cta: "Detayları Gör",
      buyHref: "/calismalar/tarot",
    },
  ];

  const birebir: WorkCard[] = [
    {
      group: "birebir",
      title: "Tek Birebir Seans",
      text: "Belirli bir konuya odaklanan 90 dakikalık birebir görüşme.",
      image: "/images/services/birebir-seans.webp",
      href: "/calismalar/enerji-calismalari",
      duration: "90 dk",
      cta: "Detayları Gör",
    },
    {
      group: "birebir",
      title: "5 Günlük Yoğun Çalışma",
      text: "Beş gün boyunca aynı konu üzerinde birebir ilerleyen yoğun çalışma.",
      image: "/images/services/5-gunluk-yogun-paket.webp",
      href: "/calismalar/birebir-seanslar",
      price: "5.000 TL",
      duration: "5 gün",
      cta: "Detayları Gör",
    },
  ];

  const enerji: WorkCard[] = energyWorks.map((work) => ({
    group: "enerji" as const,
    title: work.title,
    text: work.shortDescription,
    image: work.imageSrc,
    href: `/calismalar/enerji-calismalari#${work.slug}`,
    price: work.priceLabel,
    duration: work.duration,
    cta: "Detayları Gör",
    buyHref: work.shopierUrl,
  }));

  const rezonans: WorkCard[] = getEducationCourses().map((course) => ({
    group: "rezonans" as const,
    title: course.title,
    text: course.homeSummary,
    image: course.coverImage,
    href: `/rezonans-egitimleri#${course.slug}`,
    price: course.priceLabel,
    duration: course.sessionMeta[0],
    cta: "Detayları Gör",
  }));

  const dijital: WorkCard[] = [
    {
      group: "dijital",
      title: "7 Çakra Dengeleme Çalışması",
      text: "Canlı çalışmanın kayıtlı versiyonuna kendi zamanında eriş.",
      image: "/images/services/7-cakra-dengeleme-kaydi.webp",
      href: "https://www.shopier.com/goldkozmos/49768634",
      price: "750 TL",
      cta: "Satın Al",
      buyHref: "https://www.shopier.com/goldkozmos/49768634",
    },
    {
      group: "dijital",
      title: "GoldRitüel",
      text: "Niyet ve farkındalık odağında uygulanabilir ritüeller.",
      image: publishedRituals()[0]?.image ?? "/images/services/tarot-farkindalik.webp",
      href: "/goldrituel",
      cta: "Detayları Gör",
    },
  ];

  return [...analiz, ...birebir, ...enerji, ...rezonans, ...dijital];
}

export const WORK_GROUPS: { id: WorkCard["group"]; title: string }[] = [
  { id: "analiz", title: "Analizler" },
  { id: "birebir", title: "Birebir" },
  { id: "enerji", title: "Enerji çalışmaları" },
  { id: "rezonans", title: "Rezonans" },
  { id: "dijital", title: "Dijital" },
];
