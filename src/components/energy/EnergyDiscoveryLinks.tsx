"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import EnergyDiscoveryPopup from "./EnergyDiscoveryPopup";
import "../../styles/reading-work-invitation.css";

export default function EnergyDiscoveryLinks() {
  const pathname = usePathname();
  const tarot = /^\/tarot-kartlari(\/|$)/.test(pathname);
  const zodiac = /^\/burclar(\/|$)/.test(pathname);
  if (tarot || zodiac) return <>
    <section className="readingWorkInvitation" aria-label="Online birebir çalışma seçenekleri">
      <div className="readingWorkInvitationArt"><Image src="/images/services/birebir-enerji-bagi-premium-v2.webp" alt="" fill sizes="(max-width:600px) 90vw, 280px" /></div>
      <div className="readingWorkInvitationCopy">
        <p className="readingWorkInvitationEyebrow">OKUMADAN KENDİ DENEYİMİNE</p>
        <h2>{tarot ? "Kartın anlattığı tema sende neye dokunuyor?" : "Yorumun ötesinde, kendi deneyimine alan aç."}</h2>
        <p>{tarot ? "İlişkiler, sınırlar veya özdeğer hakkında düşündüklerini birebir konuşmak istersen, 90 dakikalık görüşmenin içeriğini inceleyebilirsin." : "İlişkilerinde tekrar eden durumları, ihtiyaçlarını ve sınırlarını konuşmak istersen, birebir görüşme seçeneklerini keşfedebilirsin."}</p>
        <div className="readingWorkInvitationFacts"><span>90 dakika</span><span>Online birebir</span><span>2.000 TL</span></div>
        <p className="readingWorkInvitationNote">Önce sen anlatırsın; ardından ele aldığımız konuya yönelik kozmik enerji çalışması yaparız.</p>
        <div className="readingWorkInvitationActions"><Link href="/calismalar/detay/tek-birebir-seans">Birebir seansın içeriğini gör <span aria-hidden="true">↗</span></Link><Link href="/calismalar/enerji-calismalari">30 dakikalık enerji çalışmalarını keşfet →</Link></div>
      </div>
    </section>
    <EnergyDiscoveryPopup key={pathname} />
  </>;
  return <section className="energyDiscoveryBooking energyDiscoveryVisualBooking" aria-label="Kozmik enerji ve kişisel gelişim çalışmaları">
    <Image src="/images/goldblog/kozmik-enerji-editorial.webp" alt="" fill sizes="(max-width:700px) 90vw, 1120px" />
    <div className="energyDiscoveryBookingCopy">
    <p className="energyDiscoveryEyebrow">KEŞİFTEN KENDİ YOLCULUĞUNA</p>
    <h2>Kozmik enerji çalışmalarını keşfet.</h2>
    <p>Okudukların kendine dönmek için bir başlangıç olabilir. Kendine zaman ayırmak istersen Özge Batıgün ile online kozmik enerji çalışmalarının içeriklerini, sürelerini ve ücretlerini inceleyebilirsin.</p>
    <div className="energyDiscoveryActions"><Link href="/calismalar/enerji-calismalari">Kozmik enerji çalışmalarını incele →</Link><Link href="/kozmik-enerji">Kozmik enerji nedir?</Link></div>
    </div>
  </section>;
}
