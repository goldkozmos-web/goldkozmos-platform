import { NextResponse } from "next/server";

import { resolveAdminRequest } from "@/lib/admin/auth.server";
import { createSupabaseServiceClient } from "@/lib/supabase/service";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { access } = await resolveAdminRequest(request);
  const actor =
    access.status === "ok" || access.status === "forbidden"
      ? access.actor
      : null;

  if (!actor) {
    return NextResponse.json({ error: "Giriş gerekli." }, { status: 401 });
  }

  const admin = createSupabaseServiceClient();
  if (admin) {
    const { error } = await admin.auth.admin.deleteUser(actor.id);
    if (error) {
      return NextResponse.json({ error: "Hesap silinemedi." }, { status: 400 });
    }
  }

  return NextResponse.json({ ok: true });
}
