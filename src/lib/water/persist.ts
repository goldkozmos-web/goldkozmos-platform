import type { SupabaseClient } from "@supabase/supabase-js";

import { isMissingRelation, runPlatformSql } from "../admin/applyPlatformSchema";
import { createSupabaseServiceClient } from "../supabase/service";
import { createSupabaseServerClient } from "../supabase/create-server-client";
import { WATER_SCHEMA_SQL } from "./schema";
import { istanbulDay, parseWaterProgram, type WaterProgram } from "./store";

export const WATER_REMINDER_TITLE = "Su hatırlatıcısı";

export function parseClock(raw: string | undefined, fallback: string) {
  const text = String(raw || "").trim();
  const ampm = text.match(/^(\d{1,2}):(\d{2})\s*([ap]m)$/i);
  if (ampm) {
    let hour = Number(ampm[1]) % 12;
    if (ampm[3].toLowerCase() === "pm") hour += 12;
    return `${String(hour).padStart(2, "0")}:${ampm[2]}`;
  }
  const match = text.match(/^(\d{1,2}):(\d{2})/);
  if (!match) return fallback;
  return `${String(Math.min(23, Number(match[1]))).padStart(2, "0")}:${match[2]}`;
}

export function asSqlTime(raw: string | undefined, fallback = "09:00") {
  return `${parseClock(raw, fallback)}:00`;
}

export function publicWaterError(message: string | undefined) {
  const text = (message || "").toLowerCase();
  if (!message) return "Kaydedilemedi.";
  if (text.includes("giriş")) return message;
  return "Kaydedilemedi.";
}

export async function ensureWaterSchema() {
  return runPlatformSql(async (sql) => {
    await sql.unsafe(WATER_SCHEMA_SQL);
  });
}

async function client(): Promise<SupabaseClient | null> {
  return createSupabaseServiceClient() || (await createSupabaseServerClient());
}

function settingsPayload(userId: string, program: WaterProgram, withMode: boolean) {
  const row: Record<string, unknown> = {
    user_id: userId,
    daily_goal: program.goal,
    start_time: asSqlTime(program.start, "09:00"),
    end_time: asSqlTime(program.end, "22:00"),
    reminders_per_day: program.times.length || program.count,
    interval_minutes:
      program.mode === "interval"
        ? Math.max(1, Number(program.intervalHours) || 2) * 60
        : null,
    enabled: program.enabled,
    timezone: "Europe/Istanbul",
    updated_at: new Date().toISOString(),
  };
  if (withMode) row.schedule_mode = program.mode;
  return row;
}

export async function writeWaterTables(userId: string, program: WaterProgram) {
  const supabase = await client();
  if (!supabase) return { error: "Bağlantı yok." };
  let error =
    (await supabase.from("water_reminder_settings").upsert(settingsPayload(userId, program, false)))
      .error;
  if (
    error &&
    (/schedule_mode/i.test(error.message) || /null value in column/i.test(error.message))
  ) {
    error = (
      await supabase.from("water_reminder_settings").upsert(settingsPayload(userId, program, true))
    ).error;
  }
  if (error) return { error: error.message };
  await supabase.from("water_reminder_times").delete().eq("user_id", userId);
  if (program.times.length) {
    const stamped = await supabase.from("water_reminder_times").insert(
      program.times.map((time) => ({ user_id: userId, time: asSqlTime(time, "09:00") })),
    );
    if (stamped.error && !isMissingRelation(stamped.error.message)) {
      return { error: stamped.error.message };
    }
  }
  return { error: null as string | null };
}

export async function writeWaterLogs(userId: string, amount = 1) {
  const supabase = await client();
  if (!supabase) return;
  await supabase.from("water_logs").insert({ user_id: userId, amount });
}

export async function writeWaterBackup(userId: string, program: WaterProgram) {
  const supabase = await client();
  if (!supabase) return { error: "Bağlantı yok." };
  const note = JSON.stringify(program).slice(0, 4000);
  const dueTime = asSqlTime(program.times[0] || program.start, "09:00");
  const existing = await supabase
    .from("reminders")
    .select("id")
    .eq("user_id", userId)
    .eq("title", WATER_REMINDER_TITLE)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const patches: Record<string, unknown>[] = [
    {
      note,
      due_on: istanbulDay(),
      due_time: dueTime,
      repeat_rule: program.enabled ? "daily" : "none",
      completed_at: null,
    },
    {
      note,
      due_on: istanbulDay(),
      repeat_rule: program.enabled ? "daily" : "none",
    },
    { note },
  ];

  if (existing.data?.id) {
    let last: string | null = "Kaydedilemedi.";
    for (const patch of patches) {
      const { error } = await supabase.from("reminders").update(patch).eq("id", existing.data.id);
      if (!error) return { error: null as string | null };
      last = error.message;
    }
    return { error: last };
  }

  const inserts: Record<string, unknown>[] = [
    {
      user_id: userId,
      title: WATER_REMINDER_TITLE,
      note,
      due_on: istanbulDay(),
      due_time: dueTime,
      repeat_rule: program.enabled ? "daily" : "none",
    },
    {
      user_id: userId,
      title: WATER_REMINDER_TITLE,
      note,
      due_on: istanbulDay(),
      repeat_rule: program.enabled ? "daily" : "none",
    },
    { user_id: userId, title: WATER_REMINDER_TITLE, note },
  ];
  let last: string | null = "Kaydedilemedi.";
  for (const row of inserts) {
    const { error } = await supabase.from("reminders").insert(row);
    if (!error) return { error: null as string | null };
    last = error.message;
  }
  return { error: last };
}

export async function writeWaterMeta(userId: string, program: WaterProgram) {
  const admin = createSupabaseServiceClient();
  if (admin) {
    const current = await admin.auth.admin.getUserById(userId);
    if (current.error) return { error: current.error.message };
    const meta = (current.data.user?.user_metadata ?? {}) as Record<string, unknown>;
    const { error } = await admin.auth.admin.updateUserById(userId, {
      user_metadata: { ...meta, water_program: program },
    });
    return { error: error?.message ?? null };
  }
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { error: "Bağlantı yok." };
  const { error } = await supabase.auth.updateUser({ data: { water_program: program } });
  return { error: error?.message ?? null };
}

export async function readWaterMeta(userId: string): Promise<WaterProgram | null> {
  const admin = createSupabaseServiceClient();
  if (admin) {
    const { data } = await admin.auth.admin.getUserById(userId);
    const raw = (data.user?.user_metadata as { water_program?: unknown } | undefined)?.water_program;
    return parseWaterProgram(typeof raw === "string" ? raw : JSON.stringify(raw ?? null));
  }
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  const raw = (data.user?.user_metadata as { water_program?: unknown } | undefined)?.water_program;
  return parseWaterProgram(typeof raw === "string" ? raw : JSON.stringify(raw ?? null));
}

export async function readWaterTables(userId: string): Promise<WaterProgram | null> {
  const supabase = await client();
  if (!supabase) return null;
  const today = istanbulDay();
  const [{ data: settings, error }, { data: stamps }, { data: logs }] = await Promise.all([
    supabase.from("water_reminder_settings").select("*").eq("user_id", userId).maybeSingle(),
    supabase.from("water_reminder_times").select("time").eq("user_id", userId),
    supabase
      .from("water_logs")
      .select("amount")
      .eq("user_id", userId)
      .gte("logged_at", `${today}T00:00:00+03:00`),
  ]);
  if (error && isMissingRelation(error.message)) return null;
  if (!settings && !(stamps ?? []).length && !(logs ?? []).length) return null;
  const row = (settings ?? {}) as Record<string, unknown>;
  const times = (stamps ?? []).map((item) => parseClock(String(item.time), "09:00")).sort();
  return {
    goal: Number(row.daily_goal || 8),
    start: parseClock(String(row.start_time || "09:00"), "09:00"),
    end: parseClock(String(row.end_time || "22:00"), "22:00"),
    mode:
      row.schedule_mode === "interval" ||
      row.schedule_mode === "custom" ||
      row.schedule_mode === "count"
        ? row.schedule_mode
        : "count",
    count: Number(row.reminders_per_day || times.length || 6),
    intervalHours: row.interval_minutes
      ? String(Math.max(1, Math.round(Number(row.interval_minutes) / 60)))
      : "2",
    customInput: times.join(", ") || "09:00, 11:30, 14:00, 17:00, 20:00",
    enabled: Boolean(row.enabled),
    times,
    glasses: (logs ?? []).reduce((sum, item) => sum + Number(item.amount || 1), 0),
    day: today,
  };
}

export async function readWaterBackup(userId: string): Promise<WaterProgram | null> {
  const supabase = await client();
  if (!supabase) return null;
  const { data } = await supabase
    .from("reminders")
    .select("note")
    .eq("user_id", userId)
    .eq("title", WATER_REMINDER_TITLE)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return parseWaterProgram((data as { note?: string } | null)?.note);
}

export async function readWaterProgramSql(userId: string): Promise<WaterProgram | null> {
  const today = istanbulDay();
  const result = await runPlatformSql(async (sql) => {
    const settings = await sql<Record<string, unknown>[]>`
      select *
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
  const times = result.value.stamps.map((item) => parseClock(String(item.time), "09:00"));
  return {
    goal: Number(row.daily_goal || 8),
    start: parseClock(String(row.start_time || "09:00"), "09:00"),
    end: parseClock(String(row.end_time || "22:00"), "22:00"),
    mode:
      row.schedule_mode === "interval" ||
      row.schedule_mode === "custom" ||
      row.schedule_mode === "count"
        ? row.schedule_mode
        : "count",
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

export async function upsertWaterProgramSql(
  userId: string,
  program: WaterProgram,
  drink = false,
) {
  const ensured = await ensureWaterSchema();
  if (!ensured.ok) return ensured;
  return runPlatformSql(async (sql) => {
    const interval =
      program.mode === "interval"
        ? Math.max(1, Number(program.intervalHours) || 2) * 60
        : null;
    const reminders = program.times.length || program.count;
    const start = parseClock(program.start, "09:00");
    const end = parseClock(program.end, "22:00");
    await sql`
      insert into public.water_reminder_settings (
        user_id, daily_goal, start_time, end_time, reminders_per_day,
        interval_minutes, enabled, timezone, updated_at
      ) values (
        ${userId}::uuid, ${program.goal}, ${start}::time, ${end}::time,
        ${reminders}, ${interval}, ${program.enabled}, 'Europe/Istanbul', now()
      )
      on conflict (user_id) do update set
        daily_goal = excluded.daily_goal,
        start_time = excluded.start_time,
        end_time = excluded.end_time,
        reminders_per_day = excluded.reminders_per_day,
        interval_minutes = excluded.interval_minutes,
        enabled = excluded.enabled,
        updated_at = now()
    `;
    try {
      await sql`update public.water_reminder_settings
        set schedule_mode = ${program.mode}
        where user_id = ${userId}::uuid`;
    } catch {
      // Column may not exist yet.
    }
    await sql`delete from public.water_reminder_times where user_id = ${userId}::uuid`;
    for (const time of program.times) {
      const stamp = parseClock(time, "09:00");
      await sql`
        insert into public.water_reminder_times (user_id, time)
        values (${userId}::uuid, ${stamp}::time)
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
