import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { GROUP_EVENT_CONSENT_VERSION, GROUP_EVENT_PRICE_KURUS } from "../../../../data/groupEvents";
import { parseGroupRegistration } from "../../../../lib/group-events/validation";
import { eventProductId, groupService, limitRegistrations, readLimitedBody, registrationCookie, registrationEnabled, requireSameOrigin, tokenHash } from "../../../../lib/group-events/server";

export const runtime = "nodejs";
export async function POST(request: Request) {
  try { requireSameOrigin(request); } catch { return NextResponse.json({ error: "Geçersiz istek." }, { status: 403 }); }
  let parsed: ReturnType<typeof parseGroupRegistration>;
  try { parsed = parseGroupRegistration(JSON.parse(await readLimitedBody(request, 6000))); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Form bilgilerini kontrol et." }, { status: 400 }); }
  if (!registrationEnabled(parsed.event.id)) return NextResponse.json({ error: "Online kayıt henüz açılmadı. Lütfen daha sonra tekrar dene." }, { status: 503 });
  try {
    if (!await limitRegistrations(request)) return NextResponse.json({ error: "Çok fazla deneme yapıldı. Lütfen daha sonra tekrar dene." }, { status: 429 });
    const token = randomBytes(32).toString("base64url"), now = new Date().toISOString();
    const { data, error } = await groupService().from("group_event_registrations").insert({
      event_id: parsed.event.id, event_title: parsed.event.title, full_name: parsed.fullName, email: parsed.email, phone: parsed.phone,
      amount_kurus: GROUP_EVENT_PRICE_KURUS, currency: "TRY", access_token_hash: tokenHash(token),
      consent_version: GROUP_EVENT_CONSENT_VERSION, privacy_acknowledged_at: now, terms_accepted_at: now,
    }).select("id").single();
    if (error?.code === "23505") return NextResponse.json({ error: "Bu etkinlik için bu e-postayla bir başvuru zaten var. Önceki başvurunu tamamla veya bizimle iletişime geç." }, { status: 409 });
    if (error || !data) throw new Error("Kayıt saklanamadı.");
    const response = NextResponse.json({ registrationId: data.id, paymentStatus: "pending", checkoutUrl: `https://www.shopier.com/${eventProductId(parsed.event.id)}` }, { status: 201, headers: { "Cache-Control": "no-store" } });
    response.cookies.set(registrationCookie(data.id), token, { httpOnly: true, secure: process.env.NODE_ENV === "production" || new URL(request.url).protocol === "https:", sameSite: "strict", path: `/api/group-events/registrations/${data.id}`, maxAge: 60 * 60 * 24 * 14 });
    return response;
  } catch { return NextResponse.json({ error: "Başvurun şu an kaydedilemedi. Lütfen tekrar dene." }, { status: 503 }); }
}
