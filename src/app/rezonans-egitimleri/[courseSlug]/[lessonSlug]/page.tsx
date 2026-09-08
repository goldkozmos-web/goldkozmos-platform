import { notFound } from "next/navigation";

import {
  getEducationCourseBySlug,
  getEducationLessonBySlug,
  isEducationCoursePublic,
} from "../../../../data/education";

type LessonPageProps = {
  params: Promise<{
    courseSlug: string;
    lessonSlug: string;
  }>;
};

export function generateStaticParams() {
  return [];
}

export default async function ResonanceLessonPage({
  params,
}: LessonPageProps) {
  const { courseSlug, lessonSlug } = await params;
  const course = getEducationCourseBySlug(courseSlug);

  if (!course || !isEducationCoursePublic(course)) {
    notFound();
  }

  const lessonLookup = getEducationLessonBySlug(
    course,
    lessonSlug,
  );

  if (!lessonLookup) {
    notFound();
  }

  notFound();
}
