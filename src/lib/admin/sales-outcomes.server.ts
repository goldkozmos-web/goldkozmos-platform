import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

function key() {
  const secret = Buffer.from(process.env.ADMIN_SALES_ENCRYPTION_KEY?.trim() ?? "", "base64");
  if (secret.length !== 32) throw new Error("Sonuç kaydının sunucu anahtarı yapılandırılmalı.");
  return secret;
}
export function sealSalesOutcome(value: unknown): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key(), iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(value), "utf8"), cipher.final()]);
  return ["v1", iv.toString("base64"), cipher.getAuthTag().toString("base64"), encrypted.toString("base64")].join(".");
}
export function openSalesOutcome(value: string): unknown {
  const [version, iv, tag, encrypted] = value.split(".");
  if (version !== "v1" || !iv || !tag || !encrypted) throw new Error("Sonuç kaydı okunamadı.");
  const cipher = createDecipheriv("aes-256-gcm", key(), Buffer.from(iv, "base64"));
  cipher.setAuthTag(Buffer.from(tag, "base64"));
  return JSON.parse(Buffer.concat([cipher.update(Buffer.from(encrypted, "base64")), cipher.final()]).toString("utf8"));
}
