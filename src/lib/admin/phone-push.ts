"use client";

import { useCallback, useEffect, useState } from "react";
const PREF = "gk-admin-alerts";
function supported() { return typeof Notification !== "undefined" && "serviceWorker" in navigator && "PushManager" in window; }
function preference(on: boolean) { try { localStorage.setItem(PREF, on ? "on" : "off"); } catch {} }
function bounded<T>(promise: Promise<T>, message: string, milliseconds = 15000): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(message)), milliseconds);
    promise.then(value => { clearTimeout(timer); resolve(value); }, error => { clearTimeout(timer); reject(error); });
  });
}
function keyBytes(key: string) {
  const raw = atob(key.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - key.length % 4) % 4));
  return Uint8Array.from(raw, c => c.charCodeAt(0));
}
async function currentNotificationWorker() {
  const registration = await navigator.serviceWorker.register("/sw.js", { scope: "/", updateViaCache: "none" });
  await bounded(registration.update(), "Bildirim simgesi güncellenemedi. Bağlantını kontrol edip yeniden dene.");
  const worker = registration.installing || registration.waiting;
  if (worker && worker.state !== "activated") {
    if (worker.state === "installed") worker.postMessage({ type: "GOLDKOZMOS_ACTIVATE" });
    await bounded(new Promise<void>((resolve, reject) => {
      function changed() {
        if (worker!.state === "installed") worker!.postMessage({ type: "GOLDKOZMOS_ACTIVATE" });
        if (worker!.state === "activated" || worker!.state === "redundant") {
          worker!.removeEventListener("statechange", changed);
          if (worker!.state === "activated") resolve();
          else reject(new Error("Bildirim servisi yenilenemedi. Sayfayı yeniden aç."));
        }
      }
      worker.addEventListener("statechange", changed);
      changed();
    }), "Bildirim servisi yenileniyor. Sayfayı yeniden açıp tekrar dene.");
  }
  await bounded(navigator.serviceWorker.ready, "Bildirim servisi hazırlanamadı. Sayfayı yenileyip tekrar dene.");
  return registration;
}
async function saveDevice() {
  const registration = await currentNotificationWorker();
  const config = await fetch("/api/admin/push", { cache: "no-store" });
  const pack = await config.json();
  if (!config.ok || !pack.publicKey) throw new Error("Bildirim servisine ulaşılamadı.");
  const subscription = await registration.pushManager.getSubscription() || await bounded(registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: keyBytes(pack.publicKey) }), "Cihaz bildirim servisi yanıt vermedi. Tarayıcının bildirim iznini kontrol edip tekrar dene.");
  const result = await fetch("/api/admin/push", { method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ subscription }), signal: AbortSignal.timeout(15000) });
  const saved = await result.json();
  if (!result.ok || !saved.ok) throw new Error(saved.error || "Bu cihazın bildirim kaydı tamamlanamadı.");
  return subscription;
}
export function useAdminPhonePush() {
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    let active = true;
    let wanted = true;
    try { wanted = localStorage.getItem(PREF) !== "off"; } catch {}
    if (wanted && supported() && Notification.permission === "granted") {
      void saveDevice().then(() => { if (active) setReady(true); }).catch(error => { if (active) setMessage(error.message); });
    }
    return () => { active = false; };
  }, []);
  const toggle = useCallback(async () => {
    if (busy) return;
    setMessage("");
    if (!supported()) {
      setMessage(/iPad|iPhone|iPod/.test(navigator.userAgent) ? "iPhone’da Safari’den Paylaş → Ana Ekrana Ekle. Siteyi o simgeden açıp bildirimlere izin ver." : "Telefon bildirimleri için bu sayfayı Chrome veya bildirim destekleyen bir tarayıcıda aç.");
      return;
    }
    setBusy(true);
    try {
      if (ready) {
        const registration = await navigator.serviceWorker.getRegistration("/");
        const subscription = await registration?.pushManager.getSubscription();
        if (subscription) {
          const response = await fetch("/api/admin/push", { method: "DELETE", credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ endpoint: subscription.endpoint }), signal: AbortSignal.timeout(15000) });
          if (!response.ok) throw new Error("Bildirim kaydı kaldırılamadı. Yeniden dene.");
        }
        preference(false); setReady(false); setMessage("Bu cihazın yönetim bildirimleri kapatıldı.");
      } else {
        // Request in the click handler, before any asynchronous network operation.
        const permission = await bounded(Notification.requestPermission(), "Tarayıcının bildirim izin penceresini yanıtlayıp tekrar dene.", 30000);
        if (permission !== "granted") throw new Error("Bildirim izni verilmedi. Tarayıcının site ayarlarından Goldkozmos bildirimlerine izin ver.");
        await saveDevice();
        preference(true); setReady(true); setMessage("Bu cihaz kaydedildi. Deneme bildirimi göndererek telefonunda kontrol edebilirsin.");
      }
    } catch (error) { setMessage(error instanceof Error ? error.message : "Bildirim ayarlanamadı. Yeniden dene."); }
    finally { setBusy(false); }
  }, [busy, ready]);
  const test = useCallback(async () => {
    if (busy || !ready) return;
    setBusy(true); setMessage("");
    try {
      const registration = await currentNotificationWorker();
      const subscription = await registration?.pushManager.getSubscription();
      if (!subscription) throw new Error("Cihaz kaydı bulunamadı. Bildirimleri yeniden aç.");
      const response = await fetch("/api/admin/push/test", { method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ endpoint: subscription.endpoint }), signal: AbortSignal.timeout(20000) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Deneme bildirimi gönderilemedi.");
      setMessage("Deneme bildirimi gönderildi. Telefonunun bildirim merkezini kontrol et.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Deneme bildirimi gönderilemedi."); }
    finally { setBusy(false); }
  }, [busy, ready]);
  return { ready, busy, message, toggle, test };
}
