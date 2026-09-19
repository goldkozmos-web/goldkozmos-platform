"use client";

import { useEffect, useState } from "react";

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

export default function AdminMemberList({
  members,
}: {
  members: AdminMemberRow[];
}) {
  const { refresh } = useAdminLive();
  const [syncNote, setSyncNote] = useState("");

  useEffect(() => {
    async function syncRoster() {
      const headers: HeadersInit = { "Content-Type": "application/json" };
      const supabase = createSupabaseBrowserClient();
      if (supabase) {
        const { data } = await supabase.auth.getSession();
        const token = data.session?.access_token;
        if (token) headers.Authorization = `Bearer ${token}`;
      }
      const res = await fetch("/api/admin/members", {
        method: "POST",
        headers,
        credentials: "same-origin",
        body: JSON.stringify({ sync: true }),
      });
      const json = (await res.json().catch(() => null)) as
        | { ok?: boolean; saved?: number; total?: number; error?: string }
        | null;
      if (json?.ok && typeof json.saved === "number" && json.saved > 0) {
        setSyncNote(`${json.saved} yeni üye kaydı düştü`);
      } else {
        setSyncNote("");
      }
      await refresh();
    }

    void syncRoster().catch(() => undefined);
  }, [refresh]);

  if (members.length === 0) {
    return (
      <AdminEmpty
        eyebrow="Üyeler"
        title="Henüz üye yok"
        text="Google ile giren herkes bu listeye düşer. Senkron çalışınca kayıt burada kalır."
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
        <span className="adminBadge">{members.length}</span>
      </header>
      {syncNote ? <p className="adminRosterNote">{syncNote}</p> : null}
      {members.map((member) => (
        <article key={member.id} className="adminMember">
          {member.avatarUrl ? (
            <img src={member.avatarUrl} alt="" width={36} height={36} style={{ borderRadius: "50%" }} />
          ) : null}
          <div className="adminMemberCopy">
            <strong>{member.displayName}</strong>
            {member.email ? <em>{member.email}</em> : null}
            <small>
              {member.role === "admin" ? "Yönetici" : "Üye"}
              {` · ${memberSourceLabel(member.source)}`}
              {member.createdAt ? ` · üyelik ${whenLabel(member.createdAt)}` : ""}
              {member.lastSignInAt ? ` · giriş ${whenLabel(member.lastSignInAt)}` : ""}
              {member.lastActiveAt ? ` · aktif ${whenLabel(member.lastActiveAt)}` : ""}
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
