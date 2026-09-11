function Icon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const NAV: Record<string, string> = {
  "/admin": "M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z",
  "/admin/kullanicilar": "M16 19v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1M12 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M20 19v-1a3.5 3.5 0 0 0-2.6-3.4M16.5 7.2a3 3 0 0 1 0 5.6",
  "/admin/mesajlar": "M5 6h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H9l-4 3v-3H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z",
  "/admin/aktivite": "M4 14h3l2-6 3 10 2-7 2 3h4",
  "/admin/randevular": "M7 4v2M17 4v2M5 9h14M6 7h12a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z",
  "/admin/satin-almalar": "M6 7h15l-1.4 8H8L6 7zM6 7 5 4H3M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2M18 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2",
  "/admin/icerikler": "M7 4h8l4 4v12H7zM15 4v4h4",
  "/admin/oneriler": "M12 3 14.2 8.6 20 9.2 16 13.4 17.2 19 12 16.2 6.8 19 8 13.4 4 9.2 9.8 8.6z",
  "/admin/bildirimler": "M6 9a6 6 0 1 1 12 0c0 5 2 6.5 2 6.5H4S6 14 6 9zM10 19a2 2 0 0 0 4 0",
};

const METRIC: Record<string, string> = {
  visits: "M4 14h3l2-6 3 10 2-7 2 3h4",
  live: "M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
  members: "M16 19v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1M12 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7",
  appointments: "M7 4v2M17 4v2M5 9h14M6 7h12a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z",
  whatsapp: "M5 6h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H9l-4 3v-3H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z",
  purchases: "M6 7h15l-1.4 8H8L6 7zM6 7 5 4H3",
  notifications: "M6 9a6 6 0 1 1 12 0c0 5 2 6.5 2 6.5H4S6 14 6 9z",
  suggestions: "M12 3 14.2 8.6 20 9.2 16 13.4 17.2 19 12 16.2 6.8 19 8 13.4 4 9.2 9.8 8.6z",
};

export function AdminNavIcon({ href }: { href: string }) {
  return <Icon path={NAV[href] || NAV["/admin"]} />;
}

export function AdminMetricIcon({ id }: { id: string }) {
  return <Icon path={METRIC[id] || METRIC.visits} />;
}

export function AdminGearIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 15.2A3.2 3.2 0 1 0 12 8.8a3.2 3.2 0 0 0 0 6.4zM19.4 13a7.6 7.6 0 0 0 .1-2l2-1.5-1.8-3.2-2.4.6a7.7 7.7 0 0 0-1.7-1L15.2 3h-6.4L8.4 5.9a7.7 7.7 0 0 0-1.7 1L4.3 6.3 2.5 9.5 4.5 11a7.6 7.6 0 0 0 0 2l-2 1.5 1.8 3.2 2.4-.6a7.7 7.7 0 0 0 1.7 1L8.8 21h6.4l.4-2.9a7.7 7.7 0 0 0 1.7-1l2.4.6 1.8-3.2z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}