"use client";

import { useEffect, useState } from "react";

import { ACTION_CATEGORIES, type DailyAction } from "../../lib/daily/types";
import { completeTodayAction, fetchTodayAction } from "../../lib/daily/client";
import { createSupabaseBrowserClient } from "../../lib/supabase/browser";
import "../../styles/daily-practice.css";

export default function DailyActionCard() {
  const [action, setAction] = useState<DailyAction | null>(null);
  const [signedIn, setSignedIn] = useState(false);
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;

    void supabase.auth.getUser().then(({ data }) => {
      const ok = Boolean(data.user);
      setSignedIn(ok);
      if (ok) {
        void fetchTodayAction().then(setAction);
      }
    });
  }, []);

  const category =
    action && action.category in ACTION_CATEGORIES
      ? ACTION_CATEGORIES[action.category as keyof typeof ACTION_CATEGORIES]
      : action?.category;

  return (
    <section className="dailyActionBand">
      <div className="dailyActionCard">
        <p className="dailyEyebrow">BUGÜNÜN GOLDKOZMOS EYLEMİ</p>
        {signedIn && action ? (
          <>
            {category ? <span className="dailyActionCategory">{category}</span> : null}
            <h2>{action.title}</h2>
            <p>{action.body}</p>
            {action.completedAt ? (
              <p className="dailyStatus">Bugün tamamlandı.</p>
            ) : (
              <button
                type="button"
                className="dailyActionDone"
                disabled={pending}
                onClick={() => {
                  setPending(true);
                  void completeTodayAction().then((result) => {
                    setPending(false);
                    if (result.error) {
                      setStatus(result.error);
                      return;
                    }
                    setAction((current) =>
                      current
                        ? {
                            ...current,
                            completedAt: result.completedAt ?? new Date().toISOString(),
                          }
                        : current,
                    );
                    setStatus("Bugünün eylemi kaydedildi.");
                  });
                }}
              >
                {pending ? "Kaydediliyor…" : "Tamamladım"}
              </button>
            )}
            {status ? <p className="dailyStatus">{status}</p> : null}
          </>
        ) : signedIn ? (
          <>
            <h2>Bugün küçük bir adım.</h2>
            <p>Günün eylemi birazdan burada durur.</p>
          </>
        ) : (
          <>
            <h2>Bugün küçük bir adım.</h2>
            <p>Günün eylemini görmek ve tamamlamak için Profilim’den giriş yap.</p>
            <a className="dailyActionDone" href="/profilim">
              Profilim
            </a>
          </>
        )}
      </div>
    </section>
  );
}
