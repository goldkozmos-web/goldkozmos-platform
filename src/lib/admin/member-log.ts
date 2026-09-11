import type { User } from "@supabase/supabase-js";

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

export async function recordMemberJoin(user: User | null, extra?: {
  displayName?: string;
  city?: string;
  phone?: string;
}) {
  if (!user) return;
  const key = memberVisitorKey(user.id);
  if (!key) return;

  const supabase = createSupabaseAnonClient();
  if (!supabase) return;

  const fromAuth = profilimUserFromAuth(user);
  const displayName = extra?.displayName || fromAuth?.displayName || "GoldKozmos üyesi";
  const email = fromAuth?.email || user.email || "";

  await supabase.rpc("record_site_presence", {
    p_visitor_key: key,
    p_kind: "page",
    p_path: "/uyelik",
    p_referrer: email,
    p_source: displayName.slice(0, 80),
    p_href: extra?.phone || email,
    p_country: "",
    p_region: "",
    p_city: extra?.city || "",
    p_heartbeat: false,
  });
}
