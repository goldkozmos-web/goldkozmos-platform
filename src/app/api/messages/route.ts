import { after, NextResponse } from "next/server";
import { sendAdminPush, sendMemberPush } from "@/lib/admin/push-server";
import { createSupabaseServerClient } from "@/lib/supabase/create-server-client";

import {
  listInboxMessages,
  sendMemberMessage,
} from "@/lib/messages/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const messages = await listInboxMessages();
  return NextResponse.json({ messages });
}

export async function POST(request: Request) {
  let raw: { title?: unknown; body?: unknown; recipientId?: unknown } = {};

  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const result = await sendMemberMessage(raw);

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  const client = await createSupabaseServerClient();
  after(async () => {
    await sendAdminPush({ title: "Mesaj gönderildi", body: `${result.count} üyeye mesaj gönderildi.`, url: "/admin/mesajlar" });
    if (client) for (const recipient of result.recipientIds) await sendMemberPush(recipient, { title: result.sent[0]?.title || "Goldkozmos’tan yeni mesaj", body: result.sent[0]?.body || "Kişisel mesaj kutunu kontrol et.", url: "/profilim?open=inbox" }, client);
  });
  return NextResponse.json({ ok: true, count: result.count, sent: result.sent });
}
