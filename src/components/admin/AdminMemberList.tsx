"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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
  const [syncError, setSyncError] = useState("");
  const [syncing, setSyncing] = useState(false);
  const syncInFlight = useRef(false);

  const syncRoster = useCallback(async () => {
    if (syncInFlight.current) return;
    syncInFlight.current = true;
    setSyncing(true);
    try {
      const headers: HeadersInit = { "Content-Type": "application/json" };
      const supabase = createSupabaseBrowserClient();
      if (supabase) {
        const { data } = await supabase.auth.getSession();
        const token = data.session?.access_token;
        if (token) headers.Authorization = `Bearer ${token}`;
      }
      const response = await fetch("/api/admin/members", {
        method: "POST",
        headers,
        credentials: "same-origin",
        body: JSON.stringify({ sync: true }),
      });
      if (!response.ok) {
        const pack = await response.json().catch(() => null) as { error?: string } | null;
        setSyncError(pack?.error || "Üye eşitlemesi tamamlanamadı. Mevcut kayıtlar gösteriliyor; yeniden deneyebilirsin.");
      }
      else setSyncError("");
      await refresh();
    } catch {
      setSyncError("Üye eşitlemesine bağlanılamadı. Yeniden deneyebilirsin.");
    } finally {
      syncInFlight.current = false;
      setSyncing(false);
    }
  }, [refresh]);

  useEffect(() => { void syncRoster(); }, [syncRoster]);

  if (members.length === 0) {
    return (
      <div>
      <button type="button" className="adminQuietButton" onClick={() => void syncRoster()} disabled={syncing}>{syncing ? "Yenileniyor…" : "Listeyi yenile"}</button>
      <AdminEmpty
        eyebrow="Üyeler"
        title={syncError ? "Üyeler yüklenemedi" : "Henüz üye yok"}
        text={syncError || "Google ile giriş yapan üyeler burada görünür."}
        quiet
      />
      </div>
    );
  }

  return (
    <section className="adminPanel">
      {syncError ? <p className="adminConnectionError" role="alert">{syncError}</p> : null}
      <header className="adminPanelHead">
        <div>
          <p className="adminSectionLabel">Üyeler</p>
          <h2>Kayıtlı kişiler</h2>
        </div>
        <button type="button" className="adminQuietButton" onClick={() => void syncRoster()} disabled={syncing}>{syncing ? "Yenileniyor…" : "Listeyi yenile"}</button>
      </header>
      {members.map((member) => (
        <article key={member.id} className="adminMember">
          <div className="adminMemberCopy">
            <strong>{member.displayName}</strong>
            {member.email ? <em>{member.email}</em> : null}
            <small>
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
