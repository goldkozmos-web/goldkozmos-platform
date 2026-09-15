"use client";

import { youtubeIdFromUrl } from "../../lib/youtube";
import { usePlayback } from "../platform/PlaybackProvider";
import type { GoldFrekansTrack } from "../../data/goldfrekans/tracks";

export default function GoldFrekansPlayButton({
  track,
}: {
  track: GoldFrekansTrack;
}) {
  const { startYoutube } = usePlayback();
  const youtubeId = youtubeIdFromUrl(track.youtubeUrl);

  return (
    <button
      type="button"
      className="goldFrekansPlayCta"
      onClick={() => {
        if (!youtubeId) return;
        startYoutube({
          platform: "goldfrekans",
          contentId: youtubeId,
          title: track.title,
          href: `/goldfrekans/${track.slug}`,
          youtubeId,
          artworkUrl: track.thumbnail,
          description: track.description,
        });
      }}
    >
      Dinle
    </button>
  );
}
