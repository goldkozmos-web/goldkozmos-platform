export type GoldMindLiveSnapshot = {
  activeUsers: number | null;
  source: "presence" | "unavailable";
};

export function getGoldMindLiveSnapshot(): GoldMindLiveSnapshot {
  return {
    activeUsers: null,
    source: "unavailable",
  };
}

export function isLiveUserCount(value: number | null | undefined): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}
