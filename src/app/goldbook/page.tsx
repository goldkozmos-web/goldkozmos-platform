"use client";

import GoldBookLibrary from "./LibraryView";
import "../../styles/home.css";

const books = [
  {
    number: "01",
    category: "KİŞİSEL DÖNÜŞÜM",
    title: "İçindeki Kozmosu Kucakla",
    description:
      "Özdeğer, sınırlar, sezgi, geçmişten taşınan kalıplar ve içsel özgürlük üzerine hazırlanmış dijital GoldBook.",
    image: "/goldbook/icindeki-kozmosu-kucakla-v2.webp",
    price: "300 TL",
    shopier:
      "https://www.shopier.com/goldkozmos/46435030",
    focus: [
      "Başkalarının yargılarından özgürleşmek",
      "Kendi değerini yeniden hatırlamak",
      "Sağlıklı sınırlar oluşturmak",
      "Sezgi ve teslimiyet alanını keşfetmek",
    ],
    info: [
      "90 sayfa · 20 bölüm",
      "5 ana kısım ve son söz",
      "Dijital kitap (PDF)",
      "Özge Batıgün imzalı",
    ],
  },
  {
    number: "02",
    category: "AŞK VE İLİŞKİLER",
    title: "Aşk Manifestosu",
    description:
      "Geçmiş ilişkiler, tekrar eden senaryolar, sınırlar, flört dinamikleri ve doğru ilişkiyi seçme üzerine hazırlanmış dijital GoldBook.",
    image: "/goldbook/ask-manifestosu-v2.webp",
    price: "300 TL",
    shopier:
      "https://www.shopier.com/goldkozmos/47631093",
    focus: [
      "Aşk ihtiyacını seçime taşımak",
      "Tekrarlayan ilişki döngülerini görmek",
      "Flörtte kendi merkezini korumak",
      "Gerçek ilgiyi ayırt etmek",
    ],
    info: [
      "104 sayfa · 20 bölüm",
      "6 ana kısım",
      "Dijital kitap (PDF)",
      "Özge Batıgün imzalı",
    ],
  },
  { number: "03", category: "ÖZDEĞER VE SINIRLAR", title: "Özdeğer ve Onay Bağımlılığı", description: "Onay ihtiyacını, insanları memnun etme alışkanlığını ve kendinle kurduğun ilişkiyi anlamaya odaklanan dijital mini rehber.", image: "/goldbook/ozdeger-ve-onay-bagimliligi.webp", price: "300 TL", shopier: "https://www.shopier.com/goldkozmos/52057877", focus: ["Özdeğer ve onay ihtiyacının kökleri", "İnsanları memnun etme alışkanlığı", "Hayır diyebilmek ve sağlıklı sınırlar", "Kendi ihtiyaçlarını ve iç sesini tanımak"], info: ["79 sayfa · 20 bölüm", "6 ana kısım", "Dijital kitap (PDF)", "Özge Batıgün imzalı"] },
];

export default function GoldBookPage() {
  return <GoldBookLibrary books={books} />;
}
