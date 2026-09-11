export const SUGGESTIONS_POST = "gk-suggestion";

export type SiteSuggestion = {
  id: string;
  name: string;
  title: string;
  body: string;
  createdAt: string;
};

export function parseSuggestionInput(raw: {
  title?: unknown;
  body?: unknown;
}) {
  const title = String(raw.title ?? "").trim();
  const body = String(raw.body ?? "").trim();

  if (title.length > 80) {
    return { error: "Başlık kısa olsun." };
  }

  if (body.length < 4 || body.length > 900) {
    return { error: "Öneriyi 4–900 karakter yaz." };
  }

  return { title: title || "Öneri", body };
}

export function encodeSuggestionContent(title: string, body: string) {
  return `${title}\n${body}`.slice(0, 1000);
}

export function parseSuggestionContent(content: string) {
  const raw = content.trim();
  const breakAt = raw.indexOf("\n");
  if (breakAt === -1) {
    return { title: "Öneri", body: raw };
  }

  return {
    title: raw.slice(0, breakAt).trim() || "Öneri",
    body: raw.slice(breakAt + 1).trim() || raw,
  };
}
