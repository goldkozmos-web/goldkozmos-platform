"use client";
import Link from 'next/link';
import {usePathname} from 'next/navigation';
export default function CircleHero(){
 const pathname=usePathname();
 if(pathname!=='/paylasim-cemberi')return null;
 return <header className="circleHero"><div><p>GOLDKOZMOS · TOPLULUK</p><h1>Paylaşım Çemberi</h1><p>Bazen insanın ihtiyacı çözümden önce kendini rahatça ifade edebileceği bir alandır. Burada paylaşabilir, birbirimizin deneyimlerinden güç alabiliriz.</p><Link className="circleHeroExplore" href="#circle-feed">Çemberi keşfet <span aria-hidden="true">↓</span></Link></div></header>;
}
