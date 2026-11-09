import Link from "next/link";
import HomeNavbar from "../../components/HomeNavbar";
import FooterSection from "../../components/FooterSection";
import { pageMetadata } from "../../lib/seo";
import "../../styles/home.css";
import "../../styles/energy-discovery.css";

export const metadata = pageMetadata("/erisilebilirlik", "Erişilebilirlik ve Kullanım Desteği", "Goldkozmos web sitesi için erişilebilirlik desteği, alternatif iletişim ve kullanım sırasında karşılaşılan sorunları bildirme seçenekleri.");
export default function AccessibilityPage() {
  return <main className="homeV3Page energyDiscovery"><HomeNavbar /><div className="energyDiscoveryInner energyDiscoveryBody"><section className="energyDiscoverySection"><h1>Erişilebilirlik ve kullanım desteği</h1><p>Goldkozmos içeriklerine ve çalışma bilgilerine daha rahat ulaşabilmen için siteyi geliştirmeye devam ediyoruz. Bir bağlantıya erişemiyor, bir formu kullanamıyor veya bir içeriği okuyamıyorsan bize bildirebilirsin.</p><h2>Alternatif iletişim</h2><p>Çalışma seçimi, ücretler ve randevu süreci hakkında doğrudan <a href="https://wa.me/905054722153" target="_blank" rel="noopener noreferrer">WhatsApp üzerinden destek isteyebilirsin</a>. İlgili sayfanın adresini ve yaşadığın sorunu paylaşman incelemeyi kolaylaştırır.</p><h2>Okuma ve gezinme</h2><p>Tarayıcının yakınlaştırma özelliğiyle metinleri büyütebilirsin. Bağlantılara ve düğmelere klavyenin Tab tuşuyla ulaşabilir, Enter tuşuyla açabilirsin. Tarayıcı veya yardımcı teknolojiyle ilgili bir kullanım sorunu yaşarsan <Link href="/iletisim">iletişim sayfasındaki kanalları</Link> kullanabilirsin.</p></section></div><FooterSection /></main>;
}
