"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { searchTarot } from "../../data/tarot/catalog";
import { tarotCardPath, tarotImagePath } from "../../lib/tarot/urls";

export default function TarotCardGrid() {
  const [query, setQuery] = useState("");
  const cards = useMemo(() => searchTarot(query), [query]);

  return (
    <>
      <div className="tarotSearch">
        <label className="tarotEyebrow" htmlFor="tarotSearch">
          Bir tarot kartı ara...
        </label>
        <input
          id="tarotSearch"
          value={query}
          placeholder="Büyücü, Güneş, Kupa Prensi, Kılıç Beşlisi"
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className="tarotGrid">
        {cards.map((card) => (
          <Link key={card.slug} href={tarotCardPath(card.slug)}>
            <img src={tarotImagePath(card.slug)} alt={card.name} />
            <strong>{card.name}</strong>
            <span>{card.brief}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
