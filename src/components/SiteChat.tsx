"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import type { ChatMessage } from "@/lib/chat/types";
import "@/styles/site-chat.css";

export default function SiteChat() {
 const pathname = usePathname();
 const [open,setOpen] = useState(false);
 const [messages,setMessages] = useState<ChatMessage[]>([]);
 const [body,setBody] = useState("");
 const [name,setName] = useState("");
 const [busy,setBusy] = useState(false);
 const [error,setError] = useState("");
 const [ready,setReady] = useState(false);
 const [sent,setSent] = useState(false);
 const [sound,setSound] = useState(false);
 const audio = useRef<AudioContext | null>(null);
 const ambient = useRef<GainNode | null>(null);
 const soundEnabled = useRef(false);

 function cosmicChime() {
  if (!soundEnabled.current || document.visibilityState !== "visible") return;
  try {
   const context=audio.current;
   if (!context || context.state!=="running") return;
   const now=context.currentTime;
   [523.25,659.25,783.99].forEach((frequency,index)=>{
    const oscillator=context.createOscillator(),gain=context.createGain();
    oscillator.type="sine";oscillator.frequency.value=frequency;
    gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(.009,now+.08+index*.12);gain.gain.exponentialRampToValueAtTime(.0001,now+1.8+index*.1);
    oscillator.connect(gain);gain.connect(context.destination);oscillator.start(now+index*.07);oscillator.stop(now+2.2);
    oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();};
   });
  } catch { /* Audio is optional; messaging remains available. */ }
 }
 async function toggleSound() {
  if(soundEnabled.current){soundEnabled.current=false;setSound(false);void audio.current?.suspend();return;}
  try {
   audio.current??=new AudioContext();
   const context=audio.current;
   if(!ambient.current){
    const master=context.createGain();master.gain.value=.15;master.connect(context.destination);ambient.current=master;
    // A quiet pentatonic music-box loop with space between notes; no bass drone.
    const seconds=40,rate=context.sampleRate;
    const buffer=context.createBuffer(2,seconds*rate,rate);
    const notes=[523.25,659.25,783.99,659.25,587.33,880,783.99,659.25,523.25,587.33,783.99,659.25];
    notes.forEach((frequency,index)=>{
     const start=.8+index*3;
     for(let channel=0;channel<2;channel++){
      const samples=buffer.getChannelData(channel),pan=channel===index%2?1:.7;
      for(let frame=0;frame<rate*5;frame++){
       const position=Math.floor(start*rate)+frame;if(position>=samples.length)break;
       const t=frame/rate,attack=1-Math.exp(-t*25),decay=Math.exp(-t*1.3);
       const tone=Math.sin(2*Math.PI*frequency*t)+.12*Math.sin(2*Math.PI*frequency*2*t)*Math.exp(-t*2);
       samples[position]+=tone*attack*decay*.15*pan;
      }
     }
    });
    const music=context.createBufferSource();music.buffer=buffer;music.loop=true;music.connect(master);music.start();
   }
   await context.resume();
   if(!dialog.current?.open){void context.suspend();return;}
   ambient.current.gain.cancelScheduledValues(context.currentTime);
   ambient.current.gain.setValueAtTime(0,context.currentTime);
   ambient.current.gain.linearRampToValueAtTime(.15,context.currentTime+1.5);
   soundEnabled.current=true;setSound(true);
  }
  catch {soundEnabled.current=false;setSound(false);}
 }
 useEffect(()=>()=>{void audio.current?.close();},[]);
 const dialog = useRef<HTMLDialogElement>(null);
 const trigger = useRef<HTMLButtonElement>(null);
 const bottom = useRef<HTMLDivElement>(null);
 const requestId = useRef<string | null>(null);
 const sending = useRef(false);
 const allowed = pathname !== "/goldlink" && !/^\/(admin|panel|auth)(\/|$)/.test(pathname);
 useEffect(() => {
  const show = () => setOpen(true);
  window.addEventListener("gk-open-chat",show);
  return () => window.removeEventListener("gk-open-chat",show);
 },[]);
 useEffect(() => {
  if (open && allowed) dialog.current?.showModal(); else dialog.current?.close();
  if(!open || !allowed){soundEnabled.current=false;void audio.current?.suspend();}
 },[open,allowed]);
 useEffect(() => {
  if (!open || !allowed) return;
  const controller = new AbortController();
  let inFlight = false;
  async function refresh() {
   if (document.visibilityState !== "visible" || inFlight || sending.current) return;
   inFlight = true;
   try {
    const res = await fetch("/api/chat",{signal:controller.signal,cache:"no-store"});
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    if (!sending.current) setMessages(data.messages ?? []);
    setReady(true);
   } catch { if (!controller.signal.aborted) setError("Bağlantı yenilenemedi. Birazdan tekrar deneyeceğiz."); }
   finally { inFlight = false; }
  }
  void refresh();
  const timer = setInterval(()=>void refresh(),4000);
  document.addEventListener("visibilitychange",refresh);
  return () => { controller.abort();clearInterval(timer);document.removeEventListener("visibilitychange",refresh); };
 },[open,allowed]);
 const lastMessageId=messages.at(-1)?.id;
 useEffect(()=>{ if(open) bottom.current?.scrollIntoView({block:"nearest"}); },[lastMessageId,open]);
 async function send(event:React.FormEvent) {
  event.preventDefault();if(busy || !ready || !body.trim()) return;
  setBusy(true);sending.current=true;setError("");
  requestId.current ??= crypto.randomUUID();
  try {
   const res = await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,body,requestId:requestId.current})});
   const data = await res.json();if(!res.ok) throw new Error(data.error || "Gönderilemedi.");
   setMessages(data.messages);setBody("");requestId.current=null;setSent(true);cosmicChime();
  } catch(e) {setError(e instanceof Error?e.message:"Gönderilemedi. Yeniden dene.");}
  finally{setBusy(false);sending.current=false;}
 }
 if(!allowed)return null;
 function close(){setOpen(false);setSent(false);setSound(false);trigger.current?.focus();}
 return <>
  <button className="siteChatTrigger" ref={trigger} type="button" onClick={()=>setOpen(true)} aria-haspopup="dialog"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M20 11.5a8 8 0 0 1-8 8H5l-3 2v-10a9 9 0 0 1 18 0Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><circle cx="7.5" cy="11.5" r="1" fill="currentColor"/><circle cx="11.5" cy="11.5" r="1" fill="currentColor"/><circle cx="15.5" cy="11.5" r="1" fill="currentColor"/></svg><span>Canlı sohbet</span><span className="siteChatSpark" aria-hidden="true"><i/><i/><i/></span></button>
  <dialog ref={dialog} className="siteChatDialog" aria-labelledby="site-chat-title" onCancel={close} onClose={()=>{setOpen(false);setSound(false);}}>
   <header><div className="siteChatCosmos" aria-hidden="true"/><div className="siteChatIdentity"><div className="siteChatPortrait"><Image src="/images/basla/ozge-portre.webp" alt="Özge Batıgün" width={80} height={80} sizes="80px"/><span className="siteChatAvailable" role="img" aria-label="Sohbet mesaj kabul ediyor" title="Sohbet mesaj kabul ediyor"/></div><div><small>GOLDKOZMOS · SANA ÖZEL BİR ALAN</small><h2 id="site-chat-title">Birlikte konuşalım.</h2><p>Özge Batıgün <span>·</span> Site sohbeti</p></div></div><button type="button" onClick={close} aria-label="Sohbeti kapat">×</button><button className="siteChatSound" type="button" aria-pressed={sound} onClick={()=>void toggleSound()} aria-label={sound?"Kozmik sesi kapat":"Kozmik sesi aç"}><span aria-hidden="true">{sound?"♫":"♪"}</span> Kozmik ses {sound?"açık":"kapalı"}</button></header>
   <p className="siteChatIntro">Çalışmalar ve randevu hakkında yazabilirsin. Özge uygun olduğunda buradan yanıtlayacak.</p>
   <div className="siteChatMessages" role="log" aria-label="Sohbet mesajları" aria-live="polite">
    {!messages.length&&<div className="siteChatWelcome"><span className="siteChatWelcomeMark" aria-hidden="true">✦</span><small>İLK ADIM BİR MERHABA</small><h3>Hoş geldin.</h3><p>Aklındaki soruyu paylaş. Sana uygun çalışmayı birlikte bulalım.</p><span className="siteChatWelcomeNote">Yanıtım geldiğinde burada göreceksin.</span></div>}
    {messages.map(m=><article key={m.id} className={`siteChatBubble ${m.sender}`}><small>{m.sender==="admin"?"Özge · Goldkozmos":"Sen"}</small><p>{m.body}</p><time dateTime={m.created_at}>{new Date(m.created_at).toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"})}</time></article>)}<div ref={bottom}/>
   </div>
   <form onSubmit={send}>
    {sent&&<div className="siteChatDelivery" role="status" onAnimationEnd={e=>{if(e.target===e.currentTarget)setSent(false);}}><div className="siteChatEnvelope" aria-hidden="true"><svg viewBox="0 0 80 60" fill="none"><defs><linearGradient id="chat-envelope-gold" x1="0" y1="0" x2="80" y2="60" gradientUnits="userSpaceOnUse"><stop stopColor="#fff0bf"/><stop offset=".5" stopColor="#d9b56b"/><stop offset="1" stopColor="#987039"/></linearGradient></defs><rect x="5" y="9" width="70" height="46" rx="7" fill="url(#chat-envelope-gold)" stroke="#f7e2ae"/><path d="m7 13 29 24a7 7 0 0 0 8 0l29-24M7 52l22-20m44 20L51 32" stroke="#876431" strokeWidth="1.4"/><path d="m8 13 28 22a7 7 0 0 0 8 0l28-22" stroke="#fff3cc" strokeWidth="1.4"/></svg><span>✦</span></div><span className="siteChatDeliveryText">Mesajın ulaştı <b aria-hidden="true">✓</b></span></div>}
    {!messages.length&&<label>İsmin <span>(isteğe bağlı)</span><input value={name} disabled={busy} maxLength={60} onChange={e=>setName(e.target.value)} autoComplete="given-name"/></label>}
    <label htmlFor="site-chat-body">Mesajın</label><textarea id="site-chat-body" value={body} onChange={e=>{setBody(e.target.value);requestId.current=null;}} maxLength={2000} rows={3} required disabled={busy} placeholder="Sana nasıl yardımcı olabiliriz?"/>
    <div className="siteChatSend"><small>Aynı tarayıcıdan sohbetine dönebilirsin.</small><button type="submit" disabled={busy||!ready||!body.trim()}>{busy?"Gönderiliyor…":"Gönder ↗"}</button></div>
    {error&&<p role="alert" className="siteChatError">{error}</p>}
   </form>
  </dialog>
 </>;
}




