"use client";

import { openSiteDrawer, type SiteDrawerId } from "../../lib/siteDrawer";
import "../../styles/daily-practice.css";

const GOLD_CHIPS = [
  { href: "/#goldact", label: "GoldAct" },
  { href: "/goldblog", label: "GoldBlog" },
  { href: "/goldcast", label: "GoldCast" },
  { href: "/goldfrekans", label: "GoldFrekans" },
  { href: "/goldbook", label: "GoldBook" },
  { href: "/goldmind", label: "GoldMind" },
  { href: "/goldrituel", label: "GoldRitüel" },
] as const;

type BrownChip =
  | { drawer: SiteDrawerId; label: string }
  | { href: string; label: string };

const BROWN_CHIPS: BrownChip[] = [
  { drawer: "duyguRehberi", label: "Duygu rehberi" },
  { drawer: "journal", label: "Not al" },
  { href: "/ruya-tabirleri", label: "Rüya tabiri" },
  { href: "/tarot-bakimi", label: "Tarot bak" },
  { href: "/burclar", label: "Burçlar" },
];

function ChipFace({
  label,
  tone,
  index,
}: {
  label: string;
  tone: "gold" | "brown";
  index: number;
}) {
  return (
    <span className={`dailyActionCard${tone === "brown" ? " isBrown" : ""}`}>
      <span
        className={
          tone === "brown"
            ? "dailyActionWash dailyActionWash--brown"
            : "dailyActionWash"
        }
        aria-hidden="true"
        style={{ animationDelay: `${index * 0.9}s` }}
      />
      <span
        className={
          tone === "brown"
            ? "dailyActionShine dailyActionShine--brown"
            : "dailyActionShine"
        }
        aria-hidden="true"
        style={{ animationDelay: `${index * 0.5}s` }}
      />
      <span className="dailyActionLabel">{label}</span>
    </span>
  );
}

function GoldRow() {
  return (
    <div className="dailyActionScroller">
      <div className="dailyActionRail">
        {GOLD_CHIPS.map((chip, index) => (
          <a key={chip.label} className="dailyActionShell" href={chip.href}>
            <ChipFace label={chip.label} tone="gold" index={index} />
          </a>
        ))}
      </div>
    </div>
  );
}

function BrownRow() {
  return (
    <div className="dailyActionScroller isBrown">
      <div className="dailyActionRail">
        {BROWN_CHIPS.map((chip, index) =>
          "drawer" in chip ? (
            <button
              key={chip.label}
              type="button"
              className="dailyActionShell"
              onClick={() => openSiteDrawer(chip.drawer)}
            >
              <ChipFace label={chip.label} tone="brown" index={index} />
            </button>
          ) : (
            <a key={chip.label} className="dailyActionShell" href={chip.href}>
              <ChipFace label={chip.label} tone="brown" index={index} />
            </a>
          ),
        )}
      </div>
    </div>
  );
}

export default function DailyActionCard() {
  return (
    <section className="dailyActionBand" aria-label="GoldKozmos kısayolları">
      <GoldRow />
      <BrownRow />
    </section>
  );
}
