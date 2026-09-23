import Link from "next/link";

import { TAROT_SHOP_PATH } from "../../lib/tarot/urls";

export default function TarotConvert() {
  return (
    <>
      <div className="tarotCta">
        <div className="tarotCtaMedia">
          <img
            src="/images/services/tarot-farkindalik.webp"
            alt="GoldKozmos tarot bakımı"
          />
        </div>
        <div className="tarotCtaCopy">
          <p className="tarotEyebrow">BİREBİR BAKIM</p>
          <h2>Daha Detaylı Bir Tarot Bakımı İster misin?</h2>
          <p>
            Kendi soruna ve mevcut enerjine özel daha kapsamlı bir tarot bakımı
            için birebir bakım oluşturabilirsin.
          </p>
          <div className="tarotCtaActions">
            <a className="tarotBtn tarotCtaPrimary" href={TAROT_SHOP_PATH}>
              Online Tarot Baktır
            </a>
          </div>
        </div>
      </div>
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
    </>
  );
}
