import { APPOINTMENT_WHATSAPP_URL } from "../../lib/appointments";
import Link from "next/link";
import Image from "next/image";
import HomeNavbar from "../../components/HomeNavbar";
import FooterSection from "../../components/FooterSection";
import { pageMetadata } from "../../lib/seo";
import "../../styles/home.css";
import "../../styles/energy-discovery.css";

export const metadata = pageMetadata("/randevu", "Kozmik Enerji ve Birebir Çalışma Randevusu", "Özge Batıgün ile online kozmik enerji ve kişisel gelişim çalışması için randevu talebi oluştur. WhatsApp üzerinden ilgilendiğin çalışmayı belirt, uygun gün ve saati birlikte netleştirelim.");

export default function AppointmentPage() {
  return (
    <main className="homeV3Page energyDiscovery" id="top">
      <HomeNavbar />
      <header className="energyDiscoveryHero"><div className="energyDiscoveryHeroArt"><Image src="/images/page-heroes/randevu.webp" alt="" fill sizes="100vw" preload /></div><div className="energyDiscoveryInner"><p className="energyDiscoveryEyebrow">ÖZGE BATIGÜN · ONLINE / BİREBİR</p><h1>Kendine zaman ayır.<br /><span>Çalışman için randevu iste.</span></h1><p>Kozmik enerji veya kişisel gelişim çalışman için WhatsApp üzerinden yaz. Uygun gün ve saati birlikte netleştirelim.</p><div className="energyDiscoveryActions"><Link href={APPOINTMENT_WHATSAPP_URL}>WhatsApp’tan randevu al →</Link><Link href="/calismalar/enerji-calismalari">Enerji çalışmalarını incele</Link></div></div></header>
      <div className="energyDiscoveryInner energyDiscoveryBody"><section className="energyDiscoverySection"><h2>Randevu süreci nasıl ilerler?</h2><ol className="energyDiscoverySteps"><li><h3>Çalışmanı seç</h3><p>Çakra dengeleme ve diğer enerji çalışmaları 30 dakikalık online seanslardır. Kişisel gelişim odaklı birebir seçeneklerin süresini kendi detaylarından inceleyebilirsin.</p></li><li><h3>Tercih ettiğin günü belirt</h3><p>Randevu al bağlantısına dokunarak doğrudan WhatsApp sohbetimizi aç. İlgilendiğin çalışmayı ve uygun olduğun günleri mesajında belirt.</p></li><li><h3>Saatini netleştir</h3><p>Gün seçimi otomatik randevu onayı değildir. Uygun gün ve saat karşılıklı iletişimle netleşir; satın alma ve katılım ayrıntıları çalışmanın koşullarına göre ilerler.</p></li></ol><div className="energyDiscoveryRelated"><Link href="/kozmik-enerji">Kozmik enerji yaklaşımımız</Link><Link href="/calismalar/birebir-seanslar">Kişisel gelişim seansları</Link><Link href="/iletisim">İletişim ve soruların</Link></div></section></div>
      <FooterSection />
    </main>
  );
}
