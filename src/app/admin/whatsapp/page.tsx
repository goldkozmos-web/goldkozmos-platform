import AdminEventList from "../../../components/admin/AdminEventList";

export default function AdminWhatsappPage() {
  return (
    <AdminEventList
      liveKey="whatsapp"
      eyebrow="WhatsApp"
      emptyTitle="Henüz geçiş yok"
      emptyText="Siteden WhatsApp’a giden tıklamalar gece silinmez; geçmişten bugüne burada durur."
      items={[]}
    />
  );
}
