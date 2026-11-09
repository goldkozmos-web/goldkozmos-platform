import { groupService } from "./server";
import { approvalTemplatePayload, whatsappConfigured } from "./whatsapp-config";
export { whatsappConfigured } from "./whatsapp-config";

export async function sendApprovalWhatsApp(registrationId: string) {
  const client = groupService();
  const { data: row, error } = await client.from("group_event_registrations").select("phone,payment_status,approved_at,whatsapp_opt_in_at").eq("id", registrationId).maybeSingle();
  if (error || !row || row.payment_status !== "paid" || !row.approved_at) throw new Error("Önce ödeme ve yönetici onayı gerekli.");
  if (!row.whatsapp_opt_in_at) return { status: "no-consent" as const };
  if (!whatsappConfigured()) return { status: "not-configured" as const };
  const payload = approvalTemplatePayload(row.phone, process.env.WHATSAPP_APPROVAL_TEMPLATE!);
  const { data: claimed, error: claimError } = await client.from("group_event_whatsapp_notifications").update({ status: "sending", updated_at: new Date().toISOString() }).eq("registration_id", registrationId).in("status", ["pending", "failed"]).select("registration_id").maybeSingle();
  if (claimError) throw new Error("Mesaj kuyruğu okunamadı.");
  if (!claimed) return { status: "already-handled" as const };
  // A timeout may mean Meta accepted the message. Never retry ambiguous sends automatically.
  let state = "unknown";
  let messageId: string | null = null;
  try {
    const response = await fetch(`https://graph.facebook.com/${process.env.WHATSAPP_GRAPH_VERSION}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
      method: "POST", headers: { Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload), signal: AbortSignal.timeout(8000),
    });
    if (response.status >= 400 && response.status < 500) state = "failed";
    if (response.ok) {
      const result = await response.json();
      const id = result.messages?.[0]?.id;
      if (typeof id === "string" && id.length > 0 && id.length < 500) { state = "accepted"; messageId = id; }
    }
  } catch { /* Preserve unknown; no fake success and no automatic duplicate message. */ }
  const { error: saveError } = await client.from("group_event_whatsapp_notifications").update({ status: state, provider_message_id: messageId, updated_at: new Date().toISOString() }).eq("registration_id", registrationId).eq("status", "sending");
  if (saveError) throw new Error("Mesaj sonucu saklanamadı; yeniden göndermeden önce Meta kayıtlarını kontrol et.");
  return { status: state };
}
