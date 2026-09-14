export const TAROT_TOPICS = [
  {
    id: "love",
    label: "Aşk & İlişki",
    positions: ["Mevcut Enerji", "Bağın / Karşı Tarafın Enerjisi", "Olası Yön"],
  },
  {
    id: "thoughts",
    label: "Onun Düşünceleri ve Duyguları",
    positions: ["Düşünceleri", "Duyguları", "Yaklaşımı / Olası Hareketi"],
  },
  {
    id: "career",
    label: "Kariyer & Para",
    positions: [
      "Mevcut Durum",
      "Engel veya Dikkat Edilmesi Gereken",
      "Olası Gelişim",
    ],
  },
  {
    id: "general",
    label: "Genel Enerji",
    positions: ["Şu Anki Enerji", "Sana Gelen Mesaj", "Olası Yön"],
  },
  {
    id: "development",
    label: "Bir Konunun Olası Gelişimi",
    positions: ["Mevcut Enerji", "Süreci Etkileyen Unsur", "Olası Sonuç / Yön"],
  },
  {
    id: "decision",
    label: "Karar & Yol Ayrımı",
    positions: [
      "İçinde Bulunduğun Enerji",
      "Dikkat Etmen Gereken",
      "Sana Açılan Yol",
    ],
  },
] as const;

export type TarotTopicId = (typeof TAROT_TOPICS)[number]["id"];

export type TarotSuit = "major" | "cups" | "swords" | "wands" | "pentacles";

export type TarotPolar = {
  warmth: boolean;
  wound: boolean;
  motion: boolean;
  pause: boolean;
  confusion: boolean;
  labor: boolean;
  secrecy: boolean;
};

export type TarotCard = {
  id: string;
  slug: string;
  name: string;
  h1: string;
  seoTitle: string;
  metaDescription: string;
  arcana: "major" | "minor";
  suit: TarotSuit;
  number: string;
  rank: string;
  searchAliases: string[];
  coreThemes: string[];
  brief: string;
  generalMeaning: string;
  spiritualMeaning: string;
  loveMeaning: string;
  relationshipMeaning: string;
  thoughtsMeaning: string;
  feelingsMeaning: string;
  actionMeaning: string;
  careerMeaning: string;
  moneyMeaning: string;
  futurePotential: string;
  adviceMeaning: string;
  shadowMeaning: string;
  reversedMeaning: string;
  symbols: string;
  polar: TarotPolar;
  related: string[];
  /** @deprecated dictionary alias */
  general: string;
  spiritual: string;
  energy: string;
  love: string;
  otherFeelings: string;
  career: string;
  future: string;
  advice: string;
  reversed: string;
  topics: Record<TarotTopicId, string>;
  blend: string;
};
