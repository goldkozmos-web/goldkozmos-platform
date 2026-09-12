"use client";

import { useEffect, useState } from "react";

import { REPEAT_OPTIONS, type ReminderItem } from "../../lib/daily/types";
import {
  completeReminder,
  createReminder,
  fetchReminders,
} from "../../lib/daily/client";
import ProfilimEmptyState from "../profilim/ProfilimEmptyState";
import "../../styles/daily-practice.css";

function formatWhen(item: ReminderItem) {
  if (!item.dueOn) {
    const date = new Date(item.createdAt);
    return date.toLocaleString("tr-TR", { dateStyle: "medium" });
  }

  const time = item.dueTime ? item.dueTime.slice(0, 5) : "";
  return time ? `${item.dueOn} · ${time}` : item.dueOn;
}

export default function RemindersPanel() {
  const [items, setItems] = useState<ReminderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [dueOn, setDueOn] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [repeatRule, setRepeatRule] = useState("none");

  async function reload() {
    const next = await fetchReminders();
    setItems(next);
    setLoading(false);
  }

  useEffect(() => {
    void reload();
  }, []);

  const open = items.filter((item) => !item.completedAt);
  const done = items.filter((item) => item.completedAt);

  return (
    <div className="profilimDrawerStack">
      <form
        className="profilimCompose"
        onSubmit={(event) => {
          event.preventDefault();
          if (!title.trim()) return;
          setPending(true);
          setStatus("");
          void createReminder({
            title,
            note,
            dueOn,
            dueTime,
            repeatRule,
          }).then(async (result) => {
            setPending(false);
            if (result.error) {
              setStatus(result.error);
              return;
            }
            setTitle("");
            setNote("");
            setDueOn("");
            setDueTime("");
            setRepeatRule("none");
            setStatus("Görev kaydedildi. Uygulama içi hatırlatma oluşturuldu.");
            await reload();
          });
        }}
      >
        <label>
          Görev başlığı
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Bugün neyi tamamlamak istiyorsun?"
            maxLength={80}
            required
          />
        </label>
        <label>
          Not
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={3}
            placeholder="İsteğe bağlı not"
            maxLength={400}
          />
        </label>
        <label>
          Tarih
          <input
            type="date"
            value={dueOn}
            onChange={(event) => setDueOn(event.target.value)}
          />
        </label>
        <label>
          Saat
          <input
            type="time"
            value={dueTime}
            onChange={(event) => setDueTime(event.target.value)}
          />
        </label>
        <label>
          Tekrar
          <select
            value={repeatRule}
            onChange={(event) => setRepeatRule(event.target.value)}
          >
            {REPEAT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" disabled={pending}>
          {pending ? "Kaydediliyor…" : "Ekle"}
        </button>
      </form>
      {status ? <p className="profilimDrawerNote">{status}</p> : null}

      {loading ? (
        <ProfilimEmptyState text="Görevlerin açılıyor…" />
      ) : items.length === 0 ? (
        <ProfilimEmptyState text="Yapılacakların boş. İlk görevin yalnızca sana görünür." />
      ) : (
        <>
          {open.length ? (
            <ul className="profilimDrawerList">
              {open.map((item) => (
                <li key={item.id}>
                  <strong>{item.title}</strong>
                  <small>{formatWhen(item)}</small>
                  {item.note ? <p>{item.note}</p> : null}
                  <button
                    type="button"
                    className="dailyInlineAction"
                    onClick={() => {
                      void completeReminder(item.id).then(() => reload());
                    }}
                  >
                    Tamamlandı
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
          {done.length ? (
            <p className="profilimDrawerNote">
              Tamamlanan: {done.map((item) => item.title).join(", ")}
            </p>
          ) : null}
        </>
      )}
    </div>
  );
}
