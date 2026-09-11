import { NextResponse } from "next/server";

import { getAdminAccess } from "@/lib/admin/auth.server";
import { createSupabaseServerClient } from "@/lib/supabase/create-server-client";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const access = await getAdminAccess();
  const supabase = await createSupabaseServerClient();

  if (access.status !== "ok" || !supabase) {
    return NextResponse.json({ error: "Üyeleri görmek için admin olmalısın." }, { status: 401 });
  }

  let raw: { sync?: unknown } = {};
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  if (raw.sync === true) {
    await supabase.rpc("sync_site_members");
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json(
    { error: "Üyeler Google veya telefonla kendiliğinden kaydolur." },
    { status: 400 },
  );
}
