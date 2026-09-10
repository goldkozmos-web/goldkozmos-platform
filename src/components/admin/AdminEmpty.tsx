export default function AdminEmpty({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <section className="adminEmpty">
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      <p>{text}</p>
    </section>
  );
}
