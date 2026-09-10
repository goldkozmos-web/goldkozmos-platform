import type { User } from "@supabase/supabase-js";

import type { ProfilimUser } from "./types";

function stringMeta(
  metadata: Record<string, unknown> | undefined,
  key: string,
) {
  const value = metadata?.[key];
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

export function profilimUserFromAuth(
  user: User | null,
): NonNullable<ProfilimUser> | null {
  if (!user) {
    return null;
  }

  const email = user.email ?? null;
  const metadata = user.user_metadata as Record<string, unknown> | undefined;
  const displayName =
    stringMeta(metadata, "full_name") ||
    stringMeta(metadata, "name") ||
    stringMeta(metadata, "display_name") ||
    email?.split("@")[0]?.trim() ||
    "GoldKozmos";

  return {
    id: user.id,
    email,
    displayName,
    avatarUrl:
      stringMeta(metadata, "avatar_url") ||
      stringMeta(metadata, "picture") ||
      null,
  };
}
