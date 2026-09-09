import assert from "node:assert/strict";
import test from "node:test";

import { resumeOffset } from "../src/data/platformFlow.ts";
import {
  displayProgressFromItem,
  mergePlaybackFields,
  progressFromPlayback,
  secondsFromPlayerClock,
} from "../src/lib/mediaTime.ts";

test("player clocks treat large values as milliseconds", () => {
  assert.equal(secondsFromPlayerClock(1_847_000), 1847);
  assert.equal(secondsFromPlayerClock(1847), 1847);
  assert.equal(secondsFromPlayerClock(30_000), 30);
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
