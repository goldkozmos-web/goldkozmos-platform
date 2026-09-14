"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { searchBurclar } from "../../lib/burclar/search";

export default function BurcSearch({
  initialQuery = "",
}: {
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const results = useMemo(() => searchBurclar(query), [query]);
  const searched = query.trim().length >= 2;

  return (
    <div className="burcSearch">
      <label className="burcEyebrow" htmlFor="burcQuery">
        Burç veya uyum ara
      </label>
      <input
        id="burcQuery"
        value={query}
        placeholder="Burç veya uyum ara..."
        autoComplete="off"
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
          setActive(0);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(event) => {
          if (!open || results.length === 0) return;
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setActive((value) => (value + 1) % results.length);
          }
          if (event.key === "ArrowUp") {
            event.preventDefault();
            setActive((value) => (value - 1 + results.length) % results.length);
          }
          if (event.key === "Enter" && results[active]) {
            event.preventDefault();
            window.location.assign(results[active].href);
          }
        }}
      />
      {open && searched && results.length > 0 ? (
        <ul className="burcSuggest">
          {results.map((hit, index) => (
            <li key={hit.href + hit.title}>
              <Link
                className={index === active ? "isOn" : undefined}
                href={hit.href}
                onMouseEnter={() => setActive(index)}
              >
                {hit.title}
                {hit.hint ? <small>{hit.hint}</small> : null}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
      {searched && results.length === 0 ? (
        <p className="burcEmpty">Bu arama için henüz bir eşleşme yok.</p>
      ) : null}
    </div>
  );
}
