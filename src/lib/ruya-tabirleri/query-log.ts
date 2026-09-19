import { createSupabaseServiceClient } from "../supabase/service";
import { createSupabaseServerClient } from "../supabase/create-server-client";

export type DreamSearchRow = {
  query: string;
  normalizedQuery: string;
  matchedSlug: string | null;
  resultCount: number;
  createdAt: string;
};

function asText(value: unknown) {
  return typeof value === "string" ? value : "";
}

export async function loadDreamSearchQueries() {
  const supabase =
    createSupabaseServiceClient() || (await createSupabaseServerClient());
  if (!supabase) {
    return {
      recent: [] as DreamSearchRow[],
      missing: [] as { query: string; count: number }[],
      top: [] as { query: string; count: number }[],
      last7: 0,
      last30: 0,
    };
  }

  const since30 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const since7 = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const pack = await supabase
    .from("dream_search_queries")
    .select("query, normalized_query, matched_slug, result_count, created_at")
    .gte("created_at", since30)
    .order("created_at", { ascending: false })
    .limit(2000);

  const rows = (pack.data ?? []).map((row) => ({
    query: asText(row.query),
    normalizedQuery: asText(row.normalized_query),
    matchedSlug: asText(row.matched_slug) || null,
    resultCount: Number(row.result_count) || 0,
    createdAt: asText(row.created_at),
  }));

  function tally(
    list: DreamSearchRow[],
    key: (row: DreamSearchRow) => string,
  ) {
    const map = new Map<string, number>();
    for (const row of list) {
      const id = key(row).trim();
      if (!id) continue;
      map.set(id, (map.get(id) ?? 0) + 1);
    }
    return [...map.entries()]
      .map(([query, count]) => ({ query, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);
  }

  const missingRows = rows.filter((row) => row.resultCount <= 0 || !row.matchedSlug);
  return {
    recent: rows.slice(0, 40),
    missing: tally(missingRows, (row) => row.normalizedQuery || row.query),
    top: tally(rows, (row) => row.normalizedQuery || row.query),
    last7: rows.filter((row) => row.createdAt >= since7).length,
    last30: rows.length,
  };
}
