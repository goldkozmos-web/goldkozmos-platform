import { NextResponse } from "next/server";

import { APPOINTMENT_SELECT, mapAppointmentRow } from "@/lib/appointments/map";
import { isAppointmentStatus } from "@/lib/appointments/status";
import { getGoldBlogSessionUser } from "@/lib/goldblog/session";
import { createSupabaseServerClient } from "@/lib/supabase/create-server-client";
import { hasSupabaseConfig } from "@/lib/supabase/env";
import type { AppointmentRow } from "@/lib/appointments/types";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!hasSupabaseConfig()) {
    return NextResponse.json({ error: "Supabase yapılandırılmadı." }, { status: 503 });
  }

  const user = await getGoldBlogSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Giriş gerekli." }, { status: 401 });
  }

  if (!user.isAdmin) {
    return NextResponse.json({ error: "Bu işlem için admin yetkisi gerekir." }, { status: 403 });
  }

  const { id } = await context.params;
  let body: { status?: unknown } = {};

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const status = typeof body.status === "string" ? body.status : "";
  if (!isAppointmentStatus(status)) {
    return NextResponse.json({ error: "Geçersiz randevu durumu." }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase yapılandırılmadı." }, { status: 503 });
  }

  const { data, error } = await supabase
    .from("appointments")
    .update({ status })
    .eq("id", id)
    .select(APPOINTMENT_SELECT)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json(
      { error: "Randevu güncellenemedi. Admin kaydı (is_admin) gerekli olabilir." },
      { status: 403 },
    );
  }

  const appointment = mapAppointmentRow(data as AppointmentRow);
  return NextResponse.json({ appointment });
}
