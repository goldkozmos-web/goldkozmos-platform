"use client";

import { useCallback, useEffect, useState } from "react";

import { createSupabaseBrowserClient } from "../../lib/supabase/browser";
import { enableMemberPush, pushSupportState } from "../../lib/push/browser";
import { timesBetween } from "../../lib/water/schedule";
import WaterGlassArt from "./WaterGlassArt";

type Settings = {
  daily_goal: number;
  start_time: string;
  end_time: string;
  reminders_per_day: number;
  interval_minutes: number | null;
  enabled: boolean;
};

export default function WaterPanel({ userId }: { userId: string }) {
  const [glasses, setGlasses] = useState(0);
  const [goal, setGoal] = useState(8);
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("21:00");
  const [count, setCount] = useState(6);
  const [interval, setIntervalMinutes] = useState<string>("");
  const [enabled, setEnabled] = useState(false);
  const [times, setTimes] = useState<string[]>([]);
  const [custom, setCustom] = useState("");
  const [status, setStatus] = useState("");
  const [support, setSupport] = useState(pushSupportState());

  const load = useCallback(async () => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase || !userId) return;
    const today = new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Istanbul" });
    const [{ data: settings }, { data: stamps }, { data: logs }] = await Promise.all([
      supabase.from("water_reminder_settings").select("*").eq("user_id", userId).maybeSingle(),
      supabase.from("water_reminder_times").select("time").eq("user_id", userId),
      supabase
        .from("water_logs")
        .select("amount, logged_at")
        .eq("user_id", userId)
        .gte("logged_at", `${today}T00:00:00+03:00`),
    ]);
    if (settings) {
      const row = settings as Settings;
      setGoal(row.daily_goal);
      setStart(String(row.start_time).slice(0, 5));
      setEnd(String(row.end_time).slice(0, 5));
      setCount(row.reminders_per_day);
      setIntervalMinutes(row.interval_minutes ? String(row.interval_minutes) : "");
      setEnabled(row.enabled);
    }
    setTimes((stamps ?? []).map((row) => String(row.time).slice(0, 5)).sort());
    setGlasses((logs ?? []).reduce((sum, row) => sum + Number(row.amount || 1), 0));
  }, [userId]);

  useEffect(() => {
    void load();
    setSupport(pushSupportState());
  }, [load]);

  async function save(nextEnabled = enabled) {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;
    const intervalMin = interval ? Number(interval) : null;
    const planned = times.length
      ? times
      : timesBetween(start, end, count, intervalMin);
    const { error } = await supabase.from("water_reminder_settings").upsert({
      user_id: userId,
      daily_goal: goal,
      start_time: `${start}:00`,
      end_time: `${end}:00`,
      reminders_per_day: count,
      interval_minutes: intervalMin,
      enabled: nextEnabled,
      timezone: "Europe/Istanbul",
      updated_at: new Date().toISOString(),
    });
    if (error) {
      setStatus(error.message);
      return;
    }
    await supabase.from("water_reminder_times").delete().eq("user_id", userId);
    if (planned.length) {
      await supabase.from("water_reminder_times").insert(
        planned.map((time) => ({ user_id: userId, time: `${time}:00` })),
      );
    }
    setTimes(planned);
    setStatus(`Hatırlatmalar: ${planned.join(", ")}`);
    if (nextEnabled) {
      const push = await enableMemberPush();
      if (!push.ok) {
        setStatus(
          push.reason === "unsupported"
            ? "Bu cihazda tarayıcı bildirimi desteklenmiyor."
            : "Ayar kaydedildi. Bildirim izni verilmedi.",
        );
      }
    }
    void load();
  }

  async function drink() {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;
    await supabase.from("water_logs").insert({ user_id: userId, amount: 1 });
    setGlasses((value) => value + 1);
  }

  const done = glasses >= goal;

  return (
    <div className="profilimWaterDesk">
      <div className="profilimWaterStage">
        <p className="profilimWaterCount">
          <strong>{glasses}</strong>
          <span>/ {goal}</span>
        </p>
        <WaterGlassArt glasses={glasses} goal={goal} className="isStage" />
      </div>
      <div className="profilimWaterActions">
        <button type="button" className="profilimWaterPrimary" onClick={() => void drink()}>
          Su içtim
        </button>
      </div>
      <form
        className="profilimCompose"
        onSubmit={(event) => {
          event.preventDefault();
          void save(enabled);
        }}
      >
        <label>
          Günlük hedef (bardak)
          <input
            type="number"
            min={1}
            max={24}
            value={goal}
            onChange={(event) => setGoal(Number(event.target.value))}
          />
        </label>
        <label>
          Başlangıç
          <input type="time" value={start} onChange={(event) => setStart(event.target.value)} />
        </label>
        <label>
          Bitiş
          <input type="time" value={end} onChange={(event) => setEnd(event.target.value)} />
        </label>
        <label>
          Hatırlatma sayısı
          <input
            type="number"
            min={1}
            max={24}
            value={count}
            onChange={(event) => setCount(Number(event.target.value))}
          />
        </label>
        <label>
          Aralık (dakika, isteğe bağlı)
          <input
            type="number"
            min={30}
            value={interval}
            onChange={(event) => setIntervalMinutes(event.target.value)}
            placeholder="ör. 120"
          />
        </label>
        <label>
          Özel saat ekle
          <input
            type="time"
            value={custom}
            onChange={(event) => setCustom(event.target.value)}
          />
        </label>
        <button
          type="button"
          onClick={() => {
            if (!custom) return;
            setTimes((current) => [...new Set([...current, custom])].sort());
            setCustom("");
          }}
        >
          Saati ekle
        </button>
        {times.length ? <p>{times.join(" · ")}</p> : null}
        <button
          type="button"
          className="profilimWaterPrimary"
          onClick={() => {
            const next = !enabled;
            setEnabled(next);
            void save(next);
          }}
        >
          {enabled ? "Su Hatırlatıcısını Kapat" : "Su Hatırlatıcısını Aç"}
        </button>
        <button type="submit">Programı kaydet</button>
        {support === "unsupported" ? (
          <p>Bu cihazda tarayıcı bildirimi desteklenmiyor.</p>
        ) : null}
        {status ? <p>{status}</p> : null}
        {done ? <p>Bugünkü hedefe ulaştın.</p> : null}
      </form>
    </div>
  );
}
