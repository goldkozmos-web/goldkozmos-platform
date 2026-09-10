import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "../supabase/create-server-client";
import { profilimUserFromAuth } from "../profilim/userFromAuth";
import { canAccessAdmin, normalizeProfileRole, type AdminActor } from "./access";
import { fetchOwnProfileFlags, isAdminProfile } from "./profile";

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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const actorBase = profilimUserFromAuth(user);

  if (!user || !actorBase) {
    return { status: "signed-out" };
  }

  const flags = await fetchOwnProfileFlags(supabase, user.id);
  const role = isAdminProfile(flags)
    ? "admin"
    : normalizeProfileRole(flags?.role);
  const actor: AdminActor = {
    id: actorBase.id,
    displayName: actorBase.displayName,
    email: actorBase.email,
    avatarUrl: actorBase.avatarUrl,
    role,
  };

  if (!canAccessAdmin(flags?.role, flags?.is_admin)) {
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
