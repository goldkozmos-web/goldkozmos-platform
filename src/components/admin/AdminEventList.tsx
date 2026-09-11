"use client";

import AdminEmpty from "./AdminEmpty";
import { useAdminLive } from "./AdminLiveProvider";
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
  liveKey,
}: {
  eyebrow: string;
  emptyTitle: string;
  emptyText: string;
  items: AdminEventRow[];
  liveKey?: "whatsapp" | "purchases" | "appointments";
}) {
  const { live } = useAdminLive();
  const rows = (liveKey && live?.[liveKey]) || items;

  if (rows.length === 0) {
    return (
      <AdminEmpty eyebrow={eyebrow} title={emptyTitle} text={emptyText} />
    );
  }

  return (
    <section className="adminList">
      {rows.map((item) => (
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
