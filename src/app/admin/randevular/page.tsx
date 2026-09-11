import AdminEventList from "../../../components/admin/AdminEventList";

export default function AdminAppointmentsPage() {
  return (
    <AdminEventList
      liveKey="appointments"
      eyebrow="Randevular"
      emptyTitle="Bugün geçiş yok"
      emptyText="Randevu Al’dan WhatsApp’a giden ziyaretçiler burada görünür."
      items={[]}
    />
  );
}
