export type ProfilimUser = {
  id: string;
  displayName: string;
  email: string | null;
  avatarUrl: string | null;
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

export type ProfilimAppointment = {
  id: string;
  title: string;
  startsAt: string;
  status: string;
};

export type ProfilimPdfAnalysis = {
  id: string;
  title: string;
  createdAt: string;
};

export type ProfilimLibraryItem = {
  id: string;
  title: string;
  kind: string;
  href?: string;
};

export type ProfilimJournalEntry = {
  id: string;
  excerpt: string;
  createdAt: string;
};

export type ProfilimLetter = {
  id: string;
  title: string;
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
};

export type ProfilimTodayNeed = {
  title: string;
  text: string;
} | null;

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
