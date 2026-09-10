import { createSupabaseServerClient } from "../supabase/create-server-client";
import { fetchOwnProfileFlags, isAdminProfile } from "../admin/profile";
import { profilimUserFromAuth } from "./userFromAuth";
import type { ProfilimUser } from "./types";

export async function createProfilimServerClient() {
  return createSupabaseServerClient();
}

export async function getProfilimSessionUser(): Promise<ProfilimUser> {
  const supabase = await createProfilimServerClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const actor = profilimUserFromAuth(user);

  if (!actor) {
    return null;
  }

  const flags = await fetchOwnProfileFlags(supabase, actor.id);

  return {
    ...actor,
    isAdmin: isAdminProfile(flags),
  };
}
