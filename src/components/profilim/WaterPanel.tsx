"use client";

import { useCallback, useEffect, useState } from "react";

import { enableMemberPush, pushSupportState } from "../../lib/push/browser";
import { istanbulDay, parseWaterProgram, type WaterProgram } from "../../lib/water/store";
import WaterGlassArt from "./WaterGlassArt";

const EMPTY: WaterProgram = {
  goal: 8,
  start: "09:00",
  end: "22:00",
  mode: "count",
  count: 6,
  intervalHours: "2",
  customInput: "09:00, 11:30, 14:00, 17:00, 20:00",
  enabled: false,
  times: [],
  glasses: 0,
  day: istanbulDay(),
};

function localKey(userId: string) {
  return `goldkozmos-water-program-${userId || "guest"}`;
}

function readLocal(userId: string): WaterProgram | null {
  if (typeof window === "undefined") return null;
  try {
    return parseWaterProgram(window.localStorage.getItem(localKey(userId)));
  } catch {
    return null;
  }
}

function writeLocal(userId: string, program: WaterProgram) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(localKey(userId), JSON.stringify(program));
  } catch {
    // private mode
  }
}

export default function WaterPanel({ userId }: { userId: string }) {
  const [program, setProgram] = useState<WaterProgram>(EMPTY);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [support, setSupport] = useState(pushSupportState());

  const load = useCallback(async () => {
    const response = await fetch("/api/profilim/water", { credentials: "same-origin" });
    const data = (await response.json().catch(() => null)) as { program?: WaterProgram; error?: string } | null;
    const local = readLocal(userId);
    if (data?.program) {
      const merged =
        local && local.day === data.program.day && local.glasses > data.program.glasses
          ? { ...data.program, glasses: local.glasses }
          : data.program;
      setProgram(merged);
      writeLocal(userId, merged);
    } else if (local) {
      setProgram(local);
    }
  }, [userId]);

  useEffect(() => {
    void load();
    setSupport(pushSupportState());
  }, [load, userId]);

  async function persist(next: WaterProgram, drink = false) {
    setSaving(true);
    setProgram(next);
    writeLocal(userId, next);
    const response = await fetch("/api/profilim/water", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...next, drink }),
    });
    const data = (await response.json().catch(() => null)) as {
      program?: WaterProgram;
      error?: string;
      stored?: string;
    } | null;
    if (data?.program) {
      setProgram(data.program);
      writeLocal(userId, data.program);
    }
    if (!response.ok) {
      setStatus("Kaydedilemedi. Bir kez daha dene.");
      setSaving(false);
      return false;
    }
    setStatus(
      data?.stored === "backup" || data?.stored === "meta"
        ? "Kaydedildi. Bildirim saati sunucuya bağlandı."
        : next.enabled
          ? `Hatırlatıcı açık · ${ (data?.program?.times || next.times).join(" · ") }`
          : `Kaydedildi · ${(data?.program?.times || next.times).join(" · ")}`,
    );
    setSaving(false);
    return true;
  }

  async function drink() {
    await persist(program, true);
  }

  async function save(enabled = program.enabled) {
    const ok = await persist({ ...program, enabled });
    if (!ok || !enabled) return;
    const push = await enableMemberPush();
    setSupport(pushSupportState());
    if (!push.ok) {
      setStatus(
        push.reason === "unsupported"
          ? "Program kaydedildi. Bu tarayıcı web push desteklemiyor."
          : push.reason === "denied"
            ? "Program kaydedildi. Telefonda bildirim iznini Aç’a bas."
            : "Program kaydedildi. Bildirim aboneliği kurulamadı; tekrar dene.",
      );
    }
  }

  const done = program.glasses >= program.goal;
  const fill = Math.max(0, Math.min(100, Math.round((program.glasses / Math.max(1, program.goal)) * 100)));

  return (
    <div className="profilimWaterDesk isLive">
      {status ? <p className="profilimWaterBanner">{status}</p> : null}
      <div className="profilimWaterStage">
        <div className="profilimWaterCopyCol">
          <p className="profilimWaterEyebrow">Bugünkü ritim</p>
          <p className="profilimWaterCount">
            <strong>{program.glasses}</strong>
            <span>/ {program.goal} bardak</span>
          </p>
          <div className="profilimWaterMeter" aria-hidden="true">
            <i style={{ width: `${fill}%` }} />
          </div>
          <p className="profilimWaterHint">
            {done ? "Bugünkü hedef doldu." : "Küçük yudumlar da sayılır."}
          </p>
        </div>
        <WaterGlassArt glasses={program.glasses} goal={program.goal} className="isStage" />
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
          void save(program.enabled);
        }}
      >
        <label>
          Günlük hedef
          <input
            type="number"
            min={1}
            max={24}
            value={program.goal}
            onChange={(event) => setProgram({ ...program, goal: Number(event.target.value) })}
          />
        </label>
        <div className="profilimWaterWhen">
          <label>
            Başlangıç
            <input
              type="time"
              value={program.start}
              onChange={(event) => setProgram({ ...program, start: event.target.value })}
            />
          </label>
          <label>
            Bitiş
            <input
              type="time"
              value={program.end}
              onChange={(event) => setProgram({ ...program, end: event.target.value })}
            />
          </label>
        </div>
        <p className="profilimWaterModelLabel">Hatırlatma modeli</p>
        <div className="profilimWaterModes">
          {(
            [
              ["count", "A", "Günde X kez"],
              ["interval", "B", "Her X saatte"],
              ["custom", "C", "Özel saatler"],
            ] as const
          ).map(([id, mark, label]) => (
            <button
              key={id}
              type="button"
              className={`profilimWaterMode${program.mode === id ? " isOn" : ""}`}
              onClick={() => setProgram({ ...program, mode: id })}
            >
              <small>{mark}</small>
              {label}
            </button>
          ))}
        </div>
        {program.mode === "count" ? (
          <label>
            Kaç kez
            <input
              type="number"
              min={1}
              max={24}
              value={program.count}
              onChange={(event) => setProgram({ ...program, count: Number(event.target.value) })}
            />
          </label>
        ) : null}
        {program.mode === "interval" ? (
          <label>
            Saat aralığı
            <input
              type="number"
              min={1}
              max={12}
              value={program.intervalHours}
              onChange={(event) => setProgram({ ...program, intervalHours: event.target.value })}
            />
          </label>
        ) : null}
        {program.mode === "custom" ? (
          <label>
            Saatler
            <input
              value={program.customInput}
              onChange={(event) => setProgram({ ...program, customInput: event.target.value })}
              placeholder="09:00, 11:30, 14:00, 17:00, 20:00"
            />
          </label>
        ) : null}
        {program.times.length ? (
          <p className="profilimWaterChips">
            {program.times.map((time) => (
              <em key={time}>{time}</em>
            ))}
          </p>
        ) : null}
        <button
          type="button"
          className={`profilimWaterPrimary${program.enabled ? " isOnAqua" : " isAqua"}`}
          disabled={saving}
          onClick={() => void save(!program.enabled)}
        >
          {program.enabled ? "Hatırlatıcı açık · kapat" : "Su hatırlatıcısını aç"}
        </button>
        <button type="submit" className="profilimWaterGhost isAqua" disabled={saving}>
          {saving ? "Kaydediliyor…" : "Programı kaydet"}
        </button>
        {support === "unsupported" ? (
          <p className="profilimWaterNote">Bu cihazda tarayıcı bildirimi yok. Android Chrome / PWA dene.</p>
        ) : null}
      </form>
    </div>
  );
}
