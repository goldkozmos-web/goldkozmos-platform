export const ACTIVITY_XP: Record<string, number> = {
  daily_action: 15,
  emotion_journal: 10,
  goldmind_complete: 20,
  goldbook_chapter: 15,
  growth_series: 15,
  reminder_complete: 8,
  journey_day: 12,
  archetype: 20,
  test_complete: 20,
  success_journal: 10,
  favorite_add: 2,
  lesson: 20,
  content: 15,
  session: 40,
  journal: 10,
  letter: 15,
  analysis: 25,
};

export const GOLDACT_XP_EVENT = "goldkozmos:xp";

export function xpForKind(kind: string) {
  return ACTIVITY_XP[kind] ?? 10;
}
