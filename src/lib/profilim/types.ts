export type ProfilimUser = {
  id: string;
  displayName: string;
  email: string | null;
  avatarUrl: string | null;
  isAdmin?: boolean;
} | null;

export type ProfilimActivityKind =
  | "lesson"
  | "content"
  | "session"
  | "journal"
  | "letter"
  | "analysis";

export type ProfilimActivity = {
  id: string;
  kind: ProfilimActivityKind;
  title: string;
  completedAt: string;
  xp: number;
};

export type ProfilimPurchase = {
  id: string;
  title: string;
  purchasedAt: string;
  kind: string;
};

export type ProfilimFavorite = {
  id: string;
  title: string;
  href: string;
  kind: string;
};

export type ProfilimAppointmentStatus =
  | "upcoming"
  | "past"
  | "cancelled";

export type ProfilimAppointment = {
  id: string;
  title: string;
  startsAt: string;
  status: ProfilimAppointmentStatus | string;
};

export type ProfilimPdfAnalysis = {
  id: string;
  title: string;
  createdAt: string;
  viewUrl?: string;
  downloadUrl?: string;
};

export type ProfilimLibraryItem = {
  id: string;
  title: string;
  kind: string;
  href?: string;
  coverUrl?: string;
};

export type ProfilimJournalEntry = {
  id: string;
  excerpt: string;
  body?: string;
  createdAt: string;
};

export type ProfilimLetter = {
  id: string;
  title: string;
  body?: string;
  createdAt: string;
};

export type ProfilimProgress = {
  completedCount: number;
  xp: number;
  recentActivity: ProfilimActivity[];
};

export type ProfilimLevel = {
  level: number;
  title: string;
  xp: number;
  xpIntoLevel: number;
  xpForNextLevel: number;
  progress: number;
};

export type ProfilimContinueItem = {
  id: string;
  title: string;
  href: string;
  progress: number;
  platform?: string;
};

export type ProfilimPlatformTrack = {
  id: string;
  label: string;
  progress: number;
};

export type ProfilimTodayNeedChoiceId =
  | "calm"
  | "focus"
  | "understand"
  | "write"
  | "breathe"
  | "rest";

export type ProfilimTodayNeedFocus =
  | "sakinles"
  | "odaklanma"
  | "nefes"
  | "dinlenme";

export type ProfilimTodayNeedAction =
  | { type: "goldmind"; focus: ProfilimTodayNeedFocus }
  | { type: "journal" }
  | { type: "awareness" };

export type ProfilimTodayNeedChoice = {
  id: ProfilimTodayNeedChoiceId;
  label: string;
  action: ProfilimTodayNeedAction;
};

export type ProfilimTodayNeed = {
  title: string;
  text: string;
  choiceId?: ProfilimTodayNeedChoiceId;
} | null;

export type ProfilimDrawerId =
  | "today"
  | "progress"
  | "continue"
  | "favorites"
  | "purchases"
  | "pdfs"
  | "appointments"
  | "library"
  | "journal"
  | "letter"
  | "journey"
  | "understand";

export type ProfilimDashboardSources = {
  user: ProfilimUser;
  purchases: ProfilimPurchase[];
  favorites: ProfilimFavorite[];
  appointments: ProfilimAppointment[];
  pdfAnalyses: ProfilimPdfAnalysis[];
  library: ProfilimLibraryItem[];
  journalEntries: ProfilimJournalEntry[];
  letters: ProfilimLetter[];
  recentActivity: ProfilimActivity[];
  continueItems: ProfilimContinueItem[];
  todayNeed: ProfilimTodayNeed;
};

export type ProfilimDashboardData = ProfilimDashboardSources & {
  progress: ProfilimProgress;
  level: ProfilimLevel;
  xp: number;
};
