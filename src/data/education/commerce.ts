import type { EducationCourse } from "./types";

export const EDUCATION_HUB_PATH = "/rezonans-egitimleri";

export function isEducationCourseOnSale(
  course: EducationCourse,
): boolean {
  return course.isAvailable && Boolean(course.purchaseUrl);
}

export function getEducationHubHref(
  course?: EducationCourse,
): string {
  if (!course) {
    return EDUCATION_HUB_PATH;
  }

  return `${EDUCATION_HUB_PATH}#${course.slug}`;
}

export function getEducationPrimaryCta(
  course: EducationCourse,
): {
  label: string;
  href: string;
  external: boolean;
} {
  if (isEducationCourseOnSale(course) && course.purchaseUrl) {
    return {
      label: "Satın Al",
      href: course.purchaseUrl,
      external: true,
    };
  }

  return {
    label: "Detayları Gör",
    href: getEducationHubHref(course),
    external: false,
  };
}

export function getEducationSalesLabel(
  course: EducationCourse,
): string {
  if (isEducationCourseOnSale(course)) {
    return "Satışta";
  }

  return "Satışlar Yakında Açılıyor";
}
