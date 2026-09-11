"use client";

import { usePathname } from "next/navigation";

import { ADMIN_NAV, type AdminActor } from "../../lib/admin/access";
import { AdminLiveProvider, useAdminLive } from "./AdminLiveProvider";
import { AdminGearIcon, AdminNavIcon } from "./AdminIcons";

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

function AdminChrome({
  actor,
  children,
}: {
  actor: AdminActor;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { toast, notifyReady, toggleNotify } = useAdminLive();

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
        <a className="adminGear" href="/profilim" aria-label="Profilim">
          <AdminGearIcon />
        </a>
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
        </div>
        <p className="adminNotifyHint">
          Telefona düşmesi için siteyi Ana Ekran’a ekle, Yönetim’i oradan aç.
        </p>
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