import AdminEventList from "../../../components/admin/AdminEventList";
import AdminSalesOutcomes from "../../../components/admin/AdminSalesOutcomes";

export default function AdminPurchasesPage() {
  return (
    <div className="adminStack"><AdminSalesOutcomes /><AdminEventList
      liveKey="purchases"
      eyebrow="Shopier bağlantısına geçişler"
      emptyTitle="Bugün tıklama yok"
      emptyText="Shopier bağlantısına tıklamalar burada görünür. Bunlar doğrulanmış satış değildir."
      items={[]}
    /></div>
  );
}
