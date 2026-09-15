import { NextResponse } from "next/server";

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

export async function GET() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ signedIn: false, action: null });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ signedIn: false, action: null });
  }

  const { data } = await supabase.rpc("get_today_daily_action");
  const row = Array.isArray(data) ? data[0] : data;
  if (row) {
    return NextResponse.json({
      signedIn: true,
      action: mapRow(row as Record<string, unknown>),
    });
  }

  return NextResponse.json({
    signedIn: true,
    action: null,
  });
}

export async function POST() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Oturum yok." }, { status: 401 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Giriş yapmalısın." }, { status: 401 });
  }

  const { data, error } = await supabase.rpc("complete_today_daily_action");
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const row = Array.isArray(data) ? data[0] : data;
  return NextResponse.json({
    already: Boolean((row as { already?: boolean } | null)?.already),
    completedAt: asText(row?.completed_at) || new Date().toISOString(),
  });
}
