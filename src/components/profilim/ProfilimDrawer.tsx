"use client";
import { useEffect, useId, useRef, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import "../../styles/profilim-experience.css";
const subscribe = () => () => {};
export default function ProfilimDrawer({title,eyebrow,onClose,children}:{title:string;eyebrow:string;onClose:()=>void;children:ReactNode}){
  const mounted=useSyncExternalStore(subscribe,()=>true,()=>false);
  const panel=useRef<HTMLDivElement>(null);
  const titleId=useId();
  useEffect(()=>{
    if(!mounted)return;
    const before=document.activeElement as HTMLElement|null;
    const previous=document.body.style.overflow;
    document.body.style.overflow="hidden";
    panel.current?.focus({preventScroll:true});
    function onKey(event:KeyboardEvent){
      if(event.key==="Escape"){event.preventDefault();onClose();return;}
      if(event.key!=="Tab")return;
      const controls=Array.from(panel.current?.querySelectorAll<HTMLElement>('button:not(:disabled),a[href],input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex="0"]')??[]).filter(item=>item.getClientRects().length);
      const first=controls[0],last=controls.at(-1);
      if(!first){event.preventDefault();return;}
      if(event.shiftKey&&(document.activeElement===first||document.activeElement===panel.current)){event.preventDefault();last?.focus();}
      else if(!event.shiftKey&&(document.activeElement===last||document.activeElement===panel.current)){event.preventDefault();first.focus();}
    }
    window.addEventListener("keydown",onKey);
    return()=>{document.body.style.overflow=previous;window.removeEventListener("keydown",onKey);before?.focus({preventScroll:true});};
  },[mounted,onClose]);
  if(!mounted)return null;
  return createPortal(<div className="profilimDrawerBackdrop" onClick={onClose}><div ref={panel} tabIndex={-1} className="profilimDrawer" role="dialog" aria-modal="true" aria-labelledby={titleId} onClick={event=>event.stopPropagation()}><div className="profilimDrawerHandle" aria-hidden="true"/><header className="profilimDrawerTop"><div><p className="profilimDrawerEyebrow">GOLDKOZMOS · {eyebrow}</p><h2 id={titleId}>{title}</h2></div><button type="button" className="profilimDrawerClose" onClick={onClose} aria-label="Kapat">×</button></header><div className="profilimDrawerScroll">{children}</div><footer className="profilimDrawerSignature"><span aria-hidden="true">✧</span> Kendi kozmosunda, sana özel bir alan.</footer></div></div>,document.body);
}
