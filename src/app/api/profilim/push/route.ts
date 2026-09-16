import { NextResponse } from "next/server";

import { parsePushInput, VAPID_PUBLIC_KEY } from "@/lib/admin/push";
import { getProfilimSessionUser } from "@/lib/profilim/auth.server";
import { deletePushSubscription, savePushSubscription } from "@/lib/push/persist";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { createSupabaseServerClient } from "@/lib/supabase/create-server-client";

export const dynamic = "force-dynamic";

async function actor(request: Request) {
  const header = request.headers.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  if (token) {
    const admin = createSupabaseServiceClient() || (await createSupabaseServerClient());
    if (admin) {
      const { data } = await admin.auth.getUser(token);
      if (data.user?.id) return { id: data.user.id };
    }
  }
  return getProfilimSessionUser();
}

export async function GET() {
  return NextResponse.json({ publicKey: VAPID_PUBLIC_KEY });
}

export async function POST(request: Request) {
  const user = await actor(request);
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

  const saved = await savePushSubscription(
    user.id,
    sub,
    request.headers.get("user-agent") ?? "",
  );
  if (saved.error) {
    return NextResponse.json({ error: "Telefon kaydı yazılamadı." }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const user = await actor(request);
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

  await deletePushSubscription(user.id, endpoint);
  return NextResponse.json({ ok: true });
}
