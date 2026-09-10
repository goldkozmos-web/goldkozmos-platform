export const ADMIN_ROLES = ["user", "admin"] as const;

export type AdminRole = (typeof ADMIN_ROLES)[number];

export type AdminActor = {
  id: string;
  displayName: string;
  email: string | null;
  avatarUrl: string | null;
  role: AdminRole;
};

export type AdminNavItem = {
  href: string;
  label: string;
};

export const ADMIN_NAV: AdminNavItem[] = [
  { href: "/admin", label: "Genel Bakış" },
  { href: "/admin/kullanicilar", label: "Kullanıcılar" },
  { href: "/admin/aktivite", label: "Aktivite" },
  { href: "/admin/randevular", label: "Randevular" },
  { href: "/admin/satin-almalar", label: "Satın Almalar" },
  { href: "/admin/icerikler", label: "İçerikler" },
  { href: "/admin/oneriler", label: "Öneriler" },
  { href: "/admin/bildirimler", label: "Bildirimler" },
];

export type AdminOverviewCardId =
  | "visits"
  | "live"
  | "members"
  | "appointments"
  | "whatsapp"
  | "purchases"
  | "notifications"
  | "suggestions";

export type AdminOverviewCard = {
  id: AdminOverviewCardId;
  title: string;
  href: string;
  hasSource: boolean;
  empty: string;
};

export const ADMIN_OVERVIEW_CARDS: AdminOverviewCard[] = [
  {
    id: "visits",
    title: "Ziyaretler",
    href: "/admin/aktivite",
    hasSource: true,
    empty: "Bugün yok",
  },
  {
    id: "live",
    title: "Canlı",
    href: "/admin/aktivite",
    hasSource: true,
    empty: "Şu an yok",
  },
  {
    id: "members",
    title: "Yeni üye",
    href: "/admin/kullanicilar",
    hasSource: true,
    empty: "Bugün yok",
  },
  {
    id: "appointments",
    title: "Randevu",
    href: "/admin/randevular",
    hasSource: true,
    empty: "Bugün yok",
  },
  {
    id: "whatsapp",
    title: "WhatsApp",
    href: "/admin/aktivite",
    hasSource: true,
    empty: "Bugün yok",
  },
  {
    id: "purchases",
    title: "Satın alma",
    href: "/admin/satin-almalar",
    hasSource: true,
    empty: "Bugün yok",
  },
  {
    id: "notifications",
    title: "Bildirim",
    href: "/admin/bildirimler",
    hasSource: true,
    empty: "Yeni yok",
  },
  {
    id: "suggestions",
    title: "Öneri",
    href: "/admin/oneriler",
    hasSource: false,
    empty: "Bağlı değil",
  },
];

export function isAdminRole(role: string | null | undefined): role is "admin" {
  return String(role ?? "").trim().toLowerCase() === "admin";
}

export function normalizeProfileRole(role: string | null | undefined): AdminRole {
  return isAdminRole(role) ? "admin" : "user";
}

export function canAccessAdmin(
  role: string | null | undefined,
  isAdminFlag?: boolean | null,
) {
  return isAdminRole(role) || isAdminFlag === true;
}

export function istanbulDayStartIso(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Istanbul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  return `${year}-${month}-${day}T00:00:00+03:00`;
}

export function adminMetricValue(hasSource: boolean, count: number) {
  if (!hasSource) {
    return 0;
  }

  return Number.isFinite(count) && count > 0 ? Math.floor(count) : 0;
}
