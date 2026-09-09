import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import type { ProfilimUser } from "./types";

function publicEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return { url, anonKey };
}

function displayNameFrom(
  email: string | null,
  metadata: Record<string, unknown> | undefined,
) {
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

export async function getProfilimSessionUser(): Promise<ProfilimUser> {
  const env = publicEnv();

  if (!env) {
    return null;
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(env.url, env.anonKey, {
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
          // Server Components cannot always set cookies.
        }
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const email = user.email ?? null;
  const metadata = user.user_metadata as Record<string, unknown> | undefined;

  return {
    id: user.id,
    email,
    displayName: displayNameFrom(email, metadata),
    avatarUrl:
      typeof metadata?.avatar_url === "string" ? metadata.avatar_url : null,
  };
}
