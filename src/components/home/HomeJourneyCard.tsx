"use client";

import { useEffect, useState } from "react";

import { JOURNEY_DAYS } from "../../data/kendilik-yolculugu";
import { createSupabaseBrowserClient } from "../../lib/supabase/browser";

export function useJourneyProgress() {
  const [done, setDone] = useState<number[]>([]);
  const [started, setStarted] = useState(false);

  async function reload() {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;
    const { data: session } = await supabase.auth.getSession();
    const userId = session.session?.user.id;
    if (!userId) return;
    const { data } = await supabase
      .from("user_journey_days")
      .select("day")
      .eq("user_id", userId);
    const days = (data ?? []).map((row) => Number(row.day)).filter(Boolean);
    setDone(days);
    setStarted(days.length > 0);
  }

  useEffect(() => {
    void reload();
  }, []);

  return { done, started, reload, nextDay: Math.min(21, (Math.max(0, ...done, 0) || 0) + (done.length ? 1 : 1)) };
}

export default function HomeJourneyCard() {
  const { done, started } = useJourneyProgress();
  const completed = new Set(done).size;
  const current = Math.min(21, completed + 1);

  return (
    <a className="homeSoftCard" href="/kendilik-yolculugu" style={{ display: "block", textDecoration: "none" }}>
      <p className="dailyEyebrow">21 GÜNLÜK KENDİLİK YOLCULUĞU</p>
      {started ? (
        <>
          <h2>Gün {Math.min(current, 21)} / 21</h2>
          <p>Kaldığın yerden devam et. Kaçırılan gün seriyi sıfırlamaz.</p>
        </>
      ) : (
        <>
          <h2>21 Günlük Kendilik Yolculuğu</h2>
          <p>Günde 5–10 dakika. Gözlem, küçük uygulama, tek soru.</p>
        </>
      )}
    </a>
  );
}

export { JOURNEY_DAYS };
