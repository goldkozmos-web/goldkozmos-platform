import { NextResponse } from "next/server";

import { APPOINTMENT_SELECT, mapAppointmentRow } from "@/lib/appointments/map";
import { getGoldBlogSessionUser } from "@/lib/goldblog/session";
import { createSupabaseServerClient } from "@/lib/supabase/create-server-client";
import { hasSupabaseConfig } from "@/lib/supabase/env";
import type { AppointmentRow } from "@/lib/appointments/types";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!hasSupabaseConfig()) {
    return NextResponse.json({ error: "Supabase yapılandırılmadı." }, { status: 503 });
  }

  const user = await getGoldBlogSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Giriş gerekli." }, { status: 401 });
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase yapılandırılmadı." }, { status: 503 });
  }

  const query = supabase
    .from("appointments")
    .select(APPOINTMENT_SELECT)
    .order("appointment_date", { ascending: true })
    .order("start_time", { ascending: true });

  const { data, error } = user.isAdmin
    ? await query
    : await query.eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: "Randevular alınamadı." }, { status: 500 });
  }

  const appointments = ((data ?? []) as AppointmentRow[])
    .map(mapAppointmentRow)
    .filter((item) => item !== null);

  return NextResponse.json({
    appointments,
    viewer: { id: user.id, isAdmin: user.isAdmin },
  });
}
