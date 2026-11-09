export type Kind =
  | "clients"
  | "works"
  | "appointments"
  | "broadcasts"
  | "tasks"
  | "instagram"
  | "youtube"
  | "notes"
  | "services";
export type Field = {
  key: string;
  label: string;
  type?:
    | "text"
    | "textarea"
    | "number"
    | "date"
    | "time"
    | "email"
    | "url"
    | "select"
    | "client"
    | "service";
  options?: string[];
  required?: boolean;
};
export type PanelRecord = {
  id: string;
  kind: Kind;
  data: Record<string, string>;
  version: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};
const f = (
  key: string,
  label: string,
  type: Field["type"] = "text",
  options?: string[],
  required = false,
): Field => ({ key, label, type, options, required });
const status = f("status", "Durum", "select", [
  "Planlandı",
  "Devam ediyor",
  "Tamamlandı",
  "İptal",
]);
const priority = f("priority", "Öncelik", "select", [
  "Normal",
  "Yüksek",
  "Düşük",
]);
const title = f("title", "Başlık", "text", undefined, true);
const date = f("date", "Tarih", "date");
const time = f("time", "Başlangıç saati", "time");
const end = f("endTime", "Bitiş saati", "time");
const note = f("note", "Notlar", "textarea");
const metrics = [
  f("views", "Görüntülenme", "number"),
  f("likes", "Beğeni", "number"),
  f("comments", "Yorum", "number"),
];
export const modules: Record<
  Kind,
  { label: string; hint: string; fields: Field[] }
> = {
  clients: {
    label: "Danışanlar",
    hint: "Her danışan bir kez kaydedilir; tüm çalışmaları aynı profilde birikir.",
    fields: [
      f("title", "Ad soyad", "text", undefined, true),
      f("phone", "Telefon"),
      f("email", "E-posta", "email"),
      f("firstDate", "İlk çalışma tarihi", "date"),
      note,
    ],
  },
  works: {
    label: "Çalışmalar",
    hint: "Danışan, seans ve ödeme takibini birlikte tut.",
    fields: [
      f("clientId", "Danışan", "client", undefined, true),
      f("title", "Çalışma adı", "service", undefined, true),
      f("date", "Başlangıç tarihi", "date", undefined, true),
      f("endDate", "Bitiş tarihi", "date"),
      f("planned", "Planlanan seans", "number"),
      f("completed", "Gerçekleşen seans", "number"),
      f("fee", "Çalışma ücreti (TL)", "number"),
      f("paid", "Ödenen tutar (TL)", "number"),
      f("paidDate", "Ödeme tarihi", "date"),
      status,
      note,
    ],
  },
  appointments: {
    label: "Randevular",
    hint: "Türkiye saatine göre randevularını planla.",
    fields: [
      title,
      f("clientId", "Danışan", "client"),
      f("date", "Tarih", "date", undefined, true),
      time,
      end,
      status,
      note,
    ],
  },
  broadcasts: {
    label: "Canlı yayınlar",
    hint: "Yayın hazırlıklarını ve değerlendirmelerini bir arada tut.",
    fields: [
      title,
      f("topic", "Konu", "textarea"),
      f("date", "Tarih", "date", undefined, true),
      time,
      end,
      f("platform", "Platform", "select", [
        "Telegram",
        "YouTube",
        "Instagram",
        "Diğer",
      ]),
      f("url", "Katılım bağlantısı", "url"),
      f("duration", "Tahmini süre (dk)", "number"),
      note,
      status,
      f("participants", "Gerçekleşen katılımcı", "number"),
      f("review", "Yayın sonrası değerlendirme", "textarea"),
    ],
  },
  tasks: {
    label: "Haftalık plan",
    hint: "Pazartesiden pazara kendi çalışma ritmini oluştur.",
    fields: [
      title,
      f("description", "Açıklama", "textarea"),
      date,
      time,
      priority,
      status,
      f("category", "Kategori"),
    ],
  },
  instagram: {
    label: "Instagram",
    hint: "Fikirden yayına, Instagram için ayrı içerik alanın.",
    fields: [
      title,
      f("idea", "Fikir", "textarea"),
      f("type", "İçerik türü", "select", [
        "Reels",
        "Carousel",
        "Hikâye",
        "Canlı yayın",
      ]),
      f("category", "Kategori"),
      date,
      time,
      f("caption", "Açıklama taslağı", "textarea"),
      f("asset", "Görsel / video bağlantısı", "url"),
      f("status", "Durum", "select", [
        "Fikir",
        "Hazırlanıyor",
        "Hazır",
        "Yayınlandı",
      ]),
      f("url", "Yayın bağlantısı", "url"),
      ...metrics,
      f("saves", "Kaydetme", "number"),
      f("followers", "Yeni takipçi", "number"),
    ],
  },
  youtube: {
    label: "YouTube",
    hint: "Video, Shorts, meditasyon ve frekans serilerini planla.",
    fields: [
      title,
      f("idea", "Video fikri", "textarea"),
      f("type", "Video türü", "select", [
        "Shorts",
        "Uzun video",
        "Canlı yayın",
        "Frekans müziği",
        "Meditasyon",
      ]),
      f("caption", "Açıklama taslağı", "textarea"),
      f("status", "Hazırlık durumu", "select", [
        "Fikir",
        "Hazırlanıyor",
        "Hazır",
        "Yayınlandı",
      ]),
      f("series", "Albüm / seri"),
      date,
      time,
      f("publishedDate", "Gerçek yayın tarihi", "date"),
      f("url", "Video bağlantısı", "url"),
      ...metrics,
      f("followers", "Kazanılan abone", "number"),
    ],
  },
  notes: {
    label: "Not defteri",
    hint: "Fikirlerini sakla. Düzenlemeler yazmayı bıraktığında otomatik kaydedilir.",
    fields: [
      title,
      f("content", "Notun", "textarea"),
      f("category", "Kategori", "select", [
        "İş",
        "İçerik fikirleri",
        "Kişisel notlar",
        "GoldKozmos projeleri",
        "Eğitim",
        "Diğer",
      ]),
      priority,
      f("pinned", "Sabitlenmiş", "select", ["Hayır", "Evet"]),
      f("status", "Durum", "select", ["Aktif", "Arşiv"]),
    ],
  },
  services: {
    label: "Çalışma türleri",
    hint: "Kendi çalışma adlarını ekle ve düzenle.",
    fields: [title, note],
  },
};
export const defaultServices = [
  "Kozmik enerji",
  "Birebir seans",
  "Yoğun enerji çalışması",
  "Dört haftalık program",
  "Numeroloji",
  "Tarot",
  "Rezonans eğitimi",
  "Diğer özel çalışma",
];
export function istanbulDate(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Istanbul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}
export const money = (value: number) =>
  new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
export function clientTotals(records: PanelRecord[], id: string) {
  const works = records.filter(
    (r) => !r.deleted_at && r.kind === "works" && r.data.clientId === id,
  );
  return {
    works: works.length,
    sessions: works.reduce((n, r) => n + Number(r.data.completed || 0), 0),
    paid: works.reduce((n, r) => n + Number(r.data.paid || 0), 0),
    last:
      works
        .map((r) => r.data.date)
        .filter(Boolean)
        .sort()
        .at(-1) || "",
  };
}
export function validateData(
  kind: Kind,
  input: unknown,
): Record<string, string> {
  if (!input || typeof input !== "object" || Array.isArray(input))
    throw Error("Kayıt bilgileri geçersiz.");
  const raw = input as Record<string, unknown>,
    result: Record<string, string> = {};
  for (const field of modules[kind].fields) {
    const v = raw[field.key];
    if (v !== undefined && typeof v !== "string")
      throw Error(`${field.label} geçersiz.`);
    const s = String(v ?? "").trim();
    if (s.length > (field.type === "textarea" ? 30000 : 500))
      throw Error(`${field.label} çok uzun.`);
    if (field.required && !s) throw Error(`${field.label} gerekli.`);
    if (
      s &&
      field.type === "number" &&
      (!Number.isFinite(Number(s)) || Number(s) < 0 || Number(s) > 1e10)
    )
      throw Error(`${field.label} sıfır veya pozitif sayı olmalı.`);
    if (
      s &&
      field.type === "date" &&
      (!/^\d{4}-\d{2}-\d{2}$/.test(s) ||
        new Date(s + "T12:00:00Z").toISOString().slice(0, 10) !== s)
    )
      throw Error("Tarih geçersiz.");
    if (s && field.type === "time" && !/^([01]\d|2[0-3]):[0-5]\d$/.test(s))
      throw Error("Saat geçersiz.");
    if (s && field.type === "url" && !/^https?:\/\//i.test(s))
      throw Error("Bağlantı https:// veya http:// ile başlamalı.");
    if (s && field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s))
      throw Error("E-posta geçersiz.");
    if (s && field.options && !field.options.includes(s))
      throw Error(`${field.label} seçimi geçersiz.`);
    result[field.key] = s;
  }
  if (result.endDate && result.date && result.endDate < result.date)
    throw Error("Bitiş başlangıçtan önce olamaz.");
  if (result.endTime && result.time && result.endTime <= result.time)
    throw Error("Bitiş saati başlangıçtan sonra olmalı.");
  if (
    kind === "works" &&
    Number(result.completed || 0) > Number(result.planned || 0)
  )
    throw Error("Gerçekleşen seans planlananı aşamaz.");
  if (kind === "works" && Number(result.paid || 0) > Number(result.fee || 0))
    throw Error("Ödenen tutar ücreti aşamaz.");
  if (kind === "works" && Number(result.paid || 0) > 0 && !result.paidDate)
    throw Error("Gelir hesabı için ödeme tarihi gerekli.");
  return result;
}
export function collision(
  records: PanelRecord[],
  record: Pick<PanelRecord, "id" | "kind" | "data">,
) {
  if (
    !["appointments", "broadcasts"].includes(record.kind) ||
    !record.data.date ||
    !record.data.time ||
    !record.data.endTime ||
    record.data.status === "İptal"
  )
    return false;
  return records.some(
    (r) =>
      r.id !== record.id &&
      !r.deleted_at &&
      ["appointments", "broadcasts"].includes(r.kind) &&
      r.data.status !== "İptal" &&
      r.data.date === record.data.date &&
      r.data.time < record.data.endTime &&
      r.data.endTime > record.data.time,
  );
}
