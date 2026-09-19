"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { resolveDreamSearch, searchDreams } from "../../data/ruya-tabirleri/catalog";
import { ruyaPath } from "../../lib/ruya-tabirleri/urls";

const PLACEHOLDERS = [
  "Yılan gördüm",
  "Araba sürmek",
  "Kırmızı elbise",
  "Bebek emzirmek",
  "Asker üniforması",
];

function logQuery(query: string, matchedSlug: string | null, resultCount: number) {
  void fetch("/api/ruya-tabirleri/search-log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    keepalive: true,
    body: JSON.stringify({ query, matchedSlug, resultCount }),
  }).catch(() => undefined);
}

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

  const resolved = useMemo(() => resolveDreamSearch(query, 8), [query]);
  const results = useMemo(() => searchDreams(query, 8), [query]);
  const searched = query.trim().length >= 2;

  useEffect(() => {
    if (!searched) return;
    const timer = window.setTimeout(() => {
      logQuery(query, resolved.matchedSlug, resolved.hits.length);
    }, 700);
    return () => window.clearTimeout(timer);
  }, [query, searched, resolved.matchedSlug, resolved.hits.length]);

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
          Bu tam başlık sözlükte yok. Yakın bir sembol yazmayı dene; araman kayda düşer.
        </p>
      ) : null}
    </div>
  );
}
