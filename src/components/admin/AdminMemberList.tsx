"use client";

import { useEffect, useState } from "react";

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
        text="Google ile girenler otomatik alınır. E-posta ile de ekleyebilirsin."
        quiet
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
              {memberSourceLabel(member.source)}
              {member.authUserId ? " · giriş yaptı" : " · henüz giriş yok"}
              {member.createdAt ? ` · ${whenLabel(member.createdAt)}` : ""}
            </small>
          </div>
          {member.role === "admin" ? <span className="adminBadge">Yönetici</span> : null}
        </article>
      ))}
    </section>
  );
}

export function AdminMemberDesk({
  members,
  compact = false,
}: {
  members: AdminMemberRow[];
  compact?: boolean;
}) {
  const { refresh } = useAdminLive();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    void fetch("/api/admin/members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sync: true }),
    })
      .then(() => refresh())
      .catch(() => undefined);
  }, [refresh]);

  async function addMember(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setStatus("");

    const response = await fetch("/api/admin/members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ displayName, email }),
    });
    const data = (await response.json()) as { error?: string };

    setPending(false);

    if (!response.ok) {
      setStatus(data.error || "Üye eklenemedi.");
      return;
    }

    setDisplayName("");
    setEmail("");
    setStatus("Üyelik kalıcı kaydedildi.");
    await refresh();
  }

  const form = (
    <form className="adminCompose" onSubmit={(event) => void addMember(event)}>
      <header className="adminPanelHead">
        <div>
          <p className="adminSectionLabel">Kalıcı üye ekle</p>
          <h2>Yeni üyelik</h2>
        </div>
      </header>
      <div className="adminFields">
        <label>
          Ad
          <input
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            placeholder="Arkadaşının adı"
            maxLength={80}
            required
          />
        </label>
        <label>
          E-posta
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="ornek@gmail.com"
            maxLength={120}
            required
          />
        </label>
      </div>
      <button type="submit" disabled={pending}>
        {pending ? "Kaydediliyor…" : "Üyeliği kaydet"}
      </button>
      {status ? <p className="adminHint">{status}</p> : null}
    </form>
  );

  if (compact) {
    return form;
  }

  return (
    <div className="adminStack">
      {form}
      <AdminMemberList members={members} />
    </div>
  );
}
