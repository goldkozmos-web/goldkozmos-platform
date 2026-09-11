import { NextResponse } from "next/server";

import { resolveAdminRequest } from "@/lib/admin/auth.server";
import {
  packPushSub,
  parsePushInput,
  parsePushSub,
  PUSH_SUB_POST,
  VAPID_PUBLIC_KEY,
} from "@/lib/admin/push";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ publicKey: VAPID_PUBLIC_KEY });
}

export async function POST(request: Request) {
  const { access, client } = await resolveAdminRequest(request);
  if (access.status !== "ok" || !client) {
    return NextResponse.json({ error: "Bildirim için yönetici olmalısın." }, { status: 401 });
  }

  let raw: { subscription?: unknown } = {};
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const sub = parsePushInput(raw.subscription);
  if (!sub) {
    return NextResponse.json({ error: "Abonelik alınamadı." }, { status: 400 });
  }

  const packed = packPushSub(sub);
  const { data: existingRows } = await client
    .from("comments")
    .select("id, content")
    .eq("post_id", PUSH_SUB_POST)
    .eq("user_id", access.actor.id);

  const already = (existingRows ?? []).some((row) => {
    const saved = parsePushSub(String((row as { content?: string }).content ?? ""));
    return saved?.endpoint === sub.endpoint;
  });

  if (!already) {
    const { error } = await client.from("comments").insert({
      post_id: PUSH_SUB_POST,
      user_id: access.actor.id,
      content: packed,
    });
    if (error) {
      return NextResponse.json({ error: "Telefon kaydı yazılamadı." }, { status: 400 });
    }
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const { access, client } = await resolveAdminRequest(request);
  if (access.status !== "ok" || !client) {
    return NextResponse.json({ error: "Bildirim için yönetici olmalısın." }, { status: 401 });
  }

  let endpoint = "";
  try {
    const raw = (await request.json()) as { endpoint?: unknown };
    endpoint = String(raw.endpoint ?? "").trim();
  } catch {
    endpoint = "";
  }

  const { data } = await client
    .from("comments")
    .select("id, content")
    .eq("post_id", PUSH_SUB_POST)
    .eq("user_id", access.actor.id);

  const ids = (data ?? [])
    .filter((row) => {
      const sub = parsePushSub(String((row as { content?: string }).content ?? ""));
      if (!endpoint) return true;
      return sub?.endpoint === endpoint;
    })
    .map((row) => String((row as { id?: string }).id ?? ""))
    .filter(Boolean);

  if (ids.length) {
    await client.from("comments").delete().in("id", ids);
  }

  return NextResponse.json({ ok: true });
}
