import Link from "next/link";

const platformLinks = [
  {
    label: "Enerji Ekolü",
    href: "/enerji-ekolu",
  },
  {
    label: "Çalışmalar",
    href: "/calismalar",
  },
  {
    label: "GoldBook",
    href: "/goldbook",
  },
  {
    label: "GoldCast",
    href: "/goldcast",
  },
  {
    label: "GoldBlog",
    href: "/goldblog",
  },
  {
    label: "GoldFrekans",
    href: "/goldfrekans",
  },
  {
    label: "Etkinlikler",
    href: "/etkinlikler",
  },
  {
    label: "Hakkımda",
    href: "/hakkimda",
  },
];

const supportLinks = [
  {
    label: "Sana Uygun Çalışmayı Bul",
    href: "/sana-uygun-calismayi-bul",
  },
  {
    label: "Sıkça Sorulan Sorular",
    href: "/#sikca-sorulan-sorular",
  },
  {
    label: "Danışan Deneyimleri",
    href: "/danisan-deneyimleri",
  },
  {
    label: "WhatsApp Kanalı",
    href: "/whatsapp-kanali",
  },
  {
    label: "Randevu Al",
    href: "/randevu",
  },
  {
    label: "İletişim",
    href: "/iletisim",
  },
];

const legalLinks = [
  {
    label: "Gizlilik Politikası",
    href: "/gizlilik-politikasi",
  },
  {
    label: "KVKK Aydınlatma Metni",
    href: "/kvkk-aydinlatma-metni",
  },
  {
    label: "Kullanım Koşulları",
    href: "/kullanim-kosullari",
  },
  {
    label: "İptal ve İade Politikası",
    href: "/iptal-ve-iade-politikasi",
  },
  {
    label: "Mesafeli Satış Sözleşmesi",
    href: "/mesafeli-satis-sozlesmesi",
  },
  {
    label: "Erişilebilirlik",
    href: "/erisilebilirlik",
  },
];

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footerSection">
      <div className="footerContainer">
        <div className="footerMain">
          <div className="footerBrand">
            <Link
              href="/"
              className="footerBrandLogo"
              aria-label="Goldkozmos Enerji Ekolü ana sayfa"
            >
              <span>
                Goldkozmos
                <sup className="registeredSymbol">®</sup>
              </span>

              <small>Enerji Ekolü</small>
            </Link>

            <h2>
              İnsan değişmeden
              <span> hayat değişmez.</span>
            </h2>

            <p>
              Spiritüel Stoa, sosyoloji ve Goldkozmos® Enerji Ekolü’ne özgü
              yaklaşımın bir araya geldiği farkındalık ve içsel dönüşüm
              ekosistemi.
            </p>

            <div className="footerBrandMotto">
              <span />
              <small>Kendi Kozmosunu Bul.</small>
            </div>

            <div className="footerSocialLinks">
              <a
                href="https://www.instagram.com/goldkozmos/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
                <span aria-hidden="true">↗</span>
              </a>

              <Link href="/whatsapp-kanali">
                WhatsApp
                <span aria-hidden="true">↗</span>
              </Link>

              <Link href="/goldcast">
                GoldCast
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          <div className="footerNavigation">
            <div className="footerLinkColumn">
              <p>PLATFORM</p>

              <nav aria-label="Platform bağlantıları">
                {platformLinks.map((link) => (
                  <Link href={link.href} key={link.href}>
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="footerLinkColumn">
              <p>DESTEK</p>

              <nav aria-label="Destek bağlantıları">
                {supportLinks.map((link) => (
                  <Link href={link.href} key={link.href}>
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="footerLinkColumn">
              <p>YASAL</p>

              <nav aria-label="Yasal bağlantılar">
                {legalLinks.map((link) => (
                  <Link href={link.href} key={link.href}>
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="footerContact">
          <div>
            <p>GOLDKOZMOS® ENERJİ EKOLÜ</p>

            <h3>
              Sana uygun başlangıç noktasını birlikte keşfedelim.
            </h3>
          </div>

          <div className="footerContactActions">
            <Link href="/sana-uygun-calismayi-bul">
              Çalışmanı Bul
              <span aria-hidden="true">→</span>
            </Link>

            <Link href="/randevu">
              Randevu Al
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <div className="footerBottom">
          <p>
            © {currentYear} Goldkozmos® Enerji Ekolü. Tüm hakları saklıdır.
          </p>

          <p>
            Sunulan içerikler kişisel farkındalık amacı taşır; tıbbi,
            psikolojik veya hukuki danışmanlık yerine geçmez.
          </p>

          <a href="#top" aria-label="Sayfanın başına dön">
            Yukarı Dön
            <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}