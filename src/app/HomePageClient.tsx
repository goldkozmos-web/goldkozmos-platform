"use client";

import { useRef, useState } from "react";
import FooterSection from "../components/FooterSection";

type SocialPlatform =
  | "instagram"
  | "whatsapp"
  | "x"
  | "tiktok"
  | "youtube"
  | "spotify";

const resonanceWorks = [
  {
    eyebrow: "01 · KENDİLİK",
    title: "Kendilik Rezonansı",
    text: "Özdeğerini, onay ihtiyacını, sınırlarını ve kendinle kurduğun ilişkiyi daha yakından gör.",
    image: "/images/services/kendilik-rezonansi.webp",
    href: "/calismalar/kendilik",
    price: "1.500 TL",
  },
  {
    eyebrow: "02 · İLİŞKİLER",
    title: "İlişki Rezonansı",
    text: "Partner seçimlerini, tekrar eden ilişki örüntülerini, iletişim biçimini ve sınırlarını fark et.",
    image: "/images/services/iliski-rezonansi.webp",
    href: "/calismalar/iliski",
    price: "1.500 TL",
  },
  {
    eyebrow: "03 · BOLLUK",
    title: "Bolluk Rezonansı",
    text: "Para algını, değer anlayışını, kıtlık düşüncelerini ve üretkenlik alışkanlıklarını incele.",
    image: "/images/services/bolluk-rezonansi.webp",
    href: "/calismalar/para",
    price: "1.500 TL",
  },
];

const otherWorks = [
  {
    number: "01",
    title: "Tek Birebir Seans",
    text: "Belirli bir konuya odaklanan 50 dakikalık birebir görüşme.",
    image: "/images/services/birebir-seans.webp",
    price: "2.500 TL",
    href: "/calismalar/birebir-seanslar",
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
    href: "/calismalar/ses-kayitlari",
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
    href: "https://www.shopier.com/goldkozmos/49861708",
  },
  {
    category: "SES KAYDI · NİYET & ODAK",
    title: "Dileğini Rezonansla",
    text: "Niyetini netleştirmek, zihinsel dağınıklığı azaltmak ve odağını seçtiğin dilekle daha uyumlu hale getirmek için hazırlanmış rehberli ses kaydı.",
    image: "/images/services/dilegini-rezonansla.webp",
    price: "450 TL",
    href: "https://www.shopier.com/goldkozmos/49861763",
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


const followChannels = [
  {
    name: "TikTok",
    handle: "@goldkozmos",
    href: "https://www.tiktok.com/@goldkozmos?_r=1&_t=ZS-98y87m276cX",
  },
  {
    name: "X",
    handle: "@GoldKozmos",
    href: "https://x.com/GoldKozmos",
  },
  {
    name: "Threads",
    handle: "@goldkozmos",
    href: "https://www.threads.com/@goldkozmos",
  },
  {
    name: "YouTube",
    handle: "@goldkozmos",
    href: "https://youtube.com/@goldkozmos?si=Rna82s44awxWfnXt",
  },
];

function SocialIcon({
  platform,
}: {
  platform: SocialPlatform;
}) {
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
    .homeV3FloatingWhatsapp {
      right: 18px;
      bottom: 82px;
      width: 52px;
      height: 52px;
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

  /* 3 ANA REZONANS KARTLARI · PREMIUM GÖLGE */
  .homeV3Page .homeV3ResonanceCard {
    box-shadow:
      0 22px 48px rgba(63, 42, 20, 0.14),
      0 8px 20px rgba(63, 42, 20, 0.07) !important;
    transition:
      transform 180ms ease,
      box-shadow 180ms ease !important;
  }

  .homeV3Page .homeV3ResonanceCard:hover {
    transform: translateY(-4px);
    box-shadow:
      0 28px 58px rgba(63, 42, 20, 0.18),
      0 10px 24px rgba(63, 42, 20, 0.09) !important;
  }

  /* DİĞER ÇALIŞMALAR: sağdaki eski canlı kayıt sütununu kaldırıp tam genişlik */
  .homeV3Page .homeV3PersonalHub {
    grid-template-columns: minmax(0, 1fr) !important;
  }

  .homeV3Page .homeV3PersonalLeft {
    width: 100% !important;
    min-width: 0;
  }

  /* CANLI KAYITLAR */
  .homeV3LiveArchive {
    padding: 82px 0 88px;
    background:
      radial-gradient(circle at 90% 8%, rgba(177, 128, 43, 0.09), transparent 27%),
      linear-gradient(180deg, #fbf8f1 0%, #f5eee3 100%);
  }

  .homeV3LiveArchiveInner {
    width: min(1180px, calc(100% - 72px));
    margin: 0 auto;
  }

  .homeV3LiveArchiveHeading {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(300px, 0.55fr);
    gap: 64px;
    align-items: end;
    margin-bottom: 28px;
  }

  .homeV3LiveArchiveHeading .homeV3Eyebrow {
    margin-bottom: 9px;
  }

  .homeV3LiveArchiveHeading h2 {
    margin: 0;
    color: #211811;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(42px, 3.8vw, 58px);
    font-weight: 400;
    line-height: 0.98;
    letter-spacing: -1.6px;
  }

  .homeV3LiveArchiveHeading h2 span {
    color: #a8792a;
  }

  .homeV3LiveArchiveHeading > p {
    margin: 0;
    color: #75695e;
    font-size: 13px;
    line-height: 1.7;
  }

  .homeV3LiveArchiveGrid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 18px;
  }

  .homeV3LiveArchiveCard {
    overflow: hidden;
    border: 1.5px solid rgba(198, 151, 67, 0.45);
    border-radius: 24px;
    background: #fffdf9;
    box-shadow:
      0 20px 42px rgba(55, 35, 16, 0.10),
      0 5px 15px rgba(55, 35, 16, 0.05);
  }

  .homeV3LiveArchiveImage {
    position: relative;
    display: block;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    background: #24180f;
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
    font-size: 25px;
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
    justify-content: space-between;
    gap: 18px;
    margin-top: 18px;
    padding-top: 15px;
    border-top: 1px solid rgba(158, 116, 44, 0.14);
  }

  .homeV3LiveArchiveBottom strong {
    color: #9b7029;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 18px;
    font-weight: 400;
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
    padding: 78px 0 88px;
    overflow: hidden;
    background:
      radial-gradient(circle at 88% 12%, rgba(197, 151, 66, 0.15), transparent 28%),
      radial-gradient(circle at 8% 90%, rgba(197, 151, 66, 0.07), transparent 24%),
      linear-gradient(145deg, #2a1c13 0%, #1b120d 62%, #140d09 100%);
  }

  .homeV3AudioEnergyInner {
    width: min(1180px, calc(100% - 72px));
    margin: 0 auto;
  }

  .homeV3AudioEnergyHeading {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(300px, 0.55fr);
    gap: 64px;
    align-items: end;
    margin-bottom: 30px;
  }

  .homeV3AudioEnergyHeading .homeV3Eyebrow {
    color: #c99a47;
    margin-bottom: 9px;
  }

  .homeV3AudioEnergyHeading h2 {
    margin: 0;
    color: #fffaf1;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(42px, 3.8vw, 58px);
    font-weight: 400;
    line-height: 0.98;
    letter-spacing: -1.6px;
  }

  .homeV3AudioEnergyHeading h2 span {
    color: #c99a47;
  }

  .homeV3AudioEnergyHeading > p {
    margin: 0;
    color: rgba(255, 250, 241, 0.58);
    font-size: 13px;
    line-height: 1.7;
  }

  .homeV3AudioEnergyGrid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 16px;
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



  /* BAĞLANTIDA KAL · TELEFONLARI EŞİTLE */
  @media (min-width: 901px) {
    .homeV3PhonePair {
      display: grid !important;
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      gap: 14px !important;
      align-items: start !important;
    }

    .homeV3SocialPhone {
      width: 100% !important;
      max-width: none !important;
      min-width: 0 !important;
    }

    .homeV3InstagramPhone,
    .homeV3WhatsappPhone {
      width: 100% !important;
      max-width: none !important;
    }

    .homeV3PhoneFrame {
      width: 100% !important;
      height: 330px !important;
      min-height: 330px !important;
      max-height: 330px !important;
      box-sizing: border-box !important;
    }

    .homeV3PhoneScreen {
      height: 100% !important;
      min-height: 0 !important;
      box-sizing: border-box !important;
      overflow: hidden !important;
    }

    .homeV3PhoneLabel {
      width: 100% !important;
      text-align: center !important;
    }
  }

  /* BAĞLANTIDA KAL · DİĞER KANALLAR */
  .homeV3FollowChannels {
    margin-top: 18px;
    padding-top: 18px;
    border-top: 1px solid rgba(213, 170, 88, 0.15);
  }

  .homeV3FollowChannelsTitle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    margin-bottom: 11px;
  }

  .homeV3FollowChannelsTitle span {
    color: #c99a47;
    letter-spacing: 0.16em;
    font-size: 7.5px;
    font-weight: 700;
  }

  .homeV3FollowChannelsTitle p {
    margin: 0;
    color: rgba(255, 250, 241, 0.50);
    font-size: 9px;
  }

  .homeV3FollowChannelsGrid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }

  .homeV3FollowChannel {
    min-width: 0;
    min-height: 52px;
    padding: 0 14px;
    border: 1px solid rgba(151, 104, 28, 0.34);
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    color: #2a1b12;
    background:
      linear-gradient(120deg, #c8953d 0%, #e0bb69 100%);
    box-shadow: 0 10px 24px rgba(66, 42, 17, 0.12);
    text-decoration: none;
    transition:
      transform 160ms ease,
      filter 160ms ease;
  }

  .homeV3FollowChannel:hover {
    transform: translateY(-2px);
    filter: brightness(1.03);
  }

  .homeV3FollowChannelCopy {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .homeV3FollowChannelCopy strong {
    color: #2a1b12;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 14px;
    font-weight: 600;
  }

  .homeV3FollowChannelCopy span {
    overflow: hidden;
    color: rgba(42, 27, 18, 0.68);
    font-size: 8.5px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .homeV3FollowChannelArrow {
    flex: 0 0 auto;
    color: #2a1b12;
    font-size: 12px;
  }


  /* SSS · KAYDIRMALI SAYFALAR */
  .homeV3Faq {
    overflow: hidden;
  }

  .homeV3FaqHeading {
    position: relative;
  }

  .homeV3FaqHeadingActions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .homeV3FaqHeadingActions button {
    width: 42px;
    height: 42px;
    padding: 0;
    border: 1px solid rgba(164, 119, 43, 0.24);
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: #8f6727;
    background: rgba(255, 253, 248, 0.86);
    box-shadow: 0 8px 20px rgba(66, 42, 17, 0.06);
    cursor: pointer;
    font-size: 16px;
    transition: transform 160ms ease, border-color 160ms ease;
  }

  .homeV3FaqHeadingActions button:hover {
    transform: translateY(-2px);
    border-color: rgba(164, 119, 43, 0.46);
  }

  .homeV3FaqCarousel {
    display: flex;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    scrollbar-width: none;
  }

  .homeV3FaqCarousel::-webkit-scrollbar {
    display: none;
  }

  .homeV3FaqPage {
    flex: 0 0 100%;
    min-width: 100%;
    scroll-snap-align: start;
    box-sizing: border-box;
  }

  .homeV3FaqPageGrid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .homeV3FaqPage .homeV3FaqItem {
    width: 100%;
    box-sizing: border-box;
  }

  .homeV3FaqPage .homeV3FaqItem summary {
    cursor: pointer;
  }

  .homeV3FaqPage .homeV3FaqAnswer {
    padding-top: 0;
  }

  .homeV3FaqPage .homeV3FaqItem[open] .homeV3FaqAnswer {
    padding-top: 14px;
  }

  .homeV3FaqPage .homeV3FaqPlus {
    transition: transform 180ms ease;
  }

  .homeV3FaqPage .homeV3FaqItem[open] .homeV3FaqPlus {
    transform: rotate(45deg);
  }

  @media (max-width: 900px) {
    .homeV3LiveArchive,
    .homeV3AudioEnergy {
      padding: 58px 0 64px;
    }

    .homeV3LiveArchiveInner,
    .homeV3AudioEnergyInner {
      width: min(100% - 34px, 760px);
    }

    .homeV3LiveArchiveHeading,
    .homeV3AudioEnergyHeading {
      grid-template-columns: 1fr;
      gap: 24px;
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

    .homeV3FaqPageGrid {
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

    /* SAYFAYLA BİRLİKTE GEZEN YUKARI OK */
    .homeV3Page .siteGlobalBackToTop,
    .siteGlobalBackToTop {
      position: fixed !important;

      right: 20px !important;
      bottom: 22px !important;

      width: 62px !important;
      height: 62px !important;

      margin: 0 !important;
      padding: 0 !important;

      display: flex !important;
      align-items: center !important;
      justify-content: center !important;

      border: 1px solid rgba(210, 164, 79, 0.60) !important;
      border-radius: 50% !important;

      background: rgba(43, 29, 19, 0.97) !important;
      color: #e0ad50 !important;

      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18) !important;

      text-decoration: none !important;

      opacity: 1 !important;
      visibility: visible !important;
      pointer-events: auto !important;

      transform: none !important;

      z-index: 99997 !important;
    }

    .homeV3Page .siteGlobalBackToTop > span,
    .siteGlobalBackToTop > span {
      width: 100% !important;
      height: 100% !important;

      display: flex !important;
      align-items: center !important;
      justify-content: center !important;

      margin: 0 !important;
      padding: 0 !important;

      color: #e0ad50 !important;

      font-family: Arial, Helvetica, sans-serif !important;
      font-size: 34px !important;
      font-weight: 900 !important;
      line-height: 1 !important;

      text-align: center !important;

      opacity: 1 !important;
      visibility: visible !important;

      transform: translateY(-2px) scaleX(1.18) !important;
    }
  }

`;

export default function HomePageClient() {
  const otherWorksSliderRef =
    useRef<HTMLDivElement>(null);

  const faqSliderRef =
    useRef<HTMLDivElement>(null);

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [heroVideoStarted, setHeroVideoStarted] =
    useState(false);

  function scrollOtherWorks(
    direction: "left" | "right",
  ) {
    const slider =
      otherWorksSliderRef.current;

    if (!slider) return;

    const firstCard =
      slider.querySelector<HTMLElement>(
        ".homeV3OtherCard",
      );

    const amount = firstCard
      ? firstCard.offsetWidth + 38
      : slider.clientWidth * 0.8;

    const maxScroll =
      slider.scrollWidth - slider.clientWidth;

    const atStart = slider.scrollLeft <= 6;
    const atEnd =
      slider.scrollLeft >= maxScroll - 6;

    if (direction === "right" && atEnd) {
      slider.scrollTo({
        left: 0,
        behavior: "smooth",
      });
      return;
    }

    if (direction === "left" && atStart) {
      slider.scrollTo({
        left: maxScroll,
        behavior: "smooth",
      });
      return;
    }

    slider.scrollBy({
      left:
        direction === "right"
          ? amount
          : -amount,
      behavior: "smooth",
    });
  }


  function scrollFaq(
    direction: "left" | "right",
  ) {
    const slider = faqSliderRef.current;

    if (!slider) return;

    slider.scrollBy({
      left:
        direction === "right"
          ? slider.clientWidth
          : -slider.clientWidth,
      behavior: "smooth",
    });
  }

  const faqPages = [
    faqs.slice(0, 10),
    faqs.slice(10, 20),
  ];

  return (
    <main className="homeV3Page" id="top">
      <style>{homepageArchiveStyles}</style>
      {/* NAVBAR */}

      <header className="homeV3Nav">
        <div className="homeV3NavInner">
          <a className="homeV3Brand" href="/">
            <strong>
              GOLDKOZMOS<sup>®</sup>
            </strong>
            <span>REZONANS EKOLÜ</span>
          </a>

          <nav className="homeV3Menu">
            <a href="/">Ana Sayfa</a>
            <a href="#rezonans">Atölyeler</a>
            <a href="#diger">Çalışmalar</a>
            <a href="/goldbook">GoldBook</a>
            <a href="/goldcast">GoldCast</a>
            <a href="/goldfrekans">GoldFrekans</a>
            <a href="/goldblog">GoldBlog</a>
            <a href="/hakkimda">Hakkımda</a>
            <a href="#sss">SSS</a>
          </nav>

          <a
            className="homeV3NavTest"
            href="/sana-uygun-calismayi-bul"
          >
            Ücretsiz Test
            <span>→</span>
          </a>

          <button
            type="button"
            className={`homeV3MobileMenuButton ${
              mobileMenuOpen ? "isOpen" : ""
            }`}
            aria-label={mobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={mobileMenuOpen}
            aria-controls="homeV3MobileMenu"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <div
          id="homeV3MobileMenu"
          className={`homeV3MobileMenu ${
            mobileMenuOpen ? "isOpen" : ""
          }`}
          aria-hidden={!mobileMenuOpen}
        >
          <nav>
            <a href="/" onClick={() => setMobileMenuOpen(false)}>
              Ana Sayfa
            </a>
            <a href="#rezonans" onClick={() => setMobileMenuOpen(false)}>
              Atölyeler
            </a>
            <a href="#diger" onClick={() => setMobileMenuOpen(false)}>
              Çalışmalar
            </a>
            <a href="/goldbook" onClick={() => setMobileMenuOpen(false)}>
              GoldBook
            </a>
            <a href="/goldcast" onClick={() => setMobileMenuOpen(false)}>
              GoldCast
            </a>
            <a href="/goldfrekans" onClick={() => setMobileMenuOpen(false)}>
              GoldFrekans
            </a>
            <a href="/goldblog" onClick={() => setMobileMenuOpen(false)}>
              GoldBlog
            </a>
            <a href="/hakkimda" onClick={() => setMobileMenuOpen(false)}>
              Hakkımda
            </a>
            <a href="#sss" onClick={() => setMobileMenuOpen(false)}>
              SSS
            </a>
          </nav>

          <a
            href="/sana-uygun-calismayi-bul"
            className="homeV3MobileMenuTest"
            onClick={() => setMobileMenuOpen(false)}
          >
            Ücretsiz Test
            <span>→</span>
          </a>
        </div>

        {mobileMenuOpen && (
          <button
            type="button"
            className="homeV3MobileMenuBackdrop"
            aria-label="Menüyü kapat"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </header>

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

              <div className="homeV3HeroButtons">
                <a
                  className="homeV3PrimaryButton"
                  href="#rezonans"
                >
                  Çalışmaları Keşfet
                  <span>→</span>
                </a>

                <a
                  className="homeV3SecondaryButton"
                  href="/hakkimda"
                >
                  Hakkımda
                </a>
              </div>

              <div className="homeV3HeroLine">
                <span>✦</span>
                <p>İnsan değişmeden hayat değişmez.</p>
              </div>
            </div>

            <div className="homeV3HeroProfileWrap">
              <div className="homeV3HeroVisual homeV3HeroPortrait homeV3HeroVideoPortrait">
                {!heroVideoStarted ? (
                  <button
                    type="button"
                    className="homeV3HeroVideoCover"
                    onClick={() => setHeroVideoStarted(true)}
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
                ) : (
                  <video
                    className="homeV3HeroVideo"
                    autoPlay
                    playsInline
                    controls
                    preload="auto"
                    aria-label="Özge Batıgün Goldkozmos tanıtım videosu"
                  >
                    <source
                      src="/videos/goldkozmos-tanitim.mp4"
                      type="video/mp4"
                    />
                    Tarayıcınız video etiketini desteklemiyor.
                  </video>
                )}

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
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.name}
                      title={social.name}
                    >
                      <SocialIcon
                        platform={social.platform}
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="homeHeroMiniTest">
              <div className="homeHeroMiniTestIcon">
                <span>✦</span>
              </div>

              <div className="homeHeroMiniTestCopy">
                <p>ÜCRETSİZ ARKETİP TESTİ</p>

                <h2>
                  Kendine hangi
                  <span> arketipten bakıyorsun?</span>
                </h2>
              </div>

              <a href="/sana-uygun-calismayi-bul">
                Teste Başla
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* REZONANS */}

      <section
        className="homeV3Resonance"
        id="rezonans"
      >
        <div className="homeV3Container">
          <div className="homeV3SectionHeading">
            <div>
              <p className="homeV3Eyebrow">
                REZONANS ATÖLYELERİ
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
            {resonanceWorks.map((work) => (
              <article
                className="homeV3ResonanceCard"
                key={work.title}
              >
                <a
                  className="homeV3ResonanceImage"
                  href={work.href}
                >
                  <img
                    src={work.image}
                    alt={work.title}
                  />
                </a>

                <div className="homeV3ResonanceContent">
                  <p className="homeV3CardEyebrow">
                    {work.eyebrow}
                  </p>

                  <h3>{work.title}</h3>

                  <p className="homeV3ResonanceText">
                    {work.text}
                  </p>

                  <div className="homeV3ResonanceMeta">
                    <span>5 Gün</span>
                    <span>75–90 dk</span>
                    <span>Google Meet</span>
                  </div>

                  <div className="homeV3ResonanceBottom">
                    <strong>{work.price}</strong>

                    <a href={work.href}>
                      Detayları Gör
                      <span>→</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
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
                <div>
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

                <div className="homeV3OtherSliderControls">
                  <button
                    type="button"
                    onClick={() =>
                      scrollOtherWorks("left")
                    }
                    aria-label="Önceki çalışmalar"
                  >
                    ←
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      scrollOtherWorks("right")
                    }
                    aria-label="Sonraki çalışmalar"
                  >
                    →
                  </button>
                </div>
              </div>

              <div
                className="homeV3OtherSlider"
                ref={otherWorksSliderRef}
              >
                {otherWorks.map((work) => (
                  <a
                    className="homeV3OtherCard"
                    href={work.href}
                    key={work.title}
                  >
                    <div className="homeV3OtherVisual">
                      <img
                        src={work.image}
                        alt={work.title}
                      />

                      <div
                        className="homeV3OtherVisualShade"
                        aria-hidden="true"
                      />

                      <span className="homeV3OtherVisualNumber">
                        {work.number}
                      </span>

                      <span className="homeV3OtherVisualArrow">
                        ↗
                      </span>
                    </div>

                    <div className="homeV3OtherContent">
                      <div>
                        <h3>{work.title}</h3>
                        <p>{work.text}</p>
                      </div>

                      <strong>{work.price}</strong>
                    </div>
                  </a>
                ))}
              </div>

              <div
                className="homeV3OtherScrollHint"
                aria-hidden="true"
              >
                <span>←</span>
                <p>Yana kaydır</p>
                <span>→</span>
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

                  <span
                    className="homeV3LiveArchivePlay"
                    aria-hidden="true"
                  >
                    ▶
                  </span>
                </a>

                <div className="homeV3LiveArchiveBody">
                  <p>{recording.category}</p>

                  <h3>{recording.title}</h3>

                  <div className="homeV3LiveArchiveText">
                    {recording.text}
                  </div>

                  <div className="homeV3LiveArchiveBottom">
                    <strong>{recording.price}</strong>

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

                  <span
                    className="homeV3AudioEnergyPlay"
                    aria-hidden="true"
                  >
                    ▶
                  </span>
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

      {/* GOLDBOOK + BAĞLANTI TELEFONLARI */}

      <section
        className="homeV3LibraryHub"
        id="goldbook"
      >
        <div className="homeV3Container">
          <div className="homeV3LibraryShowcase">
            {/* SOL: GOLDBOOK */}

            <div className="homeV3LibraryBooks">
              <div className="homeV3LibraryHeading">
                <div>
                  <p className="homeV3Eyebrow">
                    GOLDBOOK
                  </p>

                  <h2>
                    Okumak için değil,
                    <span> kendine dönmek için.</span>
                  </h2>
                </div>

                <a
                  href="/goldbook"
                  className="homeV3LibraryAll"
                >
                  Tüm GoldBook’lar
                  <span>→</span>
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
                          <span>→</span>
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* SAĞ: İKİ TELEFON */}

            <aside className="homeV3PhoneZone">
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
                {/* INSTAGRAM TELEFONU */}

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
                          <SocialIcon platform="instagram" />
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

                {/* WHATSAPP TELEFONU */}

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
                          <SocialIcon platform="whatsapp" />
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
            </aside>
          </div>
        </div>
      </section>

      {/* SSS */}

      <section className="homeV3Faq" id="sss">
        <div className="homeV3Container">
          <div className="homeV3FaqHeading">
            <div>
              <p className="homeV3Eyebrow">
                SIK SORULAN SORULAR
              </p>

              <h2>
                Merak ettiklerin,
                <span> tek bir yerde.</span>
              </h2>
            </div>

            <div>
              <p>
                Atölyelerden birebir çalışmalara, GoldBook içeriklerinden
                kayıtlı yayınlara kadar en sık sorulan sorular.
              </p>

              <div className="homeV3FaqHeadingActions">
                <button
                  type="button"
                  onClick={() => scrollFaq("left")}
                  aria-label="Önceki SSS sayfası"
                >
                  ←
                </button>

                <button
                  type="button"
                  onClick={() => scrollFaq("right")}
                  aria-label="Sonraki SSS sayfası"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          <div
            className="homeV3FaqCarousel"
            ref={faqSliderRef}
          >
            {faqPages.map((page, pageIndex) => (
              <div
                className="homeV3FaqPage"
                key={`faq-page-${pageIndex}`}
              >
                <div className="homeV3FaqPageGrid">
                  {page.map((faq, index) => {
                    const itemNumber =
                      pageIndex * 10 + index + 1;

                    return (
                      <details
                        className="homeV3FaqItem"
                        key={faq.question}
                      >
                        <summary>
                          <span className="homeV3FaqNumber">
                            {String(itemNumber).padStart(2, "0")}
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
                    );
                  })}
                </div>
              </div>
            ))}
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
      >
        <span>↑</span>
      </a>
    </main>
  );
}