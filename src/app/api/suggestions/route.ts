import { NextResponse } from "next/server";

import { getAdminAccess } from "@/lib/admin/auth.server";
import {
  createSiteSuggestion,
  listSiteSuggestions,
} from "@/lib/admin/suggestion-log";

export const dynamic = "force-dynamic";

export async function GET() {
  const access = await getAdminAccess();
  if (access.status === "ok") {
    const items = await listSiteSuggestions();
    return NextResponse.json({ items });
  }

  return NextResponse.json({ items: [] });
}

export async function POST(request: Request) {
  let raw: { title?: unknown; body?: unknown } = {};
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const result = await createSiteSuggestion(raw);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({ ok: true, suggestion: result.suggestion });
}
