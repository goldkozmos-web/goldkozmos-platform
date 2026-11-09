import assert from "node:assert/strict";
import { isDeploymentTraffic, parseVisitCursor, visitSince } from "../src/lib/admin/visit-history.ts";

assert.equal(visitSince("today", new Date("2026-10-24T22:30:00Z")), "2026-10-24T21:00:00.000Z");
assert.equal(visitSince("7", new Date("2026-10-25T12:00:00Z")), "2026-10-18T12:00:00.000Z");
assert.equal(visitSince("all"), null);
assert.throws(() => visitSince("-1"));
assert.equal(parseVisitCursor(null), null);
assert.equal(isDeploymentTraffic("goldkozmos-platform-rkhdnsbcg-goldkozmos.vercel.app"), true);
assert.equal(isDeploymentTraffic("Instagram"), false);
assert.equal(isDeploymentTraffic(null), false);
assert.deepEqual(parseVisitCursor("2026-10-25T10:00:00.123456+00:00|e8eadbb8-0756-4282-a727-f73df414355e"), { at: "2026-10-25T10:00:00.123456+00:00", id: "e8eadbb8-0756-4282-a727-f73df414355e" });
assert.throws(() => parseVisitCursor("2026-10-25T10:00:00Z|invalid"));
assert.throws(() => parseVisitCursor("2026-10-25T10:00:00Z),id.gt.0|e8eadbb8-0756-4282-a727-f73df414355e"));
console.log("Visit history date and cursor checks passed.");
