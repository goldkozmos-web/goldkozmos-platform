"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GOLDLINK_LINKS } from "../../data/goldlink";
import { createSupabaseBrowserClient } from "../../lib/supabase/browser";
import styles from "./AdminGoldlink.module.css";
type Row={id:string;total:number;today:number;last_click:string|null};
type Summary={updatedAt:string;rows:Row[]};
const number=(n:number)=>new Intl.NumberFormat('tr-TR').format(n);
const time=(s:string)=>new Intl.DateTimeFormat('tr-TR',{timeZone:'Europe/Istanbul',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit',second:'2-digit'}).format(new Date(s));
export default function AdminGoldlink(){
 const [data,setData]=useState<Summary|null>(null);const [error,setError]=useState('');
 useEffect(()=>{
  let cancelled=false,inFlight=false;let request:AbortController|null=null;
  const load=async()=>{if(inFlight||document.visibilityState==='hidden')return;inFlight=true;request=new AbortController();
   try{const headers:HeadersInit={};const client=createSupabaseBrowserClient();const session=await client?.auth.getSession();if(session?.data.session?.access_token)headers.Authorization=`Bearer ${session.data.session.access_token}`;
    if(cancelled)return;const response=await fetch('/api/admin/goldlink',{headers,cache:'no-store',credentials:'same-origin',signal:request.signal});const next=await response.json();if(!response.ok)throw Error(next.error||'Veriler yüklenemedi.');if(!cancelled){setData(next);setError('');}
   }catch(e){if(!cancelled)setError(e instanceof Error?e.message:'Veriler yüklenemedi.');}finally{inFlight=false;}
  };void load();const timer=window.setInterval(()=>void load(),1000);const focus=()=>void load();window.addEventListener('focus',focus);document.addEventListener('visibilitychange',focus);
  return()=>{cancelled=true;request?.abort();window.clearInterval(timer);window.removeEventListener('focus',focus);document.removeEventListener('visibilitychange',focus);};
 },[]);
 const rows=data?.rows??[];const clicks=rows.filter(r=>r.id!=='_view').reduce((s,r)=>s+Number(r.total),0);const today=rows.filter(r=>r.id!=='_view').reduce((s,r)=>s+Number(r.today),0);const views=rows.find(r=>r.id==='_view');
 return <section className={styles.panel}>
  <header className={styles.header}><div><p>BAĞLANTILARININ NABZI</p><h2>GoldLink</h2><span>Tüm bağlantıların, tek bakışta.</span></div><Link href="/goldlink">Sayfayı aç ↗</Link></header>
  <p className={styles.status}>{data?`Son güncelleme: ${time(data.updatedAt)} · Açıkken 1 saniyede bir yenilenir.`:'Veriler yükleniyor…'}</p>
  {error?<p role="alert" className={styles.error}>{error} {data?'Son başarılı veriler gösteriliyor.':''}</p>:null}
  <div className={styles.metrics}>{[['Toplam tıklama',clicks],['Bugünkü tıklama',today],['Sayfa görüntüleme',views?.total??0],['Bugünkü görüntüleme',views?.today??0]].map(([label,value])=><div key={label}><span>{label}</span><strong>{data?number(Number(value)):'—'}</strong></div>)}</div>
  <div className={styles.cards}>{GOLDLINK_LINKS.map(link=>{const row=rows.find(r=>r.id===link.id);const total=Number(row?.total??0);return <article key={link.id} className={styles.card}>
   <div className={styles.cardHead}><Image src={link.image} alt="" width={64} height={64}/><div><h3>{link.title}</h3><a href={link.href}>Bağlantıyı aç ↗</a></div></div>
   <div className={styles.count}><strong>{data?number(total):'—'}</strong><span>toplam tıklama</span><b>{data?number(Number(row?.today??0)):'—'} bugün</b></div>
   <div className={styles.bar} aria-hidden="true"><span style={{width:`${clicks?total/clicks*100:0}%`}}/></div>
   <p>{data?`Tıklamaların %${clicks?Math.round(total/clicks*100):0}’i · Son: ${row?.last_click?time(row.last_click):'Henüz tıklanmadı'}`:'Ölçüm bekleniyor…'}</p>
  </article>;})}</div>
  <p className={styles.note}>Sayaçlar 24 Ekim 2026’da devreye alındı. Önceki tıklamalar geriye dönük ölçülmez. Tekrar tıklamalar dahildir; görüntüleme sayısı tekil kişi sayısı değildir. Yönetici hesabı ve yönetici panelini açan bu tarayıcı ölçüm dışındadır. Doğrulama kayıtları toplamdan çıkarılmıştır. Bugün, Türkiye saatine göredir. Tıklama, indirme veya satışın tamamlandığı anlamına gelmez.</p>
 </section>;
}
