import { createHmac, timingSafeEqual } from "node:crypto";
import type { GroupEvent } from "../../data/groupEvents.ts";
import { GROUP_EVENT_PRICE_KURUS } from "../../data/groupEvents.ts";

export type ShopierOrder = {
  id: string; paymentStatus: string; currency: string; dateCreated: string;
  shippingInfo: { email: string };
  totals: { total: string; discount?: string; shipping?: string };
  lineItems: { productId: string; quantity: number; price: string; total: string }[];
  refunds?: { status: string }[];
};

export function moneyToKurus(value: unknown) {
  if (typeof value !== "string" || !/^\d{1,9}(\.\d{1,2})?$/.test(value)) return null;
  const [whole, decimal = ""] = value.split(".");
  return Number(whole) * 100 + Number(decimal.padEnd(2, "0"));
}

export function verifyShopierSignature(body: string, signature: string | null, token: string) {
  if (!token || !signature) return false;
  const expected = createHmac("sha256", token).update(body, "utf8").digest();
  const received = /^[a-f0-9]{64}$/i.test(signature) ? Buffer.from(signature, "hex")
    : /^[A-Za-z0-9+/]{43}=$/.test(signature) ? Buffer.from(signature, "base64") : Buffer.alloc(0);
  return received.length === expected.length && timingSafeEqual(received, expected);
}

export function verifyEventOrder(order: ShopierOrder, event: GroupEvent, productId: string, email: string, registeredAt: string) {
  if (!order || !/^[0-9]+$/.test(order.id) || order.paymentStatus !== "paid" || order.currency !== "TRY") return false;
  if (!Array.isArray(order.lineItems) || order.lineItems.length !== 1) return false;
  const item = order.lineItems[0];
  if (item.productId !== productId || item.quantity !== 1 || moneyToKurus(item.price) !== GROUP_EVENT_PRICE_KURUS || moneyToKurus(item.total) !== GROUP_EVENT_PRICE_KURUS) return false;
  if (moneyToKurus(order.totals?.total) !== GROUP_EVENT_PRICE_KURUS) return false;
  if (order.refunds?.some(refund => refund.status === "pending" || refund.status === "succeeded")) return false;
  if (order.shippingInfo?.email?.trim().toLowerCase() !== email.trim().toLowerCase()) return false;
  const paidAt = Date.parse(order.dateCreated), createdAt = Date.parse(registeredAt);
  return Number.isFinite(paidAt) && Number.isFinite(createdAt) && paidAt >= createdAt - 1000 && paidAt < Date.parse(event.startsAt);
}

export async function getShopierOrder(orderId: string) {
  if (!/^[0-9]{1,30}$/.test(orderId) || !process.env.SHOPIER_PAT) throw new Error("Ödeme doğrulaması yapılandırılmadı.");
  const response = await fetch(`https://api.shopier.com/v1/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${process.env.SHOPIER_PAT}`, Accept: "application/json" },
    cache: "no-store", signal: AbortSignal.timeout(3500),
  });
  if (!response.ok) throw new Error("Ödeme sağlayıcısına ulaşılamadı.");
  const order = await response.json() as ShopierOrder;
  if (order.id !== orderId) throw new Error("Sipariş doğrulanamadı.");
  return order;
}
