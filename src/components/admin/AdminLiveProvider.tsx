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
import { useAdminPhonePush } from "../../lib/admin/phone-push";
import { createSupabaseBrowserClient } from "../../lib/supabase/browser";

export type AdminLiveSnapshot = {
  metrics: AdminOverviewMetric[];
  visitors: AdminVisitorRow[];
  whatsapp: AdminEventRow[];
  purchases: AdminEventRow[];
  appointments: AdminEventRow[];
  members: AdminMemberRow[];
  commentNotifications?: { id: string; excerpt: string; createdAt: string; readAt: string | null }[];
};

type AdminLiveContextValue = {
  live: AdminLiveSnapshot | null;
  toast: AdminAlert | null;
  notifyReady: boolean;
  toggleNotify: () => void;
  notifyBusy: boolean;
  notifyMessage: string;
  testNotify: () => void;
  refresh: () => Promise<void>;
  loading: boolean;
  error: string;
};

const AdminLiveContext = createContext<AdminLiveContextValue | null>(null);

export function AdminLiveProvider({ children }: { children: React.ReactNode }) {
  const [live, setLive] = useState<AdminLiveSnapshot | null>(null);
  const [toast, setToast] = useState<AdminAlert | null>(null);
  const phonePush = useAdminPhonePush();
  const notifyReady = phonePush.ready;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const cursor = useRef<ReturnType<typeof nextLiveCursor> | null>(null);
  const inFlight = useRef(false);

  const refresh = useCallback(async () => {
    if (inFlight.current) {
      return;
    }
    inFlight.current = true;
    try {
      const headers: HeadersInit = {};
      const supabase = createSupabaseBrowserClient();
      if (supabase) {
        const pack = await supabase.auth.getSession();
        const token =
          pack && "data" in pack ? pack.data.session?.access_token : undefined;
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
      }

      const response = await fetch("/api/admin/live", {
          cache: "no-store",
          credentials: "same-origin",
          headers,
          signal: AbortSignal.timeout(20000),
        });
      if (!response.ok) {
        throw new Error(response.status === 401 ? "Yönetim oturumu doğrulanamadı. Profilim üzerinden yeniden giriş yap." : "Üyeler ve etkinlikler yüklenemedi. Yeniden deneyebilirsin.");
      }

      const data = (await response.json()) as AdminLiveSnapshot;
      const snapshot: AdminLiveSnapshot = {
        metrics: data.metrics ?? [],
        visitors: data.visitors ?? [],
        whatsapp: data.whatsapp ?? [],
        purchases: data.purchases ?? [],
        appointments: data.appointments ?? [],
        members: data.members ?? [],
        commentNotifications: data.commentNotifications ?? [],
      };
      const alerts = diffAdminLive(cursor.current, {
        metrics: snapshot.metrics,
        visitors: snapshot.visitors,
      });
      cursor.current = nextLiveCursor(snapshot.metrics, snapshot.visitors);
      setLive(snapshot);
      setError("");

      if (alerts[0]) {
        setToast(alerts[0]);

      }
    } catch (reason) {
      setError(reason instanceof Error && reason.name !== "TimeoutError" ? reason.message : "Bağlantı yavaş yanıt veriyor. Yeniden deneyebilirsin.");
    } finally {
      inFlight.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") void refresh();
    }, 1000);

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

  const value = useMemo(
    () => ({ live, toast, notifyReady, toggleNotify: phonePush.toggle, notifyBusy: phonePush.busy, notifyMessage: phonePush.message, testNotify: phonePush.test, refresh, loading, error }),
    [live, toast, notifyReady, phonePush.toggle, phonePush.busy, phonePush.message, phonePush.test, refresh, loading, error],
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
