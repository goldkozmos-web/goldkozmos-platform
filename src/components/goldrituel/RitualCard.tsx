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
        <img src={ritual.image} alt={`${ritual.title} için hazırlanan uygulama ortamı`} loading="lazy" width={1200} height={800} />
        <span className="grCardCategory">{ritual.tags[0]}</span>
      </a>
      <div className="grCardBody">
        <h2>{ritual.title}</h2>
        <p>{ritual.summary}</p>
        <div className="grMeta">
          <span><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="7" /><path d="M10 6v4l3 2" /></svg>{ritual.duration}</span>
          <span>{ritual.materials.length} malzeme</span>
        </div>
        <div className="grActions">
          <Link className="grBtn" href={goldrituelPath(ritual.slug)}>
            Ritüeli keşfet <span aria-hidden="true">↗</span>
          </Link>
          <button
            type="button"
            className={`grBtnGhost${saved ? " isOn" : ""}`}
            aria-pressed={saved}
            onClick={() => onToggleSave(ritual.slug)}
          >
            {saved ? "Kayıtlı" : "Kaydet"}
          </button>
        </div>
      </div>
    </article>
  );
}
