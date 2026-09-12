"use client";

import { useMemo, useState } from "react";

import { publishedRituals } from "../../data/goldrituel/catalog";
import { RITUAL_CHIPS, type RitualChip } from "../../data/goldrituel/types";
import { filterRituals } from "../../lib/goldrituel/search";
import RitualCard from "./RitualCard";
import { useRitualStore } from "./useRitualStore";

export default function RitualHub() {
  const rituals = useMemo(() => publishedRituals(), []);
  const [query, setQuery] = useState("");
  const [chip, setChip] = useState<RitualChip | null>(null);
  const { store, toggleSaved } = useRitualStore();

  const visible = filterRituals(rituals, query, chip);

  return (
    <>
      <div className="grSearch">
        <label className="visually-hidden" htmlFor="grSearch">
          Ritüel ara
        </label>
        <input
          id="grSearch"
          type="search"
          placeholder="Ritüel ara"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          autoComplete="off"
        />
      </div>

      <div className="grChips" role="list">
        {RITUAL_CHIPS.map((item) => (
          <button
            key={item}
            type="button"
            className={`grChip${chip === item ? " isOn" : ""}`}
            onClick={() => setChip((current) => (current === item ? null : item))}
          >
            {item}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="grEmpty">Bu aramaya uyan bir ritüel yok.</p>
      ) : (
        <div className="grGrid">
          {visible.map((ritual) => (
            <RitualCard
              key={ritual.slug}
              ritual={ritual}
              saved={store.saved.includes(ritual.slug)}
              onToggleSave={toggleSaved}
            />
          ))}
        </div>
      )}
    </>
  );
}
