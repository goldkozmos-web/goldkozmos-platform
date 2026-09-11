import AdminSuggestionDesk from "../../../components/admin/AdminSuggestionDesk";
import { listSiteSuggestions } from "../../../lib/admin/suggestion-log";

export const dynamic = "force-dynamic";

export default async function AdminSuggestionsPage() {
  const items = await listSiteSuggestions();
  return <AdminSuggestionDesk items={items} />;
}
