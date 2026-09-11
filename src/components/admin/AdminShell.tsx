"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { ADMIN_NAV, type AdminActor } from "../../lib/admin/access";
import { AdminLiveProvider, useAdminLive } from "./AdminLiveProvider";
import { AdminNavIcon } from "./AdminIcons";

function todayLabel() {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Istanbul",
  }).format(new Date());
}

function initialFrom(name: string) {
  return (name.trim().charAt(0) || "G").toUpperCase();
}

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
};

function AdminChrome({
  actor,
  children,
}: {
  actor: AdminActor;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { toast, notifyReady, toggleNotify } = useAdminLive();
  const [install, setInstall] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    function onPrompt(event: Event) {
      event.preventDefault();
      setInstall(event as BeforeInstallPromptEvent);
    }
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  return (
    <div className="adminShell">
      <header className="adminTop">
        <div className="adminHeroPerson">
          {actor.avatarUrl ? (
            <img className="adminAvatar" src={actor.avatarUrl} alt="" />
          ) : (
            <span className="adminAvatar">{initialFrom(actor.displayName)}</span>
          )}
          <div>
            <h1>{actor.displayName}</h1>
            <span className="adminLevel">Yönetici</span>
          </div>
        </div>
        <p className="adminLead">
          GoldKozmos masa · {todayLabel()}
        </p>
        <div className="adminExitRow">
          <a className="adminSiteJump" href="/">
            Siteye dön
          </a>
          <button
            type="button"
            className={`adminNotifyBtn${notifyReady ? " isOn" : " isOff"}`}
            aria-pressed={notifyReady}
            onClick={toggleNotify}
          >
            {notifyReady ? "Bildirimler açık" : "Bildirimler kapalı"}
          </button>
          {install ? (
            <button
              type="button"
              className="adminNotifyBtn"
              onClick={() => {
                void install.prompt();
                setInstall(null);
              }}
            >
              Ana ekrana ekle
            </button>
          ) : null}
        </div>
      </header>

      {toast ? (
        <div className="adminToast" role="status">
          <strong>{toast.title}</strong>
          <span>{toast.body}</span>
        </div>
      ) : null}

      <div className="adminBody">{children}</div>

      <nav className="adminNav" aria-label="Yönetim">
        {ADMIN_NAV.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <a
              key={item.href}
              href={item.href}
              className={active ? "isOn" : undefined}
            >
              <span className="adminNavIcon">
                <AdminNavIcon href={item.href} />
              </span>
              {item.label}
            </a>
          );
        })}
      </nav>
    </div>
  );
}

export default function AdminShell({
  actor,
  children,
}: {
  actor: AdminActor;
  children: React.ReactNode;
}) {
  return (
    <AdminLiveProvider>
      <AdminChrome actor={actor}>{children}</AdminChrome>
    </AdminLiveProvider>
  );
}