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
  const [denied, setDenied] = useState<"signed-out" | "forbidden" | "unconfigured" | null>(
    null,
  );

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    const localPreview =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    if (!supabase) {
      if (localPreview) {
        return;
      }
      setDenied("unconfigured");
      setActor(null);
      return;
    }

    let cancelled = false;

    void supabase.auth.getSession().then(({ data: { session } }) => {
      if (cancelled) return;
      const next = actorFromSessionUser(session?.user ?? null);
      if (!next) {
        if (localPreview) return;
        setDenied("signed-out");
        setActor(null);
        return;
      }
      if (!canAccessAdmin(next.email)) {
        setDenied("forbidden");
        setActor(null);
        return;
      }
      setDenied(null);
      setActor(next);
    });

    return () => {
      cancelled = true;
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

  if (denied === "signed-out") {
    return (
      <AdminLocked
        title="Yönetim Merkezi"
        text="goldkozmos@gmail.com ile Profilim’den giriş yap, sonra buraya dön."
      />
    );
  }

  if (!actor) {
    return null;
  }

  return <AdminShell actor={actor}>{children}</AdminShell>;
}
