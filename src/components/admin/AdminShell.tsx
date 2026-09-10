"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ADMIN_NAV, type AdminActor } from "../../lib/admin/access";

export default function AdminShell({
  actor,
  children,
}: {
  actor: AdminActor;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="adminShell">
      <header className="adminTop">
        <div>
          <p>GOLDKOZMOS · YÖNETİM</p>
          <h1>Yönetim Merkezi</h1>
        </div>
        <p className="adminActor">
          {actor.displayName}
          <span>admin</span>
          <Link className="adminProfilimLink" href="/profilim">
            Profilim
          </Link>
        </p>
      </header>

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
