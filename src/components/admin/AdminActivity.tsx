"use client";

import type { AdminVisitorRow } from "../../lib/admin/load";
import AdminEmpty from "./AdminEmpty";
import { useAdminLive } from "./AdminLiveProvider";

function whenLabel(iso: string | null) {
  if (!iso) {
    return "";
  }

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

export default function AdminActivity({
  visitors,
}: {
  visitors: AdminVisitorRow[];
}) {
  const { live } = useAdminLive();
  const liveVisitors = live?.visitors ?? visitors;

  if (liveVisitors.length === 0) {
    return (
      <AdminEmpty
        eyebrow="Hareket"
        title="Henüz ziyaretçi yok"
        text="Anonim gezinenler burada görünür. Giriş kaynağı ve konum, veri gelince durur."
      />
    );
  }

  return (
    <div className="adminStack">
      <section className="adminList">
        <p className="adminSectionLabel">Ziyaretçiler</p>
        {liveVisitors.map((visitor) => {
          return (
            <article key={visitor.id} className="adminMember">
              <div className="adminMemberCopy">
                <strong>
                  {visitor.label}
                  {visitor.live ? " · canlı" : ""}
                </strong>
                <small>
                  {visitor.location}
                  {" · giriş "}
                  {visitor.entry}
                </small>
              </div>
              <small>
                {visitor.path}
                {visitor.lastSeenAt ? ` · ${whenLabel(visitor.lastSeenAt)}` : ""}
              </small>
            </article>
          );
        })}
      </section>
    </div>
  );
}
