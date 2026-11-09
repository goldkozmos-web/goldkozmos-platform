import { istanbulDay } from "../../data/goldAct";
import { readWaterPreferences, type WaterPreferences } from './water-schedule';

export const WATER_GOAL = 8;
const memory = new Map<string, WaterDayState>();
const revisions = new Map<string, number>();
export function waterRevision(userId: string) { return revisions.get(userId) ?? 0; }

export type WaterDayState = {
  day: string;
  glasses: number;
};

export function waterStorageKey(userId: string) {
  return `goldkozmos-profilim-water-${userId || "guest"}`;
}

function clampGlasses(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(WATER_GOAL, Math.round(value)));
}

export function emptyWaterDay(day = istanbulDay()): WaterDayState {
  return { day, glasses: 0 };
}

export function readWaterDay(userId: string): WaterDayState {
  const today = istanbulDay();
  if (typeof window === "undefined") {
    return emptyWaterDay(today);
  }

  try {
    const raw = window.localStorage.getItem(waterStorageKey(userId));
    if (!raw) return memory.get(waterStorageKey(userId))?.day === today ? memory.get(waterStorageKey(userId))! : emptyWaterDay(today);
    const parsed = JSON.parse(raw) as Partial<WaterDayState>;
    if (parsed.day !== today) return emptyWaterDay(today);
    return { day: today, glasses: clampGlasses(Number(parsed.glasses)) };
  } catch {
    return memory.get(waterStorageKey(userId))?.day === today ? memory.get(waterStorageKey(userId))! : emptyWaterDay(today);
  }
}

export const WATER_EVENT = "profilim-water";
export function readWaterSettings(userId: string) {
  try { return readWaterPreferences(JSON.parse(window.localStorage.getItem(`${waterStorageKey(userId)}-settings`) || '{}')); }
  catch { return readWaterPreferences(null); }
}
export function writeWaterSettings(userId: string, preferences: WaterPreferences) {
  try { window.localStorage.setItem(`${waterStorageKey(userId)}-settings`, JSON.stringify(preferences)); } catch { /* Current session still uses the server response. */ }
  window.dispatchEvent(new Event(WATER_EVENT));
}

export function writeWaterDay(userId: string, glasses: number): WaterDayState {
  const next: WaterDayState = {
    day: istanbulDay(),
    glasses: clampGlasses(glasses),
  };

  if (typeof window === "undefined") {
    return next;
  }

  try {
    window.localStorage.setItem(waterStorageKey(userId), JSON.stringify(next));
  } catch {
    // Ignore private-mode storage errors.
  }
  memory.set(waterStorageKey(userId), next);
  revisions.set(userId, waterRevision(userId) + 1);
  window.dispatchEvent(new CustomEvent(WATER_EVENT, { detail: next }));

  return next;
}
