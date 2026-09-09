export const COMMENT_MAX_LENGTH = 1000;
export const COMMENT_COOLDOWN_MS = 20_000;

const URL_PATTERN = /\b(?:https?:\/\/|www\.)[^\s<>]+/gi;

export type CommentValidationResult =
  | { ok: true; content: string }
  | { ok: false; error: string };

export function sanitizeCommentContent(raw: string) {
  return raw
    .replace(/\r\n/g, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .trim();
}

export function validateCommentContent(raw: unknown): CommentValidationResult {
  if (typeof raw !== "string") {
    return { ok: false, error: "Yorum boş olamaz." };
  }

  const content = sanitizeCommentContent(raw);

  if (!content) {
    return { ok: false, error: "Yorum boş olamaz." };
  }

  if (content.length > COMMENT_MAX_LENGTH) {
    return {
      ok: false,
      error: `Yorum en fazla ${COMMENT_MAX_LENGTH} karakter olabilir.`,
    };
  }

  const urls = content.match(URL_PATTERN) ?? [];

  if (urls.length > 2) {
    return { ok: false, error: "Yorumda çok fazla bağlantı var." };
  }

  const urlChars = urls.join("").length;

  if (urls.length > 0 && urlChars > content.length * 0.4) {
    return { ok: false, error: "Yorum bağlantı spamı gibi görünüyor." };
  }

  return { ok: true, content };
}

export function canEditComment(actorId: string, commentUserId: string) {
  return actorId === commentUserId;
}

export function canDeleteComment(
  actorId: string,
  commentUserId: string,
  isAdmin: boolean,
) {
  return isAdmin || actorId === commentUserId;
}

export function formatYorumCount(count: number) {
  return `${count} yorum`;
}
