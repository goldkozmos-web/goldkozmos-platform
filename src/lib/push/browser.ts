"use client";

import { createSupabaseBrowserClient } from "../supabase/browser";

export function pushSupportState() {
  if (typeof window === "undefined") return "unknown";
  if (!("serviceWorker" in navigator) || !("PushManager" in window) || typeof Notification === "undefined") {
    return "unsupported";
  }
  return Notification.permission;
}

function pushSupported() {
  return (
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    "PushManager" in window
  );
}

function isIosPhone() {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent || "";
  return /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

function isStandaloneApp() {
  if (typeof window === "undefined") return false;
  const nav = window.navigator as Navigator & { standalone?: boolean };
  return nav.standalone === true || window.matchMedia("(display-mode: standalone)").matches;
}

export function iosNeedsHomeScreen() {
  return isIosPhone() && !isStandaloneApp();
}

function urlBase64ToUint8Array(base64: string) {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const raw = atob((base64 + padding).replace(/-/g, "+").replace(/_/g, "/"));
  const output = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i += 1) {
    output[i] = raw.charCodeAt(i);
  }
  return new Uint8Array(output);
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

export async function enableMemberPush() {
  if (!pushSupported()) {
    return { ok: false, reason: iosNeedsHomeScreen() ? ("homescreen" as const) : ("unsupported" as const) };
  }

  if (typeof Notification === "undefined") {
    return { ok: false, reason: iosNeedsHomeScreen() ? ("homescreen" as const) : ("unsupported" as const) };
  }

  try {
    const permission =
      Notification.permission === "granted"
        ? "granted"
        : await Notification.requestPermission();
    if (permission !== "granted") {
      return { ok: false, reason: "denied" as const };
    }

    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
    });
    await navigator.serviceWorker.ready;

    const existing = await registration.pushManager.getSubscription();
    const keyRes = await fetch("/api/profilim/push", { credentials: "same-origin" });
    const pack = (await keyRes.json().catch(() => null)) as { publicKey?: string } | null;
    if (!pack?.publicKey) {
      return { ok: false, reason: "key" as const };
    }

    const subscription =
      existing ||
      (await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(pack.publicKey),
      }));

    const body =
      typeof subscription.toJSON === "function" ? subscription.toJSON() : subscription;
    const save = await fetch("/api/profilim/push", {
      method: "POST",
      credentials: "same-origin",
      headers: await authHeaders(),
      body: JSON.stringify({ subscription: body }),
    });

    if (!save.ok) {
      return { ok: false, reason: "save" as const };
    }

    return { ok: true as const, registration };
  } catch {
    return {
      ok: false,
      reason: iosNeedsHomeScreen() ? ("homescreen" as const) : ("subscribe" as const),
    };
  }
}

export async function showLocalTodoNotice(title: string, body: string) {
  if (typeof Notification === "undefined" || Notification.permission !== "granted") {
    return false;
  }
  try {
    const registration = await navigator.serviceWorker.ready.catch(() => null);
    if (registration) {
      await registration.showNotification(title, {
        body,
        icon: "/icon.png",
        badge: "/icon.png",
        data: { url: "/profilim" },
      });
      return true;
    }
    new Notification(title, { body, icon: "/icon.png" });
    return true;
  } catch {
    return false;
  }
}

export async function disableMemberPush() {
  if (!pushSupported()) {
    return { ok: false, reason: "unsupported" as const };
  }
  const registration = await navigator.serviceWorker.ready.catch(() => null);
  const subscription = await registration?.pushManager.getSubscription();
  await fetch("/api/profilim/push", {
    method: "DELETE",
    credentials: "same-origin",
    headers: await authHeaders(),
    body: JSON.stringify({ endpoint: subscription?.endpoint || "" }),
  });
  await subscription?.unsubscribe();
  return { ok: true as const };
}

export async function sendTodoPhoneNotice(title: string, body: string) {
  const ready = await enableMemberPush();
  if (!ready.ok) {
    return ready;
  }

  const res = await fetch("/api/profilim/push/send", {
    method: "POST",
    credentials: "same-origin",
    headers: await authHeaders(),
    body: JSON.stringify({ title, body, url: "/profilim" }),
  });
  const pack = (await res.json().catch(() => null)) as { sent?: number } | null;
  if ((pack?.sent ?? 0) > 0) {
    return { ok: true as const };
  }

  await showLocalTodoNotice(title, body);
  return { ok: true as const };
}
