import { NextResponse } from "next/server";

import { applyPlatformSchema, isMissingRelation } from "@/lib/admin/applyPlatformSchema";
import { normalizeDreamQuery } from "@/lib/ruya-tabirleri/normalize";
import { createSupabaseAnonClient } from "@/lib/supabase/anon";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let raw: { query?: unknown; matchedSlug?: unknown; resultCount?: unknown } = {};
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const query = String(raw.query ?? "").trim().slice(0, 180);
  if (query.length < 2) {
    return NextResponse.json({ ok: true });
  }

  const payload = {
    query,
    normalized_query: normalizeDreamQuery(query) || query.toLocaleLowerCase("tr-TR"),
    matched_slug: String(raw.matchedSlug ?? "").trim() || null,
    result_count: Math.max(0, Number(raw.resultCount) || 0),
  };

  const supabase = createSupabaseAnonClient();
  if (!supabase) return NextResponse.json({ ok: true });

  let error = (await supabase.from("dream_search_queries").insert(payload)).error;
  if (error && isMissingRelation(error.message)) {
    await applyPlatformSchema();
    error = (await supabase.from("dream_search_queries").insert(payload)).error;
  }

  return NextResponse.json({ ok: !error });
}
