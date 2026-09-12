"use client";

import { useEffect, useRef, useState } from "react";
import FooterSection from "../components/FooterSection";
import HomeNavbar from "../components/HomeNavbar";
import PlatformRail from "../components/platform/PlatformRail";
import DailyActionCard from "../components/daily/DailyActionCard";
import {
  getEducationCourses,
  getEducationHubHref,
  getEducationPrimaryCta,
} from "../data/education";

type SocialPlatform =
  | "instagram"
  | "whatsapp"
  | "x"
  | "tiktok"
  | "youtube"
  | "spotify"
  | "threads";

const otherWorks = [
  {
    number: "01",
    title: "Tek Birebir Seans",
    text: "Belirli bir konuya odaklanan 90 dakikalık birebir görüşme.",
    image: "/images/services/birebir-seans.webp",
    href: "/calismalar/enerji-calismalari",
    cta: "Detayları Gör",
  },
  {
    number: "02",
    title: "5 Günlük Yoğun Paket",
    text: "Beş gün boyunca aynı konu üzerinde birebir ilerleyen yoğun çalışma.",
    image: "/images/services/5-gunluk-yogun-paket.webp",
    price: "5.000 TL",
    href: "/calismalar/birebir-seanslar",
  },
  {
    number: "03",
    title: "Tarot Farkındalık Okuması",
    text: "Kartların sembolik dili üzerinden mevcut durumuna farklı bir açıdan bak.",
    image: "/images/services/tarot-farkindalik.webp",
    price: "600 TL",
    href: "/calismalar/tarot",
  },
  {
    number: "04",
    title: "Numeroloji Analizi",
    text: "Doğum tarihi ve isim üzerinden kişisel eğilimlerini sembolik olarak incele.",
    image: "/images/services/numeroloji-analizi.webp",
    price: "350 TL",
    href: "/calismalar/numeroloji",
  },
];

const recordings = [
  {
    category: "CANLI YAYIN KAYDI",
    title: "7 Çakra Dengeleme Çalışması",
    text: "Daha önce canlı olarak gerçekleştirilen çalışmanın kayıtlı versiyonuna kendi zamanında eriş.",
    image: "/images/services/7-cakra-dengeleme-kaydi.webp",
    price: "750 TL",
    href: "https://www.shopier.com/goldkozmos/49768634",
  },
  {
    category: "KAYITLI GRUP ÇALIŞMASI",
    title: "8 Frekans Yüklemesi",
    text: "Aşk ve ilişkiden bolluğa, özdeğerden kariyere uzanan sekiz farklı yaşam alanına odaklanan kayıtlı grup çalışması.",
    image: "/images/services/8-frekans-yuklemesi-canli-kayit.webp",
    price: "300 TL",
    href: "https://www.shopier.com/goldkozmos/49930635",
  },
];

const audioEnergyProducts = [
  {
    category: "SES KAYDI · 7 ÇAKRA",
    title: "7 Çakranı Dengele",
    text: "Beden farkındalığını artırmak, içsel odağını toplamak ve yedi çakra sistemi üzerinden kendinle daha bilinçli bir bağ kurmak için hazırlanmış rehberli ses çalışması.",
    image: "/images/services/7-cakrani-dengele.webp",
    price: "450 TL",
    href: "https://www.shopier.com/goldkozmos/49861801",
  },
  {
    category: "SES KAYDI · DİŞİL & ERİL",
    title: "Dişil Eril Enerjini Dengele",
    text: "Alma, akış ve sezgiyle; hareket, sınır ve yön belirleme tarafların arasındaki ilişkiyi fark etmeye odaklanan yönlendirmeli ses çalışması.",
    image: "/images/services/disil-eril-enerjini-dengele.webp",
    price: "450 TL",
    href: "https://www.shopier.com/goldkozmos/49861773",
  },
  {
    category: "SES KAYDI · NİYET & ODAK",
    title: "Dileğini Rezonansla",
    text: "Niyetini netleştirmek, zihinsel dağınıklığı azaltmak ve odağını seçtiğin dilekle daha uyumlu hale getirmek için hazırlanmış rehberli ses kaydı.",
    image: "/images/services/dilegini-rezonansla.webp",
    price: "450 TL",
    href: "https://www.shopier.com/goldkozmos/49861708",
  },
  {
    category: "SES KAYDI · İÇSEL ÇOCUK",
    title: "İçsel Çocuk Şifası",
    text: "Geçmiş deneyimlerinin bugünkü duygu, ilişki ve davranışlarında bıraktığı izleri fark etmeye ve içindeki çocukla yeniden bağ kurmaya odaklanan 3 günlük çalışma.",
    image: "/images/services/icsel-cocuk-sifasi.webp",
    price: "450 TL",
    href: "https://www.shopier.com/goldkozmos/49861763",
  },
];

const books = [
  {
    title: "İçindeki Kozmosu Kucakla",
    text: "Kendini tanımak, iç dünyana dönmek ve kendi merkezini yeniden görmek üzerine.",
    image: "/goldbook/icindeki-kozmosu-kucakla.webp",
    price: "300 TL",
    href: "https://www.shopier.com/goldkozmos/46435030",
  },
  {
    title: "Aşk Manifestosu",
    text: "İlişkiler, seçimler ve sevgiyle kurduğumuz bağ üzerine bir GoldBook çalışması.",
    image: "/goldbook/ask-manifestosu.webp",
    price: "300 TL",
    href: "https://www.shopier.com/goldkozmos/47631093",
  },
];


const faqs = [
  {
    question: "Rezonans Atölyeleri online mı gerçekleşiyor?",
    answer:
      "Evet. Rezonans Atölyeleri Google Meet üzerinden çevrim içi olarak gerçekleştirilir.",
  },
  {
    question: "Hangi çalışmadan başlamalıyım?",
    answer:
      "Kendilik Rezonansı temel başlangıç alanıdır. Kendinle kurduğun ilişkiyi, özdeğerini, sınırlarını ve tekrar eden kişisel örüntülerini gördükten sonra İlişki veya Bolluk Rezonansı ile devam edebilirsin.",
  },
  {
    question: "Rezonans Atölyeleri kaç gün sürüyor?",
    answer:
      "Ana Rezonans Atölyeleri 5 günlük yapı üzerinden ilerler. Çalışmanın içeriğine göre oturumlar, PDF özetleri ve kişisel uygulamalar programa dahil edilebilir.",
  },
  {
    question: "Atölyelerde kayıt veya materyal veriliyor mu?",
    answer:
      "Çalışmaya göre PDF özetleri, ev çalışmaları veya destekleyici materyaller paylaşılabilir. İlgili çalışmanın sayfasında dahil olan içerikler ayrıca belirtilir.",
  },
  {
    question: "Birebir çalışma seçenekleri neler?",
    answer:
      "Belirli bir konuya odaklanan tek birebir seans veya aynı konu üzerinde birkaç gün boyunca ilerleyen yoğun birebir paket seçenekleri bulunur.",
  },
  {
    question: "Tek birebir seans nasıl ilerliyor?",
    answer:
      "Tek birebir seans, belirlediğin bir konuya odaklanan kişisel bir görüşmedir. Seansın amacı konuyu daha net görmek, tekrar eden örüntüleri fark etmek ve üzerinde çalışacağın alanı belirlemektir.",
  },
  {
    question: "5 günlük yoğun paket kimler için uygun?",
    answer:
      "Tek bir konuya daha yoğun şekilde odaklanmak ve birkaç gün boyunca aynı başlık üzerinde ilerlemek isteyenler için hazırlanmıştır.",
  },
  {
    question: "Tarot Farkındalık Okuması nedir?",
    answer:
      "Tarot Farkındalık Okuması, kartların sembolik dili üzerinden mevcut durumuna farklı bir açıdan bakmana yardımcı olan kişisel farkındalık çalışmasıdır. Kesin gelecek vaadi veya garanti sunmaz.",
  },
  {
    question: "Numeroloji Analizi nasıl hazırlanıyor?",
    answer:
      "Numeroloji Analizi doğum tarihi ve isim bilgileri üzerinden hazırlanır ve sembolik eğilimlerini inceleyen dijital bir analiz olarak sunulur.",
  },
  {
    question: "Canlı yayın kayıtlarına sonradan erişebilir miyim?",
    answer:
      "Satışa açılan geçmiş canlı çalışmalar, kayıtlı içerik olarak kendi zamanında izleyebileceğin veya dinleyebileceğin şekilde sunulur.",
  },
  {
    question: "Canlı kayıt ile ses kaydı arasındaki fark nedir?",
    answer:
      "Canlı kayıtlar daha önce grup halinde gerçekleştirilen çalışmaların kayıtlı versiyonlarıdır. Ses kayıtları ise baştan dijital dinleme deneyimi için hazırlanmış yönlendirmeli içeriklerdir.",
  },
  {
    question: "Ses kayıtlarını ne zaman dinleyebilirim?",
    answer:
      "Satın aldıktan ve erişim bilgilerini aldıktan sonra kaydı kendi zamanında dinleyebilirsin. Uygulama için sakin ve bölünmeyeceğin bir zaman seçmen önerilir.",
  },
  {
    question: "Ses kayıtları kaç kez dinlenebilir?",
    answer:
      "İlgili ürünün erişim koşulları izin verdiği sürece kaydı kendi ihtiyacına göre tekrar dinleyebilirsin. Ürüne özel farklı bir koşul varsa ürün açıklamasında ayrıca belirtilir.",
  },
  {
    question: "GoldFrekans nedir?",
    answer:
      "GoldFrekans, Goldkozmos’un ücretsiz doğa sesleri, meditasyon müzikleri ve frekans içeriklerini bir araya getiren YouTube dinleme kütüphanesidir.",
  },
  {
    question: "GoldCast içeriklerini nereden dinleyebilirim?",
    answer:
      "GoldCast bölümlerine web sitesindeki GoldCast sayfasından ulaşabilir; ilgili içeriği YouTube veya Spotify üzerinden açabilirsin.",
  },
  {
    question: "GoldBook içerikleri nasıl satın alınır?",
    answer:
      "GoldBook çalışmalarını ilgili ürün kartındaki Shopier bağlantısı üzerinden satın alabilirsin. Satın alım sonrası dijital ürün erişimi ürün koşullarına göre iletilir.",
  },
  {
    question: "Dijital ürünlerde teslimat nasıl gerçekleşiyor?",
    answer:
      "Dijital ürünlerde fiziksel kargo bulunmaz. Ürünün türüne göre dosya, kayıt veya erişim bilgileri dijital olarak iletilir.",
  },
  {
    question: "Satın almadan önce bana uygun çalışmayı nasıl seçebilirim?",
    answer:
      "Sitedeki ücretsiz test ve çalışma açıklamalarından yararlanabilirsin. Kararsız kaldığında içeriklerin kapsamını karşılaştırarak ihtiyacına en yakın alanı seçebilirsin.",
  },
  {
    question: "Goldkozmos çalışmaları terapi yerine geçer mi?",
    answer:
      "Hayır. Goldkozmos içerikleri ve çalışmaları kişisel farkındalık ve bireysel gelişim amacıyla hazırlanır; psikoterapi, psikolojik danışmanlık, tıbbi teşhis veya tedavi yerine geçmez.",
  },
  {
    question: "Yeni çalışmalar ve duyurulardan nasıl haberdar olabilirim?",
    answer:
      "Yeni çalışmalar, kayıtlar ve yayınlar için Goldkozmos’un Instagram, WhatsApp Kanalı, TikTok, X, Threads ve YouTube hesaplarını takip edebilirsin.",
  },
];

const socials: {
  name: string;
  platform: SocialPlatform;
  href: string;
}[] = [
  {
    name: "Instagram",
    platform: "instagram",
    href: "https://www.instagram.com/goldkozmos?igsh=ODF4aWx1bndreDhq",
  },
  {
    name: "WhatsApp",
    platform: "whatsapp",
    href: "https://whatsapp.com/channel/0029Vb8BNoHHwXbBIssG2k1s",
  },
  {
    name: "X",
    platform: "x",
    href: "https://x.com/GoldKozmos",
  },
  {
    name: "TikTok",
    platform: "tiktok",
    href: "https://www.tiktok.com/@goldkozmos?_r=1&_t=ZS-98oDGnytEMW",
  },
  {
    name: "YouTube",
    platform: "youtube",
    href: "https://youtube.com/@goldkozmos?si=CoqJse_HYvVsiYEG",
  },
  {
    name: "Spotify",
    platform: "spotify",
    href: "https://open.spotify.com/show/0343du5jxaHZOJhqDJZKYQ?si=4qrVCf4IR5aahfbJRafqFQ&utm_source=copy-link&sci=spotify%3Acard-config%3A0gITc0Z1bxNLhqcVDb3ngn",
  },
];


const followChannels: {
  name: string;
  handle: string;
  href: string;
  platform: SocialPlatform;
}[] = [
  {
    name: "TikTok",
    handle: "@goldkozmos",
    href: "https://www.tiktok.com/@goldkozmos?_r=1&_t=ZS-98y87m276cX",
    platform: "tiktok",
  },
  {
    name: "X",
    handle: "@GoldKozmos",
    href: "https://x.com/GoldKozmos",
    platform: "x",
  },
  {
    name: "Threads",
    handle: "@goldkozmos",
    href: "https://www.threads.com/@goldkozmos",
    platform: "threads",
  },
  {
    name: "YouTube",
    handle: "@goldkozmos",
    href: "https://youtube.com/@goldkozmos?si=Rna82s44awxWfnXt",
    platform: "youtube",
  },
];

function SocialIcon({
  platform,
  filled = false,
}: {
  platform: SocialPlatform;
  filled?: boolean;
}) {
  if (filled) {
    if (platform === "instagram") {
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <radialGradient id="gkIgGrad" cx="30%" cy="107%" r="150%">
              <stop offset="0%" stopColor="#fdf497" />
              <stop offset="45%" stopColor="#fd5949" />
              <stop offset="60%" stopColor="#d6249f" />
              <stop offset="90%" stopColor="#285AEB" />
            </radialGradient>
          </defs>
          <rect width="24" height="24" rx="6" fill="url(#gkIgGrad)" />
          <rect
            x="6.2"
            y="6.2"
            width="11.6"
            height="11.6"
            rx="3.4"
            fill="none"
            stroke="#fff"
            strokeWidth="1.7"
          />
          <circle
            cx="12"
            cy="12"
            r="2.85"
            fill="none"
            stroke="#fff"
            strokeWidth="1.7"
          />
          <circle cx="15.55" cy="8.45" r="0.95" fill="#fff" />
        </svg>
      );
    }

    if (platform === "whatsapp") {
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect width="24" height="24" rx="6" fill="#25D366" />
          <path
            fill="#fff"
            d="M12.04 5.2A6.8 6.8 0 0 0 5.25 12a6.76 6.76 0 0 0 1.02 3.58L5.4 18.8l3.12-.82A6.8 6.8 0 1 0 12.04 5.2zm3.94 9.62c-.17.47-.98.86-1.36.92-.35.05-.8.08-1.28-.08-.3-.1-.67-.22-1.16-.43-2.04-.88-3.38-2.95-3.48-3.09-.1-.14-.83-1.1-.83-2.1 0-1 .52-1.48.7-1.69.18-.2.4-.25.53-.25h.39c.13 0 .3-.05.46.35.17.41.57 1.4.62 1.5.05.1.08.22.02.36-.07.14-.1.22-.21.35-.1.12-.22.27-.31.36-.1.1-.21.22-.09.42.12.2.53.87 1.14 1.42.78.7 1.45.92 1.65 1.02.2.1.32.09.44-.06.12-.14.51-.6.65-.8.14-.2.28-.17.46-.1.18.07 1.16.55 1.36.65.2.1.34.15.39.23.05.08.05.49-.12.97z"
          />
        </svg>
      );
    }

    if (platform === "x") {
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect width="24" height="24" rx="6" fill="#000" />
          <path
            fill="#fff"
            d="M16.72 6.2h1.86L13.7 11.4 19.2 17.8h-4.04l-3.16-4.13-3.62 4.13H6.52l5.22-5.96L6.2 6.2h4.12l2.86 3.76 3.54-3.76zm-.64 10.5h1.03L8.5 7.25H7.4l8.68 9.45z"
          />
        </svg>
      );
    }

    if (platform === "tiktok") {
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect width="24" height="24" rx="6" fill="#000" />
          <path
            fill="#25F4EE"
            d="M14.05 6.15c.14 1.02.6 1.93 1.28 2.63.68.68 1.57 1.12 2.52 1.25v1.8c-.84-.03-1.66-.23-2.4-.58-.49-.23-.94-.53-1.35-.88v5.38c0 2.07-1.68 3.75-3.75 3.75S6.6 17.82 6.6 15.75c0-2.07 1.68-3.75 3.75-3.75.22 0 .43.02.63.06v1.9c-.2-.05-.41-.08-.63-.08-1.02 0-1.85.83-1.85 1.85s.83 1.85 1.85 1.85 1.85-.83 1.85-1.85V6.15h1.85z"
          />
          <path
            fill="#FE2C55"
            d="M13.45 6.55c.14 1.02.6 1.93 1.28 2.63.68.68 1.57 1.12 2.52 1.25v1.8c-.84-.03-1.66-.23-2.4-.58-.49-.23-.94-.53-1.35-.88v5.38c0 2.07-1.68 3.75-3.75 3.75S6 18.22 6 16.15c0-2.07 1.68-3.75 3.75-3.75.22 0 .43.02.63.06v1.9c-.2-.05-.41-.08-.63-.08-1.02 0-1.85.83-1.85 1.85s.83 1.85 1.85 1.85 1.85-.83 1.85-1.85V6.55h1.85z"
          />
          <path
            fill="#fff"
            d="M13.75 6.35c.14 1.02.6 1.93 1.28 2.63.68.68 1.57 1.12 2.52 1.25v1.8c-.84-.03-1.66-.23-2.4-.58-.49-.23-.94-.53-1.35-.88v5.38c0 2.07-1.68 3.75-3.75 3.75S6.3 18.02 6.3 15.95c0-2.07 1.68-3.75 3.75-3.75.22 0 .43.02.63.06v1.9c-.2-.05-.41-.08-.63-.08-1.02 0-1.85.83-1.85 1.85s.83 1.85 1.85 1.85 1.85-.83 1.85-1.85V6.35h1.85z"
          />
        </svg>
      );
    }

    if (platform === "youtube") {
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect width="24" height="24" rx="6" fill="#FF0000" />
          <path fill="#fff" d="M9.6 8v8l7.2-4z" />
        </svg>
      );
    }

    if (platform === "threads") {
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect width="24" height="24" rx="6" fill="#000" />
          <path
            fill="#fff"
            d="M15.72 8.28c-.58-1.06-1.72-1.66-3.32-1.66-2.78 0-4.62 2.04-4.62 5.4 0 3.3 1.8 5.3 4.66 5.3 1.72 0 3.02-.62 3.94-1.78l-1.22-1.06c-.66.78-1.54 1.2-2.66 1.2-1.84 0-2.97-1.24-2.97-3.68 0-2.48 1.13-3.7 2.9-3.7 1.26 0 2.14.64 2.42 1.84h-2.08v1.52h3.82c.04-.3.06-.58.06-.88 0-.84-.16-1.58-.5-2.22.42.08.82.2 1.22.32V7.72c-.5-.18-1.06-.32-1.65-.44z"
          />
        </svg>
      );
    }

    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.52 17.34c-.24.36-.66.48-1.02.24-2.82-1.74-6.36-2.1-10.56-1.14-.42.12-.78-.18-.9-.54-.12-.42.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.48.66.3 1.02zm1.44-3.3c-.3.42-.84.6-1.26.3-3.24-2.04-8.16-2.58-11.94-1.44-.48.12-.96-.18-1.08-.66-.12-.48.18-.96.66-1.08 4.38-1.32 9.78-.72 13.5 1.62.36.24.54.84.12 1.26zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.3c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.32 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.48-1.02.66-1.56.36z"
        />
      </svg>
    );
  }

  if (platform === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle
          cx="17.4"
          cy="6.8"
          r="1"
          className="socialIconFill"
        />
      </svg>
    );
  }

  if (platform === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.5 11.7a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.5-4.4a8.4 8.4 0 1 1 15.5-4.4Z" />
        <path d="M8.2 7.9c.3-.6.6-.6.9-.6h.5c.2 0 .4.1.5.4l.8 2c.1.3 0 .5-.1.7l-.6.8c-.2.2-.2.4 0 .7.6 1 1.4 1.8 2.3 2.4.3.2.5.2.7 0l.9-1c.2-.2.4-.3.7-.1l1.9.9c.3.1.4.3.4.5 0 .3-.2 1.4-.9 2-.7.6-1.6.8-2.6.5-1.1-.3-2.9-1-4.6-2.6-1.4-1.3-2.4-3-2.7-4.2-.4-1.3.1-2 .4-2.4Z" />
      </svg>
    );
  }

  if (platform === "x") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 4l14 16M19 4 5 20" />
      </svg>
    );
  }

  if (platform === "tiktok") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14 4v10.2a4.4 4.4 0 1 1-3.2-4.2" />
        <path d="M14 4c.6 2.5 2.2 4.1 4.7 4.6" />
      </svg>
    );
  }

  if (platform === "youtube") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="6" width="18" height="12" rx="4" />
        <path
          d="M10 9.2 15 12l-5 2.8Z"
          className="socialIconFill"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 10.2c2.7-.8 5.5-.7 8.2.4" />
      <path d="M8.8 13c2.2-.6 4.5-.5 6.6.3" />
      <path d="M9.7 15.5c1.6-.4 3.3-.3 4.8.3" />
    </svg>
  );
}


const homepageArchiveStyles = `
  /* SABİT WHATSAPP BUTONU */
  .homeV3FloatingWhatsapp {
    position: fixed;
    right: 24px;
    bottom: 92px;
    z-index: 99998;
    width: 56px;
    height: 56px;
    display: grid;
    place-items: center;
    border: 1.5px solid rgba(211, 168, 84, 0.70);
    border-radius: 50%;
    color: #d9ad58;
    background:
      linear-gradient(
        145deg,
        #21150f 0%,
        #120c09 100%
      );
    box-shadow:
      0 16px 34px rgba(18, 11, 7, 0.30),
      0 0 0 6px rgba(211, 168, 84, 0.07);
    text-decoration: none;
    transition:
      transform 180ms ease,
      box-shadow 180ms ease,
      border-color 180ms ease;
  }

  .homeV3FloatingWhatsapp:hover {
    transform: translateY(-3px) scale(1.03);
    border-color: rgba(224, 187, 105, 0.95);
    box-shadow:
      0 20px 40px rgba(18, 11, 7, 0.36),
      0 0 0 8px rgba(211, 168, 84, 0.09);
  }

  .homeV3FloatingWhatsapp svg {
    width: 26px;
    height: 26px;
    fill: currentColor;
  }

  .homeV3Page .siteGlobalBackToTop {
    border: 1.5px solid rgba(211, 168, 84, 0.70) !important;
    background:
      linear-gradient(
        145deg,
        #21150f 0%,
        #120c09 100%
      ) !important;
    color: #d9ad58 !important;
    box-shadow:
      0 16px 34px rgba(18, 11, 7, 0.30),
      0 0 0 6px rgba(211, 168, 84, 0.07) !important;
    transition:
      transform 180ms ease,
      box-shadow 180ms ease,
      border-color 180ms ease !important;
  }

  .homeV3Page .siteGlobalBackToTop:hover {
    transform: translateY(-3px) scale(1.03) !important;
    border-color: rgba(224, 187, 105, 0.95) !important;
    box-shadow:
      0 20px 40px rgba(18, 11, 7, 0.36),
      0 0 0 8px rgba(211, 168, 84, 0.09) !important;
  }

  .homeV3Page .siteGlobalBackToTop svg {
    width: 22px !important;
    height: 22px !important;
    display: block !important;
    fill: currentColor !important;
    stroke: none !important;
    transform: none !important;
  }

  .homeV3FloatingWhatsappLabel {
    position: absolute;
    right: 68px;
    top: 50%;
    transform: translateY(-50%);
    min-width: max-content;
    padding: 8px 11px;
    border: 1px solid rgba(211, 168, 84, 0.24);
    border-radius: 10px;
    color: #fffaf1;
    background: rgba(18, 12, 9, 0.94);
    box-shadow: 0 10px 24px rgba(18, 11, 7, 0.20);
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.03em;
    opacity: 0;
    pointer-events: none;
    transition: opacity 160ms ease, transform 160ms ease;
  }

  .homeV3FloatingWhatsapp:hover .homeV3FloatingWhatsappLabel {
    opacity: 1;
    transform: translateY(-50%) translateX(-2px);
  }

  @media (max-width: 700px) {
    .homeV3Page .homeV3FloatingWhatsapp,
    .homeV3FloatingWhatsapp {
      display: none !important;
      opacity: 0 !important;
      visibility: hidden !important;
      pointer-events: none !important;
    }

    .homeV3FloatingWhatsappLabel {
      display: none;
    }
  }


  /* NAVBAR · EKRANIN ÜSTÜNDE SABİT */
  @media (min-width: 901px) {
    .homeV3Page {
      padding-top: 58px !important;
    }

    .homeV3Page .homeV3Nav {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      z-index: 99999 !important;
      width: 100% !important;
      margin: 0 !important;
      box-shadow: 0 8px 24px rgba(21, 13, 8, 0.16) !important;
    }
  }



  /* HERO TANITIM VİDEOSU */
  .homeV3HeroVideoPortrait {
    position: relative;
    overflow: hidden;
    aspect-ratio: 496 / 368;
    background: #1b120d;
  }

  .homeV3HeroVideoCover {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    border: 0;
    cursor: pointer;
    overflow: hidden;
    background: #1b120d;
  }

  .homeV3HeroVideoCover img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 260ms ease, filter 260ms ease;
  }

  .homeV3HeroVideoCover::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(
        180deg,
        rgba(25, 16, 10, 0.03) 35%,
        rgba(25, 16, 10, 0.22) 100%
      );
    pointer-events: none;
  }

  .homeV3HeroVideoCover:hover img {
    transform: scale(1.012);
    filter: brightness(0.96);
  }

  .homeV3HeroPlayButton {
    position: absolute;
    z-index: 3;
    top: 16px;
    right: 16px;
    width: 46px;
    height: 46px;
    display: grid;
    place-items: center;
    padding-left: 3px;
    border: 1px solid rgba(211, 168, 84, 0.46);
    border-radius: 12px;
    color: #d9ad58;
    background: rgba(10, 8, 7, 0.96);
    box-shadow:
      0 12px 28px rgba(0, 0, 0, 0.34),
      inset 0 0 0 1px rgba(255, 255, 255, 0.02);
    font-size: 14px;
    transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
  }

  .homeV3HeroVideoCover:hover .homeV3HeroPlayButton {
    transform: translateY(-1px);
    border-color: rgba(211, 168, 84, 0.72);
    box-shadow:
      0 16px 34px rgba(0, 0, 0, 0.40),
      inset 0 0 0 1px rgba(255, 255, 255, 0.03);
  }

  .homeV3HeroPlayLabel {
    position: absolute;
    z-index: 3;
    top: 16px;
    right: 70px;
    min-height: 46px;
    padding: 0 13px;
    border: 1px solid rgba(211, 168, 84, 0.28);
    border-radius: 12px;
    display: flex;
    align-items: center;
    color: #fffaf1;
    background: rgba(10, 8, 7, 0.96);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.28);
    white-space: nowrap;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.04em;
  }

  .homeV3HeroVideoPortrait .homeV3HeroVideo {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 100%;
    object-fit: cover;
    object-position: center;
    background: #1b120d;
  }

  .homeV3HeroVideoPortrait .homeV3HeroIdentityBar {
    z-index: 4;
  }

  .homeV3HeroVideoPortrait .homeV3HeroIdentityBar > span {
    font-size: 10px !important;
    line-height: 1.2 !important;
    letter-spacing: 0.02em !important;
    color: rgba(255, 250, 241, 0.92) !important;
    font-weight: 600 !important;
  }

  .homeV3HeroVideoPortrait .homeV3HeroIdentityBar > strong {
    font-size: 12px !important;
  }

  .homeV3HeroVideoModal {
    position: fixed;
    inset: 0;
    z-index: 100000;
    display: grid;
    place-items: center;
    padding: 22px;
    background: rgba(12, 8, 6, 0.82);
    backdrop-filter: blur(10px);
  }

  .homeV3HeroVideoModalInner {
    position: relative;
    width: min(920px, 100%);
  }

  .homeV3HeroVideoModalInner video {
    display: block;
    width: 100%;
    max-height: 78vh;
    border-radius: 16px;
    background: #000;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
  }

  .homeV3HeroVideoModalClose {
    position: absolute;
    top: -42px;
    right: 0;
    width: 36px;
    height: 36px;
    border: 1px solid rgba(232, 196, 118, 0.4);
    border-radius: 50%;
    color: #f6e6c8;
    background: rgba(28, 18, 12, 0.9);
    cursor: pointer;
    font-size: 22px;
    line-height: 1;
  }

  /* 3 ANA REZONANS · ORTALI BAŞLIK */
  .homeV3Page .homeV3Resonance .homeV3SectionHeading {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
    gap: 10px !important;
    margin-bottom: 28px !important;
  }

  .homeV3Page .homeV3Resonance .homeV3SectionHeading h2 {
    font-size: clamp(34px, 3.6vw, 50px) !important;
  }

  .homeV3Page .homeV3Resonance .homeV3SectionHeading > p {
    max-width: 420px !important;
    margin: 0 auto !important;
  }

  .homeV3Page .homeV3ResonanceCard {
    box-shadow:
      0 6px 16px rgba(63, 42, 20, 0.06) !important;
    transition:
      transform 180ms ease,
      box-shadow 180ms ease !important;
  }

  .homeV3Page .homeV3ResonanceCard:hover {
    transform: translateY(-2px);
    box-shadow:
      0 8px 18px rgba(63, 42, 20, 0.08) !important;
  }

  .homeV3Page .homeV3Resonance {
    padding-bottom: 24px !important;
  }

  .homeV3Page .homeV3Other {
    padding-top: 36px !important;
    padding-bottom: 40px !important;
    border-top: none !important;
    background: #211812 !important;
  }

  .homeV3Page .homeV3PersonalHub {
    grid-template-columns: minmax(0, 1fr) !important;
  }

  .homeV3Page .homeV3PersonalLeft {
    width: 100% !important;
    min-width: 0;
    transform: none !important;
  }

  .homeV3Page .homeV3PersonalLeft::before {
    display: none !important;
  }

  .homeV3Page .homeV3Other .homeV3PersonalHeading {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    width: 100% !important;
    text-align: center !important;
    gap: 10px !important;
    margin: 0 auto 28px !important;
  }

  .homeV3Page .homeV3Other .homeV3PersonalHeading .homeV3Eyebrow,
  .homeV3Page .homeV3Other .homeV3PersonalHeading h2,
  .homeV3Page .homeV3Other .homeV3PersonalDescription {
    text-align: center !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }

  .homeV3Page .homeV3Other .homeV3PersonalHeading .homeV3Eyebrow {
    color: #cda354 !important;
  }

  .homeV3Page .homeV3PersonalHeading h2 {
    color: #fff8ed !important;
    font-size: clamp(34px, 3.6vw, 50px) !important;
  }

  .homeV3Page .homeV3PersonalHeading h2 span {
    color: #d2a654 !important;
  }

  .homeV3Page .homeV3PersonalDescription {
    max-width: 420px !important;
    color: rgba(255, 246, 230, 0.62) !important;
  }

  .homeV3Page .homeV3Other .homeV3OtherSlider {
    display: flex !important;
    flex-wrap: nowrap !important;
    grid-template-columns: none !important;
    grid-auto-flow: column !important;
    grid-auto-columns: unset !important;
    gap: 12px !important;
    overflow-x: auto !important;
    overflow-y: hidden !important;
    width: 100% !important;
    max-width: 100% !important;
    margin: 0 !important;
    padding: 0 16px 12px !important;
    scroll-snap-type: x mandatory !important;
    -webkit-overflow-scrolling: touch !important;
    scrollbar-width: none !important;
  }

  .homeV3Page .homeV3Other .homeV3OtherSlider::-webkit-scrollbar {
    display: none !important;
  }

  .homeV3Page .homeV3Other .homeV3OtherSlider .homeV3OtherCard {
    flex: 0 0 min(70vw, 260px) !important;
    min-width: min(70vw, 260px) !important;
    width: min(70vw, 260px) !important;
    max-width: min(70vw, 260px) !important;
    scroll-snap-align: start !important;
    display: flex !important;
    flex-direction: column !important;
    background: #fff !important;
    border: 1px solid rgba(151, 113, 49, 0.14) !important;
    border-radius: 20px !important;
    overflow: hidden !important;
    box-shadow: 0 4px 12px rgba(63, 42, 20, 0.05) !important;
  }

  .homeV3Page .homeV3Other .homeV3OtherVisual {
    aspect-ratio: 1 / 1 !important;
    height: auto !important;
    min-height: 0 !important;
    border-radius: 0 !important;
    background: #17130f !important;
  }

  .homeV3Page .homeV3Other .homeV3OtherVisual img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    border-radius: 0 !important;
  }

  .homeV3Page .homeV3OtherContent {
    display: flex !important;
    flex-direction: column !important;
    gap: 8px !important;
    padding: 18px 19px 17px !important;
  }

  .homeV3Page .homeV3OtherCardBottom {
    display: flex !important;
    align-items: center !important;
    justify-content: flex-end !important;
    margin-top: auto !important;
    padding-top: 17px !important;
    border-top: 1px solid rgba(151, 113, 49, 0.11) !important;
  }

  .homeV3Page .homeV3OtherCardCta {
    display: inline-flex !important;
    align-items: center !important;
    gap: 9px !important;
    color: #98732f !important;
    font-size: 11px !important;
    font-weight: 700 !important;
  }

  .homeV3Page .homeV3OtherSliderControls,
  .homeV3Page .homeV3OtherScrollHint {
    display: none !important;
  }

  @media (max-width: 700px) {
    .homeV3Page .homeV3OtherSlider {
      display: flex !important;
      grid-template-columns: none !important;
      width: 100% !important;
      max-width: 100% !important;
      padding: 0 16px 12px !important;
      box-sizing: border-box !important;
    }

    .homeV3Page .homeV3ResonanceCard {
      flex: 0 0 min(70vw, 260px) !important;
      width: min(70vw, 260px) !important;
      max-width: 260px !important;
      box-shadow: 0 4px 12px rgba(63, 42, 20, 0.05) !important;
    }

    .homeV3Page .homeV3Resonance .homeV3SectionHeading,
    .homeV3Page .homeV3Other .homeV3PersonalHeading,
    .homeV3Page .homeV3LiveArchiveHeading,
    .homeV3Page .homeV3AudioEnergyHeading {
      padding: 0 16px !important;
      box-sizing: border-box !important;
      max-width: 100% !important;
      min-width: 0 !important;
      margin-left: auto !important;
      margin-right: auto !important;
    }

    .homeV3Page .homeV3Resonance .homeV3SectionHeading h2,
    .homeV3Page .homeV3PersonalHeading h2,
    .homeV3Page .homeV3LiveArchiveHeading h2,
    .homeV3Page .homeV3AudioEnergyHeading h2 {
      width: 100% !important;
      max-width: 100% !important;
      min-width: 0 !important;
      font-size: 28px !important;
      line-height: 1.12 !important;
      letter-spacing: -0.6px !important;
      white-space: normal !important;
      overflow-wrap: anywhere !important;
      word-break: break-word !important;
    }

    .homeV3Page .homeV3Resonance .homeV3SectionHeading > p,
    .homeV3Page .homeV3PersonalDescription,
    .homeV3Page .homeV3LiveArchiveHeading > p,
    .homeV3Page .homeV3AudioEnergyHeading > p {
      width: 100% !important;
      max-width: 100% !important;
      font-size: 12px !important;
      line-height: 1.5 !important;
      padding: 0 !important;
    }

    .homeV3Page .homeV3LiveArchiveInner {
      width: 100% !important;
      max-width: 100% !important;
      padding: 0 !important;
    }

    .homeV3Page .homeV3LiveArchiveHeading > div {
      width: 100% !important;
      max-width: 100% !important;
      min-width: 0 !important;
    }

    .homeV3Page .homeV3LiveArchive {
      padding: 36px 0 40px !important;
    }

    .homeV3Page .homeV3OtherContent,
    .homeV3Page .homeV3LiveArchiveBody {
      min-width: 0 !important;
      padding: 14px 12px 12px !important;
    }

    .homeV3Page .homeV3OtherContent h3,
    .homeV3Page .homeV3LiveArchiveBody h3 {
      font-size: 16px !important;
      line-height: 1.2 !important;
      white-space: normal !important;
      overflow-wrap: anywhere !important;
    }

    .homeV3Page .homeV3OtherContent p,
    .homeV3Page .homeV3LiveArchiveText {
      min-height: 0 !important;
      font-size: 11px !important;
      white-space: normal !important;
    }

    .homeV3Page .homeV3OtherCardBottom,
    .homeV3Page .homeV3LiveArchiveBottom {
      gap: 8px !important;
      flex-wrap: wrap !important;
      justify-content: flex-end !important;
    }

    .homeV3Page .homeV3OtherCardCta,
    .homeV3Page .homeV3LiveArchiveBottom a {
      font-size: 11px !important;
    }
  }

  /* CANLI KAYITLAR */
  .homeV3LiveArchive {
    padding: 82px 0 88px;
    background:
      radial-gradient(circle at 90% 8%, rgba(177, 128, 43, 0.09), transparent 27%),
      linear-gradient(180deg, #fbf8f1 0%, #f5eee3 100%);
  }

  .homeV3LiveArchiveInner {
    width: min(1180px, calc(100% - 32px));
    margin: 0 auto;
    min-width: 0;
  }

  .homeV3LiveArchiveHeading {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
    gap: 10px !important;
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    margin: 0 auto 24px !important;
    box-sizing: border-box;
  }

  .homeV3LiveArchiveHeading > div {
    width: 100%;
    max-width: 100%;
    min-width: 0;
  }

  .homeV3LiveArchiveHeading .homeV3Eyebrow {
    margin-bottom: 0 !important;
  }

  .homeV3LiveArchiveHeading h2 {
    margin: 0 auto !important;
    color: #211811;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(32px, 3.4vw, 48px) !important;
    font-weight: 400;
    line-height: 1.12;
    letter-spacing: -0.04em;
    text-align: center !important;
    white-space: normal !important;
    overflow-wrap: break-word;
    max-width: 100%;
    min-width: 0;
  }

  .homeV3LiveArchiveHeading h2 span {
    display: inline;
    color: #a8792a;
  }

  .homeV3LiveArchiveHeading > p {
    margin: 0 auto !important;
    max-width: 420px !important;
    color: #75695e;
    font-size: 13px;
    line-height: 1.7;
    text-align: center !important;
  }

  .homeV3Page .homeV3LiveArchiveGrid {
    display: flex !important;
    grid-template-columns: none !important;
    flex-wrap: nowrap !important;
    gap: 12px !important;
    overflow-x: auto !important;
    overflow-y: hidden !important;
    padding: 10px 20px 16px !important;
    scroll-snap-type: x mandatory !important;
    -webkit-overflow-scrolling: touch !important;
    scrollbar-width: none !important;
  }

  .homeV3Page .homeV3LiveArchiveGrid::-webkit-scrollbar {
    display: none !important;
  }

  .homeV3Page .homeV3LiveArchiveCard {
    flex: 0 0 min(70vw, 260px) !important;
    width: min(70vw, 260px) !important;
    max-width: 260px !important;
    overflow: hidden !important;
    border: 1px solid rgba(151, 113, 49, 0.14) !important;
    border-radius: 20px !important;
    background: #fff !important;
    scroll-snap-align: start !important;
    box-shadow: 0 4px 12px rgba(63, 42, 20, 0.05) !important;
    transition:
      transform 180ms ease,
      box-shadow 180ms ease !important;
  }

  .homeV3Page .homeV3LiveArchiveCard:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 18px rgba(63, 42, 20, 0.08) !important;
  }

  .homeV3LiveArchiveImage {
    position: relative;
    display: block;
    aspect-ratio: 1 / 1 !important;
    overflow: hidden;
    background: #17130f;
  }

  .homeV3LiveArchiveImage img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .homeV3LiveArchivePlay {
    position: absolute;
    right: 16px;
    bottom: 16px;
    width: 44px;
    height: 44px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    color: #23170f;
    background: linear-gradient(135deg, #b98631, #dfba66);
    box-shadow: 0 10px 24px rgba(29, 18, 8, 0.22);
    font-size: 11px;
  }

  .homeV3LiveArchiveBody {
    padding: 20px 20px 18px;
  }

  .homeV3LiveArchiveBody > p {
    margin: 0 0 8px;
    color: #9e742c;
    letter-spacing: 0.15em;
    font-size: 8px;
    font-weight: 700;
  }

  .homeV3LiveArchiveBody h3 {
    margin: 0;
    color: #251a12;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.04;
  }

  .homeV3LiveArchiveText {
    min-height: 58px;
    margin-top: 11px;
    color: #766b60;
    font-size: 11.5px;
    line-height: 1.55;
  }

  .homeV3LiveArchiveBottom {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 18px;
    margin-top: 18px;
    padding-top: 15px;
    border-top: 1px solid rgba(151, 113, 49, 0.11);
  }

  .homeV3LiveArchiveBottom a {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    color: #8d6526;
    text-decoration: none;
    font-size: 10px;
    font-weight: 700;
  }

  .homeV3LiveArchiveFuture {
    min-height: 100%;
    padding: 26px;
    border: 1px dashed rgba(157, 114, 42, 0.25);
    border-radius: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    color: #8c6a36;
    background: rgba(255, 253, 249, 0.48);
    text-align: center;
    font-size: 12px;
    line-height: 1.55;
  }

  .homeV3LiveArchiveFuture span {
    color: #b58231;
  }

  /* SES KAYDI / ENERJİ ÇALIŞMALARI */
  .homeV3AudioEnergy {
    padding: 78px 0 16px;
    overflow: hidden;
    background: #211812;
  }

  .homeV3AudioEnergyInner {
    width: min(1180px, calc(100% - 72px));
    margin: 0 auto;
  }

  .homeV3AudioEnergyHeading {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
    gap: 10px !important;
    width: 100% !important;
    max-width: 100% !important;
    margin: 0 auto 24px !important;
  }

  .homeV3AudioEnergyHeading > div {
    width: 100%;
    max-width: 100%;
    text-align: center;
  }

  .homeV3AudioEnergyHeading .homeV3Eyebrow {
    color: #cda354;
    margin-bottom: 0 !important;
    text-align: center !important;
  }

  .homeV3AudioEnergyHeading h2 {
    margin: 0 auto !important;
    color: #fff8ed;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(32px, 3.4vw, 48px);
    font-weight: 400;
    line-height: 1.12;
    letter-spacing: -0.04em;
    text-align: center !important;
    max-width: 100%;
    white-space: normal;
  }

  .homeV3AudioEnergyHeading h2 span {
    color: #d2a654;
  }

  .homeV3AudioEnergyHeading > p {
    margin: 0 auto !important;
    max-width: 440px;
    color: rgba(255, 246, 230, 0.62);
    font-size: 13px;
    line-height: 1.7;
    text-align: center !important;
  }

  .homeV3AudioEnergyGrid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 16px;
    padding-top: 8px;
  }

  .homeV3AudioEnergyProduct {
    min-width: 0;
    overflow: hidden;
    border: 2px solid rgba(205, 158, 70, 0.68);
    border-radius: 24px;
    background:
      radial-gradient(circle at 92% 8%, rgba(203, 157, 72, 0.11), transparent 31%),
      linear-gradient(145deg, #2b1d13 0%, #19110c 100%);
    box-shadow:
      0 22px 48px rgba(0, 0, 0, 0.22),
      0 7px 18px rgba(0, 0, 0, 0.10);
    transition: transform 0.28s ease;
  }

  .homeV3Page .homeV3AudioEnergyProduct {
    flex: 0 0 min(70vw, 240px) !important;
    width: min(70vw, 240px) !important;
    max-width: 240px !important;
    transition: transform 0.28s ease !important;
  }

  .homeV3Page .homeV3AudioEnergyProduct:hover {
    transform: translateY(-6px) !important;
  }

  .homeV3Page .homeV3LibraryHeading {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
    gap: 10px !important;
    min-height: 0 !important;
    margin: 0 auto 16px !important;
    padding: 0 16px !important;
    box-sizing: border-box !important;
  }

  .homeV3Page .homeV3LibraryHeading .homeV3Eyebrow,
  .homeV3Page .homeV3LibraryShowcase .homeV3LibraryHeading .homeV3Eyebrow {
    color: #6b4a1e !important;
  }

  .homeV3Page .homeV3LibraryShowcase {
    display: block !important;
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
  }

  .homeV3Page .homeV3LibraryShowcase::before {
    display: none !important;
  }

  .homeV3Page .homeV3LibraryHub {
    background: #fffdf8 !important;
    padding: 8px 0 36px !important;
  }

  .homeV3Page .homeV3LibraryHeading h2 {
    max-width: 100% !important;
    color: #211811 !important;
    font-size: clamp(30px, 6.4vw, 44px) !important;
    font-weight: 400 !important;
    line-height: 1.12 !important;
    letter-spacing: -0.03em !important;
    text-align: center !important;
    -webkit-font-smoothing: antialiased !important;
    text-rendering: geometricPrecision !important;
  }

  .homeV3Page .homeV3LibraryHeading h2 span {
    color: #a8792a !important;
  }

  .homeV3Page .homeV3LibraryAll,
  .homeV3Page .homeV3LibraryShowcase .homeV3LibraryAll {
    margin: 0 auto !important;
    font-size: 12px !important;
    color: #6b4a1e !important;
  }

  .homeV3Page .homeV3LibraryBooksGrid {
    display: flex !important;
    grid-template-columns: none !important;
    flex-wrap: nowrap !important;
    gap: 12px !important;
    overflow-x: auto !important;
    padding: 10px 16px 14px !important;
    scroll-snap-type: x mandatory !important;
    scrollbar-width: none !important;
  }

  .homeV3Page .homeV3LibraryBooksGrid::-webkit-scrollbar {
    display: none !important;
  }

  .homeV3Page .homeV3BookCard,
  .homeV3Page .homeV3LibraryHub .homeV3BookCard {
    flex: 0 0 min(70vw, 240px) !important;
    width: min(70vw, 240px) !important;
    max-width: 240px !important;
    min-height: 0 !important;
    display: flex !important;
    flex-direction: column !important;
    grid-template-columns: none !important;
    gap: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
    border-radius: 18px !important;
    background: #ffffff !important;
    box-shadow: none !important;
    scroll-snap-align: start !important;
    transition: transform 0.28s ease !important;
  }

  .homeV3Page .homeV3LibraryShowcase .homeV3BookCard {
    background: #ffffff !important;
    box-shadow: none !important;
  }

  .homeV3Page .homeV3BookCard:hover,
  .homeV3Page .homeV3LibraryHub .homeV3BookCard:hover,
  .homeV3Page .homeV3LibraryShowcase .homeV3BookCard:hover {
    transform: translateY(-6px) !important;
  }

  .homeV3Page .homeV3BookImage,
  .homeV3Page .homeV3LibraryHub .homeV3BookImage {
    width: 100% !important;
    min-height: 0 !important;
    max-height: none !important;
    aspect-ratio: 1 / 1 !important;
    height: auto !important;
  }

  .homeV3Page .homeV3BookImage img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
  }

  .homeV3Page .homeV3BookContent {
    padding: 12px 13px 13px !important;
  }

  .homeV3Page .homeV3BookContent h3 {
    font-size: 16px !important;
    font-weight: 400 !important;
    line-height: 1.2 !important;
    -webkit-font-smoothing: antialiased !important;
    text-rendering: geometricPrecision !important;
  }

  .homeV3Page .homeV3BookContent p {
    font-size: 12px !important;
    line-height: 1.45 !important;
    color: #5c534a !important;
  }

  .homeV3Page .homeV3BookBottom strong {
    font-size: 16px !important;
  }

  .homeV3Page .homeV3BookBottom a {
    font-size: 11px !important;
  }

  .homeV3AudioEnergyImage {
    position: relative;
    display: block;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    background: #f6eee2;
    border-bottom: 1px solid rgba(205, 158, 70, 0.34);
  }

  .homeV3AudioEnergyImage img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .homeV3AudioEnergyPlay {
    position: absolute;
    right: 14px;
    bottom: 14px;
    width: 42px;
    height: 42px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    color: #25170e;
    background: linear-gradient(135deg, #b98531, #dfba68);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.22);
    font-size: 10px;
  }

  .homeV3AudioEnergyBody {
    padding: 18px 17px 17px;
  }

  .homeV3AudioEnergyCategory {
    margin: 0 0 8px;
    color: #c99a47;
    letter-spacing: 0.14em;
    font-size: 7.5px;
    font-weight: 700;
    line-height: 1.35;
  }

  .homeV3AudioEnergyProduct h3 {
    min-height: 52px;
    margin: 0;
    color: #fffaf1;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 22px;
    font-weight: 400;
    line-height: 1.04;
    letter-spacing: -0.45px;
  }

  .homeV3AudioEnergyText {
    min-height: 90px;
    margin-top: 11px;
    color: rgba(255, 250, 241, 0.60);
    font-size: 10.5px;
    line-height: 1.55;
  }

  .homeV3AudioEnergyBottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    margin-top: 16px;
    padding-top: 14px;
    border-top: 1px solid rgba(214, 173, 97, 0.15);
  }

  .homeV3AudioEnergyBottom strong {
    color: #d7aa55;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 18px;
    font-weight: 400;
  }

  .homeV3AudioEnergyBottom a {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: #d7aa55;
    text-decoration: none;
    font-size: 9.5px;
    font-weight: 700;
  }



  /* BAĞLANTIDA KAL · GOLD BOOK'TAN BAĞIMSIZ */
  .homeV3Page .homeV3Connect {
    background: #211812 !important;
    padding: 48px 0 64px !important;
    overflow: hidden !important;
  }

  .homeV3Page .homeV3Connect .homeV3Container {
    width: min(1180px, calc(100% - 48px)) !important;
  }

  .homeV3Page .homeV3Connect .homeV3PhoneZoneHeading {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
    max-width: 520px !important;
    margin: 0 auto 32px !important;
    padding: 0 !important;
  }

  .homeV3Page .homeV3Connect .homeV3PhoneZoneHeading .homeV3Eyebrow {
    color: #cda354 !important;
    font-size: 11px !important;
    letter-spacing: 0.18em !important;
    margin: 0 0 10px !important;
  }

  .homeV3Page .homeV3Connect .homeV3PhoneZoneHeading h2 {
    max-width: none !important;
    margin: 0 !important;
    color: #fff8ed !important;
    font-family: Georgia, "Times New Roman", serif !important;
    font-size: clamp(32px, 6vw, 46px) !important;
    font-weight: 400 !important;
    line-height: 1.12 !important;
    letter-spacing: -0.03em !important;
    text-align: center !important;
  }

  .homeV3Page .homeV3Connect .homeV3PhoneZoneHeading h2 span {
    color: #d2a654 !important;
  }

  .homeV3Page .homeV3Connect .homeV3PhoneZoneHeading > p:last-child {
    max-width: 420px !important;
    margin: 12px auto 0 !important;
    color: rgba(255, 246, 230, 0.62) !important;
    font-size: 14px !important;
    line-height: 1.65 !important;
    text-align: center !important;
  }

  .homeV3Page .homeV3Connect .homeV3PhonePair {
    display: flex !important;
    grid-template-columns: none !important;
    flex-wrap: nowrap !important;
    gap: 16px !important;
    align-items: stretch !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 8px 4px 18px !important;
    overflow-x: auto !important;
    overflow-y: hidden !important;
    scroll-snap-type: x mandatory !important;
    scrollbar-width: none !important;
  }

  .homeV3Page .homeV3Connect .homeV3PhonePair::-webkit-scrollbar {
    display: none !important;
  }

  .homeV3Page .homeV3Connect .homeV3SocialPhone {
    flex: 0 0 min(72vw, 280px) !important;
    width: min(72vw, 280px) !important;
    max-width: min(72vw, 280px) !important;
    min-width: min(72vw, 280px) !important;
    display: flex !important;
    flex-direction: column !important;
    scroll-snap-align: start !important;
  }

  .homeV3Page .homeV3Connect .homeV3PhoneFrame {
    width: 100% !important;
    max-width: none !important;
    height: 430px !important;
    min-height: 430px !important;
    max-height: 430px !important;
    padding: 8px !important;
    display: flex !important;
    flex-direction: column !important;
    border: 1px solid rgba(222, 180, 93, 0.24) !important;
    border-radius: 34px !important;
    background: linear-gradient(160deg, #1a1410 0%, #0d0a08 100%) !important;
    box-shadow: none !important;
    box-sizing: border-box !important;
    transition: transform 0.28s ease !important;
  }

  .homeV3Page .homeV3Connect .homeV3SocialPhone:hover .homeV3PhoneFrame {
    transform: translateY(-6px) !important;
    box-shadow: none !important;
  }

  .homeV3Page .homeV3Connect .homeV3PhoneScreen,
  .homeV3Page .homeV3Connect .homeV3InstagramPhone .homeV3PhoneScreen,
  .homeV3Page .homeV3Connect .homeV3WhatsappPhone .homeV3PhoneScreen {
    flex: 1 !important;
    min-height: 0 !important;
    height: 100% !important;
    padding: 16px 14px 14px !important;
    border-radius: 26px !important;
    display: flex !important;
    flex-direction: column !important;
    color: #211811 !important;
    background: #fffdf8 !important;
    box-sizing: border-box !important;
    overflow: hidden !important;
  }

  .homeV3Page .homeV3Connect .homeV3PhoneAppIcon {
    width: 28px !important;
    height: 28px !important;
    padding: 0 !important;
    border: none !important;
    border-radius: 7px !important;
    overflow: hidden !important;
    color: inherit !important;
    background: transparent !important;
  }

  .homeV3Page .homeV3Connect .homeV3PhoneAppIcon svg {
    width: 28px !important;
    height: 28px !important;
    display: block !important;
    fill: unset !important;
    stroke: unset !important;
    stroke-width: unset !important;
  }

  .homeV3Page .homeV3Connect .homeV3WhatsappPhoneHero {
    border-color: rgba(107, 74, 30, 0.12) !important;
  }

  .homeV3Page .homeV3Connect .homeV3WhatsappPhoneHero > span {
    color: #a8792a !important;
  }

  .homeV3Page .homeV3Connect .homeV3WhatsappPhoneHero h3 {
    color: #211811 !important;
  }

  .homeV3Page .homeV3Connect .homeV3WhatsappPhoneHero h3 strong {
    color: #a8792a !important;
  }

  .homeV3Page .homeV3Connect .homeV3WhatsappPhoneHero p {
    color: rgba(33, 24, 17, 0.58) !important;
  }

  .homeV3Page .homeV3Connect .homeV3WhatsappPhoneItems > div {
    border-bottom-color: rgba(107, 74, 30, 0.10) !important;
  }

  .homeV3Page .homeV3Connect .homeV3WhatsappPhoneItems > div > span {
    color: #a8792a !important;
    border-color: rgba(168, 121, 42, 0.28) !important;
  }

  .homeV3Page .homeV3Connect .homeV3WhatsappPhoneItems p {
    color: rgba(33, 24, 17, 0.72) !important;
  }

  .homeV3Page .homeV3Connect .homeV3PhoneCta {
    margin-top: auto !important;
    min-height: 36px !important;
    padding: 0 14px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    border: none !important;
    border-radius: 999px !important;
    background: linear-gradient(120deg, #c8953d 0%, #e0bb69 100%) !important;
    color: #211811 !important;
    font-size: 11px !important;
    font-weight: 700 !important;
    letter-spacing: 0.02em !important;
  }

  .homeV3Page .homeV3Connect .homeV3PhoneLabel {
    margin-top: 14px !important;
    color: #d4a753 !important;
    font-size: 12px !important;
    letter-spacing: 0.12em !important;
    text-transform: uppercase !important;
    text-align: center !important;
  }

  .homeV3Page .homeV3Connect .homeV3FollowChannels {
    width: 100% !important;
    max-width: none !important;
    margin: 28px auto 0 !important;
    padding-top: 28px !important;
    border-top: 1px solid rgba(210, 166, 82, 0.16) !important;
    overflow: hidden !important;
  }

  .homeV3Page .homeV3Connect .homeV3FollowChannelsTitle {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    gap: 6px !important;
    margin: 0 0 16px !important;
    text-align: center !important;
  }

  .homeV3Page .homeV3Connect .homeV3FollowChannelsTitle span {
    color: #c99a47 !important;
    letter-spacing: 0.18em !important;
    font-size: 11px !important;
    font-weight: 700 !important;
  }

  .homeV3Page .homeV3Connect .homeV3FollowChannelsTitle p {
    margin: 0 !important;
    color: rgba(255, 250, 241, 0.52) !important;
    font-size: 13px !important;
  }

  .homeV3Page .homeV3Connect .homeV3FollowChannelsGrid {
    display: flex !important;
    grid-template-columns: none !important;
    flex-wrap: nowrap !important;
    gap: 10px !important;
    overflow-x: auto !important;
    overflow-y: hidden !important;
    padding: 8px 4px 6px !important;
    scroll-snap-type: x mandatory !important;
    scrollbar-width: none !important;
  }

  .homeV3Page .homeV3Connect .homeV3FollowChannelsGrid::-webkit-scrollbar {
    display: none !important;
  }

  .homeV3Page .homeV3Connect .homeV3FollowChannel {
    flex: 0 0 220px !important;
    width: 220px !important;
    min-width: 220px !important;
    min-height: 64px !important;
    padding: 0 14px !important;
    border: 1px solid rgba(151, 104, 28, 0.34) !important;
    border-radius: 16px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    gap: 12px !important;
    color: #2a1b12 !important;
    background: linear-gradient(120deg, #c8953d 0%, #e0bb69 100%) !important;
    box-shadow: none !important;
    text-decoration: none !important;
    scroll-snap-align: start !important;
    transition: transform 0.28s ease !important;
  }

  .homeV3Page .homeV3Connect .homeV3FollowChannel:hover {
    transform: translateY(-5px) !important;
    filter: none !important;
  }

  .homeV3Page .homeV3Connect .homeV3FollowChannelIcon {
    flex: 0 0 auto;
    width: 34px;
    height: 34px;
    padding: 0;
    display: block;
    overflow: hidden;
    border-radius: 8px;
    color: inherit;
    background: transparent;
  }

  .homeV3Page .homeV3Connect .homeV3FollowChannelIcon svg {
    width: 34px;
    height: 34px;
    display: block;
  }

  .homeV3Page .homeV3Connect .homeV3FollowChannelCopy {
    min-width: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .homeV3Page .homeV3Connect .homeV3FollowChannelCopy strong {
    color: #211811 !important;
    font-family: Georgia, "Times New Roman", serif !important;
    font-size: 16px !important;
    font-weight: 400 !important;
    -webkit-font-smoothing: antialiased;
  }

  .homeV3Page .homeV3Connect .homeV3FollowChannelCopy span {
    overflow: hidden;
    color: rgba(42, 27, 18, 0.68) !important;
    font-size: 11px !important;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .homeV3Page .homeV3Connect .homeV3FollowChannelArrow {
    flex: 0 0 auto;
    color: #2a1b12 !important;
    font-size: 13px !important;
  }

  @media (max-width: 700px) {
    .homeV3Page .homeV3Connect {
      padding: 36px 0 48px !important;
    }

    .homeV3Page .homeV3Connect .homeV3Container {
      width: 100% !important;
    }

    .homeV3Page .homeV3Connect .homeV3PhoneZoneHeading {
      margin: 0 20px 24px !important;
    }

    .homeV3Page .homeV3Connect .homeV3PhonePair {
      padding: 8px 20px 18px !important;
    }

    .homeV3Page .homeV3Connect .homeV3SocialPhone {
      flex: 0 0 min(72vw, 280px) !important;
      width: min(72vw, 280px) !important;
      max-width: min(72vw, 280px) !important;
      min-width: min(72vw, 280px) !important;
    }

    .homeV3Page .homeV3Connect .homeV3FollowChannelsTitle {
      margin-left: 20px !important;
      margin-right: 20px !important;
    }

    .homeV3Page .homeV3Connect .homeV3FollowChannelsGrid {
      padding: 8px 20px 6px !important;
    }

  }


  /* SSS */
  .homeV3Page .homeV3Faq {
    padding: 56px 0 68px !important;
    overflow: visible !important;
    background: #fffdf8 !important;
    border-top: none !important;
  }

  .homeV3Page .homeV3Faq .homeV3Container {
    width: min(640px, calc(100% - 40px)) !important;
  }

  .homeV3Page .homeV3Faq .homeV3FaqHeading {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
    gap: 10px !important;
    margin: 0 !important;
    padding: 0 !important;
    grid-template-columns: none !important;
  }

  .homeV3Page .homeV3Faq .homeV3FaqHeading .homeV3Eyebrow {
    color: #6b4a1e !important;
    margin: 0 !important;
  }

  .homeV3Page .homeV3Faq .homeV3FaqHeading h2 {
    max-width: none !important;
    color: #211811 !important;
    font-size: clamp(30px, 6vw, 44px) !important;
    font-weight: 400 !important;
    line-height: 1.12 !important;
    letter-spacing: -0.03em !important;
    text-align: center !important;
  }

  .homeV3Page .homeV3Faq .homeV3FaqHeading h2 span {
    color: #a8792a !important;
  }

  .homeV3Page .homeV3Faq .homeV3FaqHeading > p:last-of-type {
    max-width: 400px !important;
    margin: 0 !important;
    color: rgba(33, 24, 17, 0.58) !important;
    font-size: 14px !important;
    line-height: 1.65 !important;
  }

  .homeV3Page .homeV3FaqOpen {
    margin-top: 22px;
    min-height: 46px;
    padding: 0 22px;
    border: none;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #211811;
    background: linear-gradient(120deg, #c8953d 0%, #e0bb69 100%);
    cursor: pointer;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.02em;
    transition: transform 0.22s ease;
  }

  .homeV3Page .homeV3FaqOpen:hover {
    transform: translateY(-2px);
  }

  .homeV3FaqModal {
    position: fixed;
    inset: 0;
    z-index: 100000;
    display: grid;
    place-items: center;
    padding: 18px;
    background: rgba(12, 8, 6, 0.82);
    backdrop-filter: blur(10px);
  }

  .homeV3FaqModalPanel {
    position: relative;
    width: min(640px, 100%);
    max-height: min(86vh, 760px);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 22px;
    background: #fffdf8;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
  }

  .homeV3FaqModalHead {
    flex: 0 0 auto;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    padding: 22px 22px 16px;
    border-bottom: 1px solid rgba(107, 74, 30, 0.10);
  }

  .homeV3FaqModalHead p {
    margin: 0 0 6px;
    color: #6b4a1e;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.16em;
  }

  .homeV3FaqModalHead h3 {
    margin: 0;
    color: #211811;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 26px;
    font-weight: 400;
    line-height: 1.15;
    letter-spacing: -0.03em;
  }

  .homeV3FaqModalHead h3 span {
    color: #a8792a;
  }

  .homeV3FaqModalClose {
    flex: 0 0 auto;
    width: 36px;
    height: 36px;
    border: 1px solid rgba(107, 74, 30, 0.16);
    border-radius: 50%;
    color: #6b4a1e;
    background: #ffffff;
    cursor: pointer;
    font-size: 22px;
    line-height: 1;
  }

  .homeV3FaqModalList {
    flex: 1 1 auto;
    overflow-y: auto;
    padding: 10px 14px 18px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    scrollbar-width: thin;
  }

  .homeV3FaqModal .homeV3FaqItem,
  .homeV3FaqModalList .homeV3FaqItem {
    flex: 0 0 auto !important;
    width: 100% !important;
    max-width: none !important;
    min-width: 0 !important;
    min-height: 0 !important;
    height: auto !important;
    margin: 0 !important;
    overflow: hidden !important;
    border: 1px solid rgba(107, 74, 30, 0.10) !important;
    border-radius: 12px !important;
    background: #ffffff !important;
    box-shadow: none !important;
    scroll-snap-align: none !important;
  }

  .homeV3FaqModal .homeV3FaqItem summary {
    min-height: 0 !important;
    height: auto !important;
    padding: 10px 12px !important;
    display: grid !important;
    grid-template-columns: 24px minmax(0, 1fr) 24px !important;
    gap: 8px !important;
    align-items: center !important;
    cursor: pointer !important;
    list-style: none !important;
  }

  .homeV3FaqModal .homeV3FaqItem summary::-webkit-details-marker {
    display: none !important;
  }

  .homeV3FaqModal .homeV3FaqNumber {
    color: #a8792a !important;
    font-size: 10px !important;
    letter-spacing: 0.08em !important;
  }

  .homeV3FaqModal .homeV3FaqItem summary strong {
    color: #211811 !important;
    font-family: Georgia, "Times New Roman", serif !important;
    font-size: 13px !important;
    font-weight: 400 !important;
    line-height: 1.3 !important;
  }

  .homeV3FaqModal .homeV3FaqPlus {
    width: 22px !important;
    height: 22px !important;
    display: grid !important;
    place-items: center !important;
    border: 1px solid rgba(107, 74, 30, 0.18) !important;
    border-radius: 50% !important;
    color: #6b4a1e !important;
    background: #fffdf8 !important;
    font-size: 16px !important;
    line-height: 1 !important;
    transition: transform 180ms ease !important;
  }

  .homeV3FaqModal .homeV3FaqItem[open] .homeV3FaqPlus {
    transform: rotate(45deg) !important;
  }

  .homeV3FaqModal .homeV3FaqAnswer {
    padding: 0 12px 12px 44px !important;
    font-size: 13px !important;
  }

  .homeV3FaqModal .homeV3FaqAnswer p {
    margin: 0 !important;
    color: rgba(33, 24, 17, 0.68) !important;
    font-size: 13px !important;
    line-height: 1.55 !important;
  }

  @media (max-width: 900px) {
    .homeV3LiveArchive {
      padding: 58px 0 64px;
    }

    .homeV3AudioEnergy {
      padding: 58px 0 8px;
    }

    .homeV3LiveArchiveInner,
    .homeV3AudioEnergyInner {
      width: min(100% - 34px, 760px);
    }

    .homeV3LiveArchiveHeading,
    .homeV3AudioEnergyHeading {
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      text-align: center !important;
      gap: 10px !important;
    }

    .homeV3LiveArchiveGrid {
      grid-template-columns: 1fr;
    }

    .homeV3AudioEnergyGrid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .homeV3AudioEnergyProduct h3,
    .homeV3AudioEnergyText {
      min-height: 0;
    }
  }

  @media (max-width: 620px) {
    .homeV3AudioEnergyGrid {
      grid-template-columns: 1fr;
    }

    .homeV3FollowChannelsGrid {
      grid-template-columns: 1fr;
    }
  }

  /* =========================================================
     MASAÜSTÜ WEB · SADECE 3 DÜZELTME
     1) Mobil menü masaüstünde gizli
     2) Fotoğraf kimlik bandı görünür
     3) Sabit yukarı ok görünür
  ========================================================= */

  @media (min-width: 901px) {

    /* MASAÜSTÜNDE MOBİL MENÜYÜ KESİNLİKLE GİZLE */
    .homeV3Page .homeV3MobileMenuButton,
    .homeV3Page .homeV3MobileMenu,
    .homeV3Page .homeV3MobileMenuBackdrop {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }

    /* FOTOĞRAF ALTINDAKİ ÖZGE BATIGÜN KİMLİK BANDI */
    .homeV3Page .homeV3HeroVideoPortrait {
      position: relative !important;
    }

    .homeV3Page .homeV3HeroVideoPortrait .homeV3HeroIdentityBar {
      position: absolute !important;

      left: 12px !important;
      right: 12px !important;
      bottom: 12px !important;

      width: auto !important;
      min-height: 52px !important;

      margin: 0 !important;
      padding: 0 14px !important;

      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      gap: 12px !important;

      border-radius: 16px !important;

      background: rgba(48, 38, 31, 0.94) !important;

      box-sizing: border-box !important;

      opacity: 1 !important;
      visibility: visible !important;
      pointer-events: none !important;

      z-index: 50 !important;
    }

    .homeV3Page .homeV3HeroVideoPortrait .homeV3HeroIdentityBar > strong {
      position: static !important;

      display: block !important;

      margin: 0 !important;
      padding: 0 !important;

      color: #fffaf0 !important;

      font-size: 12px !important;
      font-weight: 500 !important;
      line-height: 1 !important;

      white-space: nowrap !important;

      opacity: 1 !important;
      visibility: visible !important;

      transform: none !important;
    }

    .homeV3Page .homeV3HeroVideoPortrait .homeV3HeroIdentityBar > span {
      position: static !important;

      display: block !important;

      margin: 0 !important;
      padding: 0 !important;

      color: rgba(255, 250, 241, 0.92) !important;

      font-size: 10px !important;
      font-weight: 600 !important;
      line-height: 1.2 !important;
      letter-spacing: 0.02em !important;

      text-align: right !important;
      white-space: nowrap !important;

      opacity: 1 !important;
      visibility: visible !important;

      transform: none !important;
    }

    /* Mobilde eski yuvarlak WhatsApp / yukarı-ok balonlarını kapat.
       Yukarı çık butonu GlobalContactDock içindeki tek oktur. */
    .homeV3Page .siteGlobalBackToTop,
    .siteGlobalBackToTop,
    .homeV3Page .homeV3FloatingWhatsapp,
    .homeV3FloatingWhatsapp {
      display: none !important;
      opacity: 0 !important;
      visibility: hidden !important;
      pointer-events: none !important;
    }
  }

  .homeV3Page .homeV3Hero {
    background: #211812 !important;
  }

  .homeV3Page .homeV3HeroCard {
    background: #ffffff !important;
    border: 0 !important;
    box-shadow: 0 10px 28px rgba(48, 32, 18, 0.08) !important;
  }

  .homeV3Page .homeV3HeroCard .homeHeroActionRow {
    grid-column: 1 / -1 !important;
    width: 100% !important;
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    align-items: stretch !important;
    gap: 8px !important;
    margin-top: 8px !important;
  }

  .homeV3Page .homeV3HeroCard .homeHeroActionRow .homeHeroMiniTest {
    grid-column: auto !important;
    flex: 1 1 0 !important;
    width: auto !important;
    max-width: none !important;
    min-width: 0 !important;
    justify-self: stretch !important;
    margin-top: 0 !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 8px !important;
    min-height: 0 !important;
    height: auto !important;
    padding: 12px 11px 11px !important;
    border-radius: 12px !important;
    box-sizing: border-box !important;
    grid-template-columns: none !important;
    -webkit-font-smoothing: antialiased !important;
    -moz-osx-font-smoothing: grayscale !important;
    background: #ffffff !important;
    border: 1px solid rgba(176, 130, 48, 0.28) !important;
    box-shadow: 0 8px 22px rgba(48, 32, 18, 0.14) !important;
  }

  .homeV3Page .homeV3HeroCard .homeHeroActionRow .homeHeroMiniTestIcon {
    display: none !important;
  }

  .homeV3Page .homeV3HeroCard .homeHeroActionRow .homeHeroMiniTestCopy {
    width: 100% !important;
    min-width: 0 !important;
  }

  .homeV3Page .homeV3HeroCard .homeHeroActionRow .homeHeroMiniTestCopy p {
    font-size: 8px !important;
    font-weight: 700 !important;
    letter-spacing: 0.08em !important;
    line-height: 1.3 !important;
    margin: 0 0 5px !important;
    color: #9a7328 !important;
    -webkit-font-smoothing: antialiased !important;
  }

  .homeV3Page .homeV3HeroCard .homeHeroActionRow .homeHeroMiniTestCopy h2 {
    white-space: normal !important;
    font-size: 15px !important;
    font-weight: 400 !important;
    line-height: 1.22 !important;
    letter-spacing: -0.02em !important;
    color: #1c1410 !important;
    text-rendering: geometricPrecision !important;
    -webkit-font-smoothing: antialiased !important;
  }

  .homeV3Page .homeV3HeroCard .homeHeroActionRow .homeHeroMiniTestCopy h2 span {
    color: #9a7328 !important;
  }

  .homeHeroActionCard {
    text-decoration: none;
    color: inherit;
  }

  .homeV3Page .homeV3HeroCard .homeHeroActionRow .homeHeroMiniTest > a,
  .homeV3Page .homeV3HeroCard .homeHeroActionRow .homeHeroActionCta {
    display: inline-flex !important;
    align-items: center;
    justify-content: center;
    gap: 5px;
    margin-top: auto !important;
    margin-left: 0 !important;
    width: auto !important;
    min-height: 0 !important;
    padding: 6px 10px !important;
    border-radius: 999px;
    background: #f4f0e4;
    color: #1c1410;
    text-decoration: none;
    font-size: 9px !important;
    font-weight: 700;
    white-space: nowrap;
    grid-column: auto !important;
  }

  .homeV3Page .homeV3HeroCard .homeHeroActionRow .homeHeroMiniTest > a span,
  .homeV3Page .homeV3HeroCard .homeHeroActionRow .homeHeroActionCta span {
    color: #a5782d;
  }

  .homeV3Page .homeV3HeroSocials {
    gap: 12px !important;
    margin-top: 14px !important;
  }

  .homeV3Page .homeV3HeroSocials a.homeHeroSocialLink {
    width: 38px !important;
    height: 38px !important;
    border: 0 !important;
    border-radius: 50% !important;
    background: #fff !important;
    box-shadow: 0 8px 18px rgba(40, 28, 16, 0.14);
    color: #111 !important;
  }

  .homeV3Page .homeV3HeroSocials a.homeHeroSocialLink svg {
    width: 18px !important;
    height: 18px !important;
    fill: currentColor !important;
    stroke: none !important;
    overflow: visible !important;
  }

  .homeV3Page .homeV3HeroSocials a.homeHeroSocial-instagram {
    background: linear-gradient(135deg, #f9ce34, #ee2a7b, #6228d7) !important;
    color: #fff !important;
  }

  .homeV3Page .homeV3HeroSocials a.homeHeroSocial-whatsapp {
    background: #25d366 !important;
    color: #fff !important;
  }

  .homeV3Page .homeV3HeroSocials a.homeHeroSocial-x {
    background: #111 !important;
    color: #fff !important;
  }

  .homeV3Page .homeV3HeroSocials a.homeHeroSocial-tiktok {
    background: #111 !important;
    color: #fff !important;
  }

  .homeV3Page .homeV3HeroSocials a.homeHeroSocial-youtube {
    background: #ff0000 !important;
    color: #fff !important;
  }

  .homeV3Page .homeV3HeroSocials a.homeHeroSocial-spotify {
    background: #1db954 !important;
    color: #fff !important;
  }

`;

export default function HomePageClient() {
  const otherWorksSliderRef =
    useRef<HTMLDivElement>(null);
  const otherWorksLoopingRef = useRef(false);

  const [heroVideoOpen, setHeroVideoOpen] =
    useState(false);
  const [faqOpen, setFaqOpen] = useState(false);

  useEffect(() => {
    if (!heroVideoOpen && !faqOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setHeroVideoOpen(false);
        setFaqOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [heroVideoOpen, faqOpen]);

  useEffect(() => {
    const slider = otherWorksSliderRef.current;
    if (!slider) return;

    const loopSlider = () => {
      if (otherWorksLoopingRef.current) return;

      const half = slider.scrollWidth / 2;
      if (half <= slider.clientWidth) return;

      if (slider.scrollLeft >= half - 2) {
        otherWorksLoopingRef.current = true;
        slider.scrollLeft -= half;
        otherWorksLoopingRef.current = false;
      }
    };

    slider.addEventListener("scroll", loopSlider, { passive: true });
    return () => slider.removeEventListener("scroll", loopSlider);
  }, []);

  return (
    <main className="homeV3Page" id="top">
      <style>{homepageArchiveStyles}</style>
      {/* NAVBAR */}

      <HomeNavbar />

      {/* HERO */}

      <section className="homeV3Hero">
        <div className="homeV3Container">
          <div className="homeV3HeroCard">
            <div className="homeV3HeroCopy">
              <p className="homeV3Eyebrow">
                GOLDKOZMOS<sup>®</sup> REZONANS EKOLÜ
              </p>

              <h1>
                Kendi
                <span> kozmosunu bul.</span>
              </h1>

              <p className="homeV3HeroLead">
                Kendilik, ilişkiler ve bolluk alanında tekrar eden
                örüntülerini fark et. Kendini daha net gördükçe
                hayatındaki seçimleri de daha bilinçli kur.
              </p>

              <div className="homeV3HeroLine">
                <span>✦</span>
                <p>İnsan değişmeden hayat değişmez.</p>
              </div>
            </div>

            <div className="homeV3HeroProfileWrap">
              <div className="homeV3HeroVisual homeV3HeroPortrait homeV3HeroVideoPortrait">
                <button
                  type="button"
                  className="homeV3HeroVideoCover"
                  onClick={() => setHeroVideoOpen(true)}
                  aria-label="Goldkozmos tanıtım videosunu oynat"
                >
                  <img
                    src="/images/services/ozge-batigun-hakkimda.webp"
                    alt="Özge Batıgün"
                  />

                  <span
                    className="homeV3HeroPlayButton"
                    aria-hidden="true"
                  >
                    ▶
                  </span>

                  <span className="homeV3HeroPlayLabel">
                    Tanıtım Videosunu İzle
                  </span>
                </button>

                <div className="homeV3HeroIdentityBar">
                  <strong>Özge Batıgün</strong>
                  <span>Kişisel gelişim · Stoa · Rezonans</span>
                </div>
              </div>

              <div className="homeV3HeroProfileSocials">
                <div className="homeV3HeroSocials">
                  {socials.map((social) => (
                    <a
                      key={social.name}
                      className={`homeHeroSocialLink homeHeroSocial-${social.platform}`}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.name}
                      title={social.name}
                    >
                      <SocialIcon
                        platform={social.platform}
                        filled
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="homeHeroActionRow">
              <a
                className="homeHeroMiniTest homeHeroActionCard"
                href="#rezonans"
              >
                <div className="homeHeroMiniTestCopy">
                  <p>REZONANS ÇALIŞMALARI</p>

                  <h2>
                    Çalışmaları
                    <span> keşfet</span>
                  </h2>
                </div>

                <span className="homeHeroActionCta">
                  İncele
                </span>
              </a>

              <a
                className="homeHeroMiniTest homeHeroActionCard"
                href="/hakkimda"
              >
                <div className="homeHeroMiniTestCopy">
                  <p>ÖZGE BATIGÜN</p>

                  <h2>
                    Hakkımda
                    <span> daha fazlası</span>
                  </h2>
                </div>

                <span className="homeHeroActionCta">
                  Oku
                </span>
              </a>

              <div className="homeHeroMiniTest">
                <div className="homeHeroMiniTestCopy">
                  <p>ÜCRETSİZ ARKETİP TESTİ</p>

                  <h2>
                    Kendine hangi
                    <span> arketipten bakıyorsun?</span>
                  </h2>
                </div>

                <a href="/sana-uygun-calismayi-bul">
                  Teste Başla
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DailyActionCard />

      <PlatformRail />

      {/* REZONANS */}

      <section
        className="homeV3Resonance"
        id="rezonans"
      >
        <div className="homeV3Container">
          <div className="homeV3SectionHeading">
            <div>
              <p className="homeV3Eyebrow">
                REZONANS EĞİTİMLERİ
              </p>

              <h2>
                3 Ana
                <span> Rezonans</span>
              </h2>
            </div>

            <p>
              Üç farklı alan. Aynı amaç: kendini ve tekrar
              eden örüntülerini daha net görmek.
            </p>
          </div>

          <div className="homeV3ResonanceGrid">
            {getEducationCourses().map((course) => {
              const cta = getEducationPrimaryCta(course);
              const hubHref = getEducationHubHref(course);

              return (
              <article
                className="homeV3ResonanceCard"
                key={course.id}
              >
                <a
                  className="homeV3ResonanceImage"
                  href={hubHref}
                >
                  <img
                    src={course.coverImage}
                    alt={course.title}
                  />
                </a>

                <div className="homeV3ResonanceContent">
                  <p className="homeV3CardEyebrow">
                    {course.eyebrow}
                  </p>

                  <h3>{course.title}</h3>

                  <p className="homeV3ResonanceText">
                    {course.homeSummary}
                  </p>

                  <div className="homeV3ResonanceBottom">
                    <a
                      href={cta.href}
                      {...(cta.external
                        ? {
                            target: "_blank",
                            rel: "noreferrer",
                          }
                        : {})}
                    >
                      {cta.label}
                      <span>→</span>
                    </a>
                  </div>
                </div>
              </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* DİĞER ÇALIŞMALAR */}

      <section
        className="homeV3Other"
        id="diger"
      >
        <div className="homeV3Container">
          <div className="homeV3PersonalHub">
            <div className="homeV3PersonalLeft">
              <div className="homeV3PersonalHeading">
                <p className="homeV3Eyebrow">
                  BİREBİR ÇALIŞMALAR
                </p>

                <h2>
                  Daha
                  <span> kişisel bir alan.</span>
                </h2>

                <p className="homeV3PersonalDescription">
                  Tek bir konuya odaklanmak veya farklı bir
                  farkındalık yöntemiyle ilerlemek isteyenler için.
                </p>
              </div>

              <div
                className="homeV3OtherSlider"
                ref={otherWorksSliderRef}
              >
                {[...otherWorks, ...otherWorks].map((work, index) => (
                  <a
                    className="homeV3OtherCard"
                    href={work.href}
                    key={`${work.title}-${index}`}
                  >
                    <div className="homeV3OtherVisual">
                      <img
                        src={work.image}
                        alt={work.title}
                      />
                    </div>

                    <div className="homeV3OtherContent">
                      <h3>{work.title}</h3>
                      <p>{work.text}</p>

                      <div className="homeV3OtherCardBottom">
                        <span className="homeV3OtherCardCta">
                          Detayları Gör
                          <span>→</span>
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CANLI KAYITLAR */}

      <section
        className="homeV3LiveArchive"
        id="canli-kayitlar"
      >
        <div className="homeV3LiveArchiveInner">
          <div className="homeV3LiveArchiveHeading">
            <div>
              <p className="homeV3Eyebrow">
                CANLI KAYITLAR
              </p>

              <h2>
                Kaçırdığın çalışmaları
                <span> kendi zamanında izle.</span>
              </h2>
            </div>

            <p>
              Daha önce canlı gerçekleştirilen ve sonradan erişime
              açılan çalışmalar burada bir araya gelir.
            </p>
          </div>

          <div className="homeV3LiveArchiveGrid">
            {recordings.map((recording) => (
              <article
                className="homeV3LiveArchiveCard"
                key={recording.title}
              >
                <a
                  href={recording.href}
                  className="homeV3LiveArchiveImage"
                  target={recording.href.startsWith("http") ? "_blank" : undefined}
                  rel={recording.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  <img
                    src={recording.image}
                    alt={recording.title}
                  />
                </a>

                <div className="homeV3LiveArchiveBody">
                  <p>{recording.category}</p>

                  <h3>{recording.title}</h3>

                  <div className="homeV3LiveArchiveText">
                    {recording.text}
                  </div>

                  <div className="homeV3LiveArchiveBottom">
                    <a
                      href={recording.href}
                      target={recording.href.startsWith("http") ? "_blank" : undefined}
                      rel={recording.href.startsWith("http") ? "noreferrer" : undefined}
                    >
                      İncele
                      <span>→</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}

            <div className="homeV3LiveArchiveFuture">
              <span>✦</span>
              <p>
                Yeni canlı kayıtlar eklendikçe
                <strong> burada yerini alacak.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SES KAYDI · ENERJİ ÇALIŞMALARI */}

      <section
        className="homeV3AudioEnergy"
        id="ses-kaydi-enerji-calismalari"
      >
        <div className="homeV3AudioEnergyInner">
          <div className="homeV3AudioEnergyHeading">
            <div>
              <p className="homeV3Eyebrow">
                SES KAYDI · ENERJİ ÇALIŞMALARI
              </p>

              <h2>
                Kendi zamanında dinle,
                <span> kendi alanında uygula.</span>
              </h2>
            </div>

            <p>
              Yönlendirmeli ses kayıtları ve kayıtlı enerji
              çalışmalarını seç, kendi zamanında eriş ve kendi
              ritminde ilerle.
            </p>
          </div>

          <div className="homeV3AudioEnergyGrid">
            {audioEnergyProducts.map((product) => (
              <article
                className="homeV3AudioEnergyProduct"
                key={product.title}
              >
                <a
                  href={product.href}
                  target="_blank"
                  rel="noreferrer"
                  className="homeV3AudioEnergyImage"
                  aria-label={`${product.title} ürününü incele`}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                  />
                </a>

                <div className="homeV3AudioEnergyBody">
                  <p className="homeV3AudioEnergyCategory">
                    {product.category}
                  </p>

                  <h3>{product.title}</h3>

                  <div className="homeV3AudioEnergyText">
                    {product.text}
                  </div>

                  <div className="homeV3AudioEnergyBottom">
                    <strong>{product.price}</strong>

                    <a
                      href={product.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Shopier’de İncele
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* GOLDBOOK */}

      <section
        className="homeV3LibraryHub"
        id="goldbook"
      >
        <div className="homeV3Container">
          <div className="homeV3LibraryShowcase">
            {/* SOL: GOLDBOOK */}

            <div className="homeV3LibraryBooks">
              <div className="homeV3LibraryHeading">
                <p className="homeV3Eyebrow">
                  GOLDBOOK
                </p>

                <h2>
                  Okumak için değil,
                  <span> kendine dönmek için.</span>
                </h2>

                <a
                  href="/goldbook"
                  className="homeV3LibraryAll"
                >
                  Tüm GoldBook’lar
                </a>
              </div>

              <div className="homeV3LibraryBooksGrid">
                {books.map((book) => (
                  <article
                    className="homeV3BookCard"
                    key={book.title}
                  >
                    <div className="homeV3BookImage">
                      <img
                        src={book.image}
                        alt={book.title}
                      />
                    </div>

                    <div className="homeV3BookContent">
                      <p className="homeV3CardEyebrow">
                        DİJİTAL GOLDBOOK
                      </p>

                      <h3>{book.title}</h3>

                      <p>{book.text}</p>

                      <div className="homeV3BookBottom">
                        <strong>
                          {book.price}
                        </strong>

                        <a
                          href={book.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Shopier’den Al
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="homeV3Connect" id="baglanti">
        <div className="homeV3Container">
          <div className="homeV3PhoneZoneHeading">
            <p className="homeV3Eyebrow">
              BAĞLANTIDA KAL
            </p>

            <h2>
              Goldkozmos’u
              <span> cebinde taşı.</span>
            </h2>

            <p>
              Instagram içerikleri ve WhatsApp kanalındaki
              duyurular için iki doğrudan bağlantı.
            </p>
          </div>

          <div className="homeV3PhonePair">
            <a
              className="homeV3SocialPhone homeV3InstagramPhone"
              href="https://www.instagram.com/goldkozmos?igsh=ODF4aWx1bndreDhq"
              target="_blank"
              rel="noreferrer"
              aria-label="Goldkozmos Instagram hesabını aç"
            >
              <div className="homeV3PhoneFrame">
                <div
                  className="homeV3PhoneNotch"
                  aria-hidden="true"
                />

                <div className="homeV3PhoneScreen">
                  <div className="homeV3PhoneAppTop">
                    <span className="homeV3PhoneAppIcon">
                      <SocialIcon platform="instagram" filled />
                    </span>

                    <strong>Instagram</strong>
                  </div>

                  <div className="homeV3InstagramPhoneProfile">
                    <div className="homeV3InstagramPhonePhoto">
                      <img
                        src="/images/services/instagram-profile.webp"
                        alt="Goldkozmos Instagram"
                      />
                    </div>

                    <p>GOLDKOZMOS®</p>
                    <h3>@goldkozmos</h3>

                    <span>
                      Kendilik · İlişkiler · Bolluk · Stoa
                    </span>
                  </div>

                  <div
                    className="homeV3InstagramPhoneGrid"
                    aria-hidden="true"
                  >
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className="homeV3PhoneCta">
                    Instagram’a Git
                    <span>↗</span>
                  </div>
                </div>
              </div>

              <p className="homeV3PhoneLabel">
                Instagram
              </p>
            </a>

            <a
              className="homeV3SocialPhone homeV3WhatsappPhone"
              href="https://whatsapp.com/channel/0029Vb8BNoHHwXbBIssG2k1s"
              target="_blank"
              rel="noreferrer"
              aria-label="Goldkozmos WhatsApp kanalını aç"
            >
              <div className="homeV3PhoneFrame">
                <div
                  className="homeV3PhoneNotch"
                  aria-hidden="true"
                />

                <div className="homeV3PhoneScreen">
                  <div className="homeV3PhoneAppTop">
                    <span className="homeV3PhoneAppIcon">
                      <SocialIcon platform="whatsapp" filled />
                    </span>

                    <strong>WhatsApp</strong>
                  </div>

                  <div className="homeV3WhatsappPhoneHero">
                    <span>GOLDKOZMOS® REZONANS EKOLÜ</span>

                    <h3>
                      Goldkozmos’tan
                      <strong> haberdar kal.</strong>
                    </h3>

                    <p>
                      Yeni çalışmalar, yayınlar ve duyurular
                      tek bir yerde.
                    </p>
                  </div>

                  <div className="homeV3WhatsappPhoneItems">
                    <div>
                      <span>01</span>
                      <p>Yeni çalışma duyuruları</p>
                    </div>

                    <div>
                      <span>02</span>
                      <p>GoldCast ve GoldBlog paylaşımları</p>
                    </div>

                    <div>
                      <span>03</span>
                      <p>Topluluk güncellemeleri</p>
                    </div>
                  </div>

                  <div className="homeV3PhoneCta">
                    Kanala Katıl
                    <span>→</span>
                  </div>
                </div>
              </div>

              <p className="homeV3PhoneLabel">
                WhatsApp Kanalı
              </p>
            </a>
          </div>

          <div className="homeV3FollowChannels">
            <div className="homeV3FollowChannelsTitle">
              <span>DİĞER KANALLAR</span>
              <p>Goldkozmos’u diğer platformlarda da takip et.</p>
            </div>

            <div className="homeV3FollowChannelsGrid">
              {followChannels.map((channel) => (
                <a
                  key={channel.name}
                  className="homeV3FollowChannel"
                  href={channel.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="homeV3FollowChannelIcon" aria-hidden="true">
                    <SocialIcon platform={channel.platform} filled />
                  </span>

                  <span className="homeV3FollowChannelCopy">
                    <strong>{channel.name}</strong>
                    <span>{channel.handle}</span>
                  </span>

                  <span
                    className="homeV3FollowChannelArrow"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SSS */}

      <section className="homeV3Faq" id="sss">
        <div className="homeV3Container">
          <div className="homeV3FaqHeading">
            <p className="homeV3Eyebrow">
              SIK SORULAN SORULAR
            </p>

            <h2>
              Merak ettiklerin,
              <span> tek bir yerde.</span>
            </h2>

            <p>
              Atölyeler, birebir çalışmalar ve dijital ürünler
              hakkında kısa yanıtlar.
            </p>

            <button
              type="button"
              className="homeV3FaqOpen"
              onClick={() => setFaqOpen(true)}
            >
              Tüm soruları gör
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <FooterSection />

      {/* SABİT WHATSAPP */}

      <a
        href="https://wa.me/905054722153"
        className="homeV3FloatingWhatsapp"
        target="_blank"
        rel="noreferrer"
        aria-label="Goldkozmos WhatsApp mesajını aç"
      >
        <svg
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <path d="M16.02 3.2C8.93 3.2 3.2 8.86 3.2 15.84c0 2.45.71 4.84 2.06 6.9L3 29l6.46-2.12a12.93 12.93 0 0 0 6.55 1.8h.01c7.08 0 12.83-5.67 12.83-12.64 0-3.38-1.34-6.55-3.77-8.94A12.83 12.83 0 0 0 16.02 3.2Zm0 23.34a10.78 10.78 0 0 1-5.5-1.51l-.39-.23-3.83 1.26 1.28-3.71-.25-.4a10.47 10.47 0 0 1-1.65-5.61c0-5.83 4.82-10.57 10.75-10.57 2.87 0 5.57 1.1 7.6 3.09a10.42 10.42 0 0 1 3.15 7.48c0 5.83-4.83 10.57-10.76 10.57Zm5.9-7.92c-.32-.16-1.91-.93-2.2-1.04-.3-.11-.51-.16-.73.16-.22.32-.84 1.04-1.03 1.25-.19.21-.38.24-.7.08-.33-.16-1.38-.5-2.63-1.6a9.75 9.75 0 0 1-1.82-2.23c-.19-.32-.02-.49.14-.65.15-.14.33-.37.49-.56.16-.19.22-.32.33-.53.11-.21.05-.4-.03-.56-.08-.16-.73-1.73-1-2.37-.26-.63-.53-.54-.73-.55h-.62c-.22 0-.57.08-.87.4-.3.32-1.14 1.1-1.14 2.68s1.17 3.11 1.33 3.32c.16.21 2.3 3.46 5.57 4.85.78.33 1.39.53 1.86.68.78.24 1.49.21 2.05.13.63-.09 1.91-.77 2.18-1.51.27-.74.27-1.37.19-1.51-.08-.13-.3-.21-.62-.37Z" />
        </svg>

        <span className="homeV3FloatingWhatsappLabel">
          WhatsApp’tan Mesaj Gönder
        </span>
      </a>

      {/* SABİT YUKARI OK */}

      <a
        href="#top"
        className="siteGlobalBackToTop"
        aria-label="Sayfanın başına dön"
        onClick={(event) => {
          event.preventDefault();

          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 4.6 5.35 11.25a1.15 1.15 0 0 0 1.63 1.62L10.85 9v9.25a1.15 1.15 0 0 0 2.3 0V9l3.87 3.87a1.15 1.15 0 1 0 1.63-1.62L12 4.6z" />
        </svg>
      </a>

      {faqOpen ? (
        <div
          className="homeV3FaqModal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="homeV3FaqModalTitle"
          onClick={() => setFaqOpen(false)}
        >
          <div
            className="homeV3FaqModalPanel"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="homeV3FaqModalHead">
              <div>
                <p>SIK SORULAN SORULAR</p>
                <h3 id="homeV3FaqModalTitle">
                  Tüm sorular
                  <span> burada.</span>
                </h3>
              </div>

              <button
                type="button"
                className="homeV3FaqModalClose"
                onClick={() => setFaqOpen(false)}
                aria-label="SSS penceresini kapat"
              >
                ×
              </button>
            </div>

            <div className="homeV3FaqModalList">
              {faqs.map((faq, index) => (
                <details
                  className="homeV3FaqItem"
                  key={faq.question}
                >
                  <summary>
                    <span className="homeV3FaqNumber">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <strong>{faq.question}</strong>

                    <span
                      className="homeV3FaqPlus"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>

                  <div className="homeV3FaqAnswer">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {heroVideoOpen ? (
        <div
          className="homeV3HeroVideoModal"
          role="dialog"
          aria-modal="true"
          aria-label="Goldkozmos tanıtım videosu"
          onClick={() => setHeroVideoOpen(false)}
        >
          <div
            className="homeV3HeroVideoModalInner"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="homeV3HeroVideoModalClose"
              onClick={() => setHeroVideoOpen(false)}
              aria-label="Videoyu kapat"
            >
              ×
            </button>

            <video
              autoPlay
              playsInline
              controls
              preload="auto"
              onEnded={() => setHeroVideoOpen(false)}
              aria-label="Özge Batıgün Goldkozmos tanıtım videosu"
            >
              <source
                src="/videos/goldkozmos-tanitim.mp4"
                type="video/mp4"
              />
              Tarayıcınız video etiketini desteklemiyor.
            </video>
          </div>
        </div>
      ) : null}
    </main>
  );
}