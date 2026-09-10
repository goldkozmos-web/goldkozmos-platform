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
        text="Supabase oturumu olmadan yönetim alanı açılamaz. Ayrı bir admin şifresi yoktur; Google hesabın ve profil rolün kullanılır."
      />
    );
  }

  if (access.status === "forbidden") {
    return (
      <AdminLocked
        title="Bu alan yalnızca yönetim içindir"
        text="Girişin var, fakat rolün admin değil. Rolünü sen değiştiremezsin; yetki yalnızca veritabanından verilir."
      />
    );
  }

  if (access.status !== "ok") {
    return (
      <AdminLocked
        title="Yönetim Merkezi"
        text="Bu alana yalnızca admin rolüyle girilir."
      />
    );
  }

  return (
    <main className="adminPage">
      <AdminShell actor={access.actor}>{children}</AdminShell>
    </main>
  );
}
