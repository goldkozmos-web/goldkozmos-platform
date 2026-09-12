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

export type TarotCard = {
  id: string;
  slug: string;
  name: string;
  h1: string;
  seoTitle: string;
  metaDescription: string;
  suit: TarotSuit;
  rank: string;
  searchAliases: string[];
  brief: string;
  general: string;
  spiritual: string;
  energy: string;
  love: string;
  otherFeelings: string;
  career: string;
  future: string;
  advice: string;
  reversed: string;
  symbols: string;
  related: string[];
  topics: Record<TarotTopicId, string>;
  blend: string;
};
