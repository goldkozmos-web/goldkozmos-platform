export default function ProfilimEmptyState({
  text,
}: {
  text: string;
}) {
  return (
    <div className="profilimEmpty">
      <span className="profilimEmptyMark" aria-hidden="true" />
      <p>{text}</p>
    </div>
  );
}
