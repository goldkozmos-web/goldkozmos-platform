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
    const auth = await Promise.race([
      supabase.auth.getUser(),
      new Promise<null>((resolve) => {
        setTimeout(() => resolve(null), 2000);
      }),
    ]);

    if (!auth) {
      return null;
    }

    const actor = profilimUserFromAuth(auth.data.user);

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
