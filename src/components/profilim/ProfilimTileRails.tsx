"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { PROFILIM_TILE_GROUPS } from "../../data/profilimTileGroups";
import type { ProfilimDrawerId } from "../../lib/profilim/types";
import ProfilimCompactTile from "./ProfilimCompactTile";
import ProfilimDrawer from "./ProfilimDrawer";

function TileRail({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = ref.current;
    if (!current) return;
    const rail: HTMLDivElement = current;

    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let axis: "x" | "y" | null = null;

    function down(event: PointerEvent) {
      startX = event.clientX;
      startY = event.clientY;
      startLeft = rail.scrollLeft;
      axis = null;
    }

    function move(event: PointerEvent) {
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      if (!axis && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
        axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      }
      if (axis === "x") {
        rail.scrollLeft = startLeft - dx;
      }
    }

    function click(event: Event) {
      if (axis === "x") {
        event.preventDefault();
        event.stopPropagation();
      }
    }

    rail.addEventListener("pointerdown", down);
    rail.addEventListener("pointermove", move);
    rail.addEventListener("click", click, true);
    return () => {
      rail.removeEventListener("pointerdown", down);
      rail.removeEventListener("pointermove", move);
      rail.removeEventListener("click", click, true);
    };
  }, []);

  return (
    <div className="profilimTileRailWrap" ref={ref}>
      {children}
    </div>
  );
}

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
          <TileRail>
            {group.tiles.map((tile) => (
              <ProfilimCompactTile
                key={tile.id}
                eyebrow={tile.eyebrow}
                title={tile.title}
                onOpen={() => onOpenTile(tile.id)}
              />
            ))}
            <span className="profilimTileRailEnd" aria-hidden="true" />
          </TileRail>
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
