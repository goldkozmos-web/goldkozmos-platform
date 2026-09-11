import { createSupabaseServerClient } from "../supabase/create-server-client";
import { fetchOwnProfileFlags, isAdminProfile } from "../admin/profile";
import { profilimUserFromAuth } from "./userFromAuth";
import type { ProfilimUser } from "./types";

export async function createProfilimServerClient() {
  return createSupabaseServerClient();
}

async function flagsOrNull(
  supabase: NonNullable<Awaited<ReturnType<typeof createProfilimServerClient>>>,
  userId: string,
) {
  return Promise.race([
    fetchOwnProfileFlags(supabase, userId),
    new Promise<null>((resolve) => {
      setTimeout(() => resolve(null), 2500);
    }),
  ]);
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

    const flags = await flagsOrNull(supabase, actor.id);

    return {
      ...actor,
      isAdmin: isAdminProfile(flags),
    };
  } catch {
    return null;
  }
}
