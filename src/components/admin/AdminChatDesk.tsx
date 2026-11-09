"use client";
import { useEffect,useRef,useState } from "react";
import type { ChatMessage,ChatThread } from "@/lib/chat/types";
import "@/styles/site-chat.css";
export default function AdminChatDesk(){
 const [threads,setThreads]=useState<ChatThread[]>([]);
 const [selected,setSelected]=useState("");
 const [messages,setMessages]=useState<ChatMessage[]>([]);
 const [body,setBody]=useState("");const [error,setError]=useState("");const [busy,setBusy]=useState(false);
 const bottom=useRef<HTMLDivElement>(null);const requestId=useRef<string|null>(null);
 useEffect(()=>{
  const controller=new AbortController();let pending=false;
  async function refresh(){
   if(document.visibilityState!=="visible"||pending)return;pending=true;
   try{
    const [list,chat]=await Promise.all([fetch("/api/admin/chat",{signal:controller.signal,cache:"no-store"}),selected?fetch(`/api/admin/chat?thread=${selected}`,{signal:controller.signal,cache:"no-store"}):null]);
    const data=await list.json();if(!list.ok)throw new Error(data.error);setThreads(data.threads);
    if(chat){const detail=await chat.json();if(!chat.ok)throw new Error(detail.error);setMessages(detail.messages);}
    setError("");
   }catch(e){if(!controller.signal.aborted)setError(e instanceof Error?e.message:"Bağlantı kurulamadı.");}finally{pending=false;}
  }
  void refresh();const timer=setInterval(()=>void refresh(),4000);document.addEventListener("visibilitychange",refresh);
  return()=>{controller.abort();clearInterval(timer);document.removeEventListener("visibilitychange",refresh);};
 },[selected]);
 const lastMessageId=messages.at(-1)?.id;
 useEffect(()=>{bottom.current?.scrollIntoView({block:"nearest"});},[lastMessageId]);
 async function send(e:React.FormEvent){
  e.preventDefault();if(busy||!selected||!body.trim())return;setBusy(true);setError("");requestId.current??=crypto.randomUUID();
  try{const res=await fetch("/api/admin/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({thread:selected,body,requestId:requestId.current})});const data=await res.json();if(!res.ok)throw new Error(data.error);setBody("");requestId.current=null;const chat=await fetch(`/api/admin/chat?thread=${selected}`,{cache:"no-store"});if(chat.ok)setMessages((await chat.json()).messages);}
  catch(e){setError(e instanceof Error?e.message:"Gönderilemedi.");}finally{setBusy(false);}
 }
 return <section className="adminChatDesk"><header><p className="adminSectionLabel">CANLI SOHBET</p><h2>Ziyaretçilerinle konuş.</h2><p className="adminHint">Yeni mesajlar burada görünür. Telefonundan yönetim panelindeki “Telefon bildirimlerini aç” düğmesini kullanabilirsin.</p></header>
  <div className="adminChatLayout"><nav aria-label="Ziyaretçi sohbetleri">{!threads.length&&<p>Henüz mesaj yok.</p>}{threads.map(t=><button type="button" key={t.id} disabled={busy} aria-pressed={selected===t.id} onClick={()=>{setSelected(t.id);setMessages([]);setBody("");requestId.current=null;}}><strong>{t.name}</strong>{t.unread>0&&<b>{t.unread} yanıt bekliyor</b>}<small>{new Date(t.updated_at).toLocaleString("tr-TR",{timeZone:"Europe/Istanbul"})}</small></button>)}</nav>
  <div className="adminChatConversation">{selected?<><h3>{threads.find(t=>t.id===selected)?.name||"Sohbet"}</h3><div className="siteChatMessages" role="log" aria-live="polite" aria-label="Ziyaretçi ile sohbet">{messages.map(m=><article key={m.id} className={`siteChatBubble ${m.sender==="admin"?"visitor":"admin"}`}><small>{m.sender==="admin"?"Sen":threads.find(t=>t.id===selected)?.name||"Ziyaretçi"}</small><p>{m.body}</p><time dateTime={m.created_at}>{new Date(m.created_at).toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"})}</time></article>)}<div ref={bottom}/></div><form onSubmit={send}><label htmlFor="admin-chat-reply">Yanıtın</label><textarea id="admin-chat-reply" value={body} onChange={e=>{setBody(e.target.value);requestId.current=null;}} rows={3} maxLength={2000} disabled={busy} required/><button disabled={busy||!body.trim()} type="submit">{busy?"Gönderiliyor…":"Yanıt gönder ↗"}</button></form></>:<p>Yanıtlamak için soldan bir sohbet seç.</p>}</div></div>
  {error&&<p role="alert" className="siteChatError">{error}</p>}
 </section>;
}
