"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import DailyMessageCard from "./DailyMessageCard";
import { monthlyDailyMessage } from "../../lib/daily/monthly";
import "../../styles/profilim-premium.css";
import "../../styles/daily-home.css";

export default function DailyMessageExperience() {
 const [message,setMessage]=useState<ReturnType<typeof monthlyDailyMessage>|null>(null);
 const [open,setOpen]=useState(false);
 const dialog=useRef<HTMLDialogElement>(null);
 const trigger=useRef<HTMLButtonElement>(null);
 useEffect(()=>{
  const refresh=()=>setMessage(monthlyDailyMessage());
  refresh(); const timer=window.setInterval(refresh,60000);
  window.addEventListener('focus',refresh);
  return()=>{window.clearInterval(timer);window.removeEventListener('focus',refresh)};
 },[]);
 useEffect(()=>{
  if(!open)return;
  dialog.current?.showModal();
  const previous=document.body.style.overflow;document.body.style.overflow='hidden';
  return()=>{document.body.style.overflow=previous;trigger.current?.focus({preventScroll:true})};
 },[open]);
 if(!message)return null;
 return <>
  <section className="dailyHomeSection" aria-label="Günün mesajı">
   <button ref={trigger} type="button" className="dailyHomePreview" onClick={()=>setOpen(true)} aria-haspopup="dialog" aria-expanded={open}>
    <span className="dailyHomeThumb" style={{backgroundImage:`url('${message.image}')`}} aria-hidden="true"/>
    <span className="dailyHomeCopy"><span>BUGÜN · KENDİNE BİR AN AYIR</span><strong>Günün mesajı</strong><small>Bir an dur, kendine kulak ver.</small><span className="dailyHomeOpen">Mesajını keşfet</span></span>
    <span className="dailyHomeArrow" aria-hidden="true">↗</span>
   </button>
  </section>
  {open?createPortal(<dialog ref={dialog} className="dailyHomeDialog profilimPage" aria-label="Günün mesajı" onCancel={()=>setOpen(false)} onClose={()=>setOpen(false)} onClick={event=>{if(event.target===event.currentTarget)setOpen(false)}}>
   <button type="button" className="dailyHomeClose" aria-label="Günün mesajını kapat" onClick={()=>setOpen(false)}>×</button>
   <DailyMessageCard/>
  </dialog>,document.body):null}
 </>;
}
