import { NextResponse } from "next/server";

import { resolveAdminRequest } from "@/lib/admin/auth.server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { access, client } = await resolveAdminRequest(request);

  if (access.status !== "ok" || !client) {
    return NextResponse.json({ error: "Üyeleri görmek için admin olmalısın." }, { status: 401 });
  }

  let raw: { sync?: unknown } = {};
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  if (raw.sync === true) {
    await client.rpc("ensure_own_membership");
    await client.rpc("sync_site_members");
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json(
    { error: "Üyeler Google ile girince kaydolur." },
    { status: 400 },
  );
}
