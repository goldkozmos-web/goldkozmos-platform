"use client";

import { useState } from "react";

import type { AdminMemberRow } from "../../lib/admin/load";
import type { MemberMessage } from "../../lib/messages/types";

export default function AdminMessageDesk({
  members,
  sent,
}: {
  members: AdminMemberRow[];
  sent: MemberMessage[];
}) {
  const [recipientId, setRecipientId] = useState("all");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  const [outbox, setOutbox] = useState(sent);

  async function send(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setStatus("");
    const nextTitle = title.trim();
    const nextBody = body.trim();

    const response = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipientId, title: nextTitle, body: nextBody }),
    });
    const data = (await response.json()) as { error?: string; count?: number };

    setPending(false);

    if (!response.ok) {
      setStatus(data.error || "Gönderilemedi.");
      return;
    }

    setStatus(
      data.count && data.count > 1
        ? `${data.count} üyeye gönderildi.`
        : "Mesaj gönderildi.",
    );
    setTitle("");
    setBody("");
    setOutbox((current) => [
      {
        id: crypto.randomUUID(),
        title: nextTitle,
        body: nextBody,
        createdAt: new Date().toISOString(),
        readAt: null,
        recipientName:
          recipientId === "all"
            ? "Tüm üyeler"
            : members.find((member) => member.id === recipientId)?.displayName,
      },
      ...current,
    ]);
  }

  return (
    <div className="adminStack">
      <form className="adminCompose" onSubmit={(event) => void send(event)}>
        <p className="adminSectionLabel">Üyelere mesaj gönder</p>
        <label>
          Alıcı
          <select
            value={recipientId}
            onChange={(event) => setRecipientId(event.target.value)}
          >
            <option value="all">Tüm üyeler</option>
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.displayName}
              </option>
            ))}
          </select>
        </label>
        <label>
          Başlık
          <input
            value={title}
            maxLength={80}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Kısa başlık"
          />
        </label>
        <label>
          Mesaj
          <textarea
            value={body}
            maxLength={2000}
            rows={5}
            onChange={(event) => setBody(event.target.value)}
            placeholder="Üyelerin Gelen Mesajlar kutusuna düşer."
          />
        </label>
        <button type="submit" disabled={pending}>
          {pending ? "Gönderiliyor…" : "Gönder"}
        </button>
        {status ? <small>{status}</small> : null}
      </form>

      <section className="adminList">
        <p className="adminSectionLabel">Gönderilenler</p>
        {outbox.length === 0 ? (
          <p className="adminHint">Henüz gönderilmiş mesaj yok.</p>
        ) : (
          outbox.map((item) => (
            <article key={item.id} className="adminMember">
              <div>
                <strong>{item.title}</strong>
                <small>
                  {item.recipientName || "Üye"}
                  {" · "}
                  {item.body}
                </small>
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
