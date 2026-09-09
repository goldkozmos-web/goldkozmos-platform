"use client";

import { Suspense, type ReactNode } from "react";
import { PlaybackProvider, KeepPlayingOnNavigate } from "./PlaybackProvider";
import MiniPlayer from "./MiniPlayer";

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
        <MiniPlayer />
      </Suspense>
    </PlaybackProvider>
  );
}
