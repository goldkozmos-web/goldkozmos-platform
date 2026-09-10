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
  AdminOverviewMetric,
  AdminVisitorRow,
} from "../../lib/admin/load";

export type AdminLiveSnapshot = {
  metrics: AdminOverviewMetric[];
  visitors: AdminVisitorRow[];
  whatsapp: AdminEventRow[];
  purchases: AdminEventRow[];
  appointments: AdminEventRow[];
};

type AdminLiveContextValue = {
  live: AdminLiveSnapshot | null;
  toast: AdminAlert | null;
  notifyReady: boolean;
  enableNotify: () => void;
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

  useEffect(() => {
    setNotifyReady(
      typeof Notification !== "undefined" && Notification.permission === "granted",
    );
  }, []);

  const refresh = useCallback(async () => {
    const response = await fetch("/api/admin/live", { cache: "no-store" });
    if (!response.ok) {
      return;
    }

    const data = (await response.json()) as AdminLiveSnapshot;
    const alerts = diffAdminLive(cursor.current, {
      metrics: data.metrics ?? [],
      visitors: data.visitors ?? [],
    });
    cursor.current = nextLiveCursor(data.metrics ?? [], data.visitors ?? []);
    setLive(data);

    if (alerts[0]) {
      setToast(alerts[0]);
      for (const alert of alerts) {
        pushDesktopAlert(alert);
      }
    }
  }, []);

  useEffect(() => {
    void refresh();
    const timer = window.setInterval(() => {
      void refresh();
    }, 4000);

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
    () => ({ live, toast, notifyReady, enableNotify }),
    [live, toast, notifyReady, enableNotify],
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
