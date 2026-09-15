"use client";

import { useEffect, useState } from "react";

import type { SiteSuggestion } from "../../lib/admin/suggestions";
import { createSupabaseBrowserClient } from "../../lib/supabase/browser";

export default function AdminSuggestionDesk({
  items,
}: {
  items: SiteSuggestion[];
}) {
  const [rows, setRows] = useState(items);

  useEffect(() => {
    setRows(items);
  }, [items]);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;

    async function refresh() {
      const response = await fetch("/api/suggestions", { credentials: "same-origin" });
      const data = (await response.json().catch(() => null)) as { items?: SiteSuggestion[] } | null;
      if (Array.isArray(data?.items)) setRows(data.items);
    }

    const channel = supabase
      .channel("admin-suggestions")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "suggestions" },
        () => {
          void refresh();
        },
      )
      .subscribe((status) => {
        if (status === "CHANNEL_ERROR") {
          console.warn("suggestions realtime bağlanamadı");
        }
      });

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="adminStack">
      <section className="adminList">
        <header className="adminPanelHead">
          <div>
            <p className="adminSectionLabel">Öneriler</p>
            <h2>Gelen kutu</h2>
          </div>
        </header>
        {rows.length === 0 ? (
          <p className="adminHint">Henüz öneri yok. Ayarlar → Gold’a Öneri kayıtları burada durur.</p>
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
