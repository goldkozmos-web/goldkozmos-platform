import { NextResponse } from "next/server";

import { sendMemberPush } from "@/lib/admin/push-server";
import { createSupabaseServerClient } from "@/lib/supabase/create-server-client";

export const dynamic = "force-dynamic";

function dueStamp(dueOn: string, dueTime: string | null) {
  const time = (dueTime || "09:00:00").slice(0, 8);
  const iso = `${dueOn}T${time.length === 5 ? `${time}:00` : time}`;
  return new Date(`${iso}+03:00`).getTime();
}

export async function POST() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ sent: 0 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ sent: 0 });
  }

  const { data } = await supabase
    .from("reminders")
    .select("id, title, note, due_on, due_time, notified_at")
    .eq("user_id", user.id)
    .is("completed_at", null)
    .not("due_on", "is", null)
    .limit(40);

  const now = Date.now();
  let sent = 0;

  for (const row of data ?? []) {
    if (row.notified_at) continue;
    const dueOn = String(row.due_on ?? "");
    if (!dueOn) continue;
    if (dueStamp(dueOn, row.due_time ? String(row.due_time) : null) > now) continue;

    const title = String(row.title ?? "Görev");
    const note = String(row.note ?? "").trim();
    const result = await sendMemberPush(user.id, {
      title: "Yapılacaklarım",
      body: note ? `${title} — ${note}` : title,
      url: "/profilim",
    });
    sent += result.sent;
    await supabase
      .from("reminders")
      .update({ notified_at: new Date().toISOString() })
      .eq("id", row.id);
  }

  return NextResponse.json({ ok: true, sent });
}
