"use client";

import { useCallback, useEffect, useState } from "react";
import { istanbulMessageDay } from "../../lib/daily/visual";
import ProfilimDrawer from "./ProfilimDrawer";
import ProfilimFeaturedCard from "./ProfilimFeaturedCard";

const suggestions = ["Enerjimi bana iyi gelen şeylere yöneltiyorum.", "Bugün kendime daha nazik davranıyorum.", "Küçük bir adımla kendi yolumu açıyorum."];

export default function ProfilimIntentionCard({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);
  const [intention, setIntention] = useState("");
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState("");
  const close = useCallback(() => setOpen(false), []);
  useEffect(() => {
    function load() {
      try { setIntention(localStorage.getItem(`gk:intention:${userId}:${istanbulMessageDay()}`) || ""); }
      catch { /* The editor remains usable if storage is unavailable. */ }
    }
    load();
    const timer = window.setInterval(load, 60000);
    window.addEventListener("focus", load);
    return () => { window.clearInterval(timer); window.removeEventListener("focus", load); };
  }, [userId]);
  function save() {
    const value = draft.trim();
    if (!value) return;
    try {
      localStorage.setItem(`gk:intention:${userId}:${istanbulMessageDay()}`, value);
      setIntention(value); setOpen(false);
    } catch { setStatus("Bu cihazda kaydedilemedi. Tarayıcı depolama iznini kontrol edip yeniden deneyebilirsin."); }
  }
  return <>
    <ProfilimFeaturedCard eyebrow="NİYET" title="Bugünün Niyeti" className="profilimIntentionCard" onOpen={() => { setDraft(intention); setStatus(""); setOpen(true); }}>{intention || "Enerjine bugün bir yön ver."}</ProfilimFeaturedCard>
    {open ? <ProfilimDrawer eyebrow="NİYET" title="Bugüne bir niyet bırak." onClose={close}>
      <div className="profilimExperienceLead"><strong>Dikkatini nereye yöneltmek istersin?</strong><p>Kendin için kısa, nazik ve uygulanabilir bir cümle seç.</p></div>
      <form className="profilimIntentionForm" onSubmit={event => { event.preventDefault(); save(); }}>
        <label htmlFor="daily-intention">Bugünkü niyetin</label>
        <textarea id="daily-intention" value={draft} onChange={event => setDraft(event.target.value)} maxLength={180} rows={3} placeholder="Bugün kendime alan açıyorum…" required />
        <div className="profilimIntentionSuggestions">{suggestions.map(text => <button key={text} type="button" onClick={() => setDraft(text)}>{text}</button>)}</div>
        <small>Niyetin bu cihazda, bugüne özel saklanır.</small>
        <button className="profilimIntentionSave" type="submit" disabled={!draft.trim()}>Niyetimi kaydet <span aria-hidden="true">↗</span></button>
        {status ? <p role="alert">{status}</p> : null}
      </form>
    </ProfilimDrawer> : null}
  </>;
}
