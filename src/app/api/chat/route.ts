import { randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { after, NextResponse } from "next/server";
import { createSupabaseAnonClient } from "@/lib/supabase/anon";
import { sendAdminPush } from "@/lib/admin/push-server";

export const dynamic = "force-dynamic";
const cookieName = "gk_site_chat";
const headers = { "Cache-Control": "private, no-store" };
export async function GET() {
 const token = (await cookies()).get(cookieName)?.value;
 if (!token) return NextResponse.json({ messages: [] }, { headers });
 const db = createSupabaseAnonClient();
 const result = await db?.rpc("chat_visit", { p_token: token });
 if (!result || result.error) return NextResponse.json({ error: "Sohbet yüklenemedi. Yeniden dene." }, { status: 503, headers });
 return NextResponse.json(result.data, { headers });
}
export async function POST(request: Request) {
 if (request.headers.get("origin") !== new URL(request.url).origin) return NextResponse.json({ error: "Geçersiz kaynak." }, { status: 403, headers });
 const text = await request.text();
 if (text.length > 12000) return NextResponse.json({ error: "Mesaj çok uzun." }, { status: 400, headers });
 let raw;
 try { raw = JSON.parse(text); } catch { return NextResponse.json({ error: "Geçersiz mesaj." }, { status: 400, headers }); }
 if (typeof raw?.body !== "string" || !raw.body.trim() || raw.body.length > 2000 || typeof raw.requestId !== "string" || !/^[a-f0-9-]{36}$/i.test(raw.requestId)) return NextResponse.json({ error: "Mesajını kontrol et." }, { status: 400, headers });
 const jar = await cookies();
 const existing = jar.get(cookieName)?.value;
 const token = existing && /^[a-f0-9]{64}$/.test(existing) ? existing : randomBytes(32).toString("hex");
 const db = createSupabaseAnonClient();
 const result = await db?.rpc("chat_visit", { p_token: token, p_body: raw.body.trim(), p_name: typeof raw.name === "string" ? raw.name.slice(0,60) : "Ziyaretçi", p_request: raw.requestId });
 if (!result || result.error) return NextResponse.json({ error: result?.error?.message?.includes("Çok hızlı") ? "Çok hızlı yazıyorsun. Biraz bekle." : "Mesaj gönderilemedi. Biraz sonra tekrar dene." }, { status: 503, headers });
 const response = NextResponse.json(result.data, { headers });
 response.cookies.set(cookieName, token, { httpOnly: true, secure: new URL(request.url).protocol === "https:", sameSite: "lax", path: "/", maxAge: 60*60*24*90 });
 if (result.data?.new) after(async () => { await sendAdminPush({ title: "Yeni canlı sohbet mesajı", body: "Bir ziyaretçi yazdı. Cevaplamak için sohbeti aç.", url: "/admin/sohbet" }); });
 return response;
}
