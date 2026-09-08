"use client";

import { PLATFORM_CATALOG } from "../../data/platformFlow";
import ContinueCard from "./ContinueCard";
import { usePlayback } from "./PlaybackProvider";

type ContinueGlanceProps = {
  platformId?: (typeof PLATFORM_CATALOG)[number]["id"];
  variant?: "glance" | "page";
};

export default function ContinueGlance({
  platformId,
  variant = "glance",
}: ContinueGlanceProps) {
  const { latest, forPlatform } = usePlayback();
  const item = platformId ? forPlatform(platformId) : latest;

  if (variant === "page" && !item) {
    return null;
  }

  return (
    <div className={variant === "glance" ? "platformGlance" : "platformPageContinue"}>
      <div className={variant === "glance" ? "homeV3Container" : undefined}>
        <ContinueCard
          item={item}
          variant={variant}
        />
      </div>
    </div>
  );
}
