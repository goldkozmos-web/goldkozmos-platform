import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { getSupabasePublicEnv } from "./env";
import { profilimUserFromAuth } from "./userFromAuth";
import type { ProfilimUser } from "./types";

export async function createProfilimServerClient() {
  const env = getSupabasePublicEnv();

  if (!env) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cannot always set cookies; proxy refreshes the session.
        }
      },
    },
  });
}

export async function getProfilimSessionUser(): Promise<ProfilimUser> {
  const supabase = await createProfilimServerClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return profilimUserFromAuth(user);
}
