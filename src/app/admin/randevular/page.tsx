import AdminEventList from "../../../components/admin/AdminEventList";
import { loadAdminLive } from "../../../lib/admin/load";

export const dynamic = "force-dynamic";

export default async function AdminAppointmentsPage() {
  const live = await loadAdminLive();

  return (
    <AdminEventList
      eyebrow="Randevular"
      emptyTitle="Bugün randevu geçişi yok"
      emptyText="Randevu Al’dan WhatsApp’a giden ziyaretçiler burada Ziyaretçi olarak görünür."
      items={live.appointments}
    />
  );
}
