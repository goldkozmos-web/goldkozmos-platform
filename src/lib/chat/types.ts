export type ChatMessage = { id: string; sender: "visitor" | "admin"; body: string; created_at: string };
export type ChatThread = { id: string; name: string; updated_at: string; unread: number };
