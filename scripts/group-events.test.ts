import assert from "node:assert/strict";
import test from "node:test";
import { createHmac } from "node:crypto";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
import { groupEvents, formatGroupEventDate, groupEventOffers, groupEventSelection, groupEventPrice } from "../src/data/groupEvents.ts";
import { parseGroupRegistration, isGoogleMeetUrl } from "../src/lib/group-events/validation.ts";
import { moneyToKurus, verifyEventOrder, verifyShopierSignature, type ShopierOrder } from "../src/lib/group-events/payment.ts";
import { groupSetupReport } from "../src/lib/group-events/setup.ts";
import { normalizeTurkishIban, bankPaymentDetails, whatsappPhone, APPROVAL_WHATSAPP_TEXT } from "../src/lib/group-events/bank.ts";
import { approvalTemplatePayload } from "../src/lib/group-events/whatsapp-config.ts";

const event = groupEvents[0], registeredAt = "2026-11-09T18:00:00Z", now = Date.parse(registeredAt);
const valid = { eventId: event.id, fullName: "Örnek Katılımcı", email: " TEST@example.com ", phone: "+90 (555) 000-00-00", privacyAcknowledged: true, termsAccepted: true };
const order = (): ShopierOrder => ({ id: "12345", paymentStatus: "paid", currency: "TRY", dateCreated: "2026-11-09T18:05:00Z", shippingInfo: { email: "test@example.com" }, totals: { total: "600.00" }, lineItems: [{ productId: "999", quantity: 1, price: "600.00", total: "600.00" }] });

test("setup check reports missing or duplicated products without exposing credentials", () => {
  const empty = groupSetupReport({});
  assert(!empty.enabled && !empty.allConfigured);
  assert(empty.products.every(product => !product.ready));
  const env: Record<string,string> = { NEXT_PUBLIC_SUPABASE_URL:"https://test.supabase.co", NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:"public-test", SUPABASE_SERVICE_ROLE_KEY:"private-test-key", SHOPIER_PAT:"private-test-pat", SHOPIER_WEBHOOK_TOKEN:"private-test-token", GROUP_EVENT_RATE_SECRET:"a".repeat(32), RESEND_API_KEY:"private-test-email", GROUP_EVENT_EMAIL_FROM:"test@example.com" };
  Object.assign(env, { WHATSAPP_ACCESS_TOKEN:"private-test-wa", WHATSAPP_PHONE_NUMBER_ID:"12345", WHATSAPP_GRAPH_VERSION:"v24.0", WHATSAPP_APPROVAL_TEMPLATE:"test_approval", WHATSAPP_APPROVAL_TEMPLATE_READY:"true" });
  groupEventOffers.forEach((offer, index) => { env[offer.productEnv] = String(index + 100); });
  const ready = groupSetupReport(env);
  assert(ready.allConfigured && !ready.enabled);
  assert(!JSON.stringify(ready).includes("private-test"));
  env[groupEventOffers[1].productEnv] = env[groupEventOffers[0].productEnv];
  const duplicate = groupSetupReport(env);
  assert(!duplicate.allConfigured);
  assert(!duplicate.products[0].ready && !duplicate.products[1].ready);
});

test("bank details require a real checksum; WhatsApp payload uses approved template without meeting URLs", () => {
  const iban = "TR33 0006 1005 1978 6457 8413 26";
  assert(normalizeTurkishIban(iban));
  assert(!normalizeTurkishIban(iban.replace("TR33","TR34")));
  assert(!bankPaymentDetails({GROUP_EVENT_BANK_IBAN:iban}));
  assert(bankPaymentDetails({GROUP_EVENT_BANK_IBAN:iban,GROUP_EVENT_BANK_ACCOUNT_NAME:"Test Account"}));
  assert.equal(whatsappPhone("0555 000 00 00"),"905550000000");
  assert.equal(whatsappPhone("+90 (555) 000-00-00"),"905550000000");
  assert.throws(()=>approvalTemplatePayload("12","approval"));
  const payload=approvalTemplatePayload("05550000000","gk_approval");
  assert.equal(payload.template.language.code,"tr");
  assert.equal(payload.type,"template");
  assert(!JSON.stringify(payload).includes("meet.google.com"));
  assert(APPROVAL_WHATSAPP_TEXT.includes("iletilecektir"));
  const parsed=parseGroupRegistration({...valid,paymentMethod:"bank_transfer",whatsappOptIn:true},now);
  assert(parsed.whatsappOptIn && parsed.paymentMethod==="bank_transfer");
  assert.throws(()=>parseGroupRegistration({...valid,paymentMethod:"fake"},now));
});

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

test("all fifteen selections use owner-specified totals and ignore browser prices", () => {
  assert.equal(groupEventOffers.length, 15);
  assert.equal(new Set(groupEventOffers.map(offer => offer.productEnv)).size, 15);
  assert.deepEqual([1,2,3,4].map(count => groupEventPrice(count).totalKurus), [60000,85000,155000,200000]);
  for (const offer of groupEventOffers) {
    const ids = offer.events.map(event => event.id);
    const parsed = parseGroupRegistration({ ...valid, eventIds: [...ids].reverse(), amountKurus: 1, discount: 999999 }, now);
    assert.equal(parsed.selection.totalKurus, offer.totalKurus);
    assert.equal(parsed.selection.key, offer.key);
    const price = (offer.totalKurus / 100).toFixed(2);
    const paid = { ...order(), totals: { total: price }, lineItems: [{ productId: "999", quantity: 1, price, total: price }] };
    assert(verifyEventOrder(paid, offer.events, "999", "test@example.com", registeredAt));
    assert(!verifyEventOrder({ ...paid, totals: { total: "0.01" } }, offer.events, "999", "test@example.com", registeredAt));
    assert(!verifyEventOrder({ ...paid, lineItems: [{ ...paid.lineItems[0], productId: "wrong-package" }] }, offer.events, "999", "test@example.com", registeredAt));
  }
  for (const ids of [[], [event.id,event.id], [event.id,"unknown"], [null], "all"]) assert.throws(() => groupEventSelection(ids));
  assert.throws(() => parseGroupRegistration({ ...valid, eventIds: [groupEvents[0].id,groupEvents[3].id] }, Date.parse(groupEvents[0].startsAt)));
});

test("package migration preserves old registrations, rejects overlap and prices, confirms all selected events once", async () => {
  const db = new PGlite();
  try {
    await db.exec("create role anon; create role authenticated; create role service_role bypassrls;");
    await db.exec(await readFile(new URL("../supabase/migrations/20261109210000_group_event_registration.sql", import.meta.url), "utf8"));
    const insert = (ids: string[], amount: number, email: string) => db.query<{id:string}>(`insert into public.group_event_registrations(event_id,event_ids,event_title,full_name,email,phone,amount_kurus,access_token_hash,consent_version,privacy_acknowledged_at,terms_accepted_at) values ($1,$2,'Test package','Test Katılımcı',$3,'+905550000000',$4,$5,'test',now(),now()) returning id`, [ids[0],ids,email,amount,"a".repeat(64)]);
    await db.query(`insert into public.group_event_registrations(event_id,event_title,full_name,email,phone,access_token_hash,consent_version,privacy_acknowledged_at,terms_accepted_at) values ($1,'Legacy','Test Katılımcı','legacy@example.com','+905550000000',$2,'v1',now(),now())`, [event.id,"b".repeat(64)]);
    await db.exec(await readFile(new URL("../supabase/migrations/20261109230000_group_event_packages.sql", import.meta.url), "utf8"));
    const legacy = await db.query<{event_ids:string[];amount_kurus:number}>("select event_ids,amount_kurus from public.group_event_registrations where email='legacy@example.com'");
    assert.deepEqual(legacy.rows[0], {event_ids:[event.id],amount_kurus:60000});
    await db.exec("set role service_role;");
    for (const offer of groupEventOffers) {
      const ids = offer.events.map(item => item.id), email = `package-${offer.key}@example.com`;
      const row = await insert(ids,offer.totalKurus,email);
      const id = row.rows[0].id;
      const confirmed = await db.query<{ok:boolean}>("select public.group_event_confirm_payment($1,$2,now()) as ok", [id,`500${offer.key}`]);
      assert(confirmed.rows[0].ok);
      assert((await db.query<{ok:boolean}>("select public.group_event_confirm_payment($1,$2,now()) as ok", [id,`500${offer.key}`])).rows[0].ok);
      await assert.rejects(() => insert([ids[ids.length-1]],60000,email), /already registered|unique/);
      await assert.rejects(() => insert(ids,1,`bad-${email}`), /Invalid package total/);
    }
    await assert.rejects(() => insert([event.id,event.id],85000,"duplicate@example.com"), /Invalid event selection/);
    await assert.rejects(() => insert([event.id,"unknown"],85000,"invalid@example.com"), /Invalid event selection/);
    const counts = await db.query<{total:number}>("select count(*)::integer as total from public.group_event_registrations where event_ids @> array[$1] and payment_status='paid'", [event.id]);
    assert.equal(counts.rows[0].total,8);
    await db.exec("reset role; set role anon;");
    await assert.rejects(() => db.query("select event_ids from public.group_event_registrations"), /permission denied/);
  } finally { await db.close(); }
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
test("bank approval requires exact money and admin, queues one consented WhatsApp message only after approval", async () => {
  const db=new PGlite();
  try {
    await db.exec("create role anon; create role authenticated; create role service_role bypassrls;");
    for(const file of ["20261109210000_group_event_registration.sql","20261109230000_group_event_packages.sql","20261110010000_group_bank_approval_whatsapp.sql"]) await db.exec(await readFile(new URL(`../supabase/migrations/${file}`,import.meta.url),"utf8"));
    const insert=async(email:string,consent:boolean,method="bank_transfer")=>(await db.query<{id:string}>(`insert into public.group_event_registrations(event_id,event_title,full_name,email,phone,access_token_hash,consent_version,privacy_acknowledged_at,terms_accepted_at,payment_method,whatsapp_opt_in_at) values($1,'Test','Test Katılımcı',$2,'+905550000000',$3,'v3',now(),now(),$4,case when $5 then now() else null end) returning id`,[event.id,email,"a".repeat(64),method,consent])).rows[0].id;
    await db.exec("set role service_role;");
    const id=await insert("bank@example.com",true), actor="00000000-0000-4000-8000-000000000001", hash="b".repeat(64);
    assert.equal((await db.query<{n:number}>("select count(*)::integer as n from public.group_event_whatsapp_notifications")).rows[0].n,0);
    await assert.rejects(()=>db.query("select public.group_event_approve_registration($1,null,60000,$2)",[id,hash]),/Administrator required/);
    await assert.rejects(()=>db.query("select public.group_event_approve_registration($1,$2,1,$3)",[id,actor,hash]),/exact amount/);
    assert(!(await db.query<{ok:boolean}>("select public.group_event_confirm_payment($1,'1234',now()) as ok",[id])).rows[0].ok);
    assert((await db.query<{ok:boolean}>("select public.group_event_approve_registration($1,$2,60000,$3) as ok",[id,actor,hash])).rows[0].ok);
    assert(!(await db.query<{ok:boolean}>("select public.group_event_approve_registration($1,$2,60000,$3) as ok",[id,actor,hash])).rows[0].ok);
    const notifications=await db.query<{status:string}>("select status from public.group_event_whatsapp_notifications where registration_id=$1",[id]);
    assert.deepEqual(notifications.rows,[{status:"pending"}]);
    const noConsentId=await insert("other@example.com",false);
    await assert.rejects(()=>db.query("select public.group_event_approve_registration($1,$2,60000,$3)",[noConsentId,actor,hash]),/unique/);
    await db.query("select public.group_event_approve_registration($1,$2,60000,$3)",[noConsentId,actor,"c".repeat(64)]);
    assert.equal((await db.query<{n:number}>("select count(*)::integer as n from public.group_event_whatsapp_notifications where registration_id=$1",[noConsentId])).rows[0].n,0);
    const card=await insert("card@example.com",true,"shopier");
    await assert.rejects(()=>db.query("select public.group_event_approve_registration($1,$2)",[card,actor]),/Verified payment required/);
    await db.query("select public.group_event_confirm_payment($1,'5678',now())",[card]);
    assert.equal((await db.query<{n:number}>("select count(*)::integer as n from public.group_event_whatsapp_notifications where registration_id=$1",[card])).rows[0].n,0);
    await db.query("select public.group_event_approve_registration($1,$2)",[card,actor]);
    const first=await db.query("update public.group_event_whatsapp_notifications set status='sending' where registration_id=$1 and status in ('pending','failed') returning registration_id",[card]);
    const duplicate=await db.query("update public.group_event_whatsapp_notifications set status='sending' where registration_id=$1 and status in ('pending','failed') returning registration_id",[card]);
    assert.equal(first.rows.length,1);assert.equal(duplicate.rows.length,0);
    await db.exec("reset role; set role anon;");
    await assert.rejects(()=>db.query("select public.group_event_approve_registration($1,$2,60000,$3)",[id,actor,hash]),/permission denied/);
    await assert.rejects(()=>db.query("select * from public.group_event_whatsapp_notifications"),/permission denied/);
  } finally { await db.close(); }
});

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
