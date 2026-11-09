"use client";
import { useEffect } from "react";
export default function GoldlinkTracker() {
  useEffect(() => {
    const send = (linkId: string) => {
      void fetch('/api/goldlink/event', {method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:crypto.randomUUID(),linkId}),keepalive:true}).catch(()=>{});
    };
    send('_view');
    const click = (e: MouseEvent) => {
      const a = e.target instanceof Element ? e.target.closest<HTMLAnchorElement>('a[data-goldlink-id]') : null;
      if(a?.dataset.goldlinkId) send(a.dataset.goldlinkId);
    };
    document.addEventListener('click',click,true);
    return ()=>document.removeEventListener('click',click,true);
  },[]);
  return null;
}
