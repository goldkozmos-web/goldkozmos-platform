import Link from "next/link";

const platformLinks = [
  {
    label: "Rezonans Ekolü",
    href: "/enerji-ekolu",
  },
  {
    label: "Çalışmalar",
    href: "/#diger",
  },
  {
    label: "Rezonans Eğitimleri",
    href: "/rezonans-egitimleri",
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
    label: "GoldMind",
    href: "/goldmind",
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
    href: "/#sss",
  },
  {
    label: "WhatsApp Kanalı",
    href: "/whatsapp-kanali",
  },
  {
    label: "Randevu Al",
    href: "/randevu-al",
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
              aria-label="Goldkozmos Rezonans Ekolü ana sayfa"
            >
              <span>
                Goldkozmos
                <sup className="registeredSymbol">®</sup>
              </span>

              <small>Rezonans Ekolü</small>
            </Link>

            <h2>
              İnsan değişmeden
              <span> hayat değişmez.</span>
            </h2>

            <p>
              Spiritüel Stoa, sosyoloji ve Goldkozmos® Rezonans
              Ekolü’ne özgü yaklaşımın bir araya geldiği farkındalık
              ve içsel dönüşüm ekosistemi.
            </p>

            <div className="footerBrandMotto">
              <span />
              <small>Kendi Kozmosunu Bul.</small>
            </div>
          </div>

          <div className="footerNavigation">
            <div className="footerLinkColumn">
              <p>PLATFORM</p>

              <nav aria-label="Platform bağlantıları">
                {platformLinks.map((link) => (
                  <Link href={link.href} key={link.label}>
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="footerLinkColumn">
              <p>DESTEK</p>

              <nav aria-label="Destek bağlantıları">
                {supportLinks.map((link) => (
                  <Link href={link.href} key={link.label}>
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="footerLinkColumn">
              <p>YASAL</p>

              <nav aria-label="Yasal bağlantılar">
                {legalLinks.map((link) => (
                  <Link href={link.href} key={link.label}>
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="footerBottom">
          <p>
            © {currentYear} Goldkozmos® Rezonans Ekolü. Tüm hakları
            saklıdır.
          </p>

          <p>
            Sunulan içerikler kişisel farkındalık amacı taşır; tıbbi,
            psikolojik veya hukuki danışmanlık yerine geçmez.
          </p>
        </div>
      </div>
    </footer>
  );
}