import { groupEventSelection, formatGroupEventDate, formatGroupPrice } from "../../data/groupEvents";
import { selectionProductId, groupService } from "./server";
import { getShopierOrder, verifyEventOrder } from "./payment";
import { isGoogleMeetUrl } from "./validation";

export async function sendGroupConfirmation(registrationId: string) {
  if (!process.env.RESEND_API_KEY || !process.env.GROUP_EVENT_EMAIL_FROM) throw new Error("E-posta gönderimi henüz yapılandırılmadı.");
  const client = groupService();
  const { data: row, error } = await client.from("group_event_registrations").select("id,event_id,event_ids,email,full_name,created_at,payment_status,provider_order_id,confirmation_sent_at").eq("id", registrationId).maybeSingle();
  if (error || !row) throw new Error("Kayıt bulunamadı.");
  if (row.payment_status !== "paid" || !row.provider_order_id) throw new Error("Yalnızca ödemesi doğrulanmış kayıt için onay gönderilebilir.");
  if (row.confirmation_sent_at) return { alreadySent: true };
  const selection = groupEventSelection(row.event_ids), productId = selectionProductId(selection.events.map(event => event.id));
  if (!productId) throw new Error("Etkinlik yapılandırması eksik.");
  const order = await getShopierOrder(row.provider_order_id);
  if (!verifyEventOrder(order, selection.events, productId, row.email, row.created_at)) throw new Error("Ödeme artık doğrulanamıyor. Siparişin iade ve ödeme durumunu kontrol et.");
  const { data: meetings, error: meetingError } = await client.from("group_event_private").select("event_id,meet_url").in("event_id", selection.events.map(event => event.id));
  if (meetingError || selection.events.some(event => !isGoogleMeetUrl(meetings?.find(meeting => meeting.event_id === event.id)?.meet_url))) throw new Error("Önce seçilen tüm etkinliklerin Google Meet bağlantılarını kaydet.");
  const eventDetails = selection.events.map(event => `${event.title}\nTarih: ${formatGroupEventDate(event.startsAt)} 2026\nSaat: 20.30 (Türkiye saati)\nKatılım bağlantın: ${meetings!.find(meeting => meeting.event_id === event.id)!.meet_url}`).join("\n\n");
  const title = selection.events.length === 1 ? selection.events[0].title : `${selection.events.length} etkinlik paketi`;
  const now = new Date().toISOString();
  const { data: claimed, error: claimError } = await client.from("group_event_registrations").update({ email_claimed_until: new Date(Date.now() + 300_000).toISOString() }).eq("id", row.id).eq("payment_status", "paid").is("confirmation_sent_at", null).or(`email_claimed_until.is.null,email_claimed_until.lt.${now}`).select("id").maybeSingle();
  if (claimError || !claimed) throw new Error("Onay gönderimi zaten sürüyor. Biraz sonra tekrar kontrol et.");
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST", headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json", "Idempotency-Key": `goldkozmos-group-${row.id}` },
      body: JSON.stringify({ from: process.env.GROUP_EVENT_EMAIL_FROM, to: [row.email], subject: `${title} — GoldKozmos kayıt onayın`,
        text: `Merhaba ${row.full_name},\n\nSeçtiğin çalışmalara kaydın ve toplam ${formatGroupPrice(selection.totalKurus)} ödemen doğrulandı.\n\n${eventDetails}\n\nFormat: Tek günlük canlı grup çalışmaları\nPlatform: Google Meet\n\nBu bağlantılar kesin kaydı bulunan katılımcılar içindir; lütfen paylaşma.\n\nGoldKozmos`, }),
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
