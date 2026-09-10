import { NextResponse } from "next/server";

import { getGoldBlogSessionUser } from "@/lib/goldblog/session";
import { createSupabaseServerClient } from "@/lib/supabase/create-server-client";
import { hasSupabaseConfig } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!hasSupabaseConfig()) {
    return NextResponse.json({ count: 0 });
  }

  const user = await getGoldBlogSessionUser();
  if (!user?.isAdmin) {
    return NextResponse.json({ count: 0 });
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ count: 0 });
  }

  const { data: seen } = await supabase
    .from("appointment_admin_reads")
    .select("last_seen_at")
    .eq("user_id", user.id)
    .maybeSingle();

  let query = supabase
    .from("appointments")
    .select("id", { count: "exact", head: true });

  if (seen?.last_seen_at) {
    query = query.gt("created_at", seen.last_seen_at);
  }

  const { count } = await query;
  return NextResponse.json({ count: count ?? 0 });
}

export async function POST() {
  if (!hasSupabaseConfig()) {
    return NextResponse.json({ error: "Supabase yapılandırılmadı." }, { status: 503 });
  }

  const user = await getGoldBlogSessionUser();
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Bu işlem için admin yetkisi gerekir." }, { status: 403 });
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase yapılandırılmadı." }, { status: 503 });
  }

  const { error } = await supabase.from("appointment_admin_reads").upsert({
    user_id: user.id,
    last_seen_at: new Date().toISOString(),
  });

  if (error) {
    return NextResponse.json({ error: "Bildirimler işaretlenemedi." }, { status: 500 });
  }

  return NextResponse.json({ count: 0 });
}
