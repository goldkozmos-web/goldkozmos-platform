import { istanbulDay } from "../../data/goldAct";

export const WATER_GOAL = 8;

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
    if (!raw) return emptyWaterDay(today);
    const parsed = JSON.parse(raw) as Partial<WaterDayState>;
    if (parsed.day !== today) return emptyWaterDay(today);
    return { day: today, glasses: clampGlasses(Number(parsed.glasses)) };
  } catch {
    return emptyWaterDay(today);
  }
}

export const WATER_EVENT = "profilim-water";

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
    window.dispatchEvent(new CustomEvent(WATER_EVENT, { detail: next }));
  } catch {
    // Ignore private-mode storage errors.
  }

  return next;
}
