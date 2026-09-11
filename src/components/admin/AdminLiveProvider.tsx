"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  diffAdminLive,
  nextLiveCursor,
  type AdminAlert,
} from "../../lib/admin/alerts";
import type {
  AdminEventRow,
  AdminMemberRow,
  AdminOverviewMetric,
  AdminVisitorRow,
} from "../../lib/admin/load";
import { createSupabaseBrowserClient } from "../../lib/supabase/browser";

export type AdminLiveSnapshot = {
  metrics: AdminOverviewMetric[];
  visitors: AdminVisitorRow[];
  whatsapp: AdminEventRow[];
  purchases: AdminEventRow[];
  appointments: AdminEventRow[];
  members: AdminMemberRow[];
};

type AdminLiveContextValue = {
  live: AdminLiveSnapshot | null;
  toast: AdminAlert | null;
  notifyReady: boolean;
  enableNotify: () => void;
  refresh: () => Promise<void>;
};

const AdminLiveContext = createContext<AdminLiveContextValue | null>(null);

function pushDesktopAlert(alert: AdminAlert) {
  if (typeof Notification === "undefined" || Notification.permission !== "granted") {
    return;
  }

  try {
    new Notification(alert.title, {
      body: alert.body,
      tag: `goldkozmos-${alert.kind}-${alert.body}`,
    });
  } catch {
    // Some browsers block Notification from insecure contexts.
  }
}

export function AdminLiveProvider({ children }: { children: React.ReactNode }) {
  const [live, setLive] = useState<AdminLiveSnapshot | null>(null);
  const [toast, setToast] = useState<AdminAlert | null>(null);
  const [notifyReady, setNotifyReady] = useState(false);
  const cursor = useRef<ReturnType<typeof nextLiveCursor> | null>(null);
  const inFlight = useRef(false);

  useEffect(() => {
    setNotifyReady(
      typeof Notification !== "undefined" && Notification.permission === "granted",
    );
  }, []);

  const refresh = useCallback(async () => {
    if (inFlight.current) {
      return;
    }
    inFlight.current = true;
    try {
      const headers: HeadersInit = {};
      const supabase = createSupabaseBrowserClient();
      if (supabase) {
        const pack = await Promise.race([
          supabase.auth.getSession(),
          new Promise<null>((resolve) => {
            setTimeout(() => resolve(null), 400);
          }),
        ]);
        const token =
          pack && "data" in pack ? pack.data.session?.access_token : undefined;
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
      }

      const response = await Promise.race([
        fetch("/api/admin/live", {
          cache: "no-store",
          credentials: "same-origin",
          headers,
        }),
        new Promise<null>((resolve) => {
          setTimeout(() => resolve(null), 4000);
        }),
      ]);
      if (!response || !response.ok) {
        return;
      }

      const data = (await response.json()) as AdminLiveSnapshot;
      const snapshot: AdminLiveSnapshot = {
        metrics: data.metrics ?? [],
        visitors: data.visitors ?? [],
        whatsapp: data.whatsapp ?? [],
        purchases: data.purchases ?? [],
        appointments: data.appointments ?? [],
        members: data.members ?? [],
      };
      const alerts = diffAdminLive(cursor.current, {
        metrics: snapshot.metrics,
        visitors: snapshot.visitors,
      });
      cursor.current = nextLiveCursor(snapshot.metrics, snapshot.visitors);
      setLive(snapshot);

      if (alerts[0]) {
        setToast(alerts[0]);
        for (const alert of alerts) {
          pushDesktopAlert(alert);
        }
      }
    } catch {
      // Keep the last painted desk if a poll fails.
    } finally {
      inFlight.current = false;
    }
  }, []);

  useEffect(() => {
    void refresh();
    const timer = window.setInterval(() => {
      void refresh();
    }, 2000);

    function onFocus() {
      void refresh();
    }

    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);

    return () => {
      window.clearInterval(timer);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
    };
  }, [refresh]);

  useEffect(() => {
    if (!toast) {
      return;
    }
    const timer = window.setTimeout(() => setToast(null), 5000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const enableNotify = useCallback(() => {
    if (typeof Notification === "undefined") {
      return;
    }
    void Notification.requestPermission().then((permission) => {
      setNotifyReady(permission === "granted");
    });
  }, []);

  const value = useMemo(
    () => ({ live, toast, notifyReady, enableNotify, refresh }),
    [live, toast, notifyReady, enableNotify, refresh],
  );

  return (
    <AdminLiveContext.Provider value={value}>{children}</AdminLiveContext.Provider>
  );
}

export function useAdminLive() {
  const value = useContext(AdminLiveContext);
  if (!value) {
    throw new Error("useAdminLive needs AdminLiveProvider");
  }
  return value;
}
