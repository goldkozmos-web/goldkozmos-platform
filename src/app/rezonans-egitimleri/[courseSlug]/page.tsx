import { notFound } from "next/navigation";

import {
  getEducationCourseBySlug,
  isEducationCoursePublic,
} from "../../../data/education";

type CoursePageProps = {
  params: Promise<{
    courseSlug: string;
  }>;
};

export function generateStaticParams() {
  return [];
}

export default async function ResonanceCoursePage({
  params,
}: CoursePageProps) {
  const { courseSlug } = await params;
  const course = getEducationCourseBySlug(courseSlug);

  if (!course || !isEducationCoursePublic(course)) {
    notFound();
  }

  notFound();
}
