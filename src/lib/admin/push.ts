import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";

export const PUSH_SUB_POST = "gk-push-sub";

export const VAPID_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY?.trim() ||
  "BHUu2Jnmv0P2z0ldOlKAb_JFn22dpPa5xh9BdLFyN4sZXKx-YFLdp9OdkMAvdx_afRPFfWder_mA6lQYopTSC2I";

export const VAPID_PRIVATE_KEY =
  process.env.VAPID_PRIVATE_KEY?.trim() ||
  "3BSBwf9SZBq62dwxhQ3kXeTjeXJSCryCEl1qse1BTBs";

export const VAPID_SUBJECT =
  process.env.VAPID_SUBJECT?.trim() || "mailto:goldkozmos@gmail.com";

export type PushSub = {
  endpoint: string;
  keys: { p256dh: string; auth: string };
};

function keyBytes() {
  return createHash("sha256").update(VAPID_PRIVATE_KEY).digest();
}

function parsePlain(content: string): PushSub | null {
  const [endpoint, p256dh, auth] = content.split("\n").map((part) => part.trim());
  if (!endpoint?.startsWith("https://") || !p256dh || !auth) {
    return null;
  }
  return { endpoint, keys: { p256dh, auth } };
}

export function packPushSub(sub: PushSub) {
  const plain = `${sub.endpoint}\n${sub.keys.p256dh}\n${sub.keys.auth}`;
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", keyBytes(), iv);
  const enc = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, enc]).toString("base64url").slice(0, 1000);
}

export function parsePushSub(content: string): PushSub | null {
  try {
    const buf = Buffer.from(content, "base64url");
    if (buf.length > 28) {
      const iv = buf.subarray(0, 12);
      const tag = buf.subarray(12, 28);
      const enc = buf.subarray(28);
      const decipher = createDecipheriv("aes-256-gcm", keyBytes(), iv);
      decipher.setAuthTag(tag);
      const plain = Buffer.concat([decipher.update(enc), decipher.final()]).toString(
        "utf8",
      );
      const parsed = parsePlain(plain);
      if (parsed) return parsed;
    }
  } catch {
    // Fall through to plaintext.
  }
  return parsePlain(content);
}

export function parsePushInput(raw: unknown): PushSub | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }
  const body = raw as {
    endpoint?: unknown;
    keys?: { p256dh?: unknown; auth?: unknown };
  };
  const endpoint = String(body.endpoint ?? "").trim();
  const p256dh = String(body.keys?.p256dh ?? "").trim();
  const auth = String(body.keys?.auth ?? "").trim();
  if (!endpoint.startsWith("https://") || !p256dh || !auth) {
    return null;
  }
  if (endpoint.length > 800 || p256dh.length > 200 || auth.length > 80) {
    return null;
  }
  return { endpoint, keys: { p256dh, auth } };
}
