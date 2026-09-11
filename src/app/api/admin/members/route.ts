import { NextResponse } from "next/server";

import { getAdminAccess } from "@/lib/admin/auth.server";
import { parseMemberInput } from "@/lib/admin/members";
import { createSupabaseServerClient } from "@/lib/supabase/create-server-client";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const access = await getAdminAccess();
  const supabase = await createSupabaseServerClient();

  if (access.status !== "ok" || !supabase) {
    return NextResponse.json({ error: "Üye eklemek için admin olmalısın." }, { status: 401 });
  }

  let raw: { email?: unknown; displayName?: unknown; sync?: unknown } = {};
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  if (raw.sync === true) {
    await supabase.rpc("sync_site_members");
    return NextResponse.json({ ok: true });
  }

  const parsed = parseMemberInput(raw);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const { error } = await supabase.rpc("add_site_member", {
    p_email: parsed.email,
    p_display_name: parsed.displayName,
  });

  if (error) {
    return NextResponse.json(
      { error: "Üye kaydı yazılamadı. Supabase’de üye SQL’ini çalıştır." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
