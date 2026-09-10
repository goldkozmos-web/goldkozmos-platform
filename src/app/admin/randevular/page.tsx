import type { Metadata } from "next";
import { redirect } from "next/navigation";

import AdminAppointmentsScreen from "../../../components/appointments/AdminAppointmentsScreen";
import Navbar from "../../../components/Navbar";
import { getGoldBlogSessionUser } from "../../../lib/goldblog/session";
import "../../../styles/home.css";
import "../../../styles/appointments-admin.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Canlı Randevular",
  robots: { index: false, follow: false },
};

export default async function AdminAppointmentsPage() {
  const user = await getGoldBlogSessionUser();

  if (!user) {
    redirect("/profilim");
  }

  if (!user.isAdmin) {
    return (
      <main className="appointmentsAdminPage">
        <Navbar />
        <section className="appointmentsAdminDenied">
          <p className="appointmentsAdminEyebrow">YETKİ</p>
          <h1>Bu ekran yalnızca admin içindir.</h1>
          <p>Giriş yaptığın hesapta admin kaydı yok.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="appointmentsAdminPage">
      <Navbar />
      <AdminAppointmentsScreen />
    </main>
  );
}
