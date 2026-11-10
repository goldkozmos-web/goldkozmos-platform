import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { GROUP_EVENT_CONSENT_VERSION } from "../../../../data/groupEvents";
import { parseGroupRegistration } from "../../../../lib/group-events/validation";
import { selectionProductId, groupService, limitRegistrations, readLimitedBody, registrationCookie, selectionRegistrationEnabled, bankRegistrationEnabled, groupWhatsAppRegistrationEnabled, requireSameOrigin, tokenHash } from "../../../../lib/group-events/server";
import { bankPaymentDetails } from "../../../../lib/group-events/bank";
import { groupTrackingPath } from "../../../../lib/group-events/tracking";

export const runtime = "nodejs";
export async function POST(request: Request) {
  try { requireSameOrigin(request); } catch { return NextResponse.json({ error: "Geçersiz istek." }, { status: 403 }); }
  let parsed: ReturnType<typeof parseGroupRegistration>;
  try { parsed = parseGroupRegistration(JSON.parse(await readLimitedBody(request, 6000))); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Form bilgilerini kontrol et." }, { status: 400 }); }
  const eventIds = parsed.selection.events.map(event => event.id);
  const manualCheckout = process.env.GROUP_EVENT_CHECKOUT_MODE !== "online";
  const paymentMethod = manualCheckout ? "bank_transfer" : parsed.paymentMethod;
  const enabled = manualCheckout
    ? groupWhatsAppRegistrationEnabled()
    : paymentMethod === "bank_transfer" ? bankRegistrationEnabled() : selectionRegistrationEnabled(eventIds);
  if (!enabled) return NextResponse.json({ error: "Bu paket için kayıt henüz açılmadı. Lütfen daha sonra tekrar dene." }, { status: 503 });
  if (parsed.checkoutChannel !== (manualCheckout ? "whatsapp" : "online")) {
    return NextResponse.json({ error: "Başvuru yöntemi güncellendi. Lütfen sayfayı yenileyip tekrar dene." }, { status: 409 });
  }
  try {
    if (!await limitRegistrations(request)) return NextResponse.json({ error: "Çok fazla deneme yapıldı. Lütfen daha sonra tekrar dene." }, { status: 429 });
    const token = randomBytes(32).toString("base64url"), now = new Date().toISOString();
    const bankCode = paymentMethod === "bank_transfer" ? `GK-${randomBytes(8).toString("hex").toUpperCase()}` : null;
    const title = parsed.selection.events.map(event => event.title).join(" + ");
    const { data, error } = await groupService().from("group_event_registrations").insert({
      event_id: parsed.event.id, event_ids: eventIds, event_title: title, full_name: parsed.fullName, email: parsed.email, phone: parsed.phone,
      payment_method: paymentMethod, checkout_channel: manualCheckout ? "whatsapp" : "online", bank_payment_code: bankCode, whatsapp_opt_in_at: parsed.whatsappOptIn ? now : null,
      amount_kurus: parsed.selection.totalKurus, currency: "TRY", access_token_hash: tokenHash(token),
      consent_version: GROUP_EVENT_CONSENT_VERSION, privacy_acknowledged_at: now, terms_accepted_at: now,
    }).select("id").single();
    if (error?.code === "23505") return NextResponse.json({ error: "Seçtiğin çalışmalardan biri için bu e-postayla başvuru zaten var. Önceki başvurunu tamamla veya bizimle iletişime geç." }, { status: 409 });
    if (error || !data) throw new Error("Kayıt saklanamadı.");
    const response = NextResponse.json({ registrationId: data.id, eventTitle: title, paymentStatus: "pending", paymentMethod, amountKurus: parsed.selection.totalKurus,
      trackingPath: groupTrackingPath(data.id, token),
      whatsappRequest: manualCheckout ? { code: bankCode, amountKurus: parsed.selection.totalKurus } : null,
      checkoutUrl: paymentMethod === "shopier" ? `https://www.shopier.com/${selectionProductId(eventIds)}` : null,
      bank: bankCode && !manualCheckout ? { ...bankPaymentDetails()!, description: `${bankCode} | ${title}` } : null,
    }, { status: 201, headers: { "Cache-Control": "no-store" } });
    response.cookies.set(registrationCookie(data.id), token, { httpOnly: true, secure: process.env.NODE_ENV === "production" || new URL(request.url).protocol === "https:", sameSite: "strict", path: `/api/group-events/registrations/${data.id}`, maxAge: 60 * 60 * 24 * 14 });
    return response;
  } catch { return NextResponse.json({ error: "Başvurun şu an kaydedilemedi. Lütfen tekrar dene." }, { status: 503 }); }
}
