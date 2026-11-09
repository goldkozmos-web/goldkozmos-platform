export const WATER_DEFAULTS = { goal: 8, startHour: 9, endHour: 21, vibration: true };
export type WaterPreferences = typeof WATER_DEFAULTS;
export function readWaterPreferences(raw: unknown): WaterPreferences {
  const value = raw && typeof raw === 'object' ? raw as Partial<WaterPreferences> : {};
  const goal = Number.isInteger(value.goal) && Number(value.goal) >= 1 && Number(value.goal) <= 8 ? Number(value.goal) : 8;
  const startHour = Number.isInteger(value.startHour) && Number(value.startHour) >= 0 && Number(value.startHour) <= 23 ? Number(value.startHour) : 9;
  const endHour = Number.isInteger(value.endHour) && Number(value.endHour) > startHour && Number(value.endHour) <= 24 ? Number(value.endHour) : Math.max(21, startHour + 1);
  return { goal, startHour, endHour, vibration: typeof value.vibration === 'boolean' ? value.vibration : true };
}
export function nextWaterDue(now: Date, minutes: number, startHour = 9, endHour = 21) {
  const local = new Date(now.getTime() + 3 * 60 * 60 * 1000);
  const start = Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate(), startHour - 3);
  const end = start + (endHour - startHour) * 60 * 60 * 1000;
  const candidate = now.getTime() + minutes * 60 * 1000;
  return new Date(now.getTime() < start ? start : candidate >= end ? start + 24 * 60 * 60 * 1000 : candidate).toISOString();
}

export function parseWaterInput(raw: unknown) {
  if (!raw || typeof raw !== "object") return { error: "Geçersiz su kaydı." };
  const input = raw as { glasses?: unknown; enabled?: unknown; intervalMinutes?: unknown; preferences?: unknown };
  if (input.preferences !== undefined) {
    const prefs = input.preferences as WaterPreferences;
    if (!prefs || typeof prefs !== 'object' || !Number.isInteger(prefs.goal) || prefs.goal < 1 || prefs.goal > 8 || !Number.isInteger(prefs.startHour) || prefs.startHour < 0 || prefs.startHour > 23 || !Number.isInteger(prefs.endHour) || prefs.endHour <= prefs.startHour || prefs.endHour > 24 || typeof prefs.vibration !== 'boolean') return { error: 'Hedef ve saat aralığı geçersiz.' };
  }
  if (input.glasses !== undefined && (!Number.isInteger(input.glasses) || Number(input.glasses) < 0 || Number(input.glasses) > 8)) return { error: "Bardak sayısı 0–8 arasında olmalı." };
  if (input.enabled !== undefined && typeof input.enabled !== "boolean") return { error: "Hatırlatma tercihi geçersiz." };
  if (input.intervalMinutes !== undefined && ![60,90,120,180].includes(Number(input.intervalMinutes))) return { error: "Hatırlatma aralığı geçersiz." };
  return { glasses: input.glasses as number | undefined, enabled: input.enabled as boolean | undefined, intervalMinutes: input.intervalMinutes === undefined ? undefined : Number(input.intervalMinutes), preferences: input.preferences === undefined ? undefined : readWaterPreferences(input.preferences) };
}
