import { NextResponse } from "next/server";

import { getAdminAccess } from "@/lib/admin/auth.server";
import { createSupabaseServerClient } from "@/lib/supabase/create-server-client";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const access = await getAdminAccess();
  if (access.status !== "ok") {
    return NextResponse.json({ error: "Yetkin yok." }, { status: 403 });
  }

  let raw: {
    userIds?: unknown;
    title?: unknown;
    body?: unknown;
    type?: unknown;
    link?: unknown;
  } = {};

  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const title = typeof raw.title === "string" ? raw.title.trim() : "";
  const body = typeof raw.body === "string" ? raw.body.trim() : "";
  const type = typeof raw.type === "string" ? raw.type.trim() : "admin";
  const link = typeof raw.link === "string" ? raw.link.trim() : null;
  const userIds = Array.isArray(raw.userIds)
    ? raw.userIds.filter((id): id is string => typeof id === "string" && id.length > 8)
    : [];

  if (!title || !body) {
    return NextResponse.json({ error: "Başlık ve metin gerekli." }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Bağlantı yok." }, { status: 500 });
  }

  const { data, error } = await supabase.rpc("admin_create_notifications", {
    p_user_ids: userIds.length ? userIds : null,
    p_title: title,
    p_body: body,
    p_type: type || "admin",
    p_link: link,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, count: data ?? 0 });
}
