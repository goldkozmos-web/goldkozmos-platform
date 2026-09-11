import AdminMessageDesk from "../../../components/admin/AdminMessageDesk";
import { loadAdminMembers } from "../../../lib/admin/load";
import { listSentMessages } from "../../../lib/messages/server";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const [members, sent] = await Promise.all([
    loadAdminMembers(),
    listSentMessages(),
  ]);

  return <AdminMessageDesk members={members} sent={sent} />;
}
