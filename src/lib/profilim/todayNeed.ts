import type {
  ProfilimTodayNeedChoice,
  ProfilimTodayNeedChoiceId,
} from "./types";

export const TODAY_NEED_CHOICES: ProfilimTodayNeedChoice[] = [
  {
    id: "calm",
    label: "Sakinleşmek",
    recommendation: {
      goldmind: "sakinlik",
      goldblog: "sakinlik",
      goldbook: "sakinlik",
    },
  },
  {
    id: "focus",
    label: "Odaklanmak",
    recommendation: {
      goldmind: "odak",
      goldblog: "odak",
      goldbook: "odak",
    },
  },
  {
    id: "understand",
    label: "Kendimi anlamak",
    recommendation: {
      goldmind: "kendilik",
      goldblog: "kendilik",
      goldbook: "kendilik",
    },
  },
  {
    id: "write",
    label: "Yazmak",
    recommendation: {
      goldmind: "yazi",
      goldblog: "yazi",
      goldbook: "yazi",
    },
  },
  {
    id: "breathe",
    label: "Nefes almak",
    recommendation: {
      goldmind: "nefes",
      goldblog: "nefes",
      goldbook: "nefes",
    },
  },
  {
    id: "rest",
    label: "Dinlenmek",
    recommendation: {
      goldmind: "dinlenme",
      goldblog: "dinlenme",
      goldbook: "dinlenme",
    },
  },
];

export function todayNeedChoiceById(
  id: string | null | undefined,
): ProfilimTodayNeedChoice | null {
  return (
    TODAY_NEED_CHOICES.find((choice) => choice.id === id) ?? null
  );
}

export function isTodayNeedChoiceId(
  value: string,
): value is ProfilimTodayNeedChoiceId {
  return TODAY_NEED_CHOICES.some((choice) => choice.id === value);
}
