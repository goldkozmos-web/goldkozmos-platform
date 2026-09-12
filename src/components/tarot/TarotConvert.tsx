import Link from "next/link";

import {
  TAROT_RANDEVU_PATH,
  TAROT_SHOP_PATH,
  TAROT_WHATSAPP_HREF,
} from "../../lib/tarot/urls";

export default function TarotConvert() {
  return (
    <>
      <div className="tarotLearn">
        <p className="tarotEyebrow">78 KART</p>
        <h2>Tarot Kartlarının Anlamlarını Öğren</h2>
        <p>
          78 tarot kartının sembollerini, enerjilerini ve spiritüel anlamlarını
          keşfet.
        </p>
        <Link className="tarotBtn" href="/tarot-kartlari">
          Tüm Kartları Keşfet
        </Link>
      </div>
      <div className="tarotCta">
        <h2>Daha Detaylı Bir Tarot Bakımı İster misin?</h2>
        <p>
          Kendi soruna ve mevcut enerjine özel daha kapsamlı bir tarot bakımı
          için birebir bakım oluşturabilirsin.
        </p>
        <a className="tarotBtn" href={TAROT_SHOP_PATH}>
          Online Tarot Baktır
        </a>
        <a className="tarotBtn tarotGhost" href={TAROT_RANDEVU_PATH}>
          Tarot Randevusu Al
        </a>
        <a
          className="tarotBtn tarotGhost"
          href={TAROT_WHATSAPP_HREF}
          target="_blank"
          rel="noreferrer"
        >
          Benimle İletişime Geç
        </a>
      </div>
    </>
  );
}
