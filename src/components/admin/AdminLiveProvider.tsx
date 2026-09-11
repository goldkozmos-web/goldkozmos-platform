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

function pushSupported() {
  return typeof window !== "undefined" && "serviceWorker" in navigator && "PushManager" in window;
}

function urlBase64ToUint8Array(base64: string) {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const raw = atob((base64 + padding).replace(/-/g, "+").replace(/_/g, "/"));
  const output = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i += 1) {
    output[i] = raw.charCodeAt(i);
  }
  return output;
}

async function authHeaders() {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  const supabase = createSupabaseBrowserClient();
  if (!supabase) return headers;
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function enablePhonePush() {
  if (!pushSupported()) return;
  const registration = await navigator.serviceWorker.register("/sw.js", { scope: "/" });
  await navigator.serviceWorker.ready;
  const keyRes = await fetch("/api/admin/push", { credentials: "same-origin" });
  const pack = (await keyRes.json()) as { publicKey?: string };
  if (!pack.publicKey) return;
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(pack.publicKey),
  });
  await fetch("/api/admin/push", {
    method: "POST",
    credentials: "same-origin",
    headers: await authHeaders(),
    body: JSON.stringify({ subscription }),
  });
}

async function disablePhonePush() {
  if (!pushSupported()) return;
  const registration = await navigator.serviceWorker.ready.catch(() => null);
  const subscription = await registration?.pushManager.getSubscription();
  await fetch("/api/admin/push", {
    method: "DELETE",
    credentials: "same-origin",
    headers: await authHeaders(),
    body: JSON.stringify({ endpoint: subscription?.endpoint || "" }),
  });
  await subscription?.unsubscribe();
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
    if (on) {
      void navigator.serviceWorker?.register("/sw.js", { scope: "/" }).then(() => {
        void enablePhonePush().catch(() => undefined);
      });
    }
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
      void disablePhonePush().catch(() => undefined);
      return;
    }

    function turnOn() {
      writeAlertPref(true);
      alertsOn.current = true;
      setNotifyReady(true);
      void enablePhonePush().catch(() => undefined);
    }

    if (typeof Notification === "undefined") {
      turnOn();
      return;
    }

    void Notification.requestPermission().then((permission) => {
      if (permission !== "granted") {
        writeAlertPref(false);
        alertsOn.current = false;
        setNotifyReady(false);
        return;
      }
      turnOn();
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
