import AdminEmpty from "./AdminEmpty";
import type { AdminEventRow } from "../../lib/admin/load";

function whenLabel(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Istanbul",
  }).format(date);
}

export default function AdminEventList({
  eyebrow,
  emptyTitle,
  emptyText,
  items,
}: {
  eyebrow: string;
  emptyTitle: string;
  emptyText: string;
  items: AdminEventRow[];
}) {
  if (items.length === 0) {
    return (
      <AdminEmpty eyebrow={eyebrow} title={emptyTitle} text={emptyText} />
    );
  }

  return (
    <section className="adminList">
      {items.map((item) => (
        <article key={item.id} className="adminMember">
          <div>
            <strong>{item.label}</strong>
            <small>
              {item.location}
              {" · "}
              {item.source}
              {" · "}
              {item.path}
            </small>
          </div>
          <small>{whenLabel(item.createdAt)}</small>
        </article>
      ))}
    </section>
  );
}
