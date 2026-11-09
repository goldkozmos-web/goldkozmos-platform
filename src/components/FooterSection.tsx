import CookiePreferencesButton from "./analytics/CookiePreferencesButton";
import { APPOINTMENT_WHATSAPP_URL } from "../lib/appointments";
import Link from "next/link";

const platformLinks = [
  { label: "Kozmik Enerji", href: "/kozmik-enerji" },
  { label: "Birebir Kişisel Gelişim", href: "/kisisel-gelisim" },
  { label: "Enerji Çalışmaları", href: "/calismalar/enerji-calismalari" },
  { label: "Tarot Kartları", href: "/tarot-kartlari" },
  { label: "Rüya Yorumları", href: "/ruya-tabirleri" },
  { label: "Burçlar", href: "/burclar" },
  {
    label: "Rezonans Ekolü",
    href: "/enerji-ekolu",
  },
  {
    label: "Çalışmalar",
    href: "/calismalar",
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
    label: "GoldRitüel",
    href: "/goldrituel",
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
    href: APPOINTMENT_WHATSAPP_URL,
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
              Özge Batıgün ile kozmik enerji ve kişisel gelişim.
              Online birebir çalışmalar, farkındalık içerikleri
              ve kendi yolculuğuna eşlik eden dijital kitaplar.
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
          <CookiePreferencesButton />
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
