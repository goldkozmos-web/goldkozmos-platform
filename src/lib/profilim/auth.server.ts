import { createSupabaseServerClient } from "../supabase/create-server-client";
import { isSiteAdminEmail } from "../admin/access";
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

  try {
    const { data } = await supabase.auth.getSession();
    const actor = profilimUserFromAuth(data.session?.user ?? null);

    if (!actor) {
      return null;
    }

    return {
      ...actor,
      isAdmin: isSiteAdminEmail(actor.email),
    };
  } catch {
    return null;
  }
}
