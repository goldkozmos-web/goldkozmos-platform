import { NextResponse } from "next/server";

import { sendMemberPush } from "@/lib/admin/push-server";
import { createSupabaseServiceClient } from "@/lib/supabase/service";

export const dynamic = "force-dynamic";

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
  const local = new Date(`${iso}+03:00`);
  return local.getTime();
}

function bumpDue(dueOn: string, rule: string) {
  const date = new Date(`${dueOn}T12:00:00+03:00`);
  if (rule === "daily") date.setDate(date.getDate() + 1);
  else if (rule === "weekly") date.setDate(date.getDate() + 7);
  else if (rule === "monthly") date.setMonth(date.getMonth() + 1);
  else return dueOn;
  return date.toISOString().slice(0, 10);
}

export async function GET(request: Request) {
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

  return NextResponse.json({ ok: true, sent });
}
