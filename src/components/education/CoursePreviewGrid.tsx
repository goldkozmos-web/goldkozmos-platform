import { getEducationCourses } from "../../data/education";
import CoursePreviewCard from "./CoursePreviewCard";

export default function CoursePreviewGrid() {
  const courses = getEducationCourses();

  return (
    <div className="rezonansEgitimleriCatalog">
      <h2>3 Ana Rezonans</h2>

      <div className="rezonansEgitimleriGrid">
        {courses.map((course) => (
          <CoursePreviewCard
            key={course.id}
            course={course}
          />
        ))}
      </div>
    </div>
  );
}
