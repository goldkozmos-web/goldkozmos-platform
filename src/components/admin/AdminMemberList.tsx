"use client";

import { useEffect } from "react";

import { memberSourceLabel } from "../../lib/admin/members";
import { MEMBER_INTERESTS } from "../../lib/auth/membership";
import type { AdminMemberRow } from "../../lib/admin/load";
import AdminEmpty from "./AdminEmpty";
import { createSupabaseBrowserClient } from "../../lib/supabase/browser";
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

function memberDetails(member: AdminMemberRow) {
  const labels = new Map<string, string>(
    MEMBER_INTERESTS.map((item) => [item.id, item.label]),
  );
  const interests = (member.interests ?? "")
    .split(",")
    .map((item) => labels.get(item.trim()) || item.trim())
    .filter(Boolean)
    .join(", ");
  return [member.city, member.age ? `${member.age} yaş` : "", member.phone, interests]
    .filter(Boolean)
    .join(" · ");
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
    async function syncRoster() {
      const headers: HeadersInit = { "Content-Type": "application/json" };
      const supabase = createSupabaseBrowserClient();
      if (supabase) {
        const { data } = await supabase.auth.getSession();
        const token = data.session?.access_token;
        if (token) headers.Authorization = `Bearer ${token}`;
      }
      await fetch("/api/admin/members", {
        method: "POST",
        headers,
        credentials: "same-origin",
        body: JSON.stringify({ sync: true }),
      });
      await refresh();
    }

    void syncRoster().catch(() => undefined);
  }, [refresh]);

  if (members.length === 0) {
    return (
      <AdminEmpty
        eyebrow="Üyeler"
        title="Henüz üye görünmüyor"
        text="Google ile giren herkes hemen bu listeye düşer. Eski girişler, kişi siteye bir kez daha girince görünür."
        quiet
      />
    );
  }

  return (
    <section className="adminPanel">
      <header className="adminPanelHead">
        <div>
          <p className="adminSectionLabel">Üyeler</p>
          <h2>Kayıtlı kişiler</h2>
        </div>
      </header>
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
              {memberDetails(member) ? ` · ${memberDetails(member)}` : ""}
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
