"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { zodiacReadings, compatibilityReading } from "../data/zodiacReadings";

export default function ZodiacExplorer() {
  const [first, setFirst] = useState("koc");
  const [second, setSecond] = useState("terazi");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const firstSign = params.get("ilk");
    const secondSign = params.get("ikinci");
    if (zodiacReadings.some(item => item.slug === firstSign)) setFirst(firstSign!);
    if (zodiacReadings.some(item => item.slug === secondSign)) setSecond(secondSign!);
  }, []);
  const a = zodiacReadings.find(item => item.slug === first)!;
  const b = zodiacReadings.find(item => item.slug === second)!;
  const result = compatibilityReading(a, b);
  return <>
    <section className="symbolSection zodiacAtlas" id="burc-yorumlari"><div className="symbolSectionHeading"><div><p className="symbolKicker">12 BURÇ · 12 AYRI DÜNYA</p><h2>Burcunun dilini keşfet.</h2></div><span>Yorumlar & özellikler</span></div>
      <div className="zodiacSelectGrid" aria-label="Burç sayfaları">{zodiacReadings.map(item => <Link className="zodiacAtlasCard zodiacAtlasCardIllustrated" key={item.slug} href={`/burclar/${item.slug}`} aria-label={`${item.name} burcu yorumunu oku`}><Image className="zodiacAtlasIllustration" src={`/images/zodiac/${item.slug}-premium.webp`} alt="" fill sizes="(max-width: 600px) 30vw, (max-width: 1000px) 23vw, 220px" /><strong>{item.name}</strong><small>{item.element}</small><i className="zodiacAtlasCardArrow" aria-hidden="true">↗</i></Link>)}</div>
    </section>
    <section className="symbolSection zodiacCompatibility zodiacCompatibilityPremium" id="burc-uyumu">
      <header className="zodiacMatchIntro"><p className="symbolKicker">İKİ BURÇ · BİR BAĞ</p><h2>Aranızdaki uyumu<br /><em>keşfet.</em></h2><p>İki ayrı dünyayı buluşturan çekimi, iletişimi ve dengeyi keşfet.</p><span className="zodiacMatchSeal" aria-hidden="true">✦</span></header>
      <div className="zodiacPairControls"><label>Senin burcun<select value={first} onChange={event => setFirst(event.target.value)}>{zodiacReadings.map(item => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select></label><span aria-hidden="true">✧</span><label>Diğer burç<select value={second} onChange={event => setSecond(event.target.value)}>{zodiacReadings.map(item => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select></label></div>
      <article className="zodiacPairResult" aria-live="polite">
        <header className="zodiacMatchSky">
          <svg className="zodiacOrbitArt" viewBox="0 0 600 280" fill="none" aria-hidden="true"><ellipse cx="300" cy="155" rx="242" ry="100" /><ellipse cx="300" cy="155" rx="220" ry="85" /><path d="M90 95L150 65L210 100M395 55L450 88L515 60M85 220L135 245L210 225M410 225L465 250L525 210" /><g>{[[90,95],[150,65],[210,100],[395,55],[450,88],[515,60],[85,220],[135,245],[210,225],[410,225],[465,250],[525,210]].map(([x,y],index)=><circle key={index} cx={x} cy={y} r={index%3===0?3:2}/>)}</g><path className="zodiacOrbitAxis" d="M300 15V65M300 242V272M35 155H85M515 155H565" /></svg>
          <div className="zodiacPairEmblems"><div><span className="zodiacPairPortrait" aria-hidden="true"><Image key={a.slug} src={`/images/zodiac/${a.slug}-premium.webp`} alt="" fill sizes="(max-width: 600px) 100px, 126px" /></span><strong>{a.name}</strong><small>{a.element}</small></div><i aria-hidden="true">✧</i><div><span className="zodiacPairPortrait" aria-hidden="true"><Image key={b.slug} src={`/images/zodiac/${b.slug}-premium.webp`} alt="" fill sizes="(max-width: 600px) 100px, 126px" /></span><strong>{b.name}</strong><small>{b.element}</small></div></div>
          <p className="symbolKicker">{a.element} + {b.element} · EŞLEŞMENİZ</p><h3>{result.title}</h3>
        </header>
        <div className="zodiacMatchNarrative"><p>{result.reading}</p></div>
      </article><p className="symbolEditorialNote">Yorumlar geleneksel Güneş burcu ve element sembolizmi üzerine özgün editoryal okumalardır. Doğum haritası analizi veya ölçülmüş uyum puanı değildir. Tarih sınırları doğum yılına göre değişebilir.</p>
    </section>
  </>;
}
