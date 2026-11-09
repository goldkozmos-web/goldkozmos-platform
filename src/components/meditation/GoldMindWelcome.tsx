import Image from "next/image";

export default function GoldMindWelcome() {
  return (
    <header className="goldmindWelcome">
      <div className="goldmindWelcomeArtwork" aria-hidden="true"><picture><source media="(min-width: 901px)" srcSet="/images/goldmind/hero-desktop.webp" /><Image src="/images/platform/goldmind-premium.webp" alt="" fill sizes="(max-width: 700px) 100vw, 60vw" priority /></picture></div>
      <div className="goldmindWelcomeContent">
        <p className="goldmindBrandMark">GOLDMIND · KENDİNE DÖN</p>
        <h1>Meditasyon &<br /> Nefes Alanı</h1>
        <p className="goldmindHello">Günün içinde bir durak.<br />Dikkatini yeniden kendine yönelt.</p>
        <a className="goldmindWelcomeExplore" href="#goldmind-alanlar">Alanını seç <span aria-hidden="true">↓</span></a>
      </div>
    </header>
  );
}
