"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { searchDreams } from "../../data/ruya-tabirleri/catalog";

const PLACEHOLDERS = [
  "Yılan gördüm",
  "Kırmızı elbise",
  "Asker görmek",
  "Siyah kedi",
  "Denizde yüzmek",
  "Eski sevgiliyle konuşmak",
];

export default function RuyaSearch({
  initialQuery = "",
}: {
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [placeholder, setPlaceholder] = useState(PLACEHOLDERS[0]);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPlaceholder((current) => {
        const index = PLACEHOLDERS.indexOf(current);
        return PLACEHOLDERS[(index + 1) % PLACEHOLDERS.length];
      });
    }, 2800);
    return () => window.clearInterval(timer);
  }, []);

  const results = useMemo(() => searchDreams(query), [query]);
  const searched = query.trim().length >= 2;

  return (
    <div className="ruyaSearch">
      <label className="ruyaEyebrow" htmlFor="ruyaQuery">
        Rüyanda ne gördün?
      </label>
      <input
        id="ruyaQuery"
        value={query}
        placeholder={placeholder}
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
          if (event.key === "Enter") {
            const hit = results[active];
            if (hit?.href) {
              event.preventDefault();
              window.location.assign(hit.href);
            }
          }
        }}
      />
      {open && searched && results.length > 0 ? (
        <ul className="ruyaSuggest">
          {results.map((hit, index) => (
            <li key={`${hit.slug}-${hit.title}`}>
              {hit.href ? (
                <Link
                  className={index === active ? "isOn" : undefined}
                  href={hit.href}
                  onMouseEnter={() => setActive(index)}
                >
                  {hit.title}
                </Link>
              ) : (
                <span
                  className={`ruyaQueued${index === active ? " isOn" : ""}`}
                  onMouseEnter={() => setActive(index)}
                >
                  {hit.title}
                  <small>Yorum yakında</small>
                </span>
              )}
            </li>
          ))}
        </ul>
      ) : null}
      {searched && results.length === 0 ? (
        <p className="ruyaEmpty">
          Bu rüya için henüz hazır bir yorum bulunmuyor.
        </p>
      ) : null}
    </div>
  );
}
