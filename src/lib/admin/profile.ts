import type { SupabaseClient } from "@supabase/supabase-js";

export type ProfileAdminFlags = {
  role: string | null;
  is_admin: boolean | null;
};

function isTruthyAdminFlag(value: unknown) {
  return value === true || value === 1 || value === "1" || value === "true" || value === "t";
}

export function isAdminProfile(
  profile: ProfileAdminFlags | null | undefined,
) {
  if (!profile) {
    return false;
  }

  const role = String(profile.role ?? "").trim().toLowerCase();
  return role === "admin" || isTruthyAdminFlag(profile.is_admin);
}

export function canShowMemberProfilim(
  user: { isAdmin?: boolean } | null | undefined,
  checking: boolean,
) {
  return Boolean(user) && !checking;
}

export function postLoginPath(
  profile: ProfileAdminFlags | null | undefined,
) {
  return "/profilim";
}

export async function fetchOwnProfileFlags(
  supabase: SupabaseClient,
  userId: string,
): Promise<ProfileAdminFlags | null> {
  const full = await supabase
    .from("profiles")
    .select("role, is_admin")
    .eq("id", userId)
    .maybeSingle();

  if (!full.error && full.data) {
    const row = full.data as { role?: string | null; is_admin?: boolean | null };
    return {
      role: row.role ?? null,
      is_admin: row.is_admin ?? null,
    };
  }

  const fallback = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", userId)
    .maybeSingle();

  if (fallback.error || !fallback.data) {
    return null;
  }

  const row = fallback.data as { is_admin?: boolean | null };
  return {
    role: null,
    is_admin: row.is_admin ?? null,
  };
}
