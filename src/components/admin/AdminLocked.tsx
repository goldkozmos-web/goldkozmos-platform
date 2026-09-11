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
        <a className="adminSiteJump" href="/">
          Siteye dön
        </a>
        <a className="adminProfilimLink" href="/profilim">
          Profilim’den gir
        </a>
      </div>
    </section>
  );
}
