"use client";
import Image from 'next/image';
import { useRef, useState } from 'react';
import '../../styles/quick-note.css';
const storageKey='goldkozmos.quick-note.v1';
export default function QuickNoteCard(){
 const dialog=useRef<HTMLDialogElement>(null);
 const trigger=useRef<HTMLButtonElement>(null);
 const [note,setNote]=useState('');
 const [status,setStatus]=useState('');
 function open(){
  try{const saved=localStorage.getItem(storageKey)??'';setNote(saved);setStatus(saved?'Kayıtlı notun açıldı.':'Yazdıkların otomatik saklanır.');}
  catch{setStatus('Tarayıcı kaydı kullanılamıyor. Notunu kapatmadan önce kopyala.');}
  dialog.current?.showModal();
 }
 function update(value:string){
  setNote(value);
  try{localStorage.setItem(storageKey,value);setStatus('Bu tarayıcıya kaydedildi.');}
  catch{setStatus('Not kaydedilemedi. Kapatmadan önce kopyala.');}
 }
 function close(){dialog.current?.close();}
 async function copy(){try{await navigator.clipboard.writeText(note);setStatus('Notun kopyalandı.');}catch{setStatus('Kopyalanamadı. Metni seçerek kopyalayabilirsin.');}}
 return <><button ref={trigger} type="button" className="dailyActionShell quickNoteTrigger" onClick={open} aria-haspopup="dialog"><span className="dailyActionCard isBrown"><span className="dailyActionArtwork" aria-hidden="true"><Image src="/images/home/shortcuts/not-al.webp" alt="" fill sizes="(max-width:700px) 150px, 190px"/></span><span className="dailyActionLabel">Not al</span></span></button>
 <dialog ref={dialog} className="quickNoteDialog" aria-labelledby="quick-note-title" onCancel={close} onClose={()=>trigger.current?.focus()}>
 <header><div><small>GOLDKOZMOS · KENDİNE BİR SATIR</small><h2 id="quick-note-title">Aklından geçenleri yaz.</h2></div><button type="button" onClick={close} aria-label="Not alanını kapat">×</button></header>
 <div className="quickNoteBody"><label htmlFor="quick-note-text">Hızlı notun</label><textarea id="quick-note-text" value={note} onChange={e=>update(e.target.value)} maxLength={20000} placeholder="Bugün aklında ne var? Bir düşünce, küçük bir hatırlatma…" rows={9}/><div className="quickNoteStatus"><span role="status">{status}</span><span>{note.length.toLocaleString('tr-TR')} / 20.000</span></div><p>Bu not yalnızca bu tarayıcıda saklanır; hesabına veya başka cihazlara aktarılmaz. Tarayıcı verileri silinirse notun da silinir.</p><footer><button type="button" onClick={()=>void copy()} disabled={!note}>Notu kopyala</button><button type="button" onClick={close}>Tamam ↗</button></footer></div>
 </dialog></>;
}
