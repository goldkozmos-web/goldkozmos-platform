import postgres from "postgres";

import { PLATFORM_SCHEMA_SQL } from "./platformSchema";

function databaseUrl() {
  return (
    process.env.POSTGRES_URL_NON_POOLING?.trim() ||
    process.env.DATABASE_URL?.trim() ||
    process.env.POSTGRES_URL?.trim() ||
    process.env.SUPABASE_DB_URL?.trim() ||
    process.env.DIRECT_URL?.trim() ||
    ""
  );
}

export function isMissingRelation(message: string | undefined) {
  const text = (message || "").toLowerCase();
  return (
    text.includes("schema cache") ||
    text.includes("does not exist") ||
    text.includes("could not find the table")
  );
}

export async function applyPlatformSchema() {
  const url = databaseUrl();
  if (!url) {
    return {
      ok: false as const,
      reason: "no_db_url" as const,
      error:
        "Supabase tabloları henüz kurulmadı. Vercel’e POSTGRES_URL_NON_POOLING veya DATABASE_URL ekle, sonra tekrar kaydet.",
    };
  }

  const sql = postgres(url, {
    max: 1,
    ssl: "require",
    idle_timeout: 5,
    connect_timeout: 12,
  });

  try {
    await sql.unsafe(PLATFORM_SCHEMA_SQL);
    return { ok: true as const };
  } catch (error) {
    return {
      ok: false as const,
      reason: "sql" as const,
      error: error instanceof Error ? error.message : "Şema yazılamadı.",
    };
  } finally {
    await sql.end({ timeout: 5 }).catch(() => undefined);
  }
}
