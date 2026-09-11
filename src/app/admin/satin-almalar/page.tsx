import AdminEventList from "../../../components/admin/AdminEventList";

export default function AdminPurchasesPage() {
  return (
    <AdminEventList
      liveKey="purchases"
      eyebrow="Satın Almalar"
      emptyTitle="Bugün tıklama yok"
      emptyText="Shopier’e giden ziyaretçiler burada görünür."
      items={[]}
    />
  );
}
