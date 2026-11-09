import AdminEventList from "../../../components/admin/AdminEventList";
import AdminSalesOutcomes from "../../../components/admin/AdminSalesOutcomes";

export default function AdminAppointmentsPage() {
  return (
    <div className="adminStack"><AdminSalesOutcomes /><AdminEventList
      liveKey="appointments"
      eyebrow="Randevular"
      emptyTitle="Bugün geçiş yok"
      emptyText="Randevu Al’dan WhatsApp’a giden ziyaretçiler burada görünür."
      items={[]}
    /></div>
  );
}
