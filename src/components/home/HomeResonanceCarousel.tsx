"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { resonances } from "../../app/calismalar/resonance-options";
import { resonanceHref } from "../../app/calismalar/resonance-seo";
import { resonanceCardCopy } from "../../app/calismalar/resonance-card-copy";
import s from "./home-resonance-carousel.module.css";
export default function HomeResonanceCarousel(){
 const rail=useRef<HTMLDivElement>(null);
 function move(direction:number){const element=rail.current;if(!element)return;const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;element.scrollBy({left:direction*element.clientWidth*.85,behavior:reduced?"instant":"smooth"});}
 return <section className={s.section} aria-labelledby="home-resonance-title"><div className={s.inner}><div className={s.heading}><div><p className={s.eyebrow}>GOLDKOZMOS · KOZMİK ENERJİ ÇALIŞMALARI</p><h2 id="home-resonance-title">Sana uygun <em>çalışmayı keşfet.</em></h2><p>İhtiyacına yakın gelen alanı seç; seansları, ücretleri ve randevu seçeneklerini incele.</p></div><div className={s.controls}><button type="button" onClick={()=>move(-1)} aria-label="Önceki çalışma kartları" aria-controls="home-resonance-cards">←</button><button type="button" onClick={()=>move(1)} aria-label="Sonraki çalışma kartları" aria-controls="home-resonance-cards">→</button></div></div><div id="home-resonance-cards" className={s.rail} ref={rail} tabIndex={0} aria-label="Kozmik enerji çalışma kartları">{resonances.map((item,index)=><article className={s.card} key={item.id}><div className={s.image}><Image src={item.image} alt="" width={600} height={600} sizes="(max-width:650px) 80vw, (max-width:1000px) 45vw, 360px"/><span>0{index+1}</span></div><div className={s.body}><p className={s.eyebrow}>{item.id==="enerji"?"MEVCUT DANIŞANLARA ÖZEL":"BİREYSEL ÇALIŞMA"}</p><h3>{item.name}</h3><p>{resonanceCardCopy[item.id]}</p><Link href={resonanceHref(item.id)} className={s.cta} aria-label={item.name+" detaylarını incele"}>Detayları incele <span aria-hidden="true">↗</span></Link></div></article>)}</div><div className={s.bottom}><span>Kartları kaydırarak tüm alanları keşfet.</span><Link href="/calismalar">Tüm çalışmaları gör →</Link></div></div></section>;
}
