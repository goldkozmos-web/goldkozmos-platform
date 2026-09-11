export const SETTINGS_INTERESTS = [
  { id: "kendilik", label: "Kendilik", memberId: "kendilik" },
  { id: "iliskiler", label: "İlişkiler", memberId: "iliski" },
  { id: "bolluk", label: "Bolluk", memberId: "para" },
  { id: "meditasyon", label: "Meditasyon & Nefes", memberId: "meditasyon" },
] as const;

export type SettingsInterestId = (typeof SETTINGS_INTERESTS)[number]["id"];

export type SettingsNotify = {
  appointment: boolean;
  pdf: boolean;
  purchase: boolean;
  content: boolean;
};

export type SettingsCookies = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

export type AyarlarPrefs = {
  notify: SettingsNotify;
  interests: SettingsInterestId[];
  cookies: SettingsCookies;
};

export const DEFAULT_AYARLAR: AyarlarPrefs = {
  notify: {
    appointment: true,
    pdf: true,
    purchase: true,
    content: false,
  },
  interests: [],
  cookies: {
    necessary: true,
    analytics: true,
    marketing: false,
  },
};

export function settingsStorageKey(userId: string) {
  return `gk-ayarlar:${userId}`;
}

export function parseAyarlarPrefs(raw: unknown): AyarlarPrefs {
  const base = { ...DEFAULT_AYARLAR };
  if (!raw || typeof raw !== "object") {
    return base;
  }
  const body = raw as Record<string, unknown>;
  const notify = body.notify as Record<string, unknown> | undefined;
  const cookies = body.cookies as Record<string, unknown> | undefined;
  const interests = Array.isArray(body.interests)
    ? body.interests
        .map((item) => String(item))
        .filter((item): item is SettingsInterestId =>
          SETTINGS_INTERESTS.some((entry) => entry.id === item),
        )
    : base.interests;

  return {
    notify: {
      appointment: notify?.appointment !== false,
      pdf: notify?.pdf !== false,
      purchase: notify?.purchase !== false,
      content: notify?.content === true,
    },
    interests,
    cookies: {
      necessary: true,
      analytics: cookies?.analytics !== false,
      marketing: cookies?.marketing === true,
    },
  };
}

export function memberIdsFromSettings(interests: SettingsInterestId[]) {
  return SETTINGS_INTERESTS.filter((item) => interests.includes(item.id)).map(
    (item) => item.memberId,
  );
}

export function settingsFromMemberInterests(raw: string | null | undefined) {
  const ids = String(raw ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  return SETTINGS_INTERESTS.filter((item) => ids.includes(item.memberId)).map(
    (item) => item.id,
  );
}
