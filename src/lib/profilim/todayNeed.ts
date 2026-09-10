import type {
  ProfilimTodayNeedChoice,
  ProfilimTodayNeedChoiceId,
  ProfilimTodayNeedFocus,
} from "./types";

export function goldmindUrlForFocus(focus: ProfilimTodayNeedFocus) {
  return `/goldmind?focus=${encodeURIComponent(focus)}`;
}

export const TODAY_NEED_CHOICES: ProfilimTodayNeedChoice[] = [
  {
    id: "calm",
    label: "Sakinleşmek",
    action: { type: "goldmind", focus: "sakinles" },
  },
  {
    id: "focus",
    label: "Odaklanmak",
    action: { type: "goldmind", focus: "odaklanma" },
  },
  {
    id: "understand",
    label: "Kendimi anlamak",
    action: { type: "awareness" },
  },
  {
    id: "write",
    label: "Yazmak",
    action: { type: "journal" },
  },
  {
    id: "breathe",
    label: "Nefes almak",
    action: { type: "goldmind", focus: "nefes" },
  },
  {
    id: "rest",
    label: "Dinlenmek",
    action: { type: "goldmind", focus: "dinlenme" },
  },
];

export function todayNeedChoiceById(
  id: string | null | undefined,
): ProfilimTodayNeedChoice | null {
  return TODAY_NEED_CHOICES.find((choice) => choice.id === id) ?? null;
}

export function isTodayNeedChoiceId(
  value: string,
): value is ProfilimTodayNeedChoiceId {
  return TODAY_NEED_CHOICES.some((choice) => choice.id === value);
}
