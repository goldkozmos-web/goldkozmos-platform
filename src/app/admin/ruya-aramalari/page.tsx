import { loadDreamSearchQueries } from "../../../lib/ruya-tabirleri/query-log";
import AdminEmpty from "../../../components/admin/AdminEmpty";

export const dynamic = "force-dynamic";

export default async function AdminRuyaAramalariPage() {
  const pack = await loadDreamSearchQueries();

  return (
    <div className="adminStack">
      <section className="adminPanel">
        <header className="adminPanelHead">
          <div>
            <p className="adminSectionLabel">Rüya aramaları</p>
            <h2>Sözlük trafiği</h2>
          </div>
        </header>
        <div className="adminStatGrid">
          <div className="adminStatCell">
            <strong>{pack.last7}</strong>
            <span>Son 7 gün</span>
          </div>
          <div className="adminStatCell">
            <strong>{pack.last30}</strong>
            <span>Son 30 gün</span>
          </div>
        </div>
      </section>

      <section className="adminPanel">
        <header className="adminPanelHead">
          <div>
            <p className="adminSectionLabel">Sık aranan</p>
            <h2>En çok aranan rüyalar</h2>
          </div>
        </header>
        {pack.top.length === 0 ? (
          <AdminEmpty
            eyebrow="Arama"
            title="Henüz arama yok"
            text="Sitede rüya aranınca sorgular burada birikir."
            quiet
          />
        ) : (
          <ul className="profilimDrawerList">
            {pack.top.map((row) => (
              <li key={row.query}>
                <strong>{row.query}</strong>
                <span>{row.count}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="adminPanel">
        <header className="adminPanelHead">
          <div>
            <p className="adminSectionLabel">Eksik</p>
            <h2>Sonuç bulunamayanlar</h2>
          </div>
        </header>
        {pack.missing.length === 0 ? (
          <div className="adminQuiet">
            <strong>Boş arama yok</strong>
            <span>Bulunamayan kelimeler burada toplanır.</span>
          </div>
        ) : (
          <ul className="profilimDrawerList">
            {pack.missing.map((row) => (
              <li key={row.query}>
                <strong>{row.query}</strong>
                <span>{row.count}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="adminPanel">
        <header className="adminPanelHead">
          <div>
            <p className="adminSectionLabel">Son</p>
            <h2>Son aramalar</h2>
          </div>
        </header>
        {pack.recent.map((row) => (
          <article key={`${row.createdAt}-${row.query}`} className="adminMember">
            <div className="adminMemberCopy">
              <strong>{row.query}</strong>
              <small>
                {row.matchedSlug || "eşleşme yok"}
                {` · ${row.resultCount} sonuç`}
              </small>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
