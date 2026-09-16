import { isMissingRelation, runPlatformSql } from "../admin/applyPlatformSchema";
import { istanbulDay, type WaterProgram } from "./store";

export function publicWaterError(message: string | undefined) {
  const text = (message || "").toLowerCase();
  if (
    isMissingRelation(message) ||
    text.includes("comments") ||
    text.includes("schema cache")
  ) {
    return "Kaydedilemedi. Bir kez daha dene.";
  }
  if (!message) return "Kaydedilemedi.";
  if (text.includes("giriş")) return message;
  return "Kaydedilemedi.";
}

export async function upsertWaterProgramSql(
  userId: string,
  program: WaterProgram,
  drink = false,
) {
  return runPlatformSql(async (sql) => {
    const interval =
      program.mode === "interval"
        ? Math.max(1, Number(program.intervalHours) || 2) * 60
        : null;
    const reminders = program.times.length || program.count;
    await sql`
      insert into public.water_reminder_settings (
        user_id,
        daily_goal,
        start_time,
        end_time,
        reminders_per_day,
        interval_minutes,
        schedule_mode,
        enabled,
        timezone,
        updated_at
      )
      values (
        ${userId}::uuid,
        ${program.goal},
        ${program.start}::time,
        ${program.end}::time,
        ${reminders},
        ${interval},
        ${program.mode},
        ${program.enabled},
        'Europe/Istanbul',
        now()
      )
      on conflict (user_id) do update set
        daily_goal = excluded.daily_goal,
        start_time = excluded.start_time,
        end_time = excluded.end_time,
        reminders_per_day = excluded.reminders_per_day,
        interval_minutes = excluded.interval_minutes,
        schedule_mode = excluded.schedule_mode,
        enabled = excluded.enabled,
        timezone = excluded.timezone,
        updated_at = now()
    `;
    await sql`delete from public.water_reminder_times where user_id = ${userId}::uuid`;
    for (const time of program.times) {
      await sql`
        insert into public.water_reminder_times (user_id, time)
        values (${userId}::uuid, ${time}::time)
        on conflict (user_id, time) do nothing
      `;
    }
    if (drink) {
      await sql`
        insert into public.water_logs (user_id, amount)
        values (${userId}::uuid, 1)
      `;
    }
  });
}

export async function readWaterProgramSql(userId: string): Promise<WaterProgram | null> {
  const today = istanbulDay();
  const result = await runPlatformSql(async (sql) => {
    const settings = await sql<
      {
        daily_goal: number;
        start_time: string;
        end_time: string;
        reminders_per_day: number;
        interval_minutes: number | null;
        schedule_mode: string | null;
        enabled: boolean;
      }[]
    >`
      select
        daily_goal,
        start_time::text,
        end_time::text,
        reminders_per_day,
        interval_minutes,
        schedule_mode,
        enabled
      from public.water_reminder_settings
      where user_id = ${userId}::uuid
      limit 1
    `;
    const stamps = await sql<{ time: string }[]>`
      select time::text from public.water_reminder_times
      where user_id = ${userId}::uuid
      order by time
    `;
    const logs = await sql<{ amount: number }[]>`
      select amount from public.water_logs
      where user_id = ${userId}::uuid
        and logged_at >= (${today}::date + interval '0 hours') at time zone 'Europe/Istanbul'
    `;
    return { settings: settings[0] ?? null, stamps, logs };
  });
  if (!result.ok || !result.value.settings) return null;
  const row = result.value.settings;
  const times = result.value.stamps.map((item) => String(item.time).slice(0, 5));
  const mode =
    row.schedule_mode === "interval" ||
    row.schedule_mode === "custom" ||
    row.schedule_mode === "count"
      ? row.schedule_mode
      : "count";
  return {
    goal: Number(row.daily_goal || 8),
    start: String(row.start_time || "09:00").slice(0, 5),
    end: String(row.end_time || "22:00").slice(0, 5),
    mode,
    count: Number(row.reminders_per_day || times.length || 6),
    intervalHours: row.interval_minutes
      ? String(Math.max(1, Math.round(Number(row.interval_minutes) / 60)))
      : "2",
    customInput: times.join(", ") || "09:00, 11:30, 14:00, 17:00, 20:00",
    enabled: Boolean(row.enabled),
    times,
    glasses: result.value.logs.reduce((sum, item) => sum + Number(item.amount || 1), 0),
    day: today,
  };
}
