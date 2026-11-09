"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { searchTarot } from "../../data/tarot/catalog";
import { tarotCardPath, tarotImagePath } from "../../lib/tarot/urls";

export default function TarotCardGrid() {
  const [query, setQuery] = useState("");
  const [suit, setSuit] = useState("all");
  const cards = useMemo(() => searchTarot(query).filter(card => suit === "all" || card.suit === suit), [query, suit]);

  return (
    <>
      <div className="tarotSearch symbolSearchBar">
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
      <div className="tarotSuitFilters" aria-label="Tarot deste grupları">{[["all", "Tüm deste"], ["major", "Büyük Arkana"], ["cups", "Kupalar"], ["wands", "Değnekler"], ["swords", "Kılıçlar"], ["pentacles", "Tılsımlar"]].map(([value, label]) => <button type="button" key={value} aria-pressed={suit === value} onClick={() => setSuit(value)}>{label}</button>)}</div><p className="symbolResultCount" role="status">{cards.length} kart · Düz, ters, aşk ve kariyer yorumları</p>
      <div className="tarotGrid tarotPremiumGrid">
        {cards.map((card) => (
          <Link prefetch={false} key={card.slug} href={tarotCardPath(card.slug)}>
            <div className="tarotPremiumArt"><Image src={tarotImagePath(card.slug)} alt={`${card.name} kartının Goldkozmos yorumu`} width={300} height={500} sizes="(max-width: 600px) 44vw, (max-width: 900px) 28vw, 170px" /><span>{card.number}</span></div>
            <div className="tarotPremiumCardCopy"><small>{card.arcana === "major" ? "BÜYÜK ARKANA" : "KÜÇÜK ARKANA"}</small><strong>{card.name}</strong><span>{card.coreThemes.slice(0, 2).join(" · ")}</span><i>Anlamını keşfet ↗</i></div>
          </Link>
        ))}
      </div>
      {!cards.length ? <div className="symbolEmpty"><h3>Bu aramada kart bulunamadı.</h3><p>Kart adı veya “başlangıç”, “denge” gibi bir tema deneyebilirsin.</p><button type="button" onClick={() => { setQuery(""); setSuit("all"); }}>Tüm desteye dön</button></div> : null}
    </>
  );
}
