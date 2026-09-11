import AdminEventList from "../../../components/admin/AdminEventList";

export default function AdminWhatsappPage() {
  return (
    <AdminEventList
      liveKey="whatsapp"
      eyebrow="WhatsApp"
      emptyTitle="Bugün WhatsApp geçişi yok"
      emptyText="Siteden WhatsApp’a giden ziyaretçiler burada Ziyaretçi olarak görünür."
      items={[]}
    />
  );
}
