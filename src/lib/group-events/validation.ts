import { groupEventSelection } from "../../data/groupEvents.ts";
import { whatsappPhone } from "./bank.ts";

export function parseGroupRegistration(raw: unknown, now = Date.now()) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new Error("Form bilgilerini kontrol et.");
  const data = raw as Record<string, unknown>;
  const selection = groupEventSelection(data.eventIds ?? [data.eventId]);
  const event = selection.events[0];
  if (selection.events.some(item => Date.parse(item.startsAt) <= now)) throw new Error("Bu etkinlik için kayıt kapalı.");
  const fullName = typeof data.fullName === "string" ? data.fullName.trim().replace(/\s+/g, " ") : "";
  const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
  const phone = typeof data.phone === "string" ? data.phone.replace(/[\s().-]/g, "") : "";
  if (fullName.length < 3 || fullName.length > 120 || !/\S+\s+\S+/.test(fullName) || /[<>\u0000-\u001f]/.test(fullName)) throw new Error("Adını ve soyadını birlikte yaz.");
  if (email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) throw new Error("Geçerli bir e-posta adresi yaz.");
  if (!/^\+?[0-9]{10,15}$/.test(phone)) throw new Error("Telefon numaranı ülke koduyla birlikte kontrol et.");
  if (data.privacyAcknowledged !== true || data.termsAccepted !== true) throw new Error("Aydınlatma metnini ve katılım koşullarını inceleyip gerekli alanları işaretle.");
  if (data.website) throw new Error("Form gönderilemedi.");
  const paymentMethod = data.paymentMethod ?? "shopier";
  if (paymentMethod !== "bank_transfer" && paymentMethod !== "shopier") throw new Error("Ödeme yöntemini kontrol et.");
  const checkoutChannel = data.checkoutChannel ?? "online";
  if (checkoutChannel !== "online" && checkoutChannel !== "whatsapp") throw new Error("Başvuru yöntemini kontrol et.");
  if (data.whatsappOptIn !== undefined && typeof data.whatsappOptIn !== "boolean") throw new Error("WhatsApp tercihini kontrol et.");
  if (data.whatsappOptIn === true && !whatsappPhone(phone)) throw new Error("WhatsApp numaranı ülke koduyla birlikte kontrol et.");
  return { event, selection, fullName, email, phone, paymentMethod, checkoutChannel, whatsappOptIn: data.whatsappOptIn === true };
}

export function isGoogleMeetUrl(value: unknown): value is string {
  return typeof value === "string" && /^https:\/\/meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}$/.test(value);
}

export function isWhatsAppInviteUrl(value: unknown): value is string {
  return typeof value === "string" && value.length <= 512 &&
    /^https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]{22}(?:\?[A-Za-z0-9_=&%-]+)?$/.test(value) &&
    value === value.trim();
}
