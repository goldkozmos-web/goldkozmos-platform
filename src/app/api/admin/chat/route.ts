import { NextResponse } from "next/server";
import { resolveAdminRequest } from "@/lib/admin/auth.server";
export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "private, no-store" };
const uuid = /^[a-f0-9-]{36}$/i;
export async function GET(request: Request) {
 const { access, client } = await resolveAdminRequest(request);
 if (access.status !== "ok" || !client) return NextResponse.json({ error: "Yönetici girişi gerekli." }, { status: 401, headers });
 const id = new URL(request.url).searchParams.get("thread");
 if (id) {
  if (!uuid.test(id)) return NextResponse.json({ error: "Geçersiz sohbet." }, { status: 400, headers });
  const { data, error } = await client.from("chat_messages").select("id,sender,body,created_at").eq("thread_id",id).order("created_at",{ascending:false}).order("id",{ascending:false}).limit(200);
  if (error) return NextResponse.json({ error: "Mesajlar yüklenemedi." }, { status: 503, headers });
  return NextResponse.json({ messages: (data ?? []).reverse() }, { headers });
 }
 const { data, error } = await client.from("chat_threads").select("id,name,updated_at,unread").order("updated_at",{ascending:false}).limit(100);
 if (error) return NextResponse.json({ error: "Sohbetler yüklenemedi." }, { status: 503, headers });
 return NextResponse.json({ threads: data ?? [] }, { headers });
}
export async function POST(request: Request) {
 if (request.headers.get("origin") !== new URL(request.url).origin) return NextResponse.json({ error: "Geçersiz kaynak." }, { status: 403, headers });
 const { access, client } = await resolveAdminRequest(request);
 if (access.status !== "ok" || !client) return NextResponse.json({ error: "Yönetici girişi gerekli." }, { status: 401, headers });
 const raw = await request.json().catch(() => null);
 if (typeof raw?.thread !== "string" || !uuid.test(raw.thread) || typeof raw.body !== "string" || !raw.body.trim() || raw.body.length > 2000 || typeof raw.requestId !== "string" || !uuid.test(raw.requestId)) return NextResponse.json({ error: "Mesajını kontrol et." }, { status: 400, headers });
 const { error } = await client.rpc("chat_admin_reply", { p_thread: raw.thread, p_body: raw.body.trim(), p_request: raw.requestId });
 if (error) return NextResponse.json({ error: "Cevap gönderilemedi." }, { status: 503, headers });
 return NextResponse.json({ ok: true }, { headers });
}
