import type { Metadata } from "next";

import AdminClientGate from "../../components/admin/AdminClientGate";
import "../../styles/admin.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Yönetim",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="adminPage">
      <AdminClientGate>{children}</AdminClientGate>
    </main>
  );
}
