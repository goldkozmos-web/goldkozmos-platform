import { NextResponse } from "next/server";

import { getAdminAccess } from "@/lib/admin/auth.server";
import { loadAdminLive } from "@/lib/admin/load";

export const dynamic = "force-dynamic";

export async function GET() {
  const access = await getAdminAccess();

  if (access.status !== "ok") {
    return NextResponse.json({ error: "forbidden" }, { status: 401 });
  }

  const data = await loadAdminLive();
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
