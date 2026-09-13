import type { ActionCategory, DailyAction } from "../lib/daily/types";

export const GOLD_ACT_FALLBACK: Omit<DailyAction, "assignedOn" | "completedAt">[] =
  [
    {
      id: "local-nefes",
      title: "İki dakikalık nefes",
      body: "Zamanlayıcı açmadan, yalnızca iki dakika nefesine eşlik et.",
      category: "oz_bakim" as ActionCategory,
    },
    {
      id: "local-tesekkur",
      title: "Birine dürüst bir teşekkür",
      body: "Bugün bir kişiye somut bir şey için teşekkür et.",
      category: "sosyal_bag" as ActionCategory,
    },
    {
      id: "local-cumle",
      title: "Tek bir cümle yaz",
      body: "Şu an hissettiğin şeyi tek cümleyle kaydet.",
      category: "farkindalik" as ActionCategory,
    },
    {
      id: "local-duzen",
      title: "Küçük bir düzen",
      body: "Bulunduğun alanda tek bir yüzeyi sadeleştir.",
      category: "cevre" as ActionCategory,
    },
    {
      id: "local-sinir",
      title: "Kendi sınırını söyle",
      body: "Bugün hayır demen gereken bir yerde nazikçe hayır de.",
      category: "kisisel_gelisim" as ActionCategory,
    },
    {
      id: "local-iyilik",
      title: "Görmeden bir iyilik",
      body: "Karşılık beklemeden küçük bir kolaylık bırak.",
      category: "kucuk_iyilik" as ActionCategory,
    },
  ];

export function istanbulDay() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Istanbul",
  }).format(new Date());
}

export function goldActStorageKey(userId: string, day: string) {
  return `gk-goldact-done:${userId}:${day}`;
}

export function pickGoldActFallback(userId: string, day: string): DailyAction {
  const list = GOLD_ACT_FALLBACK;
  let n = 0;
  const seed = `${userId}:${day}`;
  for (let i = 0; i < seed.length; i += 1) {
    n = (n + seed.charCodeAt(i) * (i + 1)) % list.length;
  }
  const item = list[n] ?? list[0];
  let completedAt: string | null = null;
  if (typeof window !== "undefined") {
    try {
      completedAt = window.localStorage.getItem(goldActStorageKey(userId, day));
    } catch {
      completedAt = null;
    }
  }
  return {
    ...item,
    assignedOn: day,
    completedAt,
  };
}
