import Link from "next/link";

export default function AdminLocked({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <section className="adminLocked">
      <p>GOLDKOZMOS · YÖNETİM</p>
      <h1>{title}</h1>
      <p>{text}</p>
      <Link href="/profilim">Profilim’den gir</Link>
      <Link href="/">Siteye dön</Link>
    </section>
  );
}
