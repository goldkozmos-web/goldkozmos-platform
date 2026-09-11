"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";

import { createProfilimBrowserClient } from "../../lib/profilim/auth.client";
import { profilimUserFromAuth } from "../../lib/profilim/userFromAuth";
import { isSiteAdminEmail } from "../../lib/admin/access";
import {
  fetchOwnProfileFlags,
  isAdminProfile,
} from "../../lib/admin/profile";
import type { ProfilimUser } from "../../lib/profilim/types";
import ProfilimGate from "../profilim/ProfilimGate";

export default function AyarlarFrame({
  backHref = "/profilim",
  title,
  children,
}: {
  backHref?: string;
  title: string;
  children: (user: NonNullable<ProfilimUser>) => ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<ProfilimUser>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const supabase = createProfilimBrowserClient();
    if (!supabase) {
      setReady(true);
      return;
    }
    const client = supabase;

    let cancelled = false;

    async function load() {
      const { data } = await client.auth.getUser();
      if (cancelled) return;
      const next = profilimUserFromAuth(data.user);
      if (!next) {
        setUser(null);
        setReady(true);
        return;
      }

      const flags = await fetchOwnProfileFlags(client, next.id);
      const isAdmin =
        isSiteAdminEmail(next.email) || isAdminProfile(flags);
      setUser({ ...next, isAdmin });
      setReady(true);
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) {
    return (
      <div className="ayarlarShell">
        <header className="ayarlarHead">
          <a href={backHref} className="ayarlarBack" aria-label="Geri">
            ←
          </a>
          <h1>{title}</h1>
        </header>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="ayarlarShell">
        <ProfilimGate />
      </div>
    );
  }

  return (
    <div className="ayarlarShell">
      <header className="ayarlarHead">
        <a
          href={backHref}
          className="ayarlarBack"
          aria-label="Geri"
          onClick={(event) => {
            if (backHref === "/ayarlar" || backHref === "/profilim") {
              event.preventDefault();
              router.push(backHref);
            }
          }}
        >
          ←
        </a>
        <h1>{title}</h1>
      </header>
      {children(user)}
    </div>
  );
}
