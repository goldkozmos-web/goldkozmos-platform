import AdminActivity from "../../../components/admin/AdminActivity";
import { loadAdminLive } from "../../../lib/admin/load";

export const dynamic = "force-dynamic";

export default async function AdminActivityPage() {
  const live = await loadAdminLive();

  return (
    <AdminActivity visitors={live.visitors} whatsapp={live.whatsapp} />
  );
}
