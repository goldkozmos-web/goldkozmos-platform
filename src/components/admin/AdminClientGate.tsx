"use client";

import { useEffect, useState, type ReactNode } from "react";

import {
  SITE_ADMIN_EMAIL,
  canAccessAdmin,
  isSiteAdminEmail,
  type AdminActor,
} from "../../lib/admin/access";
import { profilimUserFromAuth } from "../../lib/profilim/userFromAuth";
import { createSupabaseBrowserClient } from "../../lib/supabase/browser";
import AdminLocked from "./AdminLocked";
import AdminShell from "./AdminShell";

function actorFromSessionUser(
  sessionUser: Parameters<typeof profilimUserFromAuth>[0],
): AdminActor | null {
  const base = profilimUserFromAuth(sessionUser);
  if (!base) return null;
  return {
    id: base.id,
    displayName: base.displayName,
    email: base.email,
    avatarUrl: base.avatarUrl,
    role: isSiteAdminEmail(base.email) ? "admin" : "user",
  };
}

const BOOT_ACTOR: AdminActor = {
  id: "boot",
  displayName: "Gold Kozmos",
  email: SITE_ADMIN_EMAIL,
  avatarUrl: null,
  role: "admin",
};

export default function AdminClientGate({ children }: { children: ReactNode }) {
  const [actor, setActor] = useState<AdminActor | null>(BOOT_ACTOR);
  const [denied, setDenied] = useState<"forbidden" | "unconfigured" | null>(null);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setDenied("unconfigured");
      setActor(null);
      return;
    }

    let cancelled = false;

    function applyUser(sessionUser: Parameters<typeof profilimUserFromAuth>[0]) {
      if (cancelled) return;
      const next = actorFromSessionUser(sessionUser);
      if (!next) {
        return;
      }
      if (!canAccessAdmin(next.email)) {
        setDenied("forbidden");
        setActor(null);
        return;
      }
      setDenied(null);
      setActor(next);
    }

    void Promise.race([
      supabase.auth.getSession(),
      new Promise<null>((resolve) => {
        setTimeout(() => resolve(null), 800);
      }),
    ]).then(async (pack) => {
      const user = pack && "data" in pack ? pack.data.session?.user ?? null : null;
      if (user) {
        applyUser(user);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!session?.user) {
        return;
      }
      applyUser(session.user);
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  if (denied === "unconfigured") {
    return (
      <AdminLocked
        title="Yönetim henüz bağlanmadı"
        text="Supabase oturumu olmadan yönetim alanı açılamaz. Yalnızca goldkozmos@gmail.com girer."
      />
    );
  }

  if (denied === "forbidden") {
    return (
      <AdminLocked
        title="Bu alan yalnızca yönetim içindir"
        text="Bu alan yalnızca goldkozmos@gmail.com Google hesabına açıktır."
      />
    );
  }

  if (!actor) {
    return (
      <AdminShell actor={BOOT_ACTOR}>{children}</AdminShell>
    );
  }

  return <AdminShell actor={actor}>{children}</AdminShell>;
}
