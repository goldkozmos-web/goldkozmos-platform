"use client";

import { useEffect, useState } from "react";
import {
  getGoldMindLiveSnapshot,
  isLiveUserCount,
} from "../data/goldmindLive";

export const GOLDMIND_PRESENCE_CHANNEL = "goldmind-presence";
export const GOLDMIND_PRESENCE_HEARTBEAT_MS = 20_000;
export const GOLDMIND_PRESENCE_STALE_MS = 45_000;
const PRESENCE_STORAGE_KEY = "goldmind-presence-id";

export type GoldMindPresenceStatus = "active" | "idle";

export type GoldMindPresencePayload = {
  sessionId: string;
  practiceId?: string;
  status: GoldMindPresenceStatus;
  lastSeenAt: string;
};

export type GoldMindPresenceAdapter = {
  track: (payload: GoldMindPresencePayload) => Promise<void> | void;
  untrack: (sessionId: string) => Promise<void> | void;
  subscribe: (onCount: (count: number) => void) => () => void;
};

let presenceAdapter: GoldMindPresenceAdapter | null = null;

export function setGoldMindPresenceAdapter(
  adapter: GoldMindPresenceAdapter | null,
) {
  presenceAdapter = adapter;
}

export function getGoldMindPresenceAdapter() {
  return presenceAdapter;
}

export function getAnonymousPresenceId(): string {
  if (typeof window === "undefined") {
    return "";
  }

  try {
    const existing = window.localStorage.getItem(PRESENCE_STORAGE_KEY);

    if (existing) {
      return existing;
    }

    const nextId =
      window.crypto.randomUUID?.() ?? `gm_${Date.now().toString(36)}`;

    window.localStorage.setItem(PRESENCE_STORAGE_KEY, nextId);

    return nextId;
  } catch {
    return `gm_${Date.now().toString(36)}`;
  }
}

function buildPayload(
  status: GoldMindPresenceStatus,
  practiceId?: string,
): GoldMindPresencePayload | null {
  const sessionId = getAnonymousPresenceId();

  if (!sessionId) {
    return null;
  }

  return {
    sessionId,
    practiceId,
    status,
    lastSeenAt: new Date().toISOString(),
  };
}

export function useGoldMindLiveCount(): number | null {
  const [activeUsers, setActiveUsers] = useState<number | null>(
    () => getGoldMindLiveSnapshot().activeUsers,
  );

  useEffect(() => {
    const adapter = getGoldMindPresenceAdapter();

    if (!adapter) {
      return;
    }

    return adapter.subscribe((count) => {
      setActiveUsers(isLiveUserCount(count) ? Math.floor(count) : null);
    });
  }, []);

  return activeUsers;
}

export function useGoldMindPresence(options: {
  active: boolean;
  practiceId?: string;
}) {
  const { active, practiceId } = options;

  useEffect(() => {
    const adapter = getGoldMindPresenceAdapter();

    if (!adapter || !active) {
      return;
    }

    const payload = buildPayload("active", practiceId);

    if (!payload) {
      return;
    }

    void adapter.track(payload);

    const heartbeat = window.setInterval(() => {
      const next = buildPayload("active", practiceId);

      if (next) {
        void adapter.track(next);
      }
    }, GOLDMIND_PRESENCE_HEARTBEAT_MS);

    return () => {
      window.clearInterval(heartbeat);
      void adapter.untrack(payload.sessionId);
    };
  }, [active, practiceId]);
}
