import type { EducationCourse } from "./types";

export const educationCourses: EducationCourse[] = [
  {
    id: "kendilik-rezonansi",
    slug: "kendilik-rezonansi",
    title: "Kendilik Rezonansı",
    eyebrow: "01 · KENDİLİK",
    homeSummary:
      "Özdeğerini, onay ihtiyacını, sınırlarını ve kendinle kurduğun ilişkiyi daha yakından gör.",
    shortDescription:
      "Kendilik algısı, özdeğer, sınırlar ve içsel kalıplar üzerine kapsamlı bir eğitim.",
    description:
      "Kendilik algısı, özdeğer, içsel kalıplar ve insanın kendisiyle kurduğu ilişki.",
    coverImage: "/images/services/kendilik-rezonansi.webp",
    sessionMeta: ["5 Gün", "75–90 dk", "Google Meet"],
    priceLabel: "1.500 TL",
    isAvailable: false,
    status: "coming_soon",
    modules: [],
    order: 1,
    accessType: "unavailable",
  },
  {
    id: "iliski-rezonansi",
    slug: "iliski-rezonansi",
    title: "İlişki Rezonansı",
    eyebrow: "02 · İLİŞKİLER",
    homeSummary:
      "Partner seçimlerini, tekrar eden ilişki örüntülerini, iletişim biçimini ve sınırlarını fark et.",
    shortDescription:
      "İlişkilerde tekrar eden örüntüleri, seçimleri ve duygusal dinamikleri anlamaya yönelik eğitim.",
    description:
      "İlişki örüntüleri, bağlanma, iletişim ve tekrar eden ilişki dinamikleri.",
    coverImage: "/images/services/iliski-rezonansi.webp",
    sessionMeta: ["5 Gün", "75–90 dk", "Google Meet"],
    priceLabel: "1.500 TL",
    isAvailable: false,
    status: "coming_soon",
    modules: [],
    order: 2,
    accessType: "unavailable",
  },
  {
    id: "bolluk-rezonansi",
    slug: "bolluk-rezonansi",
    title: "Bolluk Rezonansı",
    eyebrow: "03 · BOLLUK",
    homeSummary:
      "Para algını, değer anlayışını, kıtlık düşüncelerini ve üretkenlik alışkanlıklarını incele.",
    shortDescription:
      "Para, üretkenlik, bolluk algısı ve yaşamla kurulan alışveriş üzerine kapsamlı eğitim.",
    description:
      "Para algısı, üretkenlik, bollukla ilişki ve davranış kalıpları.",
    coverImage: "/images/services/bolluk-rezonansi.webp",
    sessionMeta: ["5 Gün", "75–90 dk", "Google Meet"],
    priceLabel: "1.500 TL",
    isAvailable: false,
    status: "coming_soon",
    modules: [],
    order: 3,
    accessType: "unavailable",
  },
];

export function getEducationCourses(): EducationCourse[] {
  return [...educationCourses].sort(
    (left, right) => left.order - right.order,
  );
}

export function getEducationCourseBySlug(
  slug: string,
): EducationCourse | undefined {
  return educationCourses.find((course) => course.slug === slug);
}

export function getPublishedEducationCourses(): EducationCourse[] {
  return getEducationCourses().filter(
    (course) => course.status === "published",
  );
}

export type EducationLessonLookup = {
  course: EducationCourse;
  module: EducationCourse["modules"][number];
  lesson: EducationCourse["modules"][number]["lessons"][number];
};

export function getEducationLessonBySlug(
  course: EducationCourse,
  lessonSlug: string,
): EducationLessonLookup | undefined {
  for (const moduleItem of course.modules) {
    const lesson = moduleItem.lessons.find(
      (item) => item.slug === lessonSlug,
    );

    if (lesson) {
      return {
        course,
        module: moduleItem,
        lesson,
      };
    }
  }

  return undefined;
}
