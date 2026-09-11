import AdminEventList from "../../../components/admin/AdminEventList";

export default function AdminAppointmentsPage() {
  return (
    <AdminEventList
      liveKey="appointments"
      eyebrow="Randevular"
      emptyTitle="Bugün randevu geçişi yok"
      emptyText="Randevu Al’dan WhatsApp’a giden ziyaretçiler burada Ziyaretçi olarak görünür."
      items={[]}
    />
  );
}
