"use client";

import { useEffect, useState } from "react";
import type { AdminVisitorRow } from "../../lib/admin/load";
import { formatVisitorDuration, visitorDurationSeconds } from "../../lib/admin/visitor-duration";

export default function AdminVisitorDuration({ visitor }: { visitor: AdminVisitorRow }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);
  const seconds = visitorDurationSeconds(visitor.pageStartedAt, visitor.lastSeenAt, visitor.live, now ?? Date.parse(visitor.lastSeenAt ?? ""));
  return <small className="adminVisitorDuration">Bu sayfada: {formatVisitorDuration(seconds)}{seconds !== null ? " · yaklaşık" : ""}</small>;
}
