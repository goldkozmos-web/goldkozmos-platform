export type CourseStatus =
  | "coming_soon"
  | "published"
  | "archived";

export type CourseAccessType =
  | "unavailable"
  | "purchase"
  | "entitled"
  | "free";

export type EducationLesson = {
  id: string;
  slug: string;
  title: string;
  order: number;
  duration?: number;
  videoUrl?: string;
  isPreview?: boolean;
};

export type EducationModule = {
  id: string;
  slug: string;
  title: string;
  order: number;
  description?: string;
  lessons: EducationLesson[];
};

export type EducationCourse = {
  id: string;
  slug: string;
  title: string;
  eyebrow: string;
  homeSummary: string;
  shortDescription: string;
  description: string;
  coverImage: string;
  sessionMeta: string[];
  priceLabel?: string;
  isAvailable: boolean;
  purchaseUrl?: string;
  status: CourseStatus;
  modules: EducationModule[];
  duration?: number;
  order: number;
  accessType: CourseAccessType;
  publishedAt?: string;
};

export type CourseAccessContext = {
  entitledCourseIds?: string[];
};
