import { NextResponse } from "next/server";

import { isMissingRelation } from "@/lib/admin/applyPlatformSchema";
import { getProfilimSessionUser } from "@/lib/profilim/auth.server";
import { parseCustomTimes, timesBetween } from "@/lib/water/schedule";
import {
  ensureWaterSchema,
  parseClock,
  publicWaterError,
  readWaterBackup,
  readWaterMeta,
  readWaterProgramSql,
  readWaterTables,
  upsertWaterProgramSql,
  writeWaterBackup,
  writeWaterLogs,
  writeWaterMeta,
  writeWaterTables,
} from "@/lib/water/persist";
import { istanbulDay, type WaterProgram } from "@/lib/water/store";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

function asProgram(input: Partial<WaterProgram>, current?: WaterProgram | null): WaterProgram {
  const mode =
    input.mode === "interval" || input.mode === "custom" || input.mode === "count"
      ? input.mode
      : current?.mode || "count";
  const start = parseClock(String(input.start || current?.start || "09:00"), "09:00");
  const end = parseClock(String(input.end || current?.end || "22:00"), "22:00");
  const count = Math.min(24, Math.max(1, Number(input.count || current?.count || 6)));
  const intervalHours = String(input.intervalHours || current?.intervalHours || "2");
  const customInput = String(
    input.customInput || current?.customInput || "09:00, 11:30, 14:00, 17:00, 20:00",
  );
  const hours = Math.max(1, Number(intervalHours) || 2);
  const times =
    mode === "custom"
      ? parseCustomTimes(customInput)
      : timesBetween(start, end, count, mode === "interval" ? hours * 60 : null);
  return {
    goal: Math.min(24, Math.max(1, Number(input.goal || current?.goal || 8))),
    start,
    end,
    mode,
    count,
    intervalHours,
    customInput,
    enabled: Boolean(input.enabled ?? current?.enabled),
    times,
    glasses: Math.max(0, Number(input.glasses ?? current?.glasses ?? 0)),
    day: istanbulDay(),
  };
}

async function loadProgram(userId: string) {
  return (
    (await readWaterTables(userId)) ||
    (await readWaterProgramSql(userId)) ||
    (await readWaterBackup(userId)) ||
    (await readWaterMeta(userId))
  );
}

export async function GET() {
  const user = await getProfilimSessionUser();
  if (!user) return NextResponse.json({ error: "Giriş yap." }, { status: 401 });
  const program = (await loadProgram(user.id)) || asProgram({});
  return NextResponse.json({ program });
}

export async function POST(request: Request) {
  const user = await getProfilimSessionUser();
  if (!user) return NextResponse.json({ error: "Giriş yap." }, { status: 401 });

  let raw: Partial<WaterProgram> & { drink?: boolean } = {};
  try {
    raw = (await request.json()) as Partial<WaterProgram> & { drink?: boolean };
  } catch {
    raw = {};
  }

  const current = await loadProgram(user.id);
  const glasses = Math.max(Number(raw.glasses ?? 0), Number(current?.glasses ?? 0));
  const next = asProgram({ ...raw, glasses: raw.drink ? glasses + 1 : glasses }, current);

  let tableError = (await writeWaterTables(user.id, next)).error;
  if (tableError && isMissingRelation(tableError)) {
    await ensureWaterSchema();
    tableError = (await writeWaterTables(user.id, next)).error;
  }

  let stored: "table" | "sql" | "backup" | "meta" | null = tableError ? null : "table";
  if (tableError) {
    const sqlWrite = await upsertWaterProgramSql(user.id, next, Boolean(raw.drink));
    if (sqlWrite.ok) stored = "sql";
  }

  const backup = await writeWaterBackup(user.id, next);
  if (!stored && !backup.error) stored = "backup";
  const meta = await writeWaterMeta(user.id, next);
  if (!stored && !meta.error) stored = "meta";

  if (!stored) {
    return NextResponse.json(
      { error: publicWaterError(backup.error || meta.error || tableError || undefined), program: next },
      { status: 400 },
    );
  }

  if (raw.drink && stored === "table") await writeWaterLogs(user.id, 1);
  return NextResponse.json({ ok: true, program: next, stored });
}
