import { findGroupEvent, formatGroupEventDate } from "../../data/groupEvents";
import { eventProductId, groupService } from "./server";
import { getShopierOrder, verifyEventOrder } from "./payment";
import { isGoogleMeetUrl } from "./validation";

export async function sendGroupConfirmation(registrationId: string) {
  if (!process.env.RESEND_API_KEY || !process.env.GROUP_EVENT_EMAIL_FROM) throw new Error("E-posta gönderimi henüz yapılandırılmadı.");
  const client = groupService();
  const { data: row, error } = await client.from("group_event_registrations").select("id,event_id,email,full_name,created_at,payment_status,provider_order_id,confirmation_sent_at").eq("id", registrationId).maybeSingle();
  if (error || !row) throw new Error("Kayıt bulunamadı.");
  if (row.payment_status !== "paid" || !row.provider_order_id) throw new Error("Yalnızca ödemesi doğrulanmış kayıt için onay gönderilebilir.");
  if (row.confirmation_sent_at) return { alreadySent: true };
  const event = findGroupEvent(row.event_id), productId = eventProductId(row.event_id);
  if (!event || !productId) throw new Error("Etkinlik yapılandırması eksik.");
  const order = await getShopierOrder(row.provider_order_id);
  if (!verifyEventOrder(order, event, productId, row.email, row.created_at)) throw new Error("Ödeme artık doğrulanamıyor. Siparişin iade ve ödeme durumunu kontrol et.");
  const { data: meeting, error: meetingError } = await client.from("group_event_private").select("meet_url").eq("event_id", event.id).maybeSingle();
  if (meetingError || !isGoogleMeetUrl(meeting?.meet_url)) throw new Error("Önce bu etkinliğin Google Meet bağlantısını kaydet.");
  const now = new Date().toISOString();
  const { data: claimed, error: claimError } = await client.from("group_event_registrations").update({ email_claimed_until: new Date(Date.now() + 300_000).toISOString() }).eq("id", row.id).eq("payment_status", "paid").is("confirmation_sent_at", null).or(`email_claimed_until.is.null,email_claimed_until.lt.${now}`).select("id").maybeSingle();
  if (claimError || !claimed) throw new Error("Onay gönderimi zaten sürüyor. Biraz sonra tekrar kontrol et.");
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST", headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json", "Idempotency-Key": `goldkozmos-group-${row.id}` },
      body: JSON.stringify({ from: process.env.GROUP_EVENT_EMAIL_FROM, to: [row.email], subject: `${event.title} — GoldKozmos kayıt onayın`,
        text: `Merhaba ${row.full_name},\n\n${event.title} çalışmasına kaydın ve 600 TL ödemen doğrulandı.\n\nTarih: ${formatGroupEventDate(event.startsAt)} 2026\nSaat: 20.30 (Türkiye saati)\nFormat: Tek günlük canlı grup çalışması\nPlatform: Google Meet\nKatılım bağlantın: ${meeting.meet_url}\n\nBu bağlantı kesin kaydı bulunan katılımcılar içindir; lütfen paylaşma.\n\nGoldKozmos`, }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error("Onay e-postası gönderilemedi. E-posta hizmetini kontrol et.");
    const { error: saved } = await client.from("group_event_registrations").update({ confirmation_sent_at: new Date().toISOString(), email_claimed_until: null }).eq("id", row.id).eq("payment_status", "paid");
    if (saved) throw new Error("Gönderim sonucu kaydedilemedi. Tekrar göndermeden önce hizmet kayıtlarını kontrol et.");
    return { alreadySent: false };
  } catch (cause) {
    await client.from("group_event_registrations").update({ email_claimed_until: null }).eq("id", row.id).is("confirmation_sent_at", null);
    throw cause;
  }
}
