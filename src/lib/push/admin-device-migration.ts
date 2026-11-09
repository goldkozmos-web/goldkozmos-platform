import type { SupabaseClient, User } from "@supabase/supabase-js";
import { isSiteAdminEmail } from "../admin/access";
import { parsePushSub, PUSH_SUB_POST } from "../admin/push";

// Keep the administrator's existing, opted-in phone connected to their personal
// notifications too. Other members' records are never read or migrated here.
export async function migrateOwnAdminDevices(client: SupabaseClient, user: User) {
  if (!isSiteAdminEmail(user.email)) return;
  const records = await client.from("comments").select("content").eq("post_id",PUSH_SUB_POST).eq("user_id",user.id).limit(20);
  for (const row of records.data ?? []) {
    const subscription = parsePushSub(String(row.content));
    if (!subscription) continue;
    await client.from("push_subscriptions").upsert({user_id:user.id,endpoint:subscription.endpoint,p256dh:subscription.keys.p256dh,auth_secret:subscription.keys.auth,user_agent:"existing-owner-device"},{onConflict:"endpoint"});
  }
}
