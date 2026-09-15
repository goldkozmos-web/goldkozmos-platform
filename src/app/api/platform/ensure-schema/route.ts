import { NextResponse } from "next/server";

import { applyPlatformSchema } from "@/lib/admin/applyPlatformSchema";
import { getProfilimSessionUser } from "@/lib/profilim/auth.server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST() {
  const user = await getProfilimSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Giriş yap." }, { status: 401 });
  }

  const result = await applyPlatformSchema();
  if (!result.ok) {
    return NextResponse.json(
      { error: result.error, reason: result.reason },
      { status: result.reason === "no_db_url" ? 503 : 400 },
    );
  }

  return NextResponse.json({ ok: true });
}
