"use client";

import { useEffect, useState, type ReactNode } from "react";

import {
  canAccessAdmin,
  isSiteAdminEmail,
  type AdminActor,
} from "../../lib/admin/access";
import { profilimUserFromAuth } from "../../lib/profilim/userFromAuth";
import { createSupabaseBrowserClient } from "../../lib/supabase/browser";
import type { AdminAccess } from "../../lib/admin/auth.server";
import { shouldClearProfilimUser } from "../../lib/profilim/sessionEvents";
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

export default function AdminClientGate({ children, initialAccess }: { children: ReactNode; initialAccess: AdminAccess }) {
  const [actor, setActor] = useState<AdminActor | null>(initialAccess.status === "ok" ? initialAccess.actor : null);
  const [checking, setChecking] = useState(initialAccess.status === "signed-out");
  const [denied, setDenied] = useState<"forbidden" | "unconfigured" | null>(initialAccess.status === "forbidden" || initialAccess.status === "unconfigured" ? initialAccess.status : null);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setDenied("unconfigured");
      setActor(null);
      setChecking(false);
      return;
    }

    let cancelled = false;
    const timer = setTimeout(() => { if (!cancelled) setChecking(false); }, 12000);

    function applyUser(sessionUser: Parameters<typeof profilimUserFromAuth>[0], event?: string) {
      if (cancelled) return;
      clearTimeout(timer);
      const next = actorFromSessionUser(sessionUser);
      setChecking(false);
      if (!next) {
        // INITIAL_SESSION can be empty while the server has a verified cookie session.
        if (shouldClearProfilimUser(event)) setActor(null);
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

    void supabase.auth.getSession().then((pack) => {
      applyUser(pack.data.session?.user ?? null, "GET_SESSION");
    }).catch(() => {
      if (!cancelled) setChecking(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      applyUser(session?.user ?? null, event);
    });

    return () => {
      cancelled = true;
      clearTimeout(timer);
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

  if (checking) return <section className="adminLocked" role="status"><p>Yönetim oturumu kontrol ediliyor…</p></section>;
  if (!actor) return <AdminLocked title="Yönetim için giriş yap" text="Üyeleri ve bildirimleri görmek için yönetici hesabınla devam et." />;

  return <AdminShell actor={actor}>{children}</AdminShell>;
}
