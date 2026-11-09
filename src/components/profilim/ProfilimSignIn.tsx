"use client";

import { useSyncExternalStore, useState } from "react";
import { googleBrowserLaunch } from "../../lib/profilim/browserContext";

import { useSearchParams } from "next/navigation";

const subscribeBrowser = () => () => undefined;
const serverBrowser = () => "";
const browserSnapshot = () => `${navigator.userAgent}|${window.matchMedia("(display-mode: standalone)").matches || Boolean((navigator as Navigator & { standalone?: boolean }).standalone)}`;

export default function ProfilimSignIn() {
  const searchParams = useSearchParams();
  const browser = useSyncExternalStore(subscribeBrowser, browserSnapshot, serverBrowser);
  const launch = googleBrowserLaunch(browser.split("|")[0], browser.endsWith("|true"));
  const [copyMessage, setCopyMessage] = useState("");

  const error =
    searchParams.get("auth") === "error"
      ? "Google girişi tamamlanamadı. Tekrar dene."
      : "";

  return (
    <div className="profilimGoogleWrap">
      <a className="profilimGoogleButton" href={launch.href} target={launch.external && !launch.href.startsWith("intent:") ? "_blank" : undefined} rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2.1H12v4h5.4a4.6 4.6 0 0 1-2 3v2.5h3.3c1.9-1.7 2.9-4.3 2.9-7.4Z" /><path fill="#34A853" d="M12 22c2.7 0 5-.9 6.7-2.4L15.4 17c-.9.6-2 1-3.4 1-2.6 0-4.9-1.8-5.7-4.2H2.9v2.6A10 10 0 0 0 12 22Z" /><path fill="#FBBC05" d="M6.3 13.8a6 6 0 0 1 0-3.6V7.6H2.9a10 10 0 0 0 0 8.8l3.4-2.6Z" /><path fill="#EA4335" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A9.6 9.6 0 0 0 12 2a10 10 0 0 0-9.1 5.6l3.4 2.6C7.1 7.8 9.4 6 12 6Z" /></svg>
        Google ile devam et
      </a>
      <p className="profilimWelcomeSecure">Şifre oluşturmadan Google hesabınla giriş yap.</p>
      {launch.embedded ? <div className="profilimBrowserHelp"><p>Google girişi için bu sayfayı Safari veya Chrome’da aç. Uygulama içindeki tarayıcı Google tarafından desteklenmeyebilir.</p><button type="button" onClick={() => { void navigator.clipboard.writeText("https://goldkozmos.com/profilim").then(() => setCopyMessage("Bağlantı kopyalandı."), () => setCopyMessage("Safari veya Chrome’da goldkozmos.com/profilim adresini aç.")); }}>Profil bağlantısını kopyala</button><p role="status">{copyMessage}</p></div> : null}
      {error ? <p role="alert" className="profilimGoogleError">{error}</p> : null}
    </div>
  );
}
