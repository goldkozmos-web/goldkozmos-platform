import { createHash, createHmac } from "node:crypto";
import { createSupabaseServiceClient } from "../supabase/service";
import { findGroupEvent, groupEvents } from "../../data/groupEvents";
import { verifyEventOrder, getShopierOrder } from "./payment";

export function registrationCookie(id: string) { return `gk_group_${id}`; }
export function tokenHash(value: string) { return createHash("sha256").update(value).digest("hex"); }
export function eventProductId(eventId: string) {
  const event = findGroupEvent(eventId);
  const id = event ? process.env[event.productEnv]?.trim() : "";
  return id && /^[0-9]{1,30}$/.test(id) ? id : null;
}
export function registrationEnabled(eventId: string) {
  const product = eventProductId(eventId);
  // Product IDs must be unique to a single event to prevent a payment matching two dates.
  return process.env.GROUP_EVENTS_ENABLED === "true" && !!product &&
    groupEvents.filter(event => eventProductId(event.id) === product).length === 1 &&
    !!process.env.SHOPIER_PAT && !!process.env.SHOPIER_WEBHOOK_TOKEN &&
    (process.env.GROUP_EVENT_RATE_SECRET?.length ?? 0) >= 32 && !!createSupabaseServiceClient();
}
export function groupService() {
  const client = createSupabaseServiceClient();
  if (!client) throw new Error("Kayıt sistemi henüz kullanıma açılmadı.");
  return client;
}
export async function readLimitedBody(request: Request, limit: number) {
  if (Number(request.headers.get("content-length") ?? 0) > limit) throw new Error("İstek çok büyük.");
  const reader = request.body?.getReader();
  if (!reader) return "";
  const parts: Uint8Array[] = []; let size = 0;
  try { while (true) {
    const { done, value } = await reader.read(); if (done) break;
    size += value.byteLength;
    if (size > limit) { await reader.cancel(); throw new Error("İstek çok büyük."); }
    parts.push(value);
  } } finally { reader.releaseLock(); }
  return Buffer.concat(parts).toString("utf8");
}
export function requireSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) throw new Error("Geçersiz istek kaynağı.");
  const parsed = new URL(origin);
  const host = request.headers.get("host") ?? new URL(request.url).host;
  const localHttp = process.env.NODE_ENV !== "production" && parsed.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(parsed.hostname);
  if (parsed.host !== host || (parsed.protocol !== "https:" && !localHttp)) throw new Error("Geçersiz istek kaynağı.");
}
export async function limitRegistrations(request: Request) {
  const secret = process.env.GROUP_EVENT_RATE_SECRET;
  if (!secret) throw new Error("Kayıt sistemi kullanılamıyor.");
  const hour = Math.floor(Date.now() / 3_600_000);
  const ip = (request.headers.get("x-vercel-forwarded-for") ?? request.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  const bucket = createHmac("sha256", secret).update(`${hour}:${ip}`).digest("hex");
  const { data, error } = await groupService().rpc("group_event_take_rate_limit", { p_bucket: bucket, p_limit: 8, p_expires_at: new Date((hour + 1) * 3_600_000).toISOString() });
  if (error) throw new Error("Kayıt sistemi kullanılamıyor.");
  return data === true;
}

export async function reconcileOrder(orderId: string, expectedRegistrationId?: string) {
  const order = await getShopierOrder(orderId);
  const productId = order.lineItems?.[0]?.productId;
  const event = groupEvents.find(item => eventProductId(item.id) === productId);
  if (!event) return { matched: false, reason: "Etkinlik ürünü bulunamadı." };
  const client = groupService();
  const email = order.shippingInfo?.email?.trim().toLowerCase();
  if (!email) return { matched: false, reason: "Sipariş e-postası doğrulanamadı." };
  const { data: registration, error } = await client.from("group_event_registrations").select("id,email,created_at,payment_status,provider_order_id").eq("event_id", event.id).eq("email", email).maybeSingle();
  if (error) throw new Error("Kayıt bilgileri doğrulanamadı.");
  if (!registration || (expectedRegistrationId && registration.id !== expectedRegistrationId)) return { matched: false, reason: "Sipariş ile eşleşen başvuru yok." };
  if (!verifyEventOrder(order, event, productId!, registration.email, registration.created_at)) return { matched: false, reason: "Tutar, etkinlik, e-posta, tarih veya ödeme durumu eşleşmiyor." };
  const { data, error: confirmedError } = await client.rpc("group_event_confirm_payment", { p_id: registration.id, p_order_id: order.id, p_paid_at: new Date(order.dateCreated).toISOString() });
  if (confirmedError) throw new Error("Ödeme sonucu kaydedilemedi.");
  return { matched: data === true, registrationId: registration.id, reason: data === true ? "Ödeme doğrulandı." : "Kayıt daha önce farklı bir işlemle tamamlanmış." };
}
