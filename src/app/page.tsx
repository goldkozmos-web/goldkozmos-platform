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
    price: "2.500 TL",
    href: "/calismalar/birebir-seanslar",
  },
  {
    number: "02",
    title: "5 Günlük Yoğun Paket",
    text: "Beş gün boyunca aynı konu üzerinde birebir ilerleyen yoğun çalışma.",
    price: "5.000 TL",
    href: "/calismalar/birebir-seanslar",
  },
  {
    number: "03",
    title: "Tarot Farkındalık Okuması",
    text: "Kartların sembolik dili üzerinden mevcut durumuna farklı bir açıdan bak.",
    price: "600 TL",
    href: "/calismalar/tarot",
  },
  {
    number: "04",
    title: "Numeroloji Analizi",
    text: "Doğum tarihi ve isim üzerinden kişisel eğilimlerini sembolik olarak incele.",
    price: "350 TL",
    href: "/calismalar/numeroloji",
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
            <a href="#rezonans">Atölyeler</a>
            <a href="#diger">Çalışmalar</a>
            <a href="/goldbook">GoldBook</a>
            <a href="/goldcast">GoldCast</a>
            <a href="/goldblog">GoldBlog</a>
            <a href="/hakkimda">Hakkımda</a>
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

            {/* PROFİL */}

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
                      <SocialIcon platform={social.platform} />
                    </a>
                  ))}
                </div>
              </div>
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

      {/* ARKETİP TESTİ */}

      <section className="homeV3TestSection">
        <div className="homeV3Container">
          <div className="homeV3TestCard">
            <div className="homeV3TestSymbol">
              <span>✦</span>
              <span>◯</span>
            </div>

            <div className="homeV3TestCopy">
              <p className="homeV3Eyebrow">
                ÜCRETSİZ ARKETİP TESTİ
              </p>

              <h2>
                Kendine hangi
                <span> arketipten bakıyorsun?</span>
              </h2>

              <p>
                Kısa testi tamamla ve kendilik yapında öne
                çıkan arketipsel eğilimi keşfet.
              </p>
            </div>

            <a
              className="homeV3LightButton"
              href="/sana-uygun-calismayi-bul"
            >
              Teste Başla
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* DİĞER ÇALIŞMALAR */}

      <section
        className="homeV3Other"
        id="diger"
      >
        <div className="homeV3Container">
          <div className="homeV3SectionHeading">
            <div>
              <p className="homeV3Eyebrow">
                DİĞER ÇALIŞMALAR
              </p>

              <h2>
                Daha
                <span> kişisel bir alan.</span>
              </h2>
            </div>

            <p>
              Tek bir konuya odaklanmak veya farklı bir
              farkındalık yöntemiyle ilerlemek isteyenler için.
            </p>
          </div>

          <div className="homeV3OtherGrid">
            {otherWorks.map((work) => (
              <a
                className="homeV3OtherCard"
                href={work.href}
                key={work.title}
              >
                <div className="homeV3OtherTop">
                  <span>{work.number}</span>
                  <span>↗</span>
                </div>

                <div>
                  <h3>{work.title}</h3>
                  <p>{work.text}</p>
                </div>

                <strong>{work.price}</strong>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* GOLDBOOK */}

      <section
        className="homeV3Books"
        id="goldbook"
      >
        <div className="homeV3Container">
          <div className="homeV3SectionHeading">
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
              className="homeV3TextLink"
              href="/goldbook"
            >
              Tüm GoldBook’lar
              <span>→</span>
            </a>
          </div>

          <div className="homeV3BooksGrid">
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
                    <strong>{book.price}</strong>

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
      </section>

      {/* SOSYAL */}

      <section className="homeV3Social">
        <div className="homeV3Container">
          <div className="homeV3SocialGrid">
            <a
              className="homeV3InstagramCard"
              href="https://www.instagram.com/goldkozmos?igsh=ODF4aWx1bndreDhq"
              target="_blank"
              rel="noreferrer"
            >
              <div className="homeV3InstagramPhoto">
                <img
                  src="/images/services/instagram-profile.webp"
                  alt="Goldkozmos Instagram"
                />
              </div>

              <div>
                <p className="homeV3Eyebrow">
                  INSTAGRAM
                </p>

                <h3>@goldkozmos</h3>

                <p>
                  Kendilik · İlişkiler · Bolluk · Stoa
                </p>
              </div>

              <span className="homeV3SocialArrow">
                ↗
              </span>
            </a>

            <a
              className="homeV3WhatsAppCard"
              href="https://whatsapp.com/channel/0029Vb8BNoHHwXbBIssG2k1s"
              target="_blank"
              rel="noreferrer"
            >
              <div>
                <p className="homeV3Eyebrow">
                  WHATSAPP KANALI
                </p>

                <h3>
                  Goldkozmos’tan
                  <span> haberdar kal.</span>
                </h3>

                <p>
                  Yeni çalışmalar, yayınlar ve duyurular
                  tek bir yerde.
                </p>
              </div>

              <span className="homeV3SocialArrow">
                →
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="homeV3Footer">
        <div className="homeV3FooterInner">
          <div className="homeV3FooterBrand">
            <strong>
              GOLDKOZMOS<sup>®</sup>
            </strong>

            <span>ENERJİ EKOLÜ</span>
          </div>

          <p>
            Kişisel gelişim · Stoa · Rezonans
          </p>

          <div className="homeV3FooterLinks">
            <a href="#top">Yukarı ↑</a>
            <a href="/goldblog">GoldBlog</a>
            <a href="/goldbook">GoldBook</a>
          </div>
        </div>
      </footer>
    </main>
  );
}