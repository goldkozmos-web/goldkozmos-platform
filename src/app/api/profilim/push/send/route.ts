import { NextResponse } from "next/server";

import { sendMemberPush } from "@/lib/admin/push-server";
import { createSupabaseServerClient } from "@/lib/supabase/create-server-client";

export const dynamic = "force-dynamic";

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

  let raw: { title?: unknown; body?: unknown; url?: unknown } = {};
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const title = typeof raw.title === "string" ? raw.title.trim() : "Yapılacaklarım";
  const body = typeof raw.body === "string" ? raw.body.trim() : "";
  const url = typeof raw.url === "string" ? raw.url.trim() : "/profilim";
  if (!body) {
    return NextResponse.json({ error: "Metin gerekli." }, { status: 400 });
  }

  const result = await sendMemberPush(user.id, {
    title: title || "Yapılacaklarım",
    body,
    url: url || "/profilim",
  });

  return NextResponse.json({ ok: true, sent: result.sent });
}
