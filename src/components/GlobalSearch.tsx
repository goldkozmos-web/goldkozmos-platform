"use client";

import { useEffect, useMemo, useState } from "react";

import { searchGoldKozmos } from "../lib/search/catalog";

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const hits = useMemo(() => searchGoldKozmos(query, 14), [query]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        className="homeNavTool"
        aria-label="Ara"
        onClick={() => setOpen(true)}
      >
        Ara
      </button>
      {open ? (
        <div className="gkSearchOverlay" role="dialog" aria-label="GoldKozmos arama">
          <button
            type="button"
            className="gkSearchBackdrop"
            aria-label="Kapat"
            onClick={() => setOpen(false)}
          />
          <div className="gkSearchDrawer">
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="GoldBlog, GoldBook, ritüel, test…"
            />
            <ul>
              {hits.map((hit) => (
                <li key={hit.id}>
                  <a href={hit.href} onClick={() => setOpen(false)}>
                    <small>{hit.type}</small>
                    <strong>{hit.title}</strong>
                    <span>{hit.description}</span>
                  </a>
                </li>
              ))}
            </ul>
            {query.trim().length >= 2 && hits.length === 0 ? (
              <p>Bu aramada içerik yok.</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
