import {
  getEducationPrimaryCta,
  getEducationSalesLabel,
  isEducationCourseOnSale,
  type EducationCourse,
} from "../../data/education";

type CoursePreviewCardProps = {
  course: EducationCourse;
};

export default function CoursePreviewCard({
  course,
}: CoursePreviewCardProps) {
  const orderLabel = String(course.order).padStart(2, "0");
  const onSale = isEducationCourseOnSale(course);
  const cta = getEducationPrimaryCta(course);

  return (
    <article
      className="rezonansEgitimleriCard"
      id={course.slug}
    >
      <div className="rezonansEgitimleriCardTop">
        <p className="rezonansEgitimleriBadge">
          {onSale ? "EĞİTİM" : "YAKINDA"}
        </p>
        <span aria-hidden="true">{orderLabel}</span>
      </div>

      <h3>{course.title}</h3>

      <p>{course.shortDescription}</p>

      {onSale ? (
        <a
          className="rezonansEgitimleriCardCta"
          href={cta.href}
          target="_blank"
          rel="noreferrer"
        >
          {cta.label}
          <span aria-hidden="true">→</span>
        </a>
      ) : (
        <p className="rezonansEgitimleriSalesStatus">
          {getEducationSalesLabel(course)}
        </p>
      )}
    </article>
  );
}
