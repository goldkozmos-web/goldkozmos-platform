"use client";

import { useEffect, useState } from "react";

import type { DailyAction } from "../../lib/daily/types";
import { ACTION_CATEGORIES } from "../../lib/daily/types";
import { completeTodayAction, fetchGoldActState } from "../../lib/daily/client";
import { GOLDACT_XP_EVENT } from "../../lib/profilim/activityXp";
import { createSupabaseBrowserClient } from "../../lib/supabase/browser";
import "../../styles/daily-practice.css";

export default function HomeGoldAction() {
  const [ready, setReady] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [action, setAction] = useState<DailyAction | null>(null);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      const state = await fetchGoldActState();
      if (cancelled) return;
      setSignedIn(state.signedIn);
      setAction(state.action);
      setReady(true);
    }

    void hydrate();

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      return () => {
        cancelled = true;
      };
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        void hydrate();
        return;
      }
      if (event === "SIGNED_OUT") {
        setSignedIn(false);
        setAction(null);
        setReady(true);
      }
    });

    const wake = () => {
      void hydrate();
    };
    window.addEventListener("focus", wake);
    document.addEventListener("visibilitychange", wake);

    return () => {
      cancelled = true;
      subscription.unsubscribe();
      window.removeEventListener("focus", wake);
      document.removeEventListener("visibilitychange", wake);
    };
  }, []);

  const category = action
    ? ACTION_CATEGORIES[action.category as keyof typeof ACTION_CATEGORIES] ??
      action.category
    : "";
  const done = Boolean(action?.completedAt);

  return (
    <section className="goldActCard" id="goldact" aria-label="GoldAct">
      <span className="goldActWash" aria-hidden="true" />
      <span className="goldActShine" aria-hidden="true" />
      <span className="goldActSeal" aria-hidden="true" />
      <div className="goldActInner">
        <p className="goldActMark">GoldAct</p>
        <p className="goldActKicker">
          Bugünün eylemini tamamla, puan kazan.
        </p>

        {!ready ? (
          <p className="goldActBody">Bugünün eylemi açılıyor…</p>
        ) : signedIn && action ? (
          <>
            <p className="goldActCat">{category}</p>
            <h2>{action.title}</h2>
            <p className="goldActBody">{action.body}</p>
            <button
              type="button"
              className="goldActDone"
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
                  setNote(
                    result.already
                      ? "Bugün zaten tamamlandı."
                      : "Kaydedildi. Puanın işlendi.",
                  );
                  window.dispatchEvent(new Event(GOLDACT_XP_EVENT));
                });
              }}
            >
              {done ? "✓ Tamamlandı" : "Tamamladım"}
            </button>
            {done && action.completedAt ? (
              <p className="goldActNote">
                {new Date(action.completedAt).toLocaleString("tr-TR", {
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            ) : null}
            {note ? <p className="goldActNote">{note}</p> : null}
          </>
        ) : signedIn ? (
          <p className="goldActBody">Bugünün eylemi henüz hesabına bağlanmadı.</p>
        ) : (
          <>
            <p className="goldActBody">
              Google ile giriş yap. Bugünün tek eylemi hesabına bağlanır.
            </p>
            <a className="goldActGoogle" href="/auth/google?next=/#goldact">
              Google ile devam et
            </a>
          </>
        )}
      </div>
    </section>
  );
}
