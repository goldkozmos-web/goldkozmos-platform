"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ADMIN_NAV, type AdminActor } from "../../lib/admin/access";
import { AdminLiveProvider, useAdminLive } from "./AdminLiveProvider";

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
          <p>GoldKozmos · Yönetim</p>
          <h1>Yönetim Merkezi</h1>
          <span className="adminLead">
            Canlı ziyaret, üyeler ve bugünün hareketi tek masada.
          </span>
        </div>
        <p className="adminActor">
          <strong>{actor.displayName}</strong>
          <span>Yönetici</span>
        </p>
      </header>

      <div className="adminExitRow">
        <Link className="adminSiteJump" href="/">
          Siteye dön
        </Link>
        <Link className="adminProfilimLink" href="/profilim">
          Profilim
        </Link>
        {notifyReady ? (
          <span className="adminNotifyOn">Bildirim açık</span>
        ) : (
          <button type="button" className="adminNotifyBtn" onClick={enableNotify}>
            Bildirimleri aç
          </button>
        )}
      </div>

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
            <Link
              key={item.href}
              href={item.href}
              className={active ? "isOn" : undefined}
            >
              {item.label}
            </Link>
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
