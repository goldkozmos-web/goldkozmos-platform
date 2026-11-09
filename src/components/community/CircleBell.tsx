"use client";
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {createSupabaseBrowserClient} from '../../lib/supabase/browser';
import {circleRead} from '../../lib/community/client';
import '../../styles/community.css';
export default function CircleBell(){
 const [visible,setVisible]=useState(false),[unread,setUnread]=useState(0);
 useEffect(()=>{
  const client=createSupabaseBrowserClient();if(!client)return;
  let active=true,enabled=false,currentUser='';let channel:ReturnType<typeof client.channel>|null=null;
  async function reload(){if(!enabled||document.visibilityState!=='visible')return;try{const data=await circleRead<{unread:number}>('notifications');if(active)setUnread(data.unread);}catch{/* The bell remains a link when the server is temporarily unavailable. */}}
  function connect(id:string|null){if(!active)return;enabled=Boolean(id);setVisible(enabled);if(id===currentUser)return;currentUser=id??'';if(channel){void client!.removeChannel(channel);channel=null;}if(!id){setUnread(0);return;}void reload();channel=client!.channel(`circle-notices-${id}`).on('postgres_changes',{event:'*',schema:'public',table:'notifications',filter:`user_id=eq.${id}`},()=>void reload()).subscribe();}
  void client.auth.getUser().then(({data:{user}})=>connect(user?.id??null));
  const auth=client.auth.onAuthStateChange((_event,session)=>connect(session?.user.id??null));
  const timer=setInterval(()=>void reload(),20000);window.addEventListener('community-changed',reload);window.addEventListener('focus',reload);
  return()=>{active=false;clearInterval(timer);auth.data.subscription.unsubscribe();window.removeEventListener('community-changed',reload);window.removeEventListener('focus',reload);if(channel)void client.removeChannel(channel);};
 },[]);
 return visible?<Link className="circleBell" prefetch={false} href="/bildirimler" aria-label={`Bildirimler${unread?`, ${unread} okunmamış`:''}`}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0v5l-2 4h16l-2-4V8ZM10 21h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>{unread>0?<span>{unread>99?'99+':unread}</span>:null}</Link>:null;
}
