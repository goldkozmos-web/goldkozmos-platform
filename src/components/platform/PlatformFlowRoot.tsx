"use client";

import { Suspense, type ReactNode } from "react";
import { PlaybackProvider, KeepPlayingOnNavigate } from "./PlaybackProvider";
import MiniPlayer from "./MiniPlayer";
import PublicOnly from "../panel/PublicOnly";

export default function PlatformFlowRoot({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <PlaybackProvider>
      {children}
      <Suspense fallback={null}>
        <KeepPlayingOnNavigate />
        <PublicOnly><MiniPlayer /></PublicOnly>
      </Suspense>
    </PlaybackProvider>
  );
}
