export type MemberMessage = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  readAt: string | null;
  recipientName?: string;
};
