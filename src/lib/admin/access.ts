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
  { href: "/admin", label: "Özet" },
  { href: "/admin/kullanicilar", label: "Üyeler" },
  { href: "/admin/mesajlar", label: "Mesajlar" },
  { href: "/admin/aktivite", label: "Hareket" },
  { href: "/admin/randevular", label: "Randevu" },
  { href: "/admin/satin-almalar", label: "Satış" },
  { href: "/admin/icerikler", label: "İçerik" },
  { href: "/admin/oneriler", label: "Öneri" },
  { href: "/admin/bildirimler", label: "Bildirim" },
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
    empty: "Bugün henüz yok",
  },
  {
    id: "live",
    title: "Sitede",
    href: "/admin/aktivite",
    hasSource: true,
    empty: "Şu an kimse yok",
  },
  {
    id: "members",
    title: "Üyeler",
    href: "/admin/kullanicilar",
    hasSource: true,
    empty: "Henüz üye yok",
  },
  {
    id: "appointments",
    title: "Randevular",
    href: "/admin/randevular",
    hasSource: true,
    empty: "Bugün randevu yok",
  },
  {
    id: "whatsapp",
    title: "WhatsApp",
    href: "/admin/aktivite",
    hasSource: true,
    empty: "Bugün yazışma yok",
  },
  {
    id: "purchases",
    title: "Satışlar",
    href: "/admin/satin-almalar",
    hasSource: true,
    empty: "Bugün satış yok",
  },
  {
    id: "notifications",
    title: "Bildirimler",
    href: "/admin/bildirimler",
    hasSource: true,
    empty: "Yeni bildirim yok",
  },
  {
    id: "suggestions",
    title: "Öneriler",
    href: "/admin/oneriler",
    hasSource: false,
    empty: "Henüz bağlı değil",
  },
];

export const SITE_ADMIN_EMAIL = "goldkozmos@gmail.com";

export function isSiteAdminEmail(email: string | null | undefined) {
  return String(email ?? "").trim().toLowerCase() === SITE_ADMIN_EMAIL;
}

export function isAdminRole(role: string | null | undefined): role is "admin" {
  return String(role ?? "").trim().toLowerCase() === "admin";
}

export function normalizeProfileRole(role: string | null | undefined): AdminRole {
  return isAdminRole(role) ? "admin" : "user";
}

export function canAccessAdmin(email: string | null | undefined) {
  return isSiteAdminEmail(email);
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

export function formatAdminCount(value: number) {
  return Math.max(0, Math.floor(Number.isFinite(value) ? value : 0)).toLocaleString(
    "tr-TR",
  );
}

export function adminMetricHint(
  id: AdminOverviewCardId,
  value: number,
  empty: string,
) {
  if (value <= 0) {
    return empty;
  }

  if (id === "live") {
    return value === 1 ? "şu an 1 kişi" : `şu an ${formatAdminCount(value)} kişi`;
  }

  if (id === "members") {
    return value === 1 ? "kayıtlı üye" : "kayıtlı üyeler";
  }

  return "bugün";
}

export function emptyAdminMetrics() {
  return ADMIN_OVERVIEW_CARDS.map((card) => ({
    id: card.id,
    title: card.title,
    href: card.href,
    hasSource: card.hasSource,
    empty: card.empty,
    value: 0,
  }));
}
