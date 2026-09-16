import { isMissingRelation, runPlatformSql } from "../admin/applyPlatformSchema";
import type { PushSub } from "../admin/push";
import { createSupabaseServiceClient } from "../supabase/service";
import { createSupabaseServerClient } from "../supabase/create-server-client";
import { PUSH_SCHEMA_SQL } from "./schema";

export async function ensurePushSchema() {
  return runPlatformSql(async (sql) => {
    await sql.unsafe(PUSH_SCHEMA_SQL);
  });
}

async function client() {
  return createSupabaseServiceClient() || (await createSupabaseServerClient());
}

async function writePushMeta(userId: string, sub: PushSub) {
  const admin = createSupabaseServiceClient();
  if (!admin) return { error: "Bağlantı yok." };
  const current = await admin.auth.admin.getUserById(userId);
  if (current.error) return { error: current.error.message };
  const meta = (current.data.user?.user_metadata ?? {}) as Record<string, unknown>;
  const { error } = await admin.auth.admin.updateUserById(userId, {
    user_metadata: { ...meta, push_subscription: sub },
  });
  return { error: error?.message ?? null };
}

export async function readPushMeta(userId: string): Promise<PushSub | null> {
  const admin = createSupabaseServiceClient();
  if (!admin) return null;
  const { data } = await admin.auth.admin.getUserById(userId);
  const raw = (data.user?.user_metadata as { push_subscription?: PushSub } | undefined)
    ?.push_subscription;
  if (!raw?.endpoint?.startsWith("https://") || !raw.keys?.p256dh || !raw.keys?.auth) {
    return null;
  }
  return raw;
}

export async function savePushSubscription(
  userId: string,
  sub: PushSub,
  userAgent: string,
) {
  const supabase = await client();
  if (!supabase) return { error: "Bağlantı yok." };

  const row = {
    user_id: userId,
    endpoint: sub.endpoint,
    p256dh: sub.keys.p256dh,
    auth_secret: sub.keys.auth,
    user_agent: userAgent,
    updated_at: new Date().toISOString(),
  };

  let error = (await supabase.from("push_subscriptions").upsert(row, { onConflict: "endpoint" }))
    .error;
  if (error && /updated_at/i.test(error.message)) {
    const slim = {
      user_id: userId,
      endpoint: sub.endpoint,
      p256dh: sub.keys.p256dh,
      auth_secret: sub.keys.auth,
      user_agent: userAgent,
    };
    error = (await supabase.from("push_subscriptions").upsert(slim, { onConflict: "endpoint" }))
      .error;
  }
  if (error && /on conflict|unique|no unique/i.test(error.message)) {
    await supabase.from("push_subscriptions").delete().eq("endpoint", sub.endpoint);
    error = (await supabase.from("push_subscriptions").insert(row)).error;
  }
  if (error && isMissingRelation(error.message)) {
    await ensurePushSchema();
    error = (await supabase.from("push_subscriptions").upsert(row, { onConflict: "endpoint" }))
      .error;
  }
  const meta = await writePushMeta(userId, sub);
  if (error && meta.error) return { error: error.message };
  return { error: null as string | null };
}

export async function deletePushSubscription(userId: string, endpoint: string) {
  const supabase = await client();
  if (!supabase) return;
  let query = supabase.from("push_subscriptions").delete().eq("user_id", userId);
  if (endpoint) query = query.eq("endpoint", endpoint);
  await query;
  const admin = createSupabaseServiceClient();
  if (!admin) return;
  const current = await admin.auth.admin.getUserById(userId);
  const meta = (current.data.user?.user_metadata ?? {}) as Record<string, unknown>;
  if (!meta.push_subscription) return;
  const stored = meta.push_subscription as PushSub;
  if (endpoint && stored.endpoint !== endpoint) return;
  const next = { ...meta };
  delete next.push_subscription;
  await admin.auth.admin.updateUserById(userId, { user_metadata: next });
}
