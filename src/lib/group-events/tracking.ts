export const GROUP_TRACKING_PAGE = "/calismalar/kayit-takip";
export const GROUP_TRACKING_STORAGE = "gk_group_last_registration";
export const REGISTRATION_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const REGISTRATION_TOKEN = /^[A-Za-z0-9_-]{43}$/;
export const GROUP_REGISTRATION_PENDING = "Kaydınız başarıyla alındı. Ödemeniz kontrol ediliyor. Onay işleminin ardından WhatsApp katılım bağlantınıza erişebileceksiniz.";
export type GroupWhatsAppRequest = { code: string; amountKurus: number };

export function groupTrackingPath(id: string, token: string) {
  // A fragment keeps the private key out of the page request and its access logs.
  return `${GROUP_TRACKING_PAGE}#${id}.${token}`;
}

export type GroupTrackingStatus = {
  eventTitle: string;
  paymentStatus: "pending" | "paid" | "refunded";
  approved: boolean;
  confirmationSent: boolean;
  invites: { eventId: string; url: string }[];
  whatsappRequest: GroupWhatsAppRequest | null;
  trackingPath: string;
};
