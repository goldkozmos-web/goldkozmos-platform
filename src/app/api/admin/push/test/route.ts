import { NextResponse } from "next/server";
import { resolveAdminRequest } from "@/lib/admin/auth.server";
import { parsePushSub, PUSH_SUB_POST } from "@/lib/admin/push";
import { sendAdminPush } from "@/lib/admin/push-server";

export const dynamic = "force-dynamic";
export const maxDuration = 30;
export async function POST(request: Request) {
  const { access, client } = await resolveAdminRequest(request);
  if (access.status !== "ok" || !client) return NextResponse.json({ error: "Yönetici girişi gerekli." }, { status: 401 });
  const raw = await request.json().catch(() => null);
  const endpoint = typeof raw?.endpoint === "string" ? raw.endpoint : "";
  if (!endpoint.startsWith("https://") || endpoint.length > 800) return NextResponse.json({ error: "Cihaz belirtilmedi." }, { status: 400 });
  const { data, error } = await client.from("comments").select("content").eq("post_id", PUSH_SUB_POST).eq("user_id", access.actor.id);
  if (error) return NextResponse.json({ error: "Cihaz kaydı kontrol edilemedi." }, { status: 503 });
  if (!(data ?? []).some(row => parsePushSub(String(row.content))?.endpoint === endpoint)) return NextResponse.json({ error: "Bu cihaz kayıtlı değil. Telefon bildirimlerini yeniden aç." }, { status: 404 });
  const result = await sendAdminPush({ title: "Goldkozmos · Deneme bildirimi", body: "Telefon bildirim bağlantın çalışıyor. Yeni hareketler yönetim panelinden takip edilebilir.", url: "/admin" }, endpoint);
  if (!result.sent) return NextResponse.json({ error: "Bildirim servisi gönderimi kabul etmedi. Cihaz kaydını yeniden açıp dene." }, { status: 503 });
  return NextResponse.json({ ok: true });
}
