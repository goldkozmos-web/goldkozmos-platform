import AdminEventList from "../../../components/admin/AdminEventList";

export default function AdminPurchasesPage() {
  return (
    <AdminEventList
      liveKey="purchases"
      eyebrow="Satın Almalar"
      emptyTitle="Bugün satın alma tıklaması yok"
      emptyText="Shopier’e giden ziyaretçiler burada Ziyaretçi olarak görünür."
      items={[]}
    />
  );
}
