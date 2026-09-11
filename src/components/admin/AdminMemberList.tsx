import type { AdminMemberRow } from "../../lib/admin/load";
import AdminEmpty from "./AdminEmpty";

function whenLabel(iso: string | null) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Europe/Istanbul",
  }).format(date);
}

export default function AdminMemberList({
  members,
}: {
  members: AdminMemberRow[];
}) {
  if (members.length === 0) {
    return (
      <AdminEmpty
        eyebrow="Üyeler"
        title="Henüz üye görünmüyor"
        text="Google ile giren üyeler burada listelenir. Kayıt uydurulmaz."
      />
    );
  }

  return (
    <section className="adminList">
      <p className="adminSectionLabel">Mevcut üyeler</p>
      {members.map((member) => (
        <article key={member.id} className="adminMember">
          <div>
            <strong>{member.displayName}</strong>
            <small>
              {member.email ? `${member.email} · ` : ""}
              {member.role === "admin" ? "admin" : "üye"}
              {member.createdAt ? ` · ${whenLabel(member.createdAt)}` : ""}
            </small>
          </div>
        </article>
      ))}
    </section>
  );
}
