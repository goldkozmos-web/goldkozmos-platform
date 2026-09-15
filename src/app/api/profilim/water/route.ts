import { NextResponse } from "next/server";

import { applyPlatformSchema, isMissingRelation } from "@/lib/admin/applyPlatformSchema";
import { getProfilimSessionUser } from "@/lib/profilim/auth.server";
import { createSupabaseServerClient } from "@/lib/supabase/create-server-client";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { parseCustomTimes, timesBetween } from "@/lib/water/schedule";
import {
  istanbulDay,
  parseWaterProgram,
  waterCommentPost,
  type WaterProgram,
} from "@/lib/water/store";

export const dynamic = "force-dynamic";

function asProgram(input: Partial<WaterProgram>, current?: WaterProgram | null): WaterProgram {
  const mode = input.mode === "interval" || input.mode === "custom" || input.mode === "count"
    ? input.mode
    : current?.mode || "count";
  const start = String(input.start || current?.start || "09:00").slice(0, 5);
  const end = String(input.end || current?.end || "22:00").slice(0, 5);
  const count = Math.min(24, Math.max(1, Number(input.count || current?.count || 6)));
  const intervalHours = String(input.intervalHours || current?.intervalHours || "2");
  const customInput = String(input.customInput || current?.customInput || "09:00, 11:30, 14:00, 17:00, 20:00");
  const hours = Math.max(1, Number(intervalHours) || 2);
  const times =
    mode === "custom"
      ? parseCustomTimes(customInput)
      : timesBetween(start, end, count, mode === "interval" ? hours * 60 : null);
  return {
    goal: Math.min(24, Math.max(1, Number(input.goal || current?.goal || 8))),
    start,
    end,
    mode,
    count,
    intervalHours,
    customInput,
    enabled: Boolean(input.enabled ?? current?.enabled),
    times,
    glasses: Math.max(0, Number(input.glasses ?? current?.glasses ?? 0)),
    day: istanbulDay(),
  };
}

async function readComment(userId: string): Promise<WaterProgram | null> {
  const supabase = (await createSupabaseServerClient()) || createSupabaseServiceClient();
  if (!supabase) return null;
  const { data } = await supabase
    .from("comments")
    .select("content")
    .eq("post_id", waterCommentPost(userId))
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return parseWaterProgram((data as { content?: string } | null)?.content);
}

async function writeComment(userId: string, program: WaterProgram) {
  const supabase = (await createSupabaseServerClient()) || createSupabaseServiceClient();
  if (!supabase) return { error: "Bağlantı yok." };
  const content = JSON.stringify(program).slice(0, 1000);
  const postId = waterCommentPost(userId);
  const existing = await supabase
    .from("comments")
    .select("id")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (existing.data?.id) {
    const { error } = await supabase
      .from("comments")
      .update({ content, updated_at: new Date().toISOString() })
      .eq("id", existing.data.id);
    return { error: error?.message ?? null };
  }
  const { error } = await supabase.from("comments").insert({
    post_id: postId,
    user_id: userId,
    content,
  });
  return { error: error?.message ?? null };
}

async function readTables(userId: string): Promise<WaterProgram | null> {
  const supabase = await createSupabaseServerClient();
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
  const times = (stamps ?? []).map((item) => String(item.time).slice(0, 5)).sort();
  return {
    goal: Number(row.daily_goal || 8),
    start: String(row.start_time || "09:00").slice(0, 5),
    end: String(row.end_time || "22:00").slice(0, 5),
    mode:
      row.schedule_mode === "interval" || row.schedule_mode === "custom" || row.schedule_mode === "count"
        ? row.schedule_mode
        : "count",
    count: Number(row.reminders_per_day || times.length || 6),
    intervalHours: row.interval_minutes ? String(Math.max(1, Math.round(Number(row.interval_minutes) / 60))) : "2",
    customInput: times.join(", ") || "09:00, 11:30, 14:00, 17:00, 20:00",
    enabled: Boolean(row.enabled),
    times,
    glasses: (logs ?? []).reduce((sum, item) => sum + Number(item.amount || 1), 0),
    day: today,
  };
}

async function writeTables(userId: string, program: WaterProgram) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { error: "Bağlantı yok." };
  const { error } = await supabase.from("water_reminder_settings").upsert({
    user_id: userId,
    daily_goal: program.goal,
    start_time: `${program.start}:00`,
    end_time: `${program.end}:00`,
    reminders_per_day: program.times.length || program.count,
    interval_minutes: program.mode === "interval" ? Math.max(1, Number(program.intervalHours) || 2) * 60 : null,
    schedule_mode: program.mode,
    enabled: program.enabled,
    timezone: "Europe/Istanbul",
    updated_at: new Date().toISOString(),
  });
  if (error) return { error: error.message };
  await supabase.from("water_reminder_times").delete().eq("user_id", userId);
  if (program.times.length) {
    await supabase.from("water_reminder_times").insert(
      program.times.map((time) => ({ user_id: userId, time: `${time}:00` })),
    );
  }
  return { error: null as string | null };
}

export async function GET() {
  const user = await getProfilimSessionUser();
  if (!user) return NextResponse.json({ error: "Giriş yap." }, { status: 401 });
  const fromTable = await readTables(user.id);
  const program = fromTable || (await readComment(user.id)) || asProgram({});
  return NextResponse.json({ program });
}

export async function POST(request: Request) {
  const user = await getProfilimSessionUser();
  if (!user) return NextResponse.json({ error: "Giriş yap." }, { status: 401 });

  let raw: Partial<WaterProgram> & { drink?: boolean } = {};
  try {
    raw = (await request.json()) as Partial<WaterProgram> & { drink?: boolean };
  } catch {
    raw = {};
  }

  await applyPlatformSchema();
  const current = (await readTables(user.id)) || (await readComment(user.id));
  const next = asProgram({ ...raw, glasses: current?.glasses }, current);
  if (raw.drink) next.glasses += 1;

  let tableError = (await writeTables(user.id, next)).error;
  if (tableError && isMissingRelation(tableError)) {
    await applyPlatformSchema();
    tableError = (await writeTables(user.id, next)).error;
  }
  if (tableError && isMissingRelation(tableError)) {
    const comment = await writeComment(user.id, next);
    if (comment.error) {
      return NextResponse.json({ error: comment.error, program: next }, { status: 400 });
    }
    return NextResponse.json({
      ok: true,
      program: next,
      stored: "backup",
    });
  }
  if (tableError) {
    return NextResponse.json({ error: tableError, program: next }, { status: 400 });
  }
  if (raw.drink) {
    const supabase = await createSupabaseServerClient();
    await supabase?.from("water_logs").insert({ user_id: user.id, amount: 1 });
  }
  await writeComment(user.id, next);
  return NextResponse.json({ ok: true, program: next, stored: "table" });
}
