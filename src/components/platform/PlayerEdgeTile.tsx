"use client";

import type { usePlayerDock } from "./usePlayerDock";

export default function PlayerEdgeTile({ dock, artwork, title, playing, toggle, restore }: {
  dock: ReturnType<typeof usePlayerDock>;
  artwork?: string;
  title: string;
  playing: boolean;
  toggle: () => void;
  restore?: () => void;
}) {
  return <div className="playerEdgeTile">
    <button type="button" className="playerEdgeArtwork" {...dock.dragProps} onClick={(event) => { if (dock.restore(event)) restore?.(); }} aria-label={`${title} · Müzik kontrollerini aç`} title="Dokunarak aç, sürükleyerek taşı">
      {artwork ? <img src={artwork} alt="" draggable={false} /> : <span aria-hidden="true">♫</span>}
      <span className={`playerEdgeWave${playing ? " isPlaying" : ""}`} aria-hidden="true"><i /><i /><i /></span>
    </button>
    <button type="button" className="playerEdgeToggle" onClick={toggle} aria-label={playing ? "Müziği duraklat" : "Müziği oynat"}>{playing ? <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 5v10M14 5v10" /></svg> : <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m7 4 9 6-9 6Z" /></svg>}</button>
  </div>;
}
