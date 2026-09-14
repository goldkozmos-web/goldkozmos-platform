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

export async function sendAdminPush(alert: { title: string; body: string; url?: string }) {
  const supabase = createSupabaseServiceClient() || createSupabaseAnonClient();
  if (!supabase) {
    return;
  }

  const { data } = await supabase
    .from("comments")
    .select("id, content")
    .eq("post_id", PUSH_SUB_POST)
    .limit(20);

  const payload = JSON.stringify({
    title: alert.title,
    body: alert.body,
    url: alert.url || "/admin",
  });

  for (const row of data ?? []) {
    const sub = parsePushSub(String((row as { content?: string }).content ?? ""));
    if (!sub) continue;
    try {
      await webpush.sendNotification(sub, payload);
    } catch {
      const id = String((row as { id?: string }).id ?? "");
      const admin = createSupabaseServiceClient();
      if (id && admin) {
        await admin.from("comments").delete().eq("id", id);
      }
    }
  }
}

async function isFreshVisitor(visitorKey: string) {
  const admin = createSupabaseServiceClient();
  if (!admin) {
    return false;
  }

  const { data } = await admin
    .from("site_visitors")
    .select("created_at")
    .eq("visitor_key", visitorKey)
    .maybeSingle();

  const created = Date.parse(String((data as { created_at?: string } | null)?.created_at ?? ""));
  return Number.isFinite(created) && Date.now() - created < 30_000;
}

export async function notifyPresencePush(input: {
  kind: string;
  path: string;
  visitorKey: string;
  heartbeat: boolean;
}) {
  if (input.heartbeat || shouldSkipPresencePath(input.path)) {
    return;
  }

  if (input.kind === "whatsapp") {
    await sendAdminPush({ title: "WhatsApp", body: "Siteden WhatsApp’a geçiş oldu." });
    return;
  }
  if (input.kind === "purchase") {
    await sendAdminPush({ title: "Satış", body: "Siteden Shopier’e geçiş oldu." });
    return;
  }
  if (input.kind === "appointment") {
    await sendAdminPush({ title: "Randevu", body: "Randevu Al’dan geçiş oldu." });
    return;
  }
  if (input.kind !== "page") {
    return;
  }

  const fresh = await isFreshVisitor(input.visitorKey);
  if (!fresh) {
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
  alert: { title: string; body: string; url?: string },
) {
  const admin = createSupabaseServiceClient();
  if (!admin || !userId) {
    return { sent: 0 };
  }

  const { data } = await admin
    .from("push_subscriptions")
    .select("id, endpoint, p256dh, auth_secret")
    .eq("user_id", userId)
    .limit(12);

  const payload = JSON.stringify({
    title: alert.title,
    body: alert.body,
    url: alert.url || "/profilim",
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
      );
      sent += 1;
    } catch {
      const id = String(row.id ?? "");
      if (id) {
        await admin.from("push_subscriptions").delete().eq("id", id);
      }
    }
  }

  return { sent };
}
