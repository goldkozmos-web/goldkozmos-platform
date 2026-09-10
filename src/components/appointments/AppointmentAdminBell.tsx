"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import { createSupabaseBrowserClient } from "../../lib/supabase/browser";
import "../../styles/appointment-bell.css";

export default function AppointmentAdminBell() {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;

    let cancelled = false;

    async function load() {
      const me = await fetch("/api/auth/me", { cache: "no-store" })
        .then((response) => response.json())
        .catch(() => null);

      if (cancelled || !me?.user?.isAdmin) {
        setIsAdmin(false);
        setCount(0);
        return;
      }

      setIsAdmin(true);

      const unread = await fetch("/api/appointments/unread", { cache: "no-store" })
        .then((response) => response.json())
        .catch(() => ({ count: 0 }));

      if (!cancelled) {
        setCount(typeof unread.count === "number" ? unread.count : 0);
      }
    }

    void load();

    const client = createSupabaseBrowserClient();
    if (!client) {
      return () => {
        cancelled = true;
      };
    }

    const channel = client
      .channel("appointment-admin-bell")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "appointments" },
        () => {
          setCount((current) => current + 1);
        },
      )
      .subscribe();

    return () => {
      cancelled = true;
      void client.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (!isAdmin || pathname !== "/admin/randevular") return;

    void fetch("/api/appointments/unread", { method: "POST" }).then(() => {
      setCount(0);
    });
  }, [isAdmin, pathname]);

  const label = useMemo(() => {
    if (count <= 0) return "Randevular";
    return `${count} yeni randevu`;
  }, [count]);

  if (!isAdmin) {
    return null;
  }

  return (
    <a
      href="/admin/randevular"
      className="appointmentAdminBell"
      aria-label={label}
      title={label}
    >
      <span aria-hidden="true">🔔</span>
      {count > 0 ? (
        <strong className="appointmentAdminBellBadge">
          {count > 99 ? "99+" : count}
        </strong>
      ) : null}
    </a>
  );
}
