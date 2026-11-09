import { NextResponse } from "next/server";
import { resolveAdminRequest } from "@/lib/admin/auth.server";
import { visitSeries, visitWindow, type VisitEvent } from "@/lib/admin/visit-series";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function GET(request: Request) {
  const { access, client } = await resolveAdminRequest(request);
  if (access.status !== "ok" || !client) return NextResponse.json({ error: "Yönetim oturumu gerekli." }, { status: 401 });
  const raw = new URL(request.url).searchParams.get("range");
  if (!raw || !["1", "7", "30", "90"].includes(raw)) return NextResponse.json({ error: "Geçersiz tarih aralığı." }, { status: 400 });
  const range = Number(raw) as 1 | 7 | 30 | 90;
  const window = visitWindow(range);
  const events: VisitEvent[] = [];
  for (let offset = 0; ; offset += 1000) {
    const result = await client.from("site_events").select("created_at, visitor_key, path")
      .eq("kind", "page").gte("created_at", window.from).lt("created_at", window.to)
      .order("created_at", { ascending: true }).order("id", { ascending: true }).range(offset, offset + 999);
    if (result.error) return NextResponse.json({ error: "Ziyaret kayıtları yüklenemedi. Yeniden deneyebilirsin." }, { status: 503 });
    events.push(...(result.data ?? []));
    if ((result.data?.length ?? 0) < 1000) break;
  }
  return NextResponse.json({ range, updatedAt: new Date().toISOString(), ...visitSeries(events, window.days) }, { headers: { "Cache-Control": "private, no-store" } });
}
