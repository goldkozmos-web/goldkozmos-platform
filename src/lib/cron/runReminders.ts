import { NextResponse } from "next/server";

import { isMissingRelation } from "@/lib/admin/applyPlatformSchema";
import { sendMemberPush } from "@/lib/admin/push-server";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import {
  WATER_REMINDER_TITLE,
  ensureWaterSchema,
} from "@/lib/water/persist";
import { parseWaterProgram } from "@/lib/water/store";

function isCron(request: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  const auth = request.headers.get("authorization") ?? "";
  if (secret && auth === `Bearer ${secret}`) {
    return true;
  }
  return request.headers.get("x-vercel-cron") === "1";
}

function dueStamp(dueOn: string, dueTime: string | null) {
  const time = (dueTime || "09:00:00").slice(0, 8);
  const iso = `${dueOn}T${time.length === 5 ? `${time}:00` : time}`;
  return new Date(`${iso}+03:00`).getTime();
}

function bumpDue(dueOn: string, rule: string) {
  const date = new Date(`${dueOn}T12:00:00+03:00`);
  if (rule === "daily") date.setDate(date.getDate() + 1);
  else if (rule === "weekdays") {
    date.setDate(date.getDate() + 1);
    const day = date.getDay();
    if (day === 6) date.setDate(date.getDate() + 2);
    if (day === 0) date.setDate(date.getDate() + 1);
  } else if (rule === "weekly") date.setDate(date.getDate() + 7);
  else if (rule === "monthly") date.setMonth(date.getMonth() + 1);
  else return dueOn;
  return date.toISOString().slice(0, 10);
}

export async function runReminderTick(request: Request) {
  if (!isCron(request)) {
    return NextResponse.json({ error: "Yetkin yok." }, { status: 401 });
  }

  const admin = createSupabaseServiceClient();
  if (!admin) {
    return NextResponse.json({ error: "Bağlantı yok." }, { status: 500 });
  }

  const { data, error } = await admin
    .from("reminders")
    .select("id, user_id, title, note, due_on, due_time, repeat_rule, completed_at, notified_at")
    .is("completed_at", null)
    .not("due_on", "is", null)
    .order("due_on", { ascending: true })
    .limit(80);

  const rows =
    error || !data
      ? (
          await admin
            .from("reminders")
            .select("id, user_id, title, note, due_on, due_time, repeat_rule, completed_at")
            .is("completed_at", null)
            .not("due_on", "is", null)
            .order("due_on", { ascending: true })
            .limit(80)
        ).data
      : data;

  const now = Date.now();
  let sent = 0;

  for (const row of rows ?? []) {
    const dueOn = String(row.due_on ?? "");
    if (!dueOn) continue;
    if (Number(dueStamp(dueOn, row.due_time ? String(row.due_time) : null)) > now) {
      continue;
    }
    if ("notified_at" in row && row.notified_at) {
      continue;
    }

    const title = String(row.title ?? "Görev");
    if (title === WATER_REMINDER_TITLE) continue;
    const note = String(row.note ?? "").trim();
    const result = await sendMemberPush(String(row.user_id), {
      title: "Yapılacaklarım",
      body: note ? `${title} — ${note}` : title,
      url: "/profilim",
    });
    sent += result.sent;

    const rule = String(row.repeat_rule ?? "none");
    if (rule === "none") {
      await admin
        .from("reminders")
        .update({ notified_at: new Date().toISOString() })
        .eq("id", row.id);
    } else {
      await admin
        .from("reminders")
        .update({
          notified_at: null,
          due_on: bumpDue(dueOn, rule),
        })
        .eq("id", row.id);
    }
  }

  let waterSent = 0;
  let settings = await admin
    .from("water_reminder_settings")
    .select("user_id, enabled, timezone, daily_goal")
    .eq("enabled", true)
    .limit(400);
  if (settings.error && isMissingRelation(settings.error.message)) {
    await ensureWaterSchema();
    settings = await admin
      .from("water_reminder_settings")
      .select("user_id, enabled, timezone, daily_goal")
      .eq("enabled", true)
      .limit(400);
  }
  let times = await admin.from("water_reminder_times").select("user_id, time").limit(4000);
  if (times.error && isMissingRelation(times.error.message)) {
    await ensureWaterSchema();
    times = await admin.from("water_reminder_times").select("user_id, time").limit(4000);
  }
  const waterUsers: { user_id: string }[] = (settings.data ?? []).map((row) => ({
    user_id: String(row.user_id),
  }));
  const byUser = new Map<string, string[]>();
  for (const row of times.data ?? []) {
    const uid = String(row.user_id);
    const list = byUser.get(uid) ?? [];
    list.push(String(row.time).slice(0, 5));
    byUser.set(uid, list);
  }

  if (!waterUsers.length) {
    const backups = await admin
      .from("reminders")
      .select("user_id, note, repeat_rule")
      .eq("title", WATER_REMINDER_TITLE)
      .limit(400);
    for (const row of backups.data ?? []) {
      const program = parseWaterProgram(String(row.note ?? ""));
      if (!program?.enabled && row.repeat_rule !== "daily") continue;
      if (!program) continue;
      const uid = String(row.user_id);
      byUser.set(uid, program.times);
      waterUsers.push({ user_id: uid });
    }
  }

  const istanbul = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Istanbul",
    hour: "2-digit",
    minute: "2-digit",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const pick = (type: string) => istanbul.find((part) => part.type === type)?.value ?? "";
  const today = `${pick("year")}-${pick("month")}-${pick("day")}`;
  const nowMin = Number(pick("hour")) * 60 + Number(pick("minute"));

  for (const row of waterUsers) {
    const uid = String(row.user_id);
    const stamps = byUser.get(uid) ?? [];
    for (const stamp of stamps) {
      const [hh, mm] = stamp.split(":").map(Number);
      const due = (hh || 0) * 60 + (mm || 0);
      if (due > nowMin) continue;
      const already = await admin
        .from("water_reminder_sent")
        .select("user_id")
        .eq("user_id", uid)
        .eq("sent_on", today)
        .eq("reminder_time", `${stamp}:00`)
        .maybeSingle();
      if (already.data) continue;
      const result = await sendMemberPush(uid, {
        title: "💧 Su zamanı",
        body: "Bugünkü hedefin için bir bardak su içmeyi unutma.",
        url: "/profilim?open=water",
      });
      waterSent += result.sent;
      if (result.sent > 0) {
        await admin.from("water_reminder_sent").insert({
          user_id: uid,
          sent_on: today,
          reminder_time: `${stamp}:00`,
        });
      }
    }
  }

  return NextResponse.json({ ok: true, sent, waterSent });
}
