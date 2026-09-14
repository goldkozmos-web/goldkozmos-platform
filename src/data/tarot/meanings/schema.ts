import type { TarotPolar, TarotSuit } from "../types";

export type MeaningKernel = {
  slug: string;
  name: string;
  suit: TarotSuit;
  rank: string;
  number: string;
  arcana: "major" | "minor";
  coreThemes: string[];
  aliases?: string[];
  polar: TarotPolar;
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
};

export function polar(
  flags: Partial<TarotPolar> = {},
): TarotPolar {
  return {
    warmth: false,
    wound: false,
    motion: false,
    pause: false,
    confusion: false,
    labor: false,
    secrecy: false,
    ...flags,
  };
}
