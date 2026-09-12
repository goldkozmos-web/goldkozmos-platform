"use client";

import { useEffect, useState } from "react";

import { ACTIVITY_KIND_LABEL, type UserActivityItem } from "../../lib/daily/types";
import { fetchActivity } from "../../lib/daily/client";
import ProfilimEmptyState from "../profilim/ProfilimEmptyState";

function formatWhen(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("tr-TR", { dateStyle: "medium", timeStyle: "short" });
}

export default function ActivityTimelinePanel() {
  const [items, setItems] = useState<UserActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void fetchActivity().then((next) => {
      setItems(next);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <ProfilimEmptyState text="İlerleme geçmişin açılıyor…" />;
  }

  if (items.length === 0) {
    return (
      <ProfilimEmptyState text="Henüz kayıtlı bir adım yok. Günlük eylem, duygu kaydı ve tamamlanan çalışmalar burada birikir." />
    );
  }

  return (
    <ol className="profilimDrawerList">
      {items.map((item) => (
        <li key={item.id}>
          <span>{ACTIVITY_KIND_LABEL[item.kind] || item.kind}</span>
          <strong>{item.title}</strong>
          <small>{formatWhen(item.createdAt)}</small>
          {item.href ? <a href={item.href}>Aç</a> : null}
        </li>
      ))}
    </ol>
  );
}
