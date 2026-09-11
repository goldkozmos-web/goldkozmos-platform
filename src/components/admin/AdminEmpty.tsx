export default function AdminEmpty({
  eyebrow,
  title,
  text,
  quiet = false,
}: {
  eyebrow: string;
  title: string;
  text: string;
  quiet?: boolean;
}) {
  return (
    <section className={`adminEmpty${quiet ? " isQuiet" : ""}`}>
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      <p>{text}</p>
    </section>
  );
}
