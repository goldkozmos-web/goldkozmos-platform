import { NextResponse } from "next/server";

import { istanbulDay, pickGoldActFallback } from "@/data/goldAct";
import { createSupabaseServerClient } from "@/lib/supabase/create-server-client";

export const dynamic = "force-dynamic";

function asText(value: unknown) {
  if (typeof value === "string") return value;
  if (value == null) return "";
  return String(value);
}

function mapRow(row: Record<string, unknown>) {
  return {
    id: asText(row.id),
    title: asText(row.title),
    body: asText(row.body),
    category: asText(row.category),
    assignedOn: asText(row.assigned_on),
    completedAt: asText(row.completed_at) || null,
  };
}

async function sessionUser() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { supabase: null, user: null };
  const { data } = await supabase.auth.getSession();
  return { supabase, user: data.session?.user ?? null };
}

export async function GET() {
  const { supabase, user } = await sessionUser();
  if (!supabase || !user) {
    return NextResponse.json({ signedIn: false, userId: null, action: null });
  }

  const { data } = await supabase.rpc("get_today_daily_action");
  const row = Array.isArray(data) ? data[0] : data;
  return NextResponse.json({
    signedIn: true,
    userId: user.id,
    action: row
      ? mapRow(row as Record<string, unknown>)
      : pickGoldActFallback(user.id, istanbulDay()),
  });
}

export async function POST() {
  const { supabase, user } = await sessionUser();
  if (!supabase || !user) {
    return NextResponse.json({ error: "Giriş yapmalısın." }, { status: 401 });
  }

  const { data, error } = await supabase.rpc("complete_today_daily_action");
  if (error) {
    const missing = /does not exist|schema cache|not signed in/i.test(error.message);
    if (!missing) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({
      already: false,
      completedAt: new Date().toISOString(),
      fallback: true,
    });
  }

  const row = Array.isArray(data) ? data[0] : data;
  return NextResponse.json({
    already: Boolean((row as { already?: boolean } | null)?.already),
    completedAt: asText(row?.completed_at) || new Date().toISOString(),
  });
}
