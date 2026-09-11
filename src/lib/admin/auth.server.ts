import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";

import { createSupabaseServerClient } from "../supabase/create-server-client";
import { profilimUserFromAuth } from "../profilim/userFromAuth";
import {
  canAccessAdmin,
  isSiteAdminEmail,
  type AdminActor,
} from "./access";

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
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return { status: "unconfigured" };
  }

  const sessionPack = await Promise.race([
    supabase.auth.getSession(),
    new Promise<null>((resolve) => {
      setTimeout(() => resolve(null), 800);
    }),
  ]);

  const fromSession = actorFromUser(sessionPack?.data.session?.user ?? null);
  const sessionAccess = accessFromActor(fromSession);

  if (sessionAccess.status === "ok") {
    return sessionAccess;
  }

  const userPack = await Promise.race([
    supabase.auth.getUser(),
    new Promise<null>((resolve) => {
      setTimeout(() => resolve(null), 2000);
    }),
  ]);

  if (userPack) {
    return accessFromActor(actorFromUser(userPack.data.user));
  }

  return sessionAccess;
}

export async function requireAdminPage() {
  const access = await getAdminAccess();

  if (access.status === "signed-out") {
    redirect("/profilim");
  }

  return access;
}
