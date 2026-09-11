import type { Metadata } from "next";

import AdminClientGate from "../../components/admin/AdminClientGate";
import { getAdminAccess } from "../../lib/admin/auth.server";
import "../../styles/admin.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Yönetim Merkezi",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const access = await getAdminAccess();

  return (
    <main className="adminPage">
      <AdminClientGate
        initialStatus={access.status}
        initialActor={"actor" in access ? access.actor : null}
      >
        {children}
      </AdminClientGate>
    </main>
  );
}
