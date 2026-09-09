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

export function formatLikeCount(count: number) {
  return `${count} beğenme`;
}

export function formatReplyToggle(count: number) {
  return `${count} yanıtı gör`;
}

export function formatRelativeTime(value: string, now = Date.now()) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const diffMs = Math.max(0, now - date.getTime());
  const minutes = Math.floor(diffMs / 60_000);

  if (minutes < 1) {
    return "şimdi";
  }

  if (minutes < 60) {
    return `${minutes}dk`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours}s`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return `${days}g`;
  }

  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "short",
  }).format(date);
}

export function nextLikeState(likedByMe: boolean, likeCount: number) {
  if (likedByMe) {
    return {
      likedByMe: false,
      likeCount: Math.max(0, likeCount - 1),
    };
  }

  return {
    likedByMe: true,
    likeCount: likeCount + 1,
  };
}

export function canReplyToParent(parentCommentId: string | null) {
  return parentCommentId === null;
}
