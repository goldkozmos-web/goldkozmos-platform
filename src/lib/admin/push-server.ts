import webpush from "web-push";

import { createSupabaseAnonClient } from "../supabase/anon";
import { createSupabaseServiceClient } from "../supabase/service";
import { isMemberVisitorKey } from "./member-keys";
import { shouldSkipPresencePath } from "../presence/labels";
import {
  parsePushSub,
  PUSH_SUB_POST,
  VAPID_PRIVATE_KEY,
  VAPID_PUBLIC_KEY,
  VAPID_SUBJECT,
} from "./push";

webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

export async function sendAdminPush(alert: { title: string; body: string; url?: string }, endpoint?: string) {
  const supabase = createSupabaseServiceClient() || createSupabaseAnonClient();
  if (!supabase) {
    return { sent: 0, failed: 0 };
  }

  const { data, error } = await supabase
    .from("comments")
    .select("id, content")
    .eq("post_id", PUSH_SUB_POST)
    .limit(100);
  if (error) { console.error("Admin push subscription lookup failed"); return { sent: 0, failed: 1 }; }

  const payload = JSON.stringify({
    title: alert.title,
    body: alert.body,
    url: alert.url || "/admin",
  });

  let sent = 0;
  let failed = 0;
  const seen = new Set<string>();
  for (const row of data ?? []) {
    const sub = parsePushSub(String((row as { content?: string }).content ?? ""));
    if (!sub || (endpoint && sub.endpoint !== endpoint) || seen.has(sub.endpoint)) continue;
    seen.add(sub.endpoint);
    try {
      await webpush.sendNotification(sub, payload, { TTL: 300, urgency: "high", timeout: 10000 });
      sent += 1;
    } catch (reason) {
      failed += 1;
      const status = typeof reason === "object" && reason !== null && "statusCode" in reason ? Number(reason.statusCode) : 0;
      console.error("Admin push delivery failed", { status });
      const id = String((row as { id?: string }).id ?? "");
      const admin = createSupabaseServiceClient();
      if (id && admin && (status === 404 || status === 410)) {
        await admin.from("comments").delete().eq("id", id);
      }
    }
  }
  return { sent, failed };
}

export async function notifyPresencePush(input: {
  kind: string;
  path: string;
  visitorKey: string;
  heartbeat: boolean;
  arrival: boolean;
}) {
  if (input.heartbeat || shouldSkipPresencePath(input.path)) {
    return;
  }

  if (input.kind === "whatsapp") {
    await sendAdminPush({ title: "WhatsApp", body: "Siteden WhatsApp’a geçiş oldu." });
    return;
  }
  if (input.kind === "purchase") {
    await sendAdminPush({ title: "Çalışma bağlantısı", body: "Siteden Shopier’e geçiş oldu.", url: "/admin/satin-almalar" });
    return;
  }
  if (input.kind === "appointment") {
    await sendAdminPush({ title: "Randevu talebi", body: "Randevu bağlantısına geçiş oldu.", url: "/admin/randevular" });
    return;
  }
  if (input.kind !== "page") {
    return;
  }

  if (!input.arrival) {
    return;
  }

  if (isMemberVisitorKey(input.visitorKey)) {
    await sendAdminPush({ title: "Yeni üye", body: "Siteye yeni bir üye kayıt oldu." });
    return;
  }

  await sendAdminPush({
    title: "Yeni ziyaretçi",
    body: input.path || "/",
  });
}

export async function sendMemberPush(
  userId: string,
  alert: { title: string; body: string; url?: string; vibration?: boolean },
  authorizedClient?: import("@supabase/supabase-js").SupabaseClient,
) {
  const admin = createSupabaseServiceClient() || authorizedClient;
  if (!admin || !userId) {
    return { sent: 0 };
  }

  const { data } = await admin.rpc("get_member_push_subscriptions", { p_user: userId });

  const payload = JSON.stringify({
    title: alert.title,
    body: alert.body,
    url: alert.url || "/profilim",
    ...(alert.vibration === undefined ? {} : { vibration: alert.vibration }),
  });

  let sent = 0;
  for (const row of data ?? []) {
    const endpoint = String(row.endpoint ?? "");
    const p256dh = String(row.p256dh ?? "");
    const auth = String(row.auth_secret ?? "");
    if (!endpoint.startsWith("https://") || !p256dh || !auth) continue;
    try {
      await webpush.sendNotification(
        { endpoint, keys: { p256dh, auth } },
        payload,
        { TTL: 300, urgency: "high", timeout: 10000 },
      );
      sent += 1;
    } catch (error) {
      const id = String(row.id ?? "");
      const status = (error as { statusCode?: number }).statusCode;
      if (id && (status === 404 || status === 410)) {
        await admin.from("push_subscriptions").delete().eq("id", id);
      }
    }
  }

  return { sent };
}
