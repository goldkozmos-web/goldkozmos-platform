"use client";

import Link from "next/link";

import type { Ritual } from "../../data/goldrituel/types";
import { goldrituelPath } from "../../lib/goldrituel/urls";

export default function RitualCard({
  ritual,
  saved,
  onToggleSave,
}: {
  ritual: Ritual;
  saved: boolean;
  onToggleSave: (slug: string) => void;
}) {
  return (
    <article className="grCard">
      <a className="grCardCover" href={goldrituelPath(ritual.slug)}>
        <img src={ritual.image} alt="" />
      </a>
      <div className="grCardBody">
        <h2>{ritual.title}</h2>
        <p>{ritual.summary}</p>
        <div className="grMeta">
          <span>{ritual.duration}</span>
          <span>{ritual.materials.length} malzeme</span>
        </div>
        <div className="grActions">
          <Link className="grBtn" href={goldrituelPath(ritual.slug)}>
            Detayı Gör
          </Link>
          <button
            type="button"
            className={`grBtnGhost${saved ? " isOn" : ""}`}
            onClick={() => onToggleSave(ritual.slug)}
          >
            {saved ? "Kayıtlı" : "Kaydet"}
          </button>
        </div>
      </div>
    </article>
  );
}
