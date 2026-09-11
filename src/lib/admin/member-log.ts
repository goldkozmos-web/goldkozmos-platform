import type { SupabaseClient, User } from "@supabase/supabase-js";

import { createSupabaseAnonClient } from "../supabase/anon";
import { profilimUserFromAuth } from "../profilim/userFromAuth";
import { memberVisitorKey } from "./member-keys";

export {
  MEMBER_VISITOR_PREFIX,
  isMemberVisitorKey,
  memberRowFromVisitor,
  memberVisitorKey,
  userIdFromMemberKey,
} from "./member-keys";

async function writeMemberPresence(
  supabase: SupabaseClient,
  input: {
    key: string;
    displayName: string;
    email: string;
    city: string;
    phone: string;
  },
) {
  await supabase.rpc("record_site_presence", {
    p_visitor_key: input.key,
    p_kind: "page",
    p_path: "/uyelik",
    p_referrer: input.email,
    p_source: input.displayName.slice(0, 80),
    p_href: input.phone || input.email,
    p_country: "",
    p_region: "",
    p_city: input.city,
    p_heartbeat: false,
  });
}

export async function recordMemberJoin(
  user: User | null,
  extra?: {
    displayName?: string;
    city?: string;
    phone?: string;
  },
  sessionClient?: SupabaseClient | null,
) {
  if (!user) return;
  const key = memberVisitorKey(user.id);
  if (!key) return;

  const fromAuth = profilimUserFromAuth(user);
  const displayName = extra?.displayName || fromAuth?.displayName || "GoldKozmos üyesi";
  const email = fromAuth?.email || user.email || "";
  const payload = {
    key,
    displayName,
    email,
    city: extra?.city || "",
    phone: extra?.phone || "",
  };

  const seen = new Set<SupabaseClient>();
  for (const client of [sessionClient, createSupabaseAnonClient()]) {
    if (!client || seen.has(client)) continue;
    seen.add(client);
    await writeMemberPresence(client, payload);
  }

  if (typeof window !== "undefined") {
    await fetch("/api/presence", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({
        kind: "page",
        path: "/uyelik",
        referrer: email,
        href: payload.phone || email,
        visitorKey: key,
      }),
    }).catch(() => undefined);
  }
}
