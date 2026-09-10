export default function ProfilimEmptyState({
  text,
}: {
  text: string;
}) {
  return (
    <div className="profilimEmpty">
      <p>{text}</p>
    </div>
  );
}
