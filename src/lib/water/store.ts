export const waterCommentPost = (userId: string) => `gk-water:${userId}`;

export type WaterProgram = {
  goal: number;
  start: string;
  end: string;
  mode: "count" | "interval" | "custom";
  count: number;
  intervalHours: string;
  customInput: string;
  enabled: boolean;
  times: string[];
  glasses: number;
  day: string;
};

export function istanbulDay() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Istanbul" });
}

export function parseWaterProgram(raw: string | null | undefined): WaterProgram | null {
  if (!raw) return null;
  try {
    const row = JSON.parse(raw) as Partial<WaterProgram>;
    const day = typeof row.day === "string" ? row.day : istanbulDay();
    const glasses = day === istanbulDay() ? Number(row.glasses || 0) : 0;
    return {
      goal: Math.min(24, Math.max(1, Number(row.goal) || 8)),
      start: String(row.start || "09:00").slice(0, 5),
      end: String(row.end || "22:00").slice(0, 5),
      mode:
        row.mode === "interval" || row.mode === "custom" || row.mode === "count"
          ? row.mode
          : "count",
      count: Math.min(24, Math.max(1, Number(row.count) || 6)),
      intervalHours: String(row.intervalHours || "2"),
      customInput: String(row.customInput || "09:00, 11:30, 14:00, 17:00, 20:00"),
      enabled: Boolean(row.enabled),
      times: Array.isArray(row.times) ? row.times.map((item) => String(item).slice(0, 5)) : [],
      glasses,
      day: istanbulDay(),
    };
  } catch {
    return null;
  }
}
