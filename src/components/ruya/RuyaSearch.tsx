"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { searchDreams } from "../../data/ruya-tabirleri/catalog";
import { ruyaPath } from "../../lib/ruya-tabirleri/urls";

const PLACEHOLDERS = [
  "Yılan gördüm",
  "Deniz görmek",
  "Eski sevgilimi gördüm",
  "Dişim döküldü",
  "Beyaz kedi gördüm",
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
            if (hit) {
              event.preventDefault();
              window.location.assign(ruyaPath(hit.slug));
            }
          }
        }}
      />
      {open && searched && results.length > 0 ? (
        <ul className="ruyaSuggest">
          {results.map((dream, index) => (
            <li key={dream.slug}>
              <Link
                className={index === active ? "isOn" : undefined}
                href={ruyaPath(dream.slug)}
                onMouseEnter={() => setActive(index)}
              >
                {dream.title}
              </Link>
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
