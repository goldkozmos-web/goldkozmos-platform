"use client";

import { useRef } from "react";
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
    question: "Birebir çalışma seçenekleri neler?",
    answer:
      "Belirli bir konuya odaklanan tek birebir seans veya aynı konu üzerinde beş gün boyunca ilerleyen yoğun birebir paket seçebilirsin.",
  },
  {
    question: "Canlı yayın kayıtlarına sonradan erişebilir miyim?",
    answer:
      "Satışa açılan geçmiş canlı çalışmalar, kayıtlı içerik olarak kendi zamanında izleyebileceğin şekilde sunulur.",
  },
  {
    question: "GoldBook içerikleri nasıl satın alınır?",
    answer:
      "GoldBook çalışmalarını ilgili ürün kartındaki Shopier bağlantısı üzerinden satın alabilirsin.",
  },
  {
    question: "Goldkozmos çalışmaları terapi yerine geçer mi?",
    answer:
      "Hayır. Goldkozmos içerikleri ve çalışmaları kişisel farkındalık ve bireysel gelişim amacıyla hazırlanır; psikoterapi, psikolojik danışmanlık, tıbbi teşhis veya tedavi yerine geçmez.",
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

export default function HomePage() {
  const otherWorksSliderRef =
    useRef<HTMLDivElement>(null);

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

    slider.scrollBy({
      left:
        direction === "right"
          ? amount
          : -amount,
      behavior: "smooth",
    });
  }

  return (
    <main className="homeV3Page" id="top">
      {/* NAVBAR */}

      <header className="homeV3Nav">
        <div className="homeV3NavInner">
          <a className="homeV3Brand" href="/">
            <strong>
              GOLDKOZMOS<sup>®</sup>
            </strong>
            <span>ENERJİ EKOLÜ</span>
          </a>

          <nav className="homeV3Menu">
            <a href="/">Ana Sayfa</a>
            <a href="#rezonans">Atölyeler</a>
            <a href="#diger">Çalışmalar</a>
            <a href="/goldbook">GoldBook</a>
            <a href="/goldcast">GoldCast</a>
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
        </div>
      </header>

      {/* HERO */}

      <section className="homeV3Hero">
        <div className="homeV3Container">
          <div className="homeV3HeroCard">
            <div className="homeV3HeroCopy">
              <p className="homeV3Eyebrow">
                GOLDKOZMOS<sup>®</sup> ENERJİ EKOLÜ
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
                  href="/sana-uygun-calismayi-bul"
                >
                  Ücretsiz Test
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
              <div className="homeV3HeroVisual homeV3HeroPortrait">
                <img
                  src="/images/services/ozge-batigun-hakkimda.webp"
                  alt="Özge Batıgün"
                />

                <div className="homeV3HeroVisualTag">
                  <span>GOLDKOZMOS®</span>
                  <strong>
                    Kişisel gelişim · Stoa · Rezonans
                  </strong>
                </div>
              </div>

              <div className="homeV3HeroProfileName">
                <strong>Özge Batıgün</strong>
                <span>Goldkozmos® Enerji Ekolü</span>

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
                Nereden
                <span> başlamak istiyorsun?</span>
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

      {/* DİĞER ÇALIŞMALAR + CANLI KAYIT */}

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
                    DİĞER ÇALIŞMALAR
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

            <aside className="homeV3RecordingSide">
              <div className="homeV3RecordingSideHeading">
                <p className="homeV3Eyebrow">
                  CANLI YAYIN KAYITLARI
                </p>

                <h2>
                  Kaçırdığın çalışmaları
                  <span> kendi zamanında izle.</span>
                </h2>
              </div>

              {recordings.map((recording) => (
                <article
                  className="homeV3RecordingSideCard"
                  key={recording.title}
                >
                  <a
                    href={recording.href}
                    className="homeV3RecordingSideImage"
                  >
                    <img
                      src={recording.image}
                      alt={recording.title}
                    />

                    <span aria-hidden="true">▶</span>
                  </a>

                  <div className="homeV3RecordingSideContent">
                    <p>{recording.category}</p>

                    <h3>{recording.title}</h3>

                    <div className="homeV3RecordingSideText">
                      {recording.text}
                    </div>

                    <div className="homeV3RecordingSideBottom">
                      <strong>
                        {recording.price}
                      </strong>

                      <a href={recording.href}>
                        İncele
                        <span>→</span>
                      </a>
                    </div>
                  </div>
                </article>
              ))}

              <div className="homeV3RecordingSideFuture">
                <span>✦</span>

                <p>
                  Yeni kayıtlar eklendikçe
                  <strong> burada yerini alacak.</strong>
                </p>
              </div>
            </aside>
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
                        <span>GOLDKOZMOS® ENERJİ EKOLÜ</span>

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

            <p>
              Atölyelerden birebir çalışmalara, GoldBook içeriklerinden
              kayıtlı yayınlara kadar en sık sorulan sorular.
            </p>
          </div>

          <div className="homeV3FaqList">
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
      </section>

      {/* FOOTER */}

      <FooterSection />
    </main>
  );
}