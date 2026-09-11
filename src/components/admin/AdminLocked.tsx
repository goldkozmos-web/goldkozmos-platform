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
      <p>GoldKozmos · Yönetim</p>
      <h1>{title}</h1>
      <p>{text}</p>
      <div className="adminExitRow">
        <Link className="adminSiteJump" href="/">
          Siteye dön
        </Link>
        <Link className="adminProfilimLink" href="/profilim">
          Profilim’den gir
        </Link>
      </div>
    </section>
  );
}
