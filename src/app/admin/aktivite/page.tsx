import AdminActivity from "../../../components/admin/AdminActivity";
import AdminVisitHistory from "../../../components/admin/AdminVisitHistory";

export default function AdminActivityPage() {
  return <div className="adminStack"><AdminVisitHistory /><AdminActivity visitors={[]} /></div>;
}
