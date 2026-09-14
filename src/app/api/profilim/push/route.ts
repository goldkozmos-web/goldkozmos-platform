import { NextResponse } from "next/server";

import { parsePushInput, VAPID_PUBLIC_KEY } from "@/lib/admin/push";
import { createSupabaseServerClient } from "@/lib/supabase/create-server-client";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ publicKey: VAPID_PUBLIC_KEY });
}

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Oturum yok." }, { status: 401 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Giriş yapmalısın." }, { status: 401 });
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

  await supabase.from("push_subscriptions").delete().eq("endpoint", sub.endpoint);

  const { error } = await supabase.from("push_subscriptions").insert({
    user_id: user.id,
    endpoint: sub.endpoint,
    p256dh: sub.keys.p256dh,
    auth_secret: sub.keys.auth,
    user_agent: request.headers.get("user-agent") ?? "",
  });

  if (error) {
    return NextResponse.json({ error: "Telefon kaydı yazılamadı." }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Oturum yok." }, { status: 401 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Giriş yapmalısın." }, { status: 401 });
  }

  let endpoint = "";
  try {
    const raw = (await request.json()) as { endpoint?: unknown };
    endpoint = String(raw.endpoint ?? "").trim();
  } catch {
    endpoint = "";
  }

  let query = supabase.from("push_subscriptions").delete().eq("user_id", user.id);
  if (endpoint) {
    query = query.eq("endpoint", endpoint);
  }
  await query;

  return NextResponse.json({ ok: true });
}
