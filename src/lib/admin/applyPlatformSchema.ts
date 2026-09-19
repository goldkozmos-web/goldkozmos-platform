import postgres from "postgres";

import { ADMIN_DESK_SQL } from "./desk-schema";
import { PLATFORM_SCHEMA_SQL } from "./platformSchema";

export function platformDatabaseUrl() {
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

const NO_DB =
  "Su hatırlatıcısı kaydı için veritabanı bağlantısı yok. Vercel’e POSTGRES_URL_NON_POOLING ekle.";

export async function runPlatformSql<T>(
  work: (sql: ReturnType<typeof postgres>) => Promise<T>,
): Promise<{ ok: true; value: T } | { ok: false; error: string }> {
  const url = platformDatabaseUrl();
  if (!url) return { ok: false, error: NO_DB };
  const sql = postgres(url, {
    max: 1,
    ssl: "require",
    idle_timeout: 8,
    connect_timeout: 12,
  });
  try {
    return { ok: true, value: await work(sql) };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Veritabanı yazılamadı.",
    };
  } finally {
    await sql.end({ timeout: 5 }).catch(() => undefined);
  }
}

export async function applyPlatformSchema() {
  const result = await runPlatformSql(async (sql) => {
    await sql.unsafe(PLATFORM_SCHEMA_SQL);
    await sql.unsafe(ADMIN_DESK_SQL);
  });
  if (!result.ok) {
    return {
      ok: false as const,
      reason: result.error === NO_DB ? ("no_db_url" as const) : ("sql" as const),
      error:
        result.error === NO_DB
          ? "Supabase tabloları henüz kurulmadı. Vercel’e POSTGRES_URL_NON_POOLING veya DATABASE_URL ekle, sonra tekrar kaydet."
          : result.error,
    };
  }
  return { ok: true as const };
}
