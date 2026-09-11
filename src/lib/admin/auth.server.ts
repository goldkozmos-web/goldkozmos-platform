import { redirect } from "next/navigation";

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

export async function getAdminAccess(): Promise<AdminAccess> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return { status: "unconfigured" };
  }

  const auth = await Promise.race([
    supabase.auth.getUser(),
    new Promise<null>((resolve) => {
      setTimeout(() => resolve(null), 2000);
    }),
  ]);

  if (!auth) {
    return { status: "signed-out" };
  }

  const actorBase = profilimUserFromAuth(auth.data.user);

  if (!auth.data.user || !actorBase) {
    return { status: "signed-out" };
  }

  const actor: AdminActor = {
    id: actorBase.id,
    displayName: actorBase.displayName,
    email: actorBase.email,
    avatarUrl: actorBase.avatarUrl,
    role: isSiteAdminEmail(actorBase.email) ? "admin" : "user",
  };

  if (!canAccessAdmin(actor.email)) {
    return { status: "forbidden", actor };
  }

  return { status: "ok", actor };
}

export async function requireAdminPage() {
  const access = await getAdminAccess();

  if (access.status === "signed-out") {
    redirect("/profilim");
  }

  return access;
}
