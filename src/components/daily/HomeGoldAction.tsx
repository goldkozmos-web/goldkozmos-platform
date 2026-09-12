"use client";

import { useEffect, useState } from "react";

import type { DailyAction } from "../../lib/daily/types";
import { ACTION_CATEGORIES } from "../../lib/daily/types";
import { completeTodayAction, fetchTodayAction } from "../../lib/daily/client";
import "../../styles/daily-practice.css";

export default function HomeGoldAction() {
  const [action, setAction] = useState<DailyAction | null>(null);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");

  useEffect(() => {
    void fetchTodayAction().then(setAction);
  }, []);

  if (!action) {
    return (
      <section className="homeSoftCard" aria-label="GoldKozmos Eylemi">
        <p className="dailyEyebrow">GOLDKOZMOS EYLEMİ</p>
        <p className="homeSoftLead">
          Bugünün eylemi giriş yaptığında açılır. Tek görev, tek gün.
        </p>
        <a className="homeSoftLink" href="/profilim">
          Giriş yap
        </a>
      </section>
    );
  }

  const category =
    ACTION_CATEGORIES[action.category as keyof typeof ACTION_CATEGORIES] ??
    action.category;
  const done = Boolean(action.completedAt);

  return (
    <section className="homeSoftCard" aria-label="GoldKozmos Eylemi">
      <p className="dailyEyebrow">GOLDKOZMOS EYLEMİ · {category}</p>
      <h2>{action.title}</h2>
      <p>{action.body}</p>
      <button
        type="button"
        className="dailyActionDone"
        disabled={done || busy}
        onClick={() => {
          setBusy(true);
          void completeTodayAction().then((result) => {
            setBusy(false);
            if (result.error) {
              setNote(result.error);
              return;
            }
            setAction({
              ...action,
              completedAt: result.completedAt || new Date().toISOString(),
            });
            setNote("Kaydedildi.");
          });
        }}
      >
        {done ? "Bugün tamamlandı" : "Tamamladım"}
      </button>
      {note ? <p className="dailyStatus">{note}</p> : null}
    </section>
  );
}
