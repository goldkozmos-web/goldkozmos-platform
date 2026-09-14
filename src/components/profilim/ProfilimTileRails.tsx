"use client";

import { useState } from "react";

import { PROFILIM_TILE_GROUPS } from "../../data/profilimTileGroups";
import type { ProfilimDrawerId } from "../../lib/profilim/types";
import ProfilimCompactTile from "./ProfilimCompactTile";
import ProfilimDrawer from "./ProfilimDrawer";

export default function ProfilimTileRails({
  onOpenTile,
}: {
  onOpenTile: (id: ProfilimDrawerId) => void;
}) {
  const [sheetId, setSheetId] = useState<string | null>(null);
  const sheet = PROFILIM_TILE_GROUPS.find((group) => group.id === sheetId);

  function openFromSheet(id: ProfilimDrawerId) {
    setSheetId(null);
    onOpenTile(id);
  }

  return (
    <div className="profilimTileBands">
      {PROFILIM_TILE_GROUPS.map((group) => (
        <section className="profilimTileBand" key={group.id}>
          <header className="profilimTileBandTop">
            <p className="profilimTileBandLabel">{group.eyebrow}</p>
            <button
              type="button"
              className="profilimTileSeeAll"
              onClick={() => setSheetId(group.id)}
            >
              Tümünü gör
              <span aria-hidden="true">→</span>
            </button>
          </header>
          <div className="profilimTileRail">
            {group.tiles.map((tile) => (
              <ProfilimCompactTile
                key={tile.id}
                eyebrow={tile.eyebrow}
                title={tile.title}
                onOpen={() => onOpenTile(tile.id)}
              />
            ))}
            <button
              type="button"
              className="profilimTile profilimTileSeeAllCard"
              onClick={() => setSheetId(group.id)}
            >
              <span className="profilimTileEyebrow">DAHA FAZLA</span>
              <strong className="profilimTileTitle">Tümünü gör</strong>
              <span className="profilimTileChevron" aria-hidden="true">
                ›
              </span>
            </button>
          </div>
        </section>
      ))}

      {sheet ? (
        <ProfilimDrawer
          eyebrow={sheet.eyebrow}
          title={sheet.title}
          onClose={() => setSheetId(null)}
        >
          <div className="profilimTileSheetGrid">
            {sheet.tiles.map((tile) => (
              <ProfilimCompactTile
                key={tile.id}
                eyebrow={tile.eyebrow}
                title={tile.title}
                onOpen={() => openFromSheet(tile.id)}
              />
            ))}
          </div>
        </ProfilimDrawer>
      ) : null}
    </div>
  );
}
