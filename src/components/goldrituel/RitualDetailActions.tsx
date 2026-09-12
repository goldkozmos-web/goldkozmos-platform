"use client";

import { useEffect, useState } from "react";

import type { Ritual } from "../../data/goldrituel/types";
import { useRitualStore } from "./useRitualStore";

export default function RitualDetailActions({ ritual }: { ritual: Ritual }) {
  const { store, toggleSaved, markDone, saveNote } = useRitualStore();
  const existing = store.notes.find((item) => item.slug === ritual.slug)?.body ?? "";
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    setNote(existing);
  }, [existing]);

  const saved = store.saved.includes(ritual.slug);
  const practiced = store.practiced.some((item) => item.slug === ritual.slug);

  return (
    <>
      <div className="grDetailActions">
        <button
          type="button"
          className={`grBtnGhost${saved ? " isOn" : ""}`}
          onClick={() => {
            toggleSaved(ritual.slug);
            setStatus(saved ? "Kayıtlardan çıkarıldı." : "Favorilere eklendi.");
          }}
        >
          {saved ? "Favorilerde" : "Favorilere ekle"}
        </button>
        <button
          type="button"
          className={`grBtn${practiced ? " isOn" : ""}`}
          onClick={() => {
            markDone(ritual.slug);
            setStatus("Uygulama kaydedildi.");
          }}
        >
          {practiced ? "Uygulandı" : "Uyguladım"}
        </button>
      </div>

      <section className="grSection">
        <h2>Not ekle</h2>
        <textarea
          className="grNote"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Bu ritüelle ilgili kısa bir not…"
        />
        <div className="grDetailActions">
          <button
            type="button"
            className="grBtn"
            onClick={() => {
              saveNote(ritual.slug, note);
              setStatus("Not kaydedildi.");
            }}
          >
            Notu kaydet
          </button>
        </div>
        {status ? <p className="grStatus">{status}</p> : null}
      </section>
    </>
  );
}
