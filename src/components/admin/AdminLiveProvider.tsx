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
  toggleNotify: () => void;
  refresh: () => Promise<void>;
};

const AdminLiveContext = createContext<AdminLiveContextValue | null>(null);

const ALERT_PREF_KEY = "gk-admin-alerts";

function readAlertPref() {
  try {
    return window.localStorage.getItem(ALERT_PREF_KEY) !== "off";
  } catch {
    return true;
  }
}

function writeAlertPref(on: boolean) {
  try {
    window.localStorage.setItem(ALERT_PREF_KEY, on ? "on" : "off");
  } catch {
    // Private mode can block storage.
  }
}

function permissionGranted() {
  return typeof Notification !== "undefined" && Notification.permission === "granted";
}

function pushDesktopAlert(alert: AdminAlert) {
  if (!permissionGranted()) {
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
  const alertsOn = useRef(false);

  useEffect(() => {
    const on = readAlertPref() && permissionGranted();
    alertsOn.current = on;
    setNotifyReady(on);
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

      if (alerts[0] && alertsOn.current) {
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

  const toggleNotify = useCallback(() => {
    if (alertsOn.current) {
      writeAlertPref(false);
      alertsOn.current = false;
      setNotifyReady(false);
      return;
    }

    if (typeof Notification === "undefined") {
      writeAlertPref(true);
      alertsOn.current = true;
      setNotifyReady(true);
      return;
    }

    void Notification.requestPermission().then((permission) => {
      const on = permission === "granted";
      writeAlertPref(on);
      alertsOn.current = on;
      setNotifyReady(on);
    });
  }, []);

  const value = useMemo(
    () => ({ live, toast, notifyReady, toggleNotify, refresh }),
    [live, toast, notifyReady, toggleNotify, refresh],
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
