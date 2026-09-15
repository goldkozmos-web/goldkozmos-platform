"use client";

import { useCallback, useEffect, useState } from "react";

import { createSupabaseBrowserClient } from "../../lib/supabase/browser";
import { enableMemberPush, pushSupportState } from "../../lib/push/browser";
import { recoverMissingTable } from "../../lib/platform/ensureSchema";
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

function friendlyError(message: string) {
  if (message.toLowerCase().includes("schema cache") || message.toLowerCase().includes("does not exist")) {
    return "Kayıt alanı henüz açılmamıştı. Tekrar dene; açılmazsa Vercel’e DATABASE_URL eklenmeli.";
  }
  return message;
}

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
  const [saving, setSaving] = useState(false);
  const [support, setSupport] = useState(pushSupportState());

  const load = useCallback(async () => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase || !userId) return;
    const today = new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Istanbul" });
    const [{ data: settings, error }, { data: stamps }, { data: logs }] = await Promise.all([
      supabase.from("water_reminder_settings").select("*").eq("user_id", userId).maybeSingle(),
      supabase.from("water_reminder_times").select("time").eq("user_id", userId),
      supabase
        .from("water_logs")
        .select("amount, logged_at")
        .eq("user_id", userId)
        .gte("logged_at", `${today}T00:00:00+03:00`),
    ]);
    if (error && (await recoverMissingTable(error.message))) {
      void load();
      return;
    }
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
    const first = await supabase.from("water_logs").insert({ user_id: userId, amount: 1 });
    if (first.error && (await recoverMissingTable(first.error.message))) {
      await supabase.from("water_logs").insert({ user_id: userId, amount: 1 });
    }
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
    setSaving(true);
    const hours = Math.max(1, Number(intervalHours) || 2);
    const intervalMin = mode === "interval" ? hours * 60 : null;
    const planned =
      mode === "custom"
        ? parseCustomTimes(customInput)
        : timesBetween(start, end, count, intervalMin);
    const payload = {
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
    };
    let { error } = await supabase.from("water_reminder_settings").upsert(payload);
    if (error && (await recoverMissingTable(error.message))) {
      ({ error } = await supabase.from("water_reminder_settings").upsert(payload));
    }
    if (error) {
      setStatus(friendlyError(error.message));
      setSaving(false);
      return;
    }
    await supabase.from("water_reminder_times").delete().eq("user_id", userId);
    if (planned.length) {
      await supabase.from("water_reminder_times").insert(
        planned.map((time) => ({ user_id: userId, time: `${time}:00` })),
      );
    }
    setTimes(planned);
    if (nextEnabled) {
      const push = await enableMemberPush();
      if (!push.ok) {
        setStatus(
          push.reason === "unsupported"
            ? "Program kaydedildi. Bu tarayıcı web push desteklemiyor."
            : "Program kaydedildi. Telefon bildirimi için izin ver.",
        );
        setSaving(false);
        void load();
        return;
      }
      setStatus(`Hatırlatıcı açık. Saatler: ${planned.join(" · ")}`);
    } else {
      setStatus(`Kaydedildi: ${planned.join(" · ") || "saat yok"}`);
    }
    setSaving(false);
    void load();
  }

  const done = glasses >= goal;
  const fill = Math.max(0, Math.min(100, Math.round((glasses / Math.max(1, goal)) * 100)));

  return (
    <div className="profilimWaterDesk isLive">
      <div className="profilimWaterStage">
        <span className="profilimWaterRipple" aria-hidden="true" />
        <span className="profilimWaterRipple isTwo" aria-hidden="true" />
        <p className="profilimWaterEyebrow">Bugünkü ritim</p>
        <p className="profilimWaterCount">
          <strong>{glasses}</strong>
          <span>/ {goal} bardak</span>
        </p>
        <div className="profilimWaterMeter" aria-hidden="true">
          <i style={{ width: `${fill}%` }} />
        </div>
        <p className="profilimWaterHint">
          {done ? "Bugünkü hedef doldu. Bedenin teşekkür eder." : "Küçük yudumlar da sayılır."}
        </p>
        <WaterGlassArt glasses={glasses} goal={goal} className="isStage" />
      </div>
      <div className="profilimWaterActions isPair">
        <button type="button" className="profilimWaterPrimary isAqua" onClick={() => void drink()}>
          İçtim
        </button>
        <button type="button" className="profilimWaterGhost isAqua" onClick={() => void drink()}>
          + Bir bardak
        </button>
      </div>
      <form
        className="profilimCompose profilimWaterForm"
        onSubmit={(event) => {
          event.preventDefault();
          void save(enabled);
        }}
      >
        <label>
          Günlük hedef
          <input
            type="number"
            min={1}
            max={24}
            value={goal}
            onChange={(event) => setGoal(Number(event.target.value))}
          />
        </label>
        <div className="profilimWaterWhen">
          <label>
            Başlangıç
            <input type="time" value={start} onChange={(event) => setStart(event.target.value)} />
          </label>
          <label>
            Bitiş
            <input type="time" value={end} onChange={(event) => setEnd(event.target.value)} />
          </label>
        </div>
        <p className="profilimWaterModelLabel">Hatırlatma modeli</p>
        <div className="profilimWaterModes">
          <button
            type="button"
            className={mode === "count" ? "isOn" : ""}
            onClick={() => setMode("count")}
          >
            <small>A</small>
            Günde X kez
          </button>
          <button
            type="button"
            className={mode === "interval" ? "isOn" : ""}
            onClick={() => setMode("interval")}
          >
            <small>B</small>
            Her X saatte
          </button>
          <button
            type="button"
            className={mode === "custom" ? "isOn" : ""}
            onClick={() => setMode("custom")}
          >
            <small>C</small>
            Özel saatler
          </button>
        </div>
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
        {times.length ? (
          <p className="profilimWaterChips">
            {times.map((time) => (
              <em key={time}>{time}</em>
            ))}
          </p>
        ) : null}
        <button
          type="button"
          className={`profilimWaterPrimary${enabled ? " isOnAqua" : " isAqua"}`}
          disabled={saving}
          onClick={() => {
            const next = !enabled;
            setEnabled(next);
            void save(next);
          }}
        >
          {enabled ? "Hatırlatıcı açık · kapat" : "Su hatırlatıcısını aç"}
        </button>
        <button type="submit" className="profilimWaterGhost isAqua" disabled={saving}>
          {saving ? "Kaydediliyor…" : "Programı kaydet"}
        </button>
        {support === "unsupported" ? (
          <p className="profilimWaterNote">Bu cihazda tarayıcı bildirimi yok. Android Chrome / PWA dene.</p>
        ) : null}
        {status ? <p className="profilimWaterNote">{status}</p> : null}
      </form>
    </div>
  );
}
