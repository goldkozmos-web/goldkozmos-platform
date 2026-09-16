import type { DailyAction } from "./types";

export function mapGoldActRow(row: Record<string, unknown> | null | undefined): DailyAction | null {
  if (!row || typeof row !== "object") return null;
  const id = typeof row.id === "string" ? row.id : "";
  const title = typeof row.title === "string" ? row.title : "";
  if (!id || !title) return null;
  return {
    id,
    title,
    body: typeof row.body === "string" ? row.body : "",
    category: (typeof row.category === "string" ? row.category : "oz_bakim") as DailyAction["category"],
    assignedOn: typeof row.assignedOn === "string"
      ? row.assignedOn
      : typeof row.assigned_on === "string"
        ? row.assigned_on
        : "",
    completedAt:
      (typeof row.completedAt === "string" && row.completedAt) ||
      (typeof row.completed_at === "string" && row.completed_at) ||
      null,
  };
}

export function goldActFromApi(json: unknown): {
  signedIn: boolean;
  userId: string | null;
  action: DailyAction | null;
} {
  const pack = json && typeof json === "object" ? (json as Record<string, unknown>) : null;
  const signedIn = pack?.signedIn === true;
  const userId = typeof pack?.userId === "string" && pack.userId ? pack.userId : null;
  const action = mapGoldActRow(
    pack?.action && typeof pack.action === "object"
      ? (pack.action as Record<string, unknown>)
      : null,
  );
  return { signedIn, userId, action };
}
