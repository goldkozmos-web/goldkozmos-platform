import { NextResponse } from "next/server";
import { resolveAdminRequest } from "../../../../lib/admin/auth.server";
import { findGroupEvent, groupEvents } from "../../../../data/groupEvents";
import { eventProductId, groupService, readLimitedBody, reconcileOrder, requireSameOrigin, tokenHash } from "../../../../lib/group-events/server";
import { isGoogleMeetUrl } from "../../../../lib/group-events/validation";
import { sendGroupConfirmation } from "../../../../lib/group-events/confirmation";
import { sendApprovalWhatsApp, whatsappConfigured } from "../../../../lib/group-events/whatsapp";
import { moneyToKurus } from "../../../../lib/group-events/payment";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const noStore = { "Cache-Control": "private, no-store" };

export async function GET(request: Request) {
  const { access } = await resolveAdminRequest(request);
  if (access.status !== "ok") return NextResponse.json({ error: "Yetkisiz işlem." }, { status: 401 });
  const url = new URL(request.url), eventId = url.searchParams.get("eventId");
  const offset = Number(url.searchParams.get("offset") ?? "0");
  if (eventId && !findGroupEvent(eventId) || !Number.isSafeInteger(offset) || offset < 0) return NextResponse.json({ error: "Geçersiz filtre." }, { status: 400 });
  try {
    const client = groupService();
    let query = client.from("group_event_registrations").select("id,event_id,event_ids,event_title,amount_kurus,full_name,email,phone,payment_method,payment_status,bank_payment_code,approved_at,whatsapp_opt_in_at,provider_order_id,created_at,paid_at,confirmation_sent_at", { count: "exact" }).order("created_at", { ascending: false }).range(offset, offset + 49);
    if (eventId) query = query.contains("event_ids", [eventId]);
    const [result, meetings, counts] = await Promise.all([
      query,
      client.from("group_event_private").select("event_id,meet_url"),
      Promise.all(groupEvents.map(async event => {
        const [total, paid] = await Promise.all([
          client.from("group_event_registrations").select("id", { count: "exact", head: true }).contains("event_ids", [event.id]),
          client.from("group_event_registrations").select("id", { count: "exact", head: true }).contains("event_ids", [event.id]).eq("payment_status", "paid").not("approved_at", "is", null),
        ]);
        if (total.error || paid.error) throw new Error("Sayılar okunamadı.");
        return { eventId: event.id, title: event.title, total: total.count ?? 0, paid: paid.count ?? 0 };
      })),
    ]);
    if (result.error || meetings.error) throw new Error("Kayıtlar okunamadı.");
    const notificationResult = result.data?.length ? await client.from("group_event_whatsapp_notifications").select("registration_id,status").in("registration_id", result.data.map(row => row.id)) : { data: [], error: null };
    if (notificationResult.error) throw new Error("WhatsApp durumları okunamadı.");
    const rows = result.data?.map(row => ({ ...row, whatsapp_status: notificationResult.data?.find(notification => notification.registration_id === row.id)?.status ?? null }));
    return NextResponse.json({ rows, total: result.count, offset, counts, meetings: meetings.data, whatsappConfigured: whatsappConfigured(), configuredProducts: groupEvents.filter(event => eventProductId(event.id)).map(event => event.id), emailConfigured: !!process.env.RESEND_API_KEY && !!process.env.GROUP_EVENT_EMAIL_FROM }, { headers: noStore });
  } catch { return NextResponse.json({ error: "Grup kayıtları yüklenemedi. Sunucu ayarlarını ve yeni veri tabanı geçişini kontrol et." }, { status: 503, headers: noStore }); }
}

export async function POST(request: Request) {
  try { requireSameOrigin(request); } catch { return NextResponse.json({ error: "Geçersiz istek." }, { status: 403 }); }
  const { access } = await resolveAdminRequest(request);
  if (access.status !== "ok") return NextResponse.json({ error: "Yetkisiz işlem." }, { status: 401 });
  let body: Record<string, unknown>;
  try { body = JSON.parse(await readLimitedBody(request, 4000)); if (!body || typeof body !== "object") throw new Error(); }
  catch { return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 }); }
  try {
    if (body.action === "save-meeting") {
      if (!findGroupEvent(body.eventId) || !isGoogleMeetUrl(body.meetUrl)) return NextResponse.json({ error: "Etkinlik ve Google Meet bağlantısını kontrol et." }, { status: 400 });
      const { error } = await groupService().from("group_event_private").upsert({ event_id: body.eventId, meet_url: body.meetUrl, updated_at: new Date().toISOString() });
      if (error) throw new Error("Katılım bağlantısı kaydedilemedi.");
      return NextResponse.json({ message: "Google Meet bağlantısı kaydedildi." }, { headers: noStore });
    }
    if (typeof body.registrationId !== "string" || !/^[0-9a-f-]{36}$/i.test(body.registrationId)) return NextResponse.json({ error: "Geçersiz kayıt." }, { status: 400 });
    if (body.action === "approve-registration") {
      const { data: row, error } = await groupService().from("group_event_registrations").select("payment_method,provider_order_id").eq("id", body.registrationId).maybeSingle();
      if (error || !row) throw new Error("Kayıt bulunamadı.");
      let amount: number | null = null, transactionHash: string | null = null;
      if (row.payment_method === "bank_transfer") {
        if (body.confirmedInBank !== true || typeof body.transactionReference !== "string" || !/^[\p{L}\p{N} ._/-]{4,100}$/u.test(body.transactionReference)) return NextResponse.json({ error: "Banka hareketindeki işlem numarasını ve hesaba geçen tutarı kontrol et; banka kontrolünü işaretle." }, { status: 400 });
        amount = moneyToKurus(body.receivedAmount);
        transactionHash = tokenHash(body.transactionReference.trim().toUpperCase().replace(/\s+/g, ""));
        if (amount === null) return NextResponse.json({ error: "Hesaba geçen tutarı 850.00 biçiminde yaz." }, { status: 400 });
      } else {
        if (!row.provider_order_id) return NextResponse.json({ error: "Önce Shopier ödemesini doğrula." }, { status: 422 });
        const payment = await reconcileOrder(row.provider_order_id, body.registrationId);
        if (!payment.matched) return NextResponse.json({ error: payment.reason }, { status: 422 });
      }
      const { error: approvalError } = await groupService().rpc("group_event_approve_registration", { p_id: body.registrationId, p_actor: access.actor.id, p_amount: amount, p_transaction_hash: transactionHash });
      if (approvalError) throw new Error("Onay kaydedilemedi. Tutarı, işlem numarasını ve önceki onayları kontrol et.");
      let messageStatus = "unknown";
      try { messageStatus = (await sendApprovalWhatsApp(body.registrationId)).status; } catch { /* Payment remains approved; notification can be checked separately. */ }
      return NextResponse.json({ message: messageStatus === "accepted" ? "Kayıt onaylandı. WhatsApp mesajı gönderim için Meta tarafından kabul edildi." : messageStatus === "no-consent" ? "Kayıt onaylandı. Katılımcı WhatsApp izni vermediği için mesaj gönderilmedi." : "Kayıt onaylandı. WhatsApp mesaj durumunu kontrol et; bağlantı eksikse mesaj kuyrukta bekler." }, { headers: noStore });
    }
    if (body.action === "send-whatsapp") {
      const result = await sendApprovalWhatsApp(body.registrationId);
      return NextResponse.json({ message: result.status === "accepted" ? "Mesaj Meta tarafından kabul edildi; teslimat garantisi değildir." : `Mesaj durumu: ${result.status}. Otomatik tekrar gönderim yapılmaz.` }, { headers: noStore });
    }
    if (body.action === "verify-payment") {
      if (typeof body.orderId !== "string" || !/^[0-9]{1,30}$/.test(body.orderId)) return NextResponse.json({ error: "Shopier sipariş numarasını kontrol et." }, { status: 400 });
      const result = await reconcileOrder(body.orderId, body.registrationId);
      return NextResponse.json({ message: result.reason }, { status: result.matched ? 200 : 422, headers: noStore });
    }
    if (body.action === "send-confirmation") {
      const result = await sendGroupConfirmation(body.registrationId);
      return NextResponse.json({ message: result.alreadySent ? "Kayıt onayı daha önce gönderilmiş." : "Kayıt onayı katılımcının e-posta adresine gönderildi." }, { headers: noStore });
    }
    return NextResponse.json({ error: "Geçersiz işlem." }, { status: 400 });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "İşlem tamamlanamadı." }, { status: 503, headers: noStore }); }
}
