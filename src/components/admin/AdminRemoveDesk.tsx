"use client";

import { useState } from "react";

import { isSiteAdminEmail } from "../../lib/admin/access";
import type { AdminMemberRow } from "../../lib/admin/load";
import AdminEmpty from "./AdminEmpty";
import { createSupabaseBrowserClient } from "../../lib/supabase/browser";
import { useAdminLive } from "./AdminLiveProvider";

async function adminHeaders() {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  const supabase = createSupabaseBrowserClient();
  if (supabase) {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

export default function AdminRemoveDesk({
  members,
}: {
  members: AdminMemberRow[];
}) {
  const { refresh } = useAdminLive();
  const [busyId, setBusyId] = useState("");
  const [error, setError] = useState("");
  const removable = members.filter((member) => !isSiteAdminEmail(member.email));

  async function removeMember(member: AdminMemberRow) {
    const label = member.displayName || member.email || "Bu üye";
    if (!window.confirm(`${label} üyelikten çıkarılsın mı?`)) return;
    setError("");
    setBusyId(member.id);
    const res = await fetch("/api/admin/members", {
      method: "POST",
      headers: await adminHeaders(),
      credentials: "same-origin",
      body: JSON.stringify({
        remove: { email: member.email, id: member.authUserId || member.id },
      }),
    });
    const pack = (await res.json().catch(() => null)) as { error?: string } | null;
    setBusyId("");
    if (!res.ok) {
      setError(pack?.error || "Üye çıkarılamadı.");
      return;
    }
    await refresh();
  }

  if (removable.length === 0) {
    return (
      <AdminEmpty
        eyebrow="Çıkar"
        title="Çıkarılacak üye yok"
        text="Listede yönetici dışında üye görünmüyor."
        quiet
      />
    );
  }

  return (
    <section className="adminPanel">
      <header className="adminPanelHead">
        <div>
          <p className="adminSectionLabel">Çıkar</p>
          <h2>Üyeyi listeden al</h2>
        </div>
      </header>
      <p className="adminSectionLabel">İstediğin kişiyi çıkar. Yönetici kalır.</p>
      {error ? <p className="adminSectionLabel">{error}</p> : null}
      {removable.map((member) => (
        <article key={member.id} className="adminMember">
          <div className="adminMemberCopy">
            <strong>{member.displayName}</strong>
            {member.email ? <em>{member.email}</em> : null}
          </div>
          <button
            type="button"
            className="adminRemoveBtn"
            disabled={busyId === member.id}
            onClick={() => void removeMember(member)}
          >
            {busyId === member.id ? "Çıkarılıyor…" : "Çıkar"}
          </button>
        </article>
      ))}
    </section>
  );
}