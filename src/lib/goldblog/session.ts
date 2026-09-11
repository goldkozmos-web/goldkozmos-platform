import { isSiteAdminEmail } from "@/lib/admin/access";
import { createSupabaseServerClient } from "@/lib/supabase/create-server-client";

export type GoldBlogSessionUser = {
  id: string;
  email: string | null;
  displayName: string;
  avatarUrl: string | null;
  isAdmin: boolean;
};

function displayNameFrom(
  email: string | null,
  metadata: Record<string, unknown> | undefined,
  profileName: string | null | undefined,
) {
  const fromProfile = profileName?.trim();
  if (fromProfile) {
    return fromProfile;
  }

  const fromMeta =
    typeof metadata?.display_name === "string"
      ? metadata.display_name.trim()
      : "";

  if (fromMeta) {
    return fromMeta;
  }

  const local = email?.split("@")[0]?.trim();
  return local || "GoldKozmos";
}

export async function getGoldBlogSessionUser(): Promise<GoldBlogSessionUser | null> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, avatar_url, is_admin")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    const fallbackName = displayNameFrom(
      user.email ?? null,
      user.user_metadata as Record<string, unknown> | undefined,
      null,
    );

    await supabase.from("profiles").upsert({
      id: user.id,
      display_name: fallbackName,
      avatar_url:
        typeof user.user_metadata?.avatar_url === "string"
          ? user.user_metadata.avatar_url
          : null,
    });
  }

  const email = user.email ?? null;
  const isAdmin = isSiteAdminEmail(email);

  return {
    id: user.id,
    email,
    displayName: displayNameFrom(
      email,
      user.user_metadata as Record<string, unknown> | undefined,
      profile?.display_name,
    ),
    avatarUrl:
      (typeof profile?.avatar_url === "string" && profile.avatar_url) ||
      (typeof user.user_metadata?.avatar_url === "string"
        ? user.user_metadata.avatar_url
        : null),
    isAdmin,
  };
}
