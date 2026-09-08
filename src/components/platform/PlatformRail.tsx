"use client";

import { PLATFORM_CATALOG } from "../../data/platformFlow";
import { usePlayback } from "./PlaybackProvider";
import PlatformProgressCard from "./PlatformProgressCard";

export default function PlatformRail() {
  const { forPlatform } = usePlayback();

  return (
    <section className="platformRail" aria-label="GoldKozmos platformları">
      <div className="homeV3Container">
        <p className="platformRailEyebrow">Platform</p>
        <div className="platformRailSlider">
          {PLATFORM_CATALOG.map((platform) => (
            <PlatformProgressCard
              key={platform.id}
              platform={platform}
              progress={forPlatform(platform.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
