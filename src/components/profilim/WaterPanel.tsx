"use client";

import { useCallback, useEffect, useState } from "react";

import { createSupabaseBrowserClient } from "../../lib/supabase/browser";
import { enableMemberPush, pushSupportState } from "../../lib/push/browser";
import { parseCustomTimes, timesBetween } from "../../lib/water/schedule";
import WaterGlassArt from "./WaterGlassArt";

type Settings = {
  daily_goal: number;
  start_time: string;
  end_time: string;
  reminders_per_day: number;
  interval_minutes: number | null;
  enabled: boolean;
  schedule_mode?: "count" | "interval" | "custom";
};

export default function WaterPanel({ userId }: { userId: string }) {
  const [glasses, setGlasses] = useState(0);
  const [goal, setGoal] = useState(8);
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("22:00");
  const [count, setCount] = useState(6);
  const [intervalHours, setIntervalHours] = useState("2");
  const [enabled, setEnabled] = useState(false);
  const [times, setTimes] = useState<string[]>([]);
  const [mode, setMode] = useState<"count" | "interval" | "custom">("count");
  const [customInput, setCustomInput] = useState("09:00, 11:30, 14:00, 17:00, 20:00");
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
      setIntervalHours(
        row.interval_minutes ? String(Math.max(1, Math.round(row.interval_minutes / 60))) : "2",
      );
      setEnabled(row.enabled);
      if (row.schedule_mode === "interval" || row.schedule_mode === "custom" || row.schedule_mode === "count") {
        setMode(row.schedule_mode);
      }
    }
    const timeList = (stamps ?? []).map((row) => String(row.time).slice(0, 5)).sort();
    setTimes(timeList);
    if (timeList.length) setCustomInput(timeList.join(", "));
    setGlasses((logs ?? []).reduce((sum, row) => sum + Number(row.amount || 1), 0));
  }, [userId]);

  useEffect(() => {
    void load();
    setSupport(pushSupportState());
  }, [load]);

  async function drink() {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;
    await supabase.from("water_logs").insert({ user_id: userId, amount: 1 });
    setGlasses((value) => value + 1);
  }

  useEffect(() => {
    if (!userId) return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("drank") !== "1") return;
    const key = `gk-water-drank-${new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Istanbul" })}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    void drink();
    params.delete("drank");
    const next = params.toString();
    window.history.replaceState({}, "", `${window.location.pathname}${next ? `?${next}` : ""}`);
  }, [userId]);

  async function save(nextEnabled = enabled) {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;
    const hours = Math.max(1, Number(intervalHours) || 2);
    const intervalMin = mode === "interval" ? hours * 60 : null;
    const planned =
      mode === "custom"
        ? parseCustomTimes(customInput)
        : timesBetween(start, end, count, intervalMin);
    const { error } = await supabase.from("water_reminder_settings").upsert({
      user_id: userId,
      daily_goal: goal,
      start_time: `${start}:00`,
      end_time: `${end}:00`,
      reminders_per_day: planned.length || count,
      interval_minutes: intervalMin,
      schedule_mode: mode,
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
    setStatus(`Kaydedildi. Planlanan saatler: ${planned.join(", ") || "yok"}`);
    if (nextEnabled) {
      const push = await enableMemberPush();
      if (!push.ok) {
        setStatus(
          push.reason === "unsupported"
            ? "Ayar kaydedildi. Bu cihazda tarayıcı bildirimi desteklenmiyor."
            : "Ayar kaydedildi. Bildirim izni verilmedi; telefon bildirimi gelmez.",
        );
      }
    }
    void load();
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
          İçtim
        </button>
        <button type="button" className="profilimWaterPrimary" onClick={() => void drink()}>
          + Bir Bardak
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
        <p className="dp-mini">Hatırlatma modeli</p>
        <label className="profilimWaterRadio">
          <input
            type="radio"
            name="water-mode"
            checked={mode === "count"}
            onChange={() => setMode("count")}
          />
          A) Günde X kez
        </label>
        {mode === "count" ? (
          <label>
            Kaç kez
            <input
              type="number"
              min={1}
              max={24}
              value={count}
              onChange={(event) => setCount(Number(event.target.value))}
            />
          </label>
        ) : null}
        <label className="profilimWaterRadio">
          <input
            type="radio"
            name="water-mode"
            checked={mode === "interval"}
            onChange={() => setMode("interval")}
          />
          B) Her X saatte
        </label>
        {mode === "interval" ? (
          <label>
            Saat aralığı
            <input
              type="number"
              min={1}
              max={12}
              value={intervalHours}
              onChange={(event) => setIntervalHours(event.target.value)}
            />
          </label>
        ) : null}
        <label className="profilimWaterRadio">
          <input
            type="radio"
            name="water-mode"
            checked={mode === "custom"}
            onChange={() => setMode("custom")}
          />
          C) Özel saatler
        </label>
        {mode === "custom" ? (
          <label>
            Saatler
            <input
              value={customInput}
              onChange={(event) => setCustomInput(event.target.value)}
              placeholder="09:00, 11:30, 14:00, 17:00, 20:00"
            />
          </label>
        ) : null}
        {times.length ? <p className="dp-mini">Kayıtlı saatler: {times.join(" · ")}</p> : null}
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
