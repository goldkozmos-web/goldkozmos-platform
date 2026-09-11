"use client";

import { useEffect, useState, type ReactNode } from "react";

import {
  canAccessAdmin,
  isSiteAdminEmail,
  type AdminActor,
} from "../../lib/admin/access";
import { profilimUserFromAuth } from "../../lib/profilim/userFromAuth";
import { createSupabaseBrowserClient } from "../../lib/supabase/browser";
import AdminLocked from "./AdminLocked";
import AdminShell from "./AdminShell";

type GateStatus = "ok" | "signed-out" | "forbidden" | "unconfigured";

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

export default function AdminClientGate({
  initialStatus,
  initialActor,
  children,
}: {
  initialStatus: GateStatus;
  initialActor: AdminActor | null;
  children: ReactNode;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [actor, setActor] = useState(initialActor);

  useEffect(() => {
    if (status === "ok") return;

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setStatus("unconfigured");
      return;
    }

    const client = supabase;
    let cancelled = false;

    void client.auth.getSession().then(({ data: { session } }) => {
      if (cancelled) return;
      const next = actorFromSessionUser(session?.user ?? null);
      if (!next) {
        setStatus("signed-out");
        setActor(null);
        return;
      }
      if (!canAccessAdmin(next.email)) {
        setStatus("forbidden");
        setActor(next);
        return;
      }
      setActor(next);
      setStatus("ok");
    });

    return () => {
      cancelled = true;
    };
  }, [status]);

  if (status === "ok" && actor) {
    return <AdminShell actor={actor}>{children}</AdminShell>;
  }

  if (status === "unconfigured") {
    return (
      <AdminLocked
        title="Yönetim henüz bağlanmadı"
        text="Supabase oturumu olmadan yönetim alanı açılamaz. Yalnızca goldkozmos@gmail.com girer."
      />
    );
  }

  if (status === "forbidden") {
    return (
      <AdminLocked
        title="Bu alan yalnızca yönetim içindir"
        text="Bu alan yalnızca goldkozmos@gmail.com Google hesabına açıktır."
      />
    );
  }

  return (
    <AdminLocked
      title="Yönetim Merkezi"
      text="goldkozmos@gmail.com ile Profilim’den giriş yap, sonra buraya dön."
    />
  );
}
