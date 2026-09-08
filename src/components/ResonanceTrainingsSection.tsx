import ComingSoonSection from "./education/ComingSoonSection";
import CoursePreviewGrid from "./education/CoursePreviewGrid";
import EducationComingSoonNotice from "./education/EducationComingSoonNotice";
import EducationHero from "./education/EducationHero";

type ResonanceTrainingsSectionProps = {
  headingLevel?: "h1" | "h2";
  description?: string;
  showComingSoonPanel?: boolean;
};

export default function ResonanceTrainingsSection({
  headingLevel = "h2",
  description,
  showComingSoonPanel = false,
}: ResonanceTrainingsSectionProps) {
  return (
    <section
      className="rezonansEgitimleriSection"
      id="rezonans-egitimleri"
    >
      <div className="rezonansEgitimleriInner">
        <EducationHero
          headingLevel={headingLevel}
          description={description}
        />

        {showComingSoonPanel ? <ComingSoonSection /> : null}

        <CoursePreviewGrid />

        <EducationComingSoonNotice />
      </div>
    </section>
  );
}
