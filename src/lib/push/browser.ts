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

function iosNeedsHomeScreen() {
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

function isInAppBrowser() {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent || "";
  return /FBAN|FBAV|Instagram|Line\/|WhatsApp|; wv\)|; wv |WebView/i.test(ua);
}

export function pushFailureHint(reason: string) {
  if (reason === "homescreen") {
    return "Program kaydedildi. iPhone bildirimi için Paylaş → Ana Ekrana Ekle, uygulamayı oradan aç, sonra hatırlatıcıyı bir kez daha aç.";
  }
  if (reason === "webview") {
    return "Program kaydedildi. Bildirim için telefonun Chrome uygulamasında goldkozmos.com’u aç, sonra hatırlatıcıyı bir kez daha aç.";
  }
  if (reason === "unsupported") {
    return "Program kaydedildi. Bu tarayıcı web push desteklemiyor. Android’de Chrome kullan.";
  }
  if (reason === "denied") {
    return "Program kaydedildi. Chrome’da GoldKozmos bildirimini Aç yap, sonra hatırlatıcıyı bir kez daha aç.";
  }
  return "Program kaydedildi. Saatler sunucuda. Chrome’da sitenin bildirimini Aç yap, sonra Su Hatırlatıcısı’nı bir kez daha aç.";
}

async function waitReady() {
  const ready = navigator.serviceWorker.ready;
  const timeout = new Promise<null>((resolve) => {
    setTimeout(() => resolve(null), 8000);
  });
  return (await Promise.race([ready, timeout])) as ServiceWorkerRegistration | null;
}

async function postSubscription(subscription: PushSubscription) {
  const body = typeof subscription.toJSON === "function" ? subscription.toJSON() : subscription;
  return fetch("/api/profilim/push", {
    method: "POST",
    credentials: "same-origin",
    headers: await authHeaders(),
    body: JSON.stringify({ subscription: body }),
  });
}

export async function enableMemberPush() {
  if (!pushSupported()) {
    return {
      ok: false,
      reason: iosNeedsHomeScreen()
        ? ("homescreen" as const)
        : isInAppBrowser()
          ? ("webview" as const)
          : ("unsupported" as const),
    };
  }

  if (typeof Notification === "undefined") {
    return {
      ok: false,
      reason: iosNeedsHomeScreen()
        ? ("homescreen" as const)
        : isInAppBrowser()
          ? ("webview" as const)
          : ("unsupported" as const),
    };
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
    const ready = (await waitReady()) || registration;
    const keyRes = await fetch("/api/profilim/push", {
      credentials: "same-origin",
      cache: "no-store",
    });
    const pack = (await keyRes.json().catch(() => null)) as { publicKey?: string } | null;
    if (!pack?.publicKey) {
      return { ok: false, reason: "key" as const };
    }

    const key = urlBase64ToUint8Array(pack.publicKey);
    let subscription = await ready.pushManager.getSubscription();
    if (!subscription) {
      subscription = await ready.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: key,
      });
    }

    let save = await postSubscription(subscription);
    if (!save.ok) {
      await subscription.unsubscribe().catch(() => undefined);
      subscription = await ready.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: key,
      });
      save = await postSubscription(subscription);
    }

    if (!save.ok) {
      return {
        ok: false,
        reason: isInAppBrowser() ? ("webview" as const) : ("save" as const),
      };
    }

    return { ok: true as const, registration: ready };
  } catch {
    return {
      ok: false,
      reason: iosNeedsHomeScreen()
        ? ("homescreen" as const)
        : isInAppBrowser()
          ? ("webview" as const)
          : ("subscribe" as const),
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
