import type { Metadata } from "next";

import AdminLocked from "../../components/admin/AdminLocked";
import AdminShell from "../../components/admin/AdminShell";
import { requireAdminPage } from "../../lib/admin/auth.server";
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
  const access = await requireAdminPage();

  if (access.status === "unconfigured") {
    return (
      <AdminLocked
        title="Yönetim henüz bağlanmadı"
        text="Supabase oturumu olmadan yönetim alanı açılamaz. Ayrı bir admin şifresi yoktur; yalnızca goldkozmos@gmail.com girer."
      />
    );
  }

  if (access.status === "forbidden") {
    return (
      <AdminLocked
        title="Bu alan yalnızca yönetim içindir"
        text="Bu alan yalnızca goldkozmos@gmail.com Google hesabına açıktır."
      />
    );
  }

  if (access.status !== "ok") {
    return (
      <AdminLocked
        title="Yönetim Merkezi"
        text="Bu alana yalnızca goldkozmos@gmail.com ile girilir."
      />
    );
  }

  return (
    <main className="adminPage">
      <AdminShell actor={access.actor}>{children}</AdminShell>
    </main>
  );
}
