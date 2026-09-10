import AdminEventList from "../../../components/admin/AdminEventList";
import { loadAdminLive } from "../../../lib/admin/load";

export const dynamic = "force-dynamic";

export default async function AdminPurchasesPage() {
  const live = await loadAdminLive();

  return (
    <AdminEventList
      eyebrow="Satın Almalar"
      emptyTitle="Bugün satın alma tıklaması yok"
      emptyText="Shopier’e giden ziyaretçiler burada Ziyaretçi olarak görünür."
      items={live.purchases}
    />
  );
}
