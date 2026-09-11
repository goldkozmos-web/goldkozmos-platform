import { NextResponse } from "next/server";

import { resolveAdminRequest } from "@/lib/admin/auth.server";
import { loadAdminLive } from "@/lib/admin/load";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { access, client } = await resolveAdminRequest(request);

  if (access.status !== "ok") {
    return NextResponse.json({ error: "forbidden" }, { status: 401 });
  }

  const data = await loadAdminLive(client);
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
