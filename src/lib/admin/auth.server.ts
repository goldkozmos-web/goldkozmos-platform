import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "../supabase/create-server-client";
import { profilimUserFromAuth } from "../profilim/userFromAuth";
import {
  canAccessAdmin,
  isAdminGoogleEmail,
  normalizeProfileRole,
  type AdminActor,
} from "./access";

export type AdminAccess =
  | { status: "unconfigured" }
  | { status: "signed-out" }
  | { status: "forbidden"; actor: AdminActor }
  | { status: "ok"; actor: AdminActor };

type ProfileRow = {
  display_name: string | null;
  avatar_url: string | null;
  role?: string | null;
  is_admin?: boolean | null;
};

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

  const full = await supabase
    .from("profiles")
    .select("display_name, avatar_url, role, is_admin")
    .eq("id", user.id)
    .maybeSingle();

  const fallback = full.error
    ? await supabase
        .from("profiles")
        .select("display_name, avatar_url, is_admin")
        .eq("id", user.id)
        .maybeSingle()
    : null;

  const row = ((full.error ? fallback?.data : full.data) ?? null) as ProfileRow | null;

  if (!row) {
    await supabase.from("profiles").upsert({
      id: user.id,
      display_name: actorBase.displayName,
      avatar_url: actorBase.avatarUrl,
    });
  }

  const role = isAdminGoogleEmail(actorBase.email)
    ? "admin"
    : normalizeProfileRole(row?.role || (row?.is_admin ? "admin" : "user"));
  const actor: AdminActor = {
    id: actorBase.id,
    displayName: row?.display_name?.trim() || actorBase.displayName,
    email: actorBase.email,
    avatarUrl: row?.avatar_url || actorBase.avatarUrl,
    role,
  };

  if (!canAccessAdmin(role, actor.email)) {
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
