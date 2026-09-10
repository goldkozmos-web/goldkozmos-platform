"use client";

import { useEffect, useState } from "react";

import type { AdminEventRow, AdminVisitorRow } from "../../lib/admin/load";
import AdminEmpty from "./AdminEmpty";

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
  whatsapp,
}: {
  visitors: AdminVisitorRow[];
  whatsapp: AdminEventRow[];
}) {
  const [liveVisitors, setLiveVisitors] = useState(visitors);
  const [wa, setWa] = useState(whatsapp);

  useEffect(() => {
    setLiveVisitors(visitors);
    setWa(whatsapp);
  }, [visitors, whatsapp]);

  useEffect(() => {
    let cancelled = false;

    async function refresh() {
      const response = await fetch("/api/admin/live", { cache: "no-store" });
      if (!response.ok || cancelled) {
        return;
      }
      const data = (await response.json()) as {
        visitors?: AdminVisitorRow[];
        whatsapp?: AdminEventRow[];
      };
      if (data.visitors) {
        setLiveVisitors(data.visitors);
      }
      if (data.whatsapp) {
        setWa(data.whatsapp);
      }
    }

    const timer = window.setInterval(() => {
      void refresh();
    }, 8000);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  if (liveVisitors.length === 0 && wa.length === 0) {
    return (
      <AdminEmpty
        eyebrow="Aktivite"
        title="Henüz ziyaretçi yok"
        text="Anonim gezinenler Ziyaretçi olarak görünür. Giriş kaynağı ve konum, veri gelince burada durur."
      />
    );
  }

  return (
    <div className="adminStack">
      <section className="adminList">
        <p className="adminSectionLabel">Ziyaretçiler</p>
        {liveVisitors.map((visitor) => (
          <article key={visitor.id} className="adminMember">
            <div>
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
        ))}
      </section>

      {wa.length ? (
        <section className="adminList">
          <p className="adminSectionLabel">WhatsApp geçişleri</p>
          {wa.map((item) => (
            <article key={item.id} className="adminMember">
              <div>
                <strong>{item.label}</strong>
                <small>
                  {item.location}
                  {" · "}
                  {item.source}
                </small>
              </div>
              <small>
                {item.path}
                {item.createdAt ? ` · ${whenLabel(item.createdAt)}` : ""}
              </small>
            </article>
          ))}
        </section>
      ) : null}
    </div>
  );
}
