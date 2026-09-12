export const RITUAL_CHIPS = [
  "Aşk",
  "Bolluk",
  "Korunma",
  "Arınma",
  "Odak",
  "Uyku",
  "Bereket",
  "Yeni Başlangıç",
  "Nazar",
  "Dişil Enerji",
] as const;

export type RitualChip = (typeof RITUAL_CHIPS)[number];

export type Ritual = {
  slug: string;
  title: string;
  summary: string;
  intro: string;
  purpose: string;
  when: string;
  duration: string;
  materials: string[];
  steps: string[];
  intention: string;
  after: string;
  tags: RitualChip[];
  image: string;
};

export function ritualImagePath(slug: string) {
  return `/images/goldrituel/${slug}.svg`;
}
