export const EMOTION_OPTIONS = [
  "Huzur",
  "Kaygı",
  "Öfke",
  "Üzüntü",
  "Sevinç",
  "Utanç",
  "Yorgunluk",
  "Karışık",
] as const;

export const BODY_AREA_OPTIONS = [
  "Göğüs",
  "Karın",
  "Boğaz",
  "Omuzlar",
  "Baş",
  "Sırt",
  "Eller",
  "Tüm beden",
] as const;

export const ACTION_CATEGORIES = {
  kisisel_gelisim: "Kişisel gelişim",
  sosyal_bag: "Sosyal bağ",
  cevre: "Çevre",
  oz_bakim: "Öz bakım",
  farkindalik: "Farkındalık",
  kucuk_iyilik: "Küçük iyilik",
} as const;

export type ActionCategory = keyof typeof ACTION_CATEGORIES;

export const ACTIVITY_KIND_LABEL: Record<string, string> = {
  goldmind_complete: "GoldMind tamamlandı",
  goldbook_chapter: "GoldBook bölümü tamamlandı",
  emotion_journal: "Duygu günlüğü kaydı",
  daily_action: "GoldKozmos eylemi tamamlandı",
  growth_series: "Gelişim serisi",
  reminder_complete: "Görev tamamlandı",
};

export const REPEAT_OPTIONS = [
  { value: "none", label: "Tekrar yok" },
  { value: "daily", label: "Her gün" },
  { value: "weekly", label: "Her hafta" },
  { value: "monthly", label: "Her ay" },
] as const;

export type EmotionJournalEntry = {
  id: string;
  primaryEmotion: string;
  secondaryEmotion: string;
  intensity: number;
  triggerText: string;
  bodyArea: string;
  needText: string;
  note: string;
  createdAt: string;
};

export type DailyMessage = {
  id: string;
  body: string;
  assignedOn: string;
};

export type DailyAction = {
  id: string;
  title: string;
  body: string;
  category: ActionCategory | string;
  assignedOn: string;
  completedAt: string | null;
};

export type UserActivityItem = {
  id: string;
  kind: string;
  title: string;
  href: string | null;
  createdAt: string;
};

export type AppNotification = {
  id: string;
  title: string;
  body: string;
  type: string;
  link: string | null;
  isRead: boolean;
  createdAt: string;
};

export type ReminderItem = {
  id: string;
  title: string;
  note: string;
  dueOn: string | null;
  dueTime: string | null;
  repeatRule: string;
  completedAt: string | null;
  createdAt: string;
};
