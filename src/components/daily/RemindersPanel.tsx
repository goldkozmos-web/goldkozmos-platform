"use client";

import { useEffect, useMemo, useState } from "react";

import { REPEAT_OPTIONS, type ReminderItem } from "../../lib/daily/types";
import {
  completeReminder,
  createReminder,
  deleteReminder,
  fetchReminders,
} from "../../lib/daily/client";
import { readTodos, writeTodos } from "../../lib/profilim/localStore";
import { sendTodoPhoneNotice } from "../../lib/push/browser";
import ProfilimEmptyState from "../profilim/ProfilimEmptyState";
import "../../styles/daily-practice.css";

function mergeTodos(local: ReminderItem[], remote: ReminderItem[]) {
  const map = new Map<string, ReminderItem>();
  for (const item of remote) {
    if (item.id) map.set(item.id, item);
  }
  for (const item of local) {
    if (item.id) map.set(item.id, item);
  }
  return [...map.values()]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 200);
}

function formatWhen(item: ReminderItem) {
  const bits: string[] = [];
  if (item.dueOn) {
    const stamp = item.dueTime
      ? `${item.dueOn}T${item.dueTime.slice(0, 5)}`
      : `${item.dueOn}T12:00`;
    const date = new Date(stamp);
    bits.push(
      date.toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "short",
      }),
    );
    if (item.dueTime) {
      bits.push(item.dueTime.slice(0, 5));
    }
  }
  const repeat = REPEAT_OPTIONS.find((option) => option.value === item.repeatRule);
  if (repeat && repeat.value !== "none") {
    bits.push(repeat.label);
  }
  return bits.join(" · ");
}

function isDueNow(dueOn: string, dueTime: string) {
  if (!dueOn) return true;
  const time = dueTime ? dueTime.slice(0, 5) : "00:00";
  const stamp = Date.parse(`${dueOn}T${time}:00+03:00`);
  return Number.isFinite(stamp) && stamp <= Date.now();
}

export default function RemindersPanel({ userId }: { userId: string }) {
  const [items, setItems] = useState<ReminderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [dueOn, setDueOn] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [repeatRule, setRepeatRule] = useState("none");
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [showDone, setShowDone] = useState(false);
  const [notifyPhone, setNotifyPhone] = useState(true);

  function persist(next: ReminderItem[]) {
    setItems(next);
    writeTodos(userId, next);
  }

  useEffect(() => {
    const local = readTodos(userId);
    if (local.length) {
      setItems(local);
      setLoading(false);
    }

    void fetchReminders()
      .then((remote) => {
        const next = mergeTodos(readTodos(userId), remote);
        setItems(next);
        writeTodos(userId, next);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const open = useMemo(
    () => items.filter((item) => !item.completedAt),
    [items],
  );
  const done = useMemo(
    () => items.filter((item) => item.completedAt),
    [items],
  );

  async function addTask() {
    const trimmed = title.trim();
    if (trimmed.length < 2) {
      setStatus("Görev için en az iki harf yaz.");
      return;
    }

    const item: ReminderItem = {
      id: crypto.randomUUID(),
      title: trimmed,
      note: note.trim(),
      dueOn: dueOn || null,
      dueTime: dueTime || null,
      repeatRule,
      completedAt: null,
      createdAt: new Date().toISOString(),
    };

    persist(mergeTodos([item], items));
    setTitle("");
    setNote("");
    setDueOn("");
    setDueTime("");
    setRepeatRule("none");
    setPending(true);

    const result = await createReminder({
      id: item.id,
      title: item.title,
      note: item.note,
      dueOn: item.dueOn ?? "",
      dueTime: item.dueTime ?? "",
      repeatRule: item.repeatRule,
    });

    if (notifyPhone) {
      const dueNow = isDueNow(item.dueOn ?? "", item.dueTime ?? "");
      if (dueNow) {
        const ping = await sendTodoPhoneNotice("Yapılacaklarım", item.title);
        setStatus(
          ping.ok
            ? "Kaydedildi. Bildirim telefona gitti."
            : ping.reason === "denied"
              ? "Kaydedildi. Telefon bildirimi için izin ver."
              : "Kaydedildi. Bildirim izni bu tarayıcıda kapalı.",
        );
      } else {
        const ping = await sendTodoPhoneNotice(
          "Yapılacaklarım",
          `${item.title} saatine bildirim kuruldu.`,
        );
        setStatus(
          ping.ok
            ? "Kaydedildi. Saat gelince telefona düşer."
            : "Kaydedildi. Bildirim için tarayıcı iznini aç.",
        );
      }
    } else {
      setStatus(result.error ? "Cihazına kaydedildi." : "Kaydedildi.");
    }

    setPending(false);
  }

  function markDone(id: string) {
    persist(
      items.map((item) =>
        item.id === id
          ? { ...item, completedAt: new Date().toISOString() }
          : item,
      ),
    );
    void completeReminder(id);
  }

  function remove(id: string) {
    persist(items.filter((item) => item.id !== id));
    void deleteReminder(id);
  }

  return (
    <div className="profilimTodoDesk">
      <p className="profilimTodoCount">
        {open.length} açık
        {done.length ? ` · ${done.length} tamamlanan` : ""}
        {items.length ? ` · ${items.length} kayıt` : ""}
      </p>

      <form
        className="profilimTodoComposer"
        lang="tr"
        onSubmit={(event) => {
          event.preventDefault();
          void addTask();
        }}
      >
        <div className="profilimTodoAddRow">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Yeni görev yaz"
            maxLength={80}
            aria-label="Görev başlığı"
          />
          <button type="submit" disabled={pending}>
            {pending ? "…" : "Ekle"}
          </button>
        </div>

        <label className="profilimTodoNotify">
          <input
            type="checkbox"
            checked={notifyPhone}
            onChange={(event) => {
              const on = event.target.checked;
              setNotifyPhone(on);
              if (on) setDetailsOpen(true);
            }}
          />
          Telefona bildir
        </label>

        <button
          type="button"
          className="profilimTodoMore"
          onClick={() => setDetailsOpen((value) => !value)}
        >
          {detailsOpen ? "Detayı kapat" : "Not, tarih, tekrar"}
        </button>

        {detailsOpen ? (
          <div className="profilimTodoDetails">
            <label>
              Not
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                rows={2}
                placeholder="İsteğe bağlı"
                maxLength={400}
              />
            </label>
            <div className="profilimTodoWhen">
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
            </div>
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
          </div>
        ) : null}
      </form>

      {status ? <p className="profilimDrawerNote">{status}</p> : null}

      {loading && items.length === 0 ? (
        <ProfilimEmptyState text="Görevlerin açılıyor…" />
      ) : open.length === 0 && done.length === 0 ? (
        <ProfilimEmptyState text="İlk görevini yaz, Ekle’ye bas. Listeden silmeden istediğin kadar kayıt tutabilirsin." />
      ) : (
        <>
          {open.length ? (
            <ul className="profilimTodoList">
              {open.map((item) => (
                <li key={item.id} className="profilimTodoCard">
                  <button
                    type="button"
                    className="profilimTodoCheck"
                    onClick={() => markDone(item.id)}
                    aria-label={`${item.title} tamamlandı`}
                  />
                  <div className="profilimTodoBody">
                    <strong>{item.title}</strong>
                    {formatWhen(item) ? <small>{formatWhen(item)}</small> : null}
                    {item.note ? <p>{item.note}</p> : null}
                  </div>
                  <button
                    type="button"
                    className="profilimTodoDelete"
                    onClick={() => remove(item.id)}
                    aria-label="Sil"
                  >
                    Sil
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="profilimDrawerNote">Açık görev kalmadı.</p>
          )}

          {done.length ? (
            <div className="profilimTodoDoneBlock">
              <button
                type="button"
                className="profilimTodoMore"
                onClick={() => setShowDone((value) => !value)}
              >
                Tamamlananlar ({done.length})
              </button>
              {showDone ? (
                <ul className="profilimTodoList">
                  {done.map((item) => (
                    <li
                      key={item.id}
                      className="profilimTodoCard isDone"
                    >
                      <span className="profilimTodoCheck isOn" aria-hidden="true" />
                      <div className="profilimTodoBody">
                        <strong>{item.title}</strong>
                        {formatWhen(item) ? (
                          <small>{formatWhen(item)}</small>
                        ) : null}
                      </div>
                      <button
                        type="button"
                        className="profilimTodoDelete"
                        onClick={() => remove(item.id)}
                        aria-label="Sil"
                      >
                        Sil
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
