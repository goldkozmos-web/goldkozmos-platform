import AdminOverview from "../../components/admin/AdminOverview";
import { emptyAdminMetrics } from "../../lib/admin/access";

export default function AdminHomePage() {
  return <AdminOverview metrics={emptyAdminMetrics()} />;
}
