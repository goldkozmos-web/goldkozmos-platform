"use client";

import { useEffect } from "react";

import { memberSourceLabel } from "../../lib/admin/members";
import type { AdminMemberRow } from "../../lib/admin/load";
import AdminEmpty from "./AdminEmpty";
import { useAdminLive } from "./AdminLiveProvider";

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

function memberStatus(member: AdminMemberRow) {
  if (member.authUserId) return "aktif";
  return "kayıtlı";
}

export default function AdminMemberList({
  members,
}: {
  members: AdminMemberRow[];
}) {
  const { refresh } = useAdminLive();

  useEffect(() => {
    void fetch("/api/admin/members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sync: true }),
    })
      .then(() => refresh())
      .catch(() => undefined);
  }, [refresh]);

  if (members.length === 0) {
    return (
      <AdminEmpty
        eyebrow="Üyeler"
        title="Henüz üye görünmüyor"
        text="Google veya telefonla girenler otomatik kaydolur."
        quiet
      />
    );
  }

  return (
    <section className="adminList">
      <p className="adminSectionLabel">Üyeler</p>
      {members.map((member) => (
        <article key={member.id} className="adminMember">
          <div>
            <strong>{member.displayName}</strong>
            <small>
              {member.email ? `${member.email} · ` : ""}
              {memberSourceLabel(member.source)}
              {" · "}
              {memberStatus(member)}
              {member.createdAt ? ` · ${whenLabel(member.createdAt)}` : ""}
            </small>
          </div>
          {member.role === "admin" ? <span className="adminBadge">Yönetici</span> : null}
        </article>
      ))}
    </section>
  );
}

export function AdminMemberDesk({ members }: { members: AdminMemberRow[] }) {
  return <AdminMemberList members={members} />;
}
