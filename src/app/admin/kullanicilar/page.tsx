import AdminEmpty from "../../../components/admin/AdminEmpty";
import { loadAdminMembers } from "../../../lib/admin/load";

export default async function AdminUsersPage() {
  const members = await loadAdminMembers();

  if (members.length === 0) {
    return (
      <AdminEmpty
        eyebrow="Kullanıcılar"
        title="Henüz üye görünmüyor"
        text="Google ile giren üyeler burada listelenir. Sayı uydurulmaz."
      />
    );
  }

  return (
    <section className="adminList">
      {members.map((member) => (
        <article key={member.id} className="adminMember">
          <div>
            <strong>{member.displayName}</strong>
            <small>{member.role}</small>
          </div>
        </article>
      ))}
    </section>
  );
}
