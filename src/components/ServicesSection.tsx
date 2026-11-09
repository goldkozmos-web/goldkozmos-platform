import Link from "next/link";
import Image from "next/image";

export default function ServicesSection() {
  return (
    <section className="finderNextStep" aria-label="Çalışmaları keşfet">
      <div className="finderNextStepInner">
        <div className="finderNextStepMain">
          <div className="finderNextStepArt"><Image src="/images/services/kisisel-yol-secimi.webp" alt="Altın ışıklı üç kemere uzanan yollar" fill sizes="(max-width: 650px) 100vw, 350px" /></div>
          <div className="finderNextStepCopy"><p className="sectionEyebrow">SIRADAKİ ADIMIN</p><h2>Sana uygun <span>çalışmayı keşfet.</span></h2><p className="finderNextStepLead">İçeriği, süreyi ve ücreti karşılaştır. Karar vermeden önce ihtiyacına en yakın alanı tanı.</p><Link className="finderNextStepCta" href="/calismalar">Tüm çalışmaları incele <span aria-hidden="true">↗</span></Link></div>
        </div>
        <article className="finderCosmicInfo">
          <div className="finderCosmicArt"><Image src="/images/profilim/personal-cosmos.webp" alt="" fill sizes="(max-width: 650px) 100vw, 330px" /><span className="finderCosmicArtLabel" aria-hidden="true">GOLDKOZMOS · ENERJİ & FARKINDALIK</span></div>
          <div className="finderCosmicCopy"><p className="sectionEyebrow">YAKLAŞIMI TANI</p><h3>Kozmik enerji <span>nedir?</span></h3><p>Niyetini ve dikkatini kendine yönelttiğin spiritüel bir farkındalık yaklaşımı. Çalışmaların nasıl ilerlediğini ve sana nasıl eşlik edebileceğini öğren.</p><Link href="/kozmik-enerji">Enerji çalışmasını tanı <span aria-hidden="true">↗</span></Link></div>
        </article>
        <p className="finderPersonalHelp">Seçmekte zorlanıyorsan birlikte netleştirelim. <a href="https://wa.me/905054722153?text=Merhaba%2C%20bana%20uygun%20%C3%A7al%C4%B1%C5%9Fmay%C4%B1%20se%C3%A7mek%20i%C3%A7in%20destek%20almak%20istiyorum." target="_blank" rel="noopener noreferrer">WhatsApp’tan sor →</a></p>
      </div>
    </section>
  );
}
