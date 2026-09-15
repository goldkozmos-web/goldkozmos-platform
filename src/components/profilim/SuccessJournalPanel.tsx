"use client";

import { useEffect, useState } from "react";

import { createSupabaseBrowserClient } from "../../lib/supabase/browser";
import ProfilimEmptyState from "./ProfilimEmptyState";

type Entry = {
  id: string;
  achieved: string;
  how: string;
  appreciate: string;
  note: string;
  logged_on: string;
  created_at: string;
};

export default function SuccessJournalPanel() {
  const [rows, setRows] = useState<Entry[]>([]);
  const [achieved, setAchieved] = useState("");
  const [how, setHow] = useState("");
  const [appreciate, setAppreciate] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");

  async function load() {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;
    const { data } = await supabase
      .from("success_journal")
      .select("id, achieved, how, appreciate, note, logged_on, created_at")
      .order("created_at", { ascending: false })
      .limit(80);
    setRows((data ?? []) as Entry[]);
  }

  useEffect(() => {
    void load();
  }, []);

  return (
    <div className="profilimDrawerStack">
      <p>
        Küçük adımlar da buraya yazılır. “Bugün ertelediğim telefonu açtım.” yeter.
      </p>
      <form
        className="profilimCompose"
        onSubmit={(event) => {
          event.preventDefault();
          const supabase = createSupabaseBrowserClient();
          if (!supabase || !achieved.trim()) return;
          void supabase.auth.getUser().then(async ({ data }) => {
            if (!data.user) {
              setStatus("Giriş yapmalısın.");
              return;
            }
            const { error } = await supabase.from("success_journal").insert({
              user_id: data.user.id,
              achieved: achieved.trim(),
              how: how.trim(),
              appreciate: appreciate.trim(),
              note: note.trim(),
            });
            if (error) {
              setStatus(error.message);
              return;
            }
            await supabase.rpc("record_user_activity", {
              p_kind: "success_journal",
              p_title: "Başarı günlüğü",
              p_href: "/profilim",
              p_payload: {},
            });
            setAchieved("");
            setHow("");
            setAppreciate("");
            setNote("");
            setStatus("Kaydedildi.");
            void load();
          });
        }}
      >
        <label>
          Bugün neyi başardım?
          <input
            value={achieved}
            onChange={(event) => setAchieved(event.target.value)}
            required
            maxLength={400}
          />
        </label>
        <label>
          Bunun için ne yaptım?
          <input value={how} onChange={(event) => setHow(event.target.value)} />
        </label>
        <label>
          Kendimde neyi takdir ediyorum?
          <input
            value={appreciate}
            onChange={(event) => setAppreciate(event.target.value)}
          />
        </label>
        <label>
          Kısa not
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={3}
          />
        </label>
        <button type="submit">Kaydet</button>
        {status ? <p>{status}</p> : null}
      </form>
      {rows.length === 0 ? (
        <ProfilimEmptyState text="Henüz başarı kaydı yok. Küçük bir adımı yazarak başla." />
      ) : (
        <ul className="profilimDrawerList">
          {rows.map((row) => (
            <li key={row.id}>
              <span>{row.logged_on}</span>
              <strong>{row.achieved}</strong>
              {row.how ? <small>{row.how}</small> : null}
              {row.appreciate ? <p>{row.appreciate}</p> : null}
              {row.note ? <p>{row.note}</p> : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
