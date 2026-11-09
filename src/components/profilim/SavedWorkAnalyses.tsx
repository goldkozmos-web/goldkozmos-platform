"use client";
import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "../../lib/supabase/browser";
type Result = { title: string; summary: string; topics: string[]; recommendation: string; href: string };
export default function SavedWorkAnalyses() {
  const [items, setItems] = useState<{ id: string; created_at: string; payload: Result }[]>([]);
  const [status, setStatus] = useState("Analizlerin yükleniyor…");
  useEffect(() => {
    async function load() {
      const client = createSupabaseBrowserClient();
      if (!client) { setStatus("Analizlere erişilemiyor."); return; }
      const { data: session } = await client.auth.getSession();
      if (!session.session) { setStatus("Analizlerini görmek için giriş yap."); return; }
      try {
        const pending = localStorage.getItem("goldkozmos-work-finder-pending");
        if (pending) {
          const result = JSON.parse(pending);
          const { error } = await client.rpc("record_user_activity", { p_kind: "archetype", p_title: result.title, p_href: result.href, p_payload: result });
          if (error) throw error;
          localStorage.removeItem("goldkozmos-work-finder-pending");
        }
        const { data, error } = await client.from("user_activity").select("id,created_at,payload").eq("user_id", session.session.user.id).eq("payload->>type", "work_finder").order("created_at", { ascending: false });
        if (error) throw error;
        setItems(data ?? []); setStatus("");
      } catch { setStatus("Analizler yüklenemedi. Lütfen paneli yeniden açarak dene."); }
    }
    void load();
  }, []);
  return <section><h3>Çalışma seçim analizlerin</h3>{status ? <p role="status">{status}</p> : null}{!status && !items.length ? <p>Henüz kayıtlı sonucun yok. <a href="/sana-uygun-calismayi-bul">Sana uygun çalışmayı bul ↗</a></p> : null}<ul className="profilimDrawerList">{items.map(item => <li key={item.id}><small>{new Date(item.created_at).toLocaleDateString("tr-TR")}</small><strong>{item.payload.title}</strong><p>{item.payload.summary}</p><p>{item.payload.topics?.join(" · ")}</p><a href={item.payload.href}>{item.payload.recommendation} — Çalışmayı incele ↗</a></li>)}</ul></section>;
}
