import assert from "node:assert/strict";
import test from "node:test";

import { resumeOffset } from "../src/data/platformFlow.ts";
import {
  capTimeToWallClock,
  displayProgressFromItem,
  mergePlaybackFields,
  normalizePlaybackClocks,
  pickTrustedDuration,
  progressFromPlayback,
  secondsFromPlayerClock,
  secondsFromSpotifyClock,
} from "../src/lib/mediaTime.ts";
test("wall clock blocks millisecond clocks that look like seconds", () => {
  const openedAtMs = 1_000_000;
  assert.equal(
    capTimeToWallClock({
      playerTime: 500,
      startAt: 0,
      openedAtMs,
      nowMs: openedAtMs + 800,
    }),
    undefined,
  );
  assert.equal(
    capTimeToWallClock({
      playerTime: 8,
      startAt: 0,
      openedAtMs,
      nowMs: openedAtMs + 8_000,
    }),
    8,
  );
  assert.equal(
    capTimeToWallClock({
      playerTime: 0,
      startAt: 120,
      openedAtMs,
      nowMs: openedAtMs + 400,
    }),
    undefined,
  );
});

test("30-second preview clocks are not a finished episode", () => {
  assert.equal(progressFromPlayback(29, 30), undefined);
  assert.equal(pickTrustedDuration(0, 30), 0);
  assert.equal(pickTrustedDuration(0, 1_847), 1847);
});

test("player clocks treat leftover milliseconds against a real duration", () => {
  assert.equal(secondsFromPlayerClock(4_500, 1_847), 4.5);
  assert.equal(secondsFromPlayerClock(72_000, 1_800), 72);
});

test("Spotify playback_update clocks are always milliseconds", () => {
  assert.equal(secondsFromSpotifyClock(1_500), 1.5);
  assert.equal(secondsFromSpotifyClock(1_847_000), 1847);
  const clocks = normalizePlaybackClocks({
    position: 1_840,
    duration: 1_847_000,
  });
  assert.equal(clocks.position, 1.84);
  assert.equal(clocks.duration, 1847);
  assert.equal(progressFromPlayback(clocks.position ?? 0, clocks.duration ?? 0)?.toFixed(3), "0.001");
});

test("resume converts stored millisecond clocks so play does not skip to the end", () => {
  assert.equal(resumeOffset(72_000, 1_800_000), 72);
  assert.equal(resumeOffset(5_000, 1_800), 5);
});

test("progress follows a trusted duration and does not hit 100% early", () => {
  assert.equal(progressFromPlayback(60, 3.6), undefined);
  assert.equal(progressFromPlayback(60, 1), undefined);
  assert.equal(progressFromPlayback(184, 1847)?.toFixed(2), "0.10");
  assert.equal(progressFromPlayback(1840, 1847), 1);
  assert.equal(progressFromPlayback(200, 60), undefined);
});

test("bogus 100% without a real duration is not shown", () => {
  assert.equal(
    displayProgressFromItem({
      progress: 1,
      currentTime: 12,
      durationSeconds: 3.6,
    }),
    0.01,
  );
  assert.equal(
    displayProgressFromItem({
      progress: 0.1,
      currentTime: 184,
      durationSeconds: 1847,
    }).toFixed(2),
    "0.10",
  );
});

test("resume does not restart when duration is a leftover preview clock", () => {
  assert.equal(resumeOffset(40, 3.6), 40);
  assert.equal(resumeOffset(1840, 1847), 0);
  assert.equal(resumeOffset(12, 0), 12);
});

test("merge keeps prior progress until duration is trusted", () => {
  const merged = mergePlaybackFields(
    { progress: 0.12, durationSeconds: undefined },
    25,
    1.8,
  );
  assert.equal(merged.progress, 0.12);
  assert.equal(merged.durationSeconds, 0);
});

test("merge drops a false complete written from a tiny duration", () => {
  const merged = mergePlaybackFields(
    { progress: 1, durationSeconds: 3.6 },
    40,
    3.6,
  );
  assert.equal(merged.progress, 0.01);
  assert.equal(merged.currentTime, 40);
});
