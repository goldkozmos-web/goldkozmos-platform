import type {
  CourseAccessContext,
  EducationCourse,
} from "./types";

export function isEducationCoursePublic(
  course: EducationCourse,
): boolean {
  return course.status === "published";
}

export function canAccessEducationCourse(
  course: EducationCourse,
  context: CourseAccessContext = {},
): boolean {
  if (!isEducationCoursePublic(course)) {
    return false;
  }

  if (course.accessType === "free") {
    return true;
  }

  if (course.accessType === "entitled") {
    return Boolean(
      context.entitledCourseIds?.includes(course.id),
    );
  }

  return false;
}
