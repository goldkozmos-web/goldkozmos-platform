import { createClient } from "@supabase/supabase-js";

import { memberRowFromAuthUser } from "../admin/member-keys";
import type { SiteMemberRow } from "../admin/members";
import { getSupabasePublicEnv, getSupabaseServiceKey } from "./env";

export function createSupabaseServiceClient() {
  const env = getSupabasePublicEnv();
  const serviceKey = getSupabaseServiceKey();
  if (!env || !serviceKey) return null;

  return createClient(env.url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

export async function listGoogleAuthMembers(): Promise<SiteMemberRow[]> {
  const admin = createSupabaseServiceClient();
  if (!admin) return [];

  try {
    const rows: SiteMemberRow[] = [];
    for (let page = 1; page <= 10; page += 1) {
      const { data, error } = await admin.auth.admin.listUsers({
        page,
        perPage: 200,
      });
      if (error || !data?.users?.length) break;
      for (const user of data.users) {
        const row = memberRowFromAuthUser(user);
        if (row) rows.push(row);
      }
      if (data.users.length < 200) break;
    }

    if (rows.length > 0) {
      await admin.from("site_members").upsert(
        rows.map((row) => ({
          email: row.email,
          display_name: row.displayName,
          auth_user_id: row.authUserId,
          source: "google",
          status: "active",
        })),
        { onConflict: "email" },
      );
    }

    return rows;
  } catch {
    return [];
  }
}
