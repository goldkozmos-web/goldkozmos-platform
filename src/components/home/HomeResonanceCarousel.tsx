"use client";
import Image from "next/image";
import Link from "next/link";
import { resonances } from "../../app/calismalar/resonance-options";
import { resonanceHref } from "../../app/calismalar/resonance-seo";
import { resonanceCardCopy } from "../../app/calismalar/resonance-card-copy";
import s from "./home-resonance-carousel.module.css";
export default function HomeResonanceCarousel(){
 return <section id="birebir-calismalar" className={s.section} aria-labelledby="home-resonance-title"><div className={s.inner}><div className={s.heading}><div><p className={s.eyebrow}>GOLDKOZMOS · KOZMİK ENERJİ ÇALIŞMALARI</p><h2 id="home-resonance-title">Birebir <em>Çalışmaları Keşfet</em></h2><p>İhtiyacına yakın gelen alanı seç; seansları, ücretleri ve randevu seçeneklerini incele.</p></div></div><div id="home-resonance-cards" className={s.rail} aria-label="Kozmik enerji çalışma kartları">{resonances.map((item,index)=><article className={s.card} key={item.id}><div className={s.image}><Image src={item.image} alt="" width={600} height={600} sizes="(max-width:650px) 300px, (max-width:1200px) 40vw, 456px"/><span>0{index+1}</span></div><div className={s.body}><p className={s.eyebrow}>{item.id==="enerji"?"MEVCUT DANIŞANLARA ÖZEL":"BİREYSEL ÇALIŞMA"}</p><h3>{item.name}</h3><p>{resonanceCardCopy[item.id]}</p><Link href={resonanceHref(item.id)} className={s.cta} aria-label={item.name+" — Detaylı Bilgi Al"}>Detaylı Bilgi Al <span aria-hidden="true">↗</span></Link></div></article>)}</div><div className={s.bottom}><span>Kartları kaydırarak tüm alanları keşfet.</span><Link href="/calismalar">Tüm çalışmaları gör →</Link></div></div></section>;
}
