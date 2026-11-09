import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { resolveAdminRequest } from "@/lib/admin/auth.server";
import { isSalesStage, readSalesOutcomes } from "@/lib/admin/sales-outcomes";
import { openSalesOutcome, sealSalesOutcome } from "@/lib/admin/sales-outcomes.server";

export const dynamic = "force-dynamic";
const prefix = "gk-admin-sale:";
async function readStoredOutcomes(client: SupabaseClient, adminId: string) {
  // Existing application-record storage. Payloads are encrypted even on legacy RLS installations.
  const { data, error } = await client.from("comments").select("post_id, content, updated_at").eq("user_id", adminId).like("post_id", `${prefix}%`).order("updated_at", { ascending: false }).limit(500);
  if (error) throw new Error("Kaydedilen sonuçlar okunamadı.");
  const outcomes: Record<string, unknown> = {};
  for (const row of data ?? []) {
    const id = String(row.post_id).slice(prefix.length);
    if (!Object.hasOwn(outcomes, id)) outcomes[id] = openSalesOutcome(row.content);
  }
  return readSalesOutcomes(outcomes);
}
export async function GET(request: Request) {
  const { access, client } = await resolveAdminRequest(request);
  if (access.status !== "ok" || !client) return NextResponse.json({ error: "Yetkisiz işlem." }, { status: 401 });
  try { return NextResponse.json({ outcomes: await readStoredOutcomes(client, access.actor.id) }, { headers: { "Cache-Control": "no-store" } }); }
  catch { return NextResponse.json({ error: "Kaydedilen sonuçlar okunamadı. Yeniden deneyebilirsin." }, { status: 503 }); }
}
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ error: "Geçersiz kaynak." }, { status: 403 });
  const { access, client } = await resolveAdminRequest(request);
  if (access.status !== "ok" || !client) return NextResponse.json({ error: "Yetkisiz işlem." }, { status: 401 });
  let raw: unknown;
  try { raw = await request.json(); } catch { return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 }); }
  if (!raw || typeof raw !== "object") return NextResponse.json({ error: "Geçersiz kayıt." }, { status: 400 });
  const { eventId, stage } = raw as Record<string, unknown>;
  if (typeof eventId !== "string" || !/^[0-9a-f-]{36}$/i.test(eventId) || !isSalesStage(stage)) return NextResponse.json({ error: "Geçersiz kayıt veya durum." }, { status: 400 });
  const event = await client.from("site_events").select("id, path").eq("id", eventId).eq("kind", "appointment").maybeSingle();
  if (event.error) return NextResponse.json({ error: "Kayıt doğrulanamadı." }, { status: 503 });
  if (!event.data) return NextResponse.json({ error: "Randevu geçişi bulunamadı." }, { status: 404 });
  const postId = `${prefix}${eventId}`;
  const existing = await client.from("comments").select("id").eq("user_id", access.actor.id).eq("post_id", postId).order("updated_at", { ascending: false }).limit(1).maybeSingle();
  if (existing.error) return NextResponse.json({ error: "Mevcut sonuç doğrulanamadı." }, { status: 503 });
  try {
    const now = new Date().toISOString();
    const content = sealSalesOutcome({ stage, updatedAt: now, path: String(event.data.path ?? "/").split("?")[0].slice(0,200) });
    const result = existing.data
      ? await client.from("comments").update({ content, updated_at: now }).eq("id", existing.data.id).eq("user_id", access.actor.id)
      : stage === "new" ? { error: null } : await client.from("comments").insert({ post_id: postId, user_id: access.actor.id, content });
    if (result.error) return NextResponse.json({ error: "Sonuç kaydedilemedi. Yeniden deneyebilirsin." }, { status: 503 });
    return NextResponse.json({ outcomes: await readStoredOutcomes(client, access.actor.id) }, { headers: { "Cache-Control": "no-store" } });
  } catch { return NextResponse.json({ error: "Sonuç kaydedilemedi. Yönetici bağlantısını kontrol et." }, { status: 503 }); }
}
