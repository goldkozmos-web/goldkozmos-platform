export const MESSAGE_TITLE_MAX = 80;
export const MESSAGE_BODY_MAX = 2000;

export function parseMemberMessageInput(raw: {
  title?: unknown;
  body?: unknown;
  recipientId?: unknown;
}) {
  const title = typeof raw.title === "string" ? raw.title.trim() : "";
  const body = typeof raw.body === "string" ? raw.body.trim() : "";
  const recipientId =
    typeof raw.recipientId === "string" ? raw.recipientId.trim() : "";

  if (!title || title.length > MESSAGE_TITLE_MAX) {
    return { error: "Başlık 1–80 karakter olmalı." };
  }

  if (!body || body.length > MESSAGE_BODY_MAX) {
    return { error: "Mesaj 1–2000 karakter olmalı." };
  }

  if (!recipientId) {
    return { error: "Alıcı seç." };
  }

  if (recipientId !== "all" && !/^[0-9a-f-]{36}$/i.test(recipientId)) {
    return { error: "Alıcı geçersiz." };
  }

  return { title, body, recipientId };
}
