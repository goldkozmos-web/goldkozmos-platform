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
    title: "Bugünkü Ziyaretler",
    href: "/admin/aktivite",
    hasSource: false,
    empty: "Ziyaret takibi henüz bağlı değil.",
  },
  {
    id: "live",
    title: "Canlı Kullanıcılar",
    href: "/admin/aktivite",
    hasSource: false,
    empty: "Canlı oturum takibi henüz bağlı değil.",
  },
  {
    id: "members",
    title: "Yeni Üyeler",
    href: "/admin/kullanicilar",
    hasSource: true,
    empty: "Bugün yeni üye yok.",
  },
  {
    id: "appointments",
    title: "Randevu Talepleri",
    href: "/admin/randevular",
    hasSource: false,
    empty: "Randevu talebi kaydı henüz bağlı değil.",
  },
  {
    id: "whatsapp",
    title: "WhatsApp Geçişleri",
    href: "/admin/aktivite",
    hasSource: false,
    empty: "WhatsApp geçiş takibi henüz bağlı değil.",
  },
  {
    id: "purchases",
    title: "Satın Alma Tıklamaları",
    href: "/admin/satin-almalar",
    hasSource: false,
    empty: "Satın alma tıklama takibi henüz bağlı değil.",
  },
  {
    id: "notifications",
    title: "Yeni Bildirimler",
    href: "/admin/bildirimler",
    hasSource: false,
    empty: "Yönetim bildirimi henüz bağlı değil.",
  },
  {
    id: "suggestions",
    title: "Öneri Kutusu",
    href: "/admin/oneriler",
    hasSource: false,
    empty: "Öneri kutusu henüz bağlı değil.",
  },
];

export function isAdminRole(role: string | null | undefined): role is "admin" {
  return role === "admin";
}

export const ADMIN_GOOGLE_EMAIL = "goldkozmos@gmail.com";

export function isAdminGoogleEmail(email: string | null | undefined) {
  return (email ?? "").trim().toLowerCase() === ADMIN_GOOGLE_EMAIL;
}

export function normalizeProfileRole(role: string | null | undefined): AdminRole {
  return role === "admin" ? "admin" : "user";
}

export function canAccessAdmin(
  role: string | null | undefined,
  email?: string | null,
) {
  return isAdminRole(role) || isAdminGoogleEmail(email);
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
