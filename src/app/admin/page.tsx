import AdminOverview from "../../components/admin/AdminOverview";
import { loadAdminOverviewMetrics } from "../../lib/admin/load";

export default async function AdminHomePage() {
  const metrics = await loadAdminOverviewMetrics();

  return <AdminOverview metrics={metrics} />;
}
