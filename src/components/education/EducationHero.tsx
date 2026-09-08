type EducationHeroProps = {
  headingLevel?: "h1" | "h2";
  description?: string;
};

const defaultDescription =
  "Kendini, ilişkilerini ve yaşamla kurduğun bağı daha derinden anlamaya yönelik hazırlanan Rezonans Eğitimleri yakında burada.";

export default function EducationHero({
  headingLevel = "h1",
  description = defaultDescription,
}: EducationHeroProps) {
  const Heading = headingLevel;

  return (
    <header className="rezonansEgitimleriHeader">
      <p className="rezonansEgitimleriEyebrow">
        GOLDKOZMOS AKADEMİ
      </p>

      <Heading>Rezonans Eğitimleri</Heading>

      <p>{description}</p>
    </header>
  );
}
