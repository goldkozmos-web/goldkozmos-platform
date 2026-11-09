import assert from "node:assert/strict";
import test from "node:test";
import { createHmac } from "node:crypto";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
import { groupEvents, formatGroupEventDate } from "../src/data/groupEvents.ts";
import { parseGroupRegistration, isGoogleMeetUrl } from "../src/lib/group-events/validation.ts";
import { moneyToKurus, verifyEventOrder, verifyShopierSignature, type ShopierOrder } from "../src/lib/group-events/payment.ts";

const event = groupEvents[0], registeredAt = "2026-11-09T18:00:00Z", now = Date.parse(registeredAt);
const valid = { eventId: event.id, fullName: "Örnek Katılımcı", email: " TEST@example.com ", phone: "+90 (555) 000-00-00", privacyAcknowledged: true, termsAccepted: true };
const order = (): ShopierOrder => ({ id: "12345", paymentStatus: "paid", currency: "TRY", dateCreated: "2026-11-09T18:05:00Z", shippingInfo: { email: "test@example.com" }, totals: { total: "600.00" }, lineItems: [{ productId: "999", quantity: 1, price: "600.00", total: "600.00" }] });

test("four supplied event dates preserve Turkey time and weekdays", () => {
  assert.equal(groupEvents.length, 4);
  assert.deepEqual(groupEvents.map(item => formatGroupEventDate(item.startsAt)), ["14 Kasım Cumartesi", "17 Kasım Salı", "20 Kasım Cuma", "22 Kasım Pazar"]);
  assert(groupEvents.every(item => item.startsAt.endsWith("T20:30:00+03:00")));
});
test("registration validates required identity, selected event and both acknowledgements", () => {
  const parsed = parseGroupRegistration({ ...valid, amount: 1, paymentStatus: "paid" }, now);
  assert.equal(parsed.email, "test@example.com"); assert.equal(parsed.phone, "+905550000000");
  for (const patch of [{ eventId: "unknown" }, { fullName: "Tekad" }, { email: "not-email" }, { phone: "12" }, { privacyAcknowledged: false }, { termsAccepted: "true" }, { website: "bot" }]) assert.throws(() => parseGroupRegistration({ ...valid, ...patch }, now));
  assert.throws(() => parseGroupRegistration(valid, Date.parse(event.startsAt)));
});
test("money parsing rejects decimal ambiguity, negative values, exponent and rounded underpayment", () => {
  assert.equal(moneyToKurus("600.00"), 60000); assert.equal(moneyToKurus("600"), 60000);
  for (const value of [600, "600,00", "6e2", "-600", "599.999", "Infinity", "600.000", " 600.00"]) assert.equal(moneyToKurus(value), null);
});
test("only signed raw Shopier payload is accepted; tampered body and signatures fail", () => {
  const body = JSON.stringify(order()), secret = "test-only-webhook-token";
  const sign = createHmac("sha256", secret).update(body);
  assert(verifyShopierSignature(body, sign.digest("base64"), secret));
  assert(verifyShopierSignature(body, createHmac("sha256", secret).update(body).digest("hex"), secret));
  assert(!verifyShopierSignature(body + " ", createHmac("sha256", secret).update(body).digest("base64"), secret));
  assert(!verifyShopierSignature(body, "bad", secret)); assert(!verifyShopierSignature(body, null, secret)); assert(!verifyShopierSignature(body, "0".repeat(64), secret));
});
test("a receipt must match paid status, exact product, amount, currency, email and registration time", () => {
  const verify = (data: ShopierOrder) => verifyEventOrder(data, event, "999", "test@example.com", registeredAt);
  assert(verify(order()));
  for (const patch of [{ paymentStatus: "unpaid" }, { currency: "USD" }, { totals: { total: "599.99" } }, { shippingInfo: { email: "other@example.com" } }, { dateCreated: "2026-11-08T18:00:00Z" }, { dateCreated: "2026-11-14T20:30:00+03:00" }, { refunds: [{ status: "succeeded" }] }, { refunds: [{ status: "pending" }] }, { lineItems: [{ productId: "998", quantity: 1, price: "600.00", total: "600.00" }] }, { lineItems: [{ productId: "999", quantity: 2, price: "300.00", total: "600.00" }] }]) assert(!verify({ ...order(), ...patch }));
});
test("meeting URLs cannot point to arbitrary third-party hosts or carry query injection", () => {
  assert(isGoogleMeetUrl("https://meet.google.com/abc-defg-hij"));
  for (const value of ["https://meet.google.com.evil.example/abc-defg-hij", "javascript:alert(1)", "http://meet.google.com/abc-defg-hij", "https://meet.google.com/abc-defg-hij?next=evil"]) assert(!isGoogleMeetUrl(value));
});

test("real SQL migration protects personal data, duplicate payment and concurrent callback state", async () => {
  const db = new PGlite();
  try {
    await db.exec("create role anon; create role authenticated; create role service_role bypassrls;");
    await db.exec(await readFile(new URL("../supabase/migrations/20261109210000_group_event_registration.sql", import.meta.url), "utf8"));
    await db.exec("set role anon;");
    await assert.rejects(() => db.query("select * from public.group_event_registrations"), /permission denied/);
    await assert.rejects(() => db.query("select * from public.group_event_private"), /permission denied/);
    await assert.rejects(() => db.query("select public.group_event_confirm_payment(gen_random_uuid(),'1',now())"), /permission denied/);
    await db.exec("reset role; set role service_role;");
    const inserted = await db.query<{ id: string }>(`insert into public.group_event_registrations(event_id,event_title,full_name,email,phone,access_token_hash,consent_version,privacy_acknowledged_at,terms_accepted_at) values ($1,$2,'Test Katılımcı','test@example.com','+905550000000',$3,'test',now(),now()) returning id`, [event.id, event.title, "a".repeat(64)]);
    const id = inserted.rows[0].id;
    const confirm = () => db.query<{ ok: boolean }>("select public.group_event_confirm_payment($1,'12345',now()) as ok", [id]);
    const results = await Promise.all([confirm(), confirm(), confirm()]);
    assert(results.every(result => result.rows[0].ok));
    const paid = await db.query<{ payment_status: string; provider_order_id: string }>("select payment_status,provider_order_id from public.group_event_registrations where id=$1", [id]);
    assert.equal(paid.rows[0].payment_status, "paid"); assert.equal(paid.rows[0].provider_order_id, "12345");
    const differentOrder = await db.query<{ ok: boolean }>("select public.group_event_confirm_payment($1,'99999',now()) as ok", [id]);
    assert.equal(differentOrder.rows[0].ok, false);
    await assert.rejects(() => db.query(`insert into public.group_event_registrations(event_id,event_title,full_name,email,phone,access_token_hash,consent_version,privacy_acknowledged_at,terms_accepted_at) values ($1,$2,'Test Katılımcı','test@example.com','+905550000000',$3,'test',now(),now())`, [event.id,event.title,"b".repeat(64)]), /unique/);
    const attempts = await Promise.all(Array.from({ length: 10 }, () => db.query<{ ok: boolean }>("select public.group_event_take_rate_limit('bucket',8,now()+interval '1 hour') as ok")));
    assert.equal(attempts.filter(result => result.rows[0].ok).length, 8);
    await db.exec("reset role; set role authenticated;");
    await assert.rejects(() => db.query("select * from public.group_event_registrations"), /permission denied/);
    await assert.rejects(() => db.query("select * from public.group_event_private"), /permission denied/);
  } finally { await db.close(); }
});

const base = process.env.GROUP_EVENT_TEST_BASE_URL;
test("running app denies unsafe origin and unavailable payments, protects admin and private status", { skip: !base }, async () => {
  let response = await fetch(`${base}/api/group-events/registrations`, { method: "POST", headers: { "Content-Type": "application/json", Origin: "https://evil.example" }, body: JSON.stringify(valid) });
  assert.equal(response.status, 403);
  response = await fetch(`${base}/api/group-events/registrations`, { method: "POST", headers: { "Content-Type": "application/json", Origin: base! }, body: JSON.stringify(valid) });
  assert.equal(response.status, 503);
  response = await fetch(`${base}/api/group-events/registrations/00000000-0000-4000-8000-000000000000?paid=true`);
  assert.equal(response.status, 401);
  response = await fetch(`${base}/api/admin/group-events`); assert.equal(response.status, 401);
  response = await fetch(`${base}/api/group-events/shopier/webhook`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "success", amount: 600 }) });
  assert.equal(response.status, 503);
});
