"use client";

import { useState } from "react";

import type { SiteSuggestion } from "../../lib/admin/suggestions";

export default function AdminSuggestionDesk({
  items,
}: {
  items: SiteSuggestion[];
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  const [rows, setRows] = useState(items);

  async function send(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setStatus("");
    const nextTitle = title.trim();
    const nextBody = body.trim();

    const response = await fetch("/api/suggestions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: nextTitle, body: nextBody }),
    });
    const data = (await response.json()) as {
      error?: string;
      suggestion?: SiteSuggestion;
    };

    setPending(false);

    if (!response.ok) {
      setStatus(data.error || "Kaydedilemedi.");
      return;
    }

    setStatus("Öneri kaydedildi.");
    setTitle("");
    setBody("");
    if (data.suggestion) {
      setRows((current) => [data.suggestion as SiteSuggestion, ...current]);
    }
  }

  return (
    <div className="adminStack">
      <form className="adminCompose" onSubmit={(event) => void send(event)}>
        <header className="adminPanelHead">
          <div>
            <p className="adminSectionLabel">Öneriler</p>
            <h2>Gelen kutu</h2>
          </div>
        </header>
        <label>
          Başlık
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Kısa başlık"
            maxLength={80}
          />
        </label>
        <label>
          Öneri
          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder="Notunu yaz."
            maxLength={900}
            required
          />
        </label>
        <button type="submit" disabled={pending}>
          {pending ? "Kaydediliyor…" : "Kaydet"}
        </button>
        {status ? <small>{status}</small> : null}
      </form>

      <section className="adminList">
        <p className="adminSectionLabel">Kayıtlar</p>
        {rows.length === 0 ? (
          <p className="adminHint">Henüz öneri yok. Profilim’den gelenler burada durur.</p>
        ) : (
          rows.map((item) => (
            <article key={item.id} className="adminMember">
              <div className="adminMemberCopy">
                <strong>{item.title}</strong>
                <em>{item.name}</em>
                <small>{item.body}</small>
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
