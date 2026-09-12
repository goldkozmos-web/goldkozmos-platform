"use client";

import { useEffect, useState } from "react";

import {
  BODY_AREA_OPTIONS,
  EMOTION_OPTIONS,
  type EmotionJournalEntry,
} from "../../lib/daily/types";
import { createEmotionJournal, fetchEmotionJournal } from "../../lib/daily/client";
import ProfilimEmptyState from "../profilim/ProfilimEmptyState";
import "../../styles/daily-practice.css";

function formatWhen(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("tr-TR", { dateStyle: "medium", timeStyle: "short" });
}

export default function EmotionJournalPanel() {
  const [items, setItems] = useState<EmotionJournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  const [primaryEmotion, setPrimaryEmotion] = useState<string>(EMOTION_OPTIONS[0]);
  const [secondaryEmotion, setSecondaryEmotion] = useState("");
  const [intensity, setIntensity] = useState(5);
  const [triggerText, setTriggerText] = useState("");
  const [bodyArea, setBodyArea] = useState("");
  const [needText, setNeedText] = useState("");
  const [note, setNote] = useState("");

  async function reload() {
    const next = await fetchEmotionJournal();
    setItems(next);
    setLoading(false);
  }

  useEffect(() => {
    void reload();
  }, []);

  return (
    <div className="profilimDrawerStack">
      <form
        className="profilimCompose"
        onSubmit={(event) => {
          event.preventDefault();
          setPending(true);
          setStatus("");
          void createEmotionJournal({
            primaryEmotion,
            secondaryEmotion,
            intensity,
            triggerText,
            bodyArea,
            needText,
            note,
          }).then(async (result) => {
            setPending(false);
            if (result.error) {
              setStatus(result.error);
              return;
            }
            setSecondaryEmotion("");
            setTriggerText("");
            setNeedText("");
            setNote("");
            setIntensity(5);
            setStatus("Kayıt eklendi.");
            await reload();
          });
        }}
      >
        <label>
          Ana duygu
          <select
            value={primaryEmotion}
            onChange={(event) => setPrimaryEmotion(event.target.value)}
          >
            {EMOTION_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Alt duygu
          <input
            value={secondaryEmotion}
            onChange={(event) => setSecondaryEmotion(event.target.value)}
            placeholder="Örn. tedirginlik"
            maxLength={40}
          />
        </label>
        <label>
          Yoğunluk {intensity}
          <input
            type="range"
            min={1}
            max={10}
            value={intensity}
            onChange={(event) => setIntensity(Number(event.target.value))}
          />
        </label>
        <label>
          Tetikleyici
          <input
            value={triggerText}
            onChange={(event) => setTriggerText(event.target.value)}
            placeholder="Ne tetikledi?"
            maxLength={160}
          />
        </label>
        <label>
          Bedende hissedilen bölge
          <select
            value={bodyArea}
            onChange={(event) => setBodyArea(event.target.value)}
          >
            <option value="">Seç</option>
            {BODY_AREA_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Şu an neye ihtiyacım var
          <input
            value={needText}
            onChange={(event) => setNeedText(event.target.value)}
            placeholder="Nefes, sınır, dinlenme…"
            maxLength={160}
          />
        </label>
        <label>
          Serbest not
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={4}
            placeholder="Bugünü kendi cümlelerinle bırak."
            maxLength={900}
          />
        </label>
        <button type="submit" disabled={pending}>
          {pending ? "Kaydediliyor…" : "Kaydet"}
        </button>
      </form>
      {status ? <p className="profilimDrawerNote">{status}</p> : null}

      {loading ? (
        <ProfilimEmptyState text="Kayıtların açılıyor…" />
      ) : items.length === 0 ? (
        <ProfilimEmptyState text="Henüz duygu günlüğü kaydın yok. İlk kaydın yalnızca sana görünür." />
      ) : (
        <ol className="profilimDrawerList">
          {items.map((item) => (
            <li key={item.id}>
              <span>
                {item.primaryEmotion}
                {item.secondaryEmotion ? ` · ${item.secondaryEmotion}` : ""}
                {` · ${item.intensity}/10`}
              </span>
              <strong>{item.needText || item.triggerText || "Kayıt"}</strong>
              <small>{formatWhen(item.createdAt)}</small>
              {item.bodyArea ? <p>Beden: {item.bodyArea}</p> : null}
              {item.note ? <p>{item.note}</p> : null}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
