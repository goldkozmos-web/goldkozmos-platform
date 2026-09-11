"use client";

import { usePathname } from "next/navigation";

import { ADMIN_NAV, type AdminActor } from "../../lib/admin/access";
import { AdminLiveProvider, useAdminLive } from "./AdminLiveProvider";

function todayLabel() {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Istanbul",
  }).format(new Date());
}

function AdminChrome({
  actor,
  children,
}: {
  actor: AdminActor;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { toast, notifyReady, enableNotify } = useAdminLive();

  return (
    <div className="adminShell">
      <header className="adminTop">
        <div className="adminBrand">
          <p>GoldKozmos</p>
          <h1>Yönetim</h1>
          <span className="adminLead">
            Bugünün ziyareti, açık sekmeler ve üyeler.
          </span>
          <span className="adminDate">{todayLabel()}</span>
        </div>
        <p className="adminActor">
          <strong>{actor.displayName}</strong>
          {actor.email ? <em>{actor.email}</em> : null}
          <span>Yönetici</span>
        </p>
        <div className="adminExitRow">
          <a className="adminSiteJump" href="/">
            Siteye dön
          </a>
          <a className="adminProfilimLink" href="/profilim">
            Profilim
          </a>
          {notifyReady ? (
            <span className="adminNotifyOn">Bildirimler açık</span>
          ) : (
            <button type="button" className="adminNotifyBtn" onClick={enableNotify}>
              Bildirimleri aç
            </button>
          )}
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
