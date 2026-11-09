"use client";

import { useEffect, useMemo, useState } from "react";

import { createSupabaseBrowserClient } from "../../lib/supabase/browser";
import ProfilimEmptyState from "./ProfilimEmptyState";
import BadgeSeal, { PROFILE_BADGES } from "./BadgeSeal";
import "../../styles/daily-practice.css";

const XP: Record<string, number> = {
  daily_action: 15,
  emotion_journal: 10,
  goldmind_complete: 20,
  goldbook_chapter: 15,
  growth_series: 15,
  reminder_complete: 8,
  journey_day: 12,
  archetype: 20,
  favorite_add: 2,
  water_goal: 8,
};

type Range = "7" | "30" | "all";

function useProfileBadges() {
 const [earned,setEarned]=useState<Set<string>>(new Set());
 const [error,setError]=useState('');
 useEffect(()=>{
  const client=createSupabaseBrowserClient();if(!client)return;
  let active=true;
  async function load(){try{await client!.rpc('refresh_user_badges');const result=await client!.from('user_badges').select('badge_id');if(result.error)throw Error();if(active){setEarned(new Set((result.data??[]).map(row=>String(row.badge_id))));setError('');}}catch{if(active)setError('Rozetlerin şu an yüklenemedi. Yeniden açarak deneyebilirsin.');}}
  void load();const timer=setInterval(()=>{if(document.visibilityState==='visible')void load();},20000);
  const focus=()=>void load();window.addEventListener('focus',focus);
  return()=>{active=false;clearInterval(timer);window.removeEventListener('focus',focus);};
 },[]);
 return {earned,error};
}
export function ProfilimBadgeRow({onOpen}:{onOpen:()=>void}){
 const {earned,error}=useProfileBadges();
 return <button type="button" className="profilimIdentityBadges" onClick={onOpen} aria-label="Rozetlerim, tüm rozetleri görüntüle"><span className="profilimIdentityBadgesHeading"><span>Rozetlerim</span><span className="profilimIdentityBadgesLink">Keşfet <span aria-hidden="true">↗</span></span></span><span className="profilimIdentityBadgeSeals">{PROFILE_BADGES.map(badge=><span key={badge.id} title={badge.title+(earned.has(badge.id)?' · Kazanıldı':' · Henüz kazanılmadı')}><BadgeSeal id={badge.id} earned={earned.has(badge.id)}/></span>)}</span><span className="profilimIdentityBadgesNote">{error||(earned.size===0?'Küçük adımların burada iz bırakır.':earned.size+' / '+PROFILE_BADGES.length+' rozet kazandın.')}</span></button>;
}
export function ProfilimBadgesPanel(){
 const {earned,error}=useProfileBadges();
 return <div><div className="profilimExperienceLead"><strong>Her küçük adım iz bırakır.</strong><p>Rozetlerin tamamladığın gerçek aktivitelerle açılır. Yeni bir rozet kazandığında bildirim merkezinde haberin olur.</p></div>{error?<p role="alert">{error}</p>:null}<ul className="profilimBadgeList">{PROFILE_BADGES.map(item=><li key={item.id} className={'profilimBadgeItem'+(earned.has(item.id)?' isEarned':'')}><BadgeSeal id={item.id} earned={earned.has(item.id)}/><span><span>{earned.has(item.id)?'Kazanıldı':'Sıradaki keşfin'}</span><strong>{item.title}</strong><small>{item.description}</small></span></li>)}</ul></div>;
}

export function ProfilimStatsPanel() {
  const [range, setRange] = useState<Range>("30");
  const [rows, setRows] = useState<{ kind: string; created_at: string }[]>([]);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;
    void supabase
      .from("user_activity")
      .select("kind, created_at")
      .order("created_at", { ascending: false })
      .limit(400)
      .then(({ data }) => setRows((data ?? []) as { kind: string; created_at: string }[]));
  }, []);

  const stats = useMemo(() => {
    const from =
      range === "all"
        ? 0
        : Date.now() - Number(range) * 24 * 60 * 60 * 1000;
    const sliced = rows.filter((row) => Date.parse(row.created_at) >= from);
    const days = new Set(
      sliced.map((row) => new Date(row.created_at).toLocaleDateString("tr-TR")),
    );
    return {
      active: days.size,
      actions: sliced.filter((row) => row.kind === "daily_action").length,
      journal: sliced.filter((row) => row.kind === "emotion_journal").length,
      journey: sliced.filter((row) => row.kind === "journey_day").length,
      mind: sliced.filter((row) => row.kind === "goldmind_complete").length,
      content: sliced.filter((row) =>
        ["goldbook_chapter", "goldmind_complete", "journey_day"].includes(row.kind),
      ).length,
      xp: sliced.reduce((sum, row) => sum + (XP[row.kind] ?? 10), 0),
    };
  }, [rows, range]);

  return (
    <div className="profilimDrawerStack">
      <div className="dailyMessageActions">
        {(["7", "30", "all"] as Range[]).map((item) => (
          <button key={item} type="button" aria-pressed={range === item} onClick={() => setRange(item)}>
            {item === "all" ? "Toplam" : `${item} gün`}
          </button>
        ))}
      </div>
      <div className="profilimStatCards">{[{label:'Aktif gün',value:stats.active},{label:'Günlük eylem',value:stats.actions},{label:'Günlük kaydı',value:stats.journal},{label:'Yolculuk günü',value:stats.journey},{label:'GoldMind',value:stats.mind},{label:'Tamamlanan içerik',value:stats.content},{label:'Kazanılan XP',value:stats.xp}].map(item=><article key={item.label}><span>{item.label}</span><strong>{item.value}</strong></article>)}</div>
    </div>
  );
}

export function LiveFavoritesPanel() {
  const [items, setItems] = useState<{ id: string; title: string; href: string; content_type: string }[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;
    void supabase
      .from("favorites")
      .select("id, title, href, content_type")
      .order("created_at", { ascending: false })
      .then(({ data }) => setItems((data ?? []) as typeof items));
  }, []);

  const types = ["all", ...new Set(items.map((item) => item.content_type))];
  const visible = items.filter((item) => filter === "all" || item.content_type === filter);

  if (items.length === 0) {
    return <ProfilimEmptyState text="Henüz favorin yok. Ritüel, tarot kartı veya blog yazısını kaydedince burada toplanır." />;
  }

  return (
    <div className="profilimDrawerStack">
      <div className="dailyMessageActions">
        {types.map((type) => (
          <button key={type} type="button" onClick={() => setFilter(type)}>
            {type === "all" ? "Tümü" : type}
          </button>
        ))}
      </div>
      <ul className="profilimDrawerList">
        {visible.map((item) => (
          <li key={item.id}>
            <a href={item.href}>
              <span>{item.content_type}</span>
              <strong>{item.title}</strong>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
