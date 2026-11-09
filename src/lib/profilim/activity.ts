import type { ProfilimActivity } from "./types";
export const PROFILE_ACTIVITY_EVENT = "goldkozmos-profile-activity";
export function mapProfileActivity(row: { id: string; kind: string; title: string; created_at: string }): ProfilimActivity {
  const points: Record<string, number> = { daily_action:15, emotion_journal:10, goldmind_complete:20, goldbook_chapter:15, growth_series:15, reminder_complete:8, journey_day:12, archetype:20, favorite_add:2, water_goal:8 };
  return { id:row.id, kind:row.kind==="emotion_journal"?"journal":row.kind==="archetype"?"analysis":"content", title:row.title, completedAt:row.created_at, xp:points[row.kind]??0 };
}
