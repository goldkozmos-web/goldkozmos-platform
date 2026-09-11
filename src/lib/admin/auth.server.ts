import type { SupabaseClient, User } from "@supabase/supabase-js";

import {
  createSupabaseAccessClient,
  createSupabaseAnonClient,
} from "../supabase/anon";
import { createSupabaseServerClient } from "../supabase/create-server-client";
import { profilimUserFromAuth } from "../profilim/userFromAuth";
import {
  canAccessAdmin,
  isSiteAdminEmail,
  type AdminActor,
} from "./access";
import { bearerTokenFromRequest } from "./bearer";

export type AdminAccess =
  | { status: "unconfigured" }
  | { status: "signed-out" }
  | { status: "forbidden"; actor: AdminActor }
  | { status: "ok"; actor: AdminActor };

function actorFromUser(user: User | null): AdminActor | null {
  const base = profilimUserFromAuth(user);

  if (!user || !base) {
    return null;
  }

  return {
    id: base.id,
    displayName: base.displayName,
    email: base.email,
    avatarUrl: base.avatarUrl,
    role: isSiteAdminEmail(base.email) ? "admin" : "user",
  };
}

function accessFromActor(actor: AdminActor | null): AdminAccess {
  if (!actor) {
    return { status: "signed-out" };
  }

  if (!canAccessAdmin(actor.email)) {
    return { status: "forbidden", actor };
  }

  return { status: "ok", actor };
}

export async function getAdminAccess(): Promise<AdminAccess> {
  const resolved = await resolveAdminRequest();
  return resolved.access;
}

export async function resolveAdminRequest(request?: Request) {
  const empty = {
    access: { status: "unconfigured" } as AdminAccess,
    client: null as SupabaseClient | null,
  };

  const bearer = bearerTokenFromRequest(request);
  if (bearer) {
    const probe = createSupabaseAnonClient();
    if (!probe) {
      return empty;
    }

    const { data } = await probe.auth.getUser(bearer);
    const access = accessFromActor(actorFromUser(data.user ?? null));
    return {
      access,
      client: access.status === "ok" ? createSupabaseAccessClient(bearer) : null,
    };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return empty;
  }

  const sessionPack = await supabase.auth.getSession();
  const token = sessionPack.data.session?.access_token ?? "";
  const access = accessFromActor(
    actorFromUser(sessionPack.data.session?.user ?? null),
  );

  return {
    access,
    client:
      access.status === "ok" && token
        ? createSupabaseAccessClient(token)
        : supabase,
  };
}

export async function requireAdminPage() {
  return getAdminAccess();
}
