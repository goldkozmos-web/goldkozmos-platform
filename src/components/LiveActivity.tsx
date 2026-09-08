"use client";

import { isLiveUserCount } from "../data/goldmindLive";

type LiveActivityProps = {
  activeUsers?: number | null;
  title?: string;
  caption?: string;
  footnote?: string;
  fallback?: string;
};

export default function LiveActivity({
  activeUsers = null,
  title = "Canlı GoldKozmos Aktivitesi",
  caption = "kişi şu anda kendine alan açıyor",
  footnote = "Meditasyon • Nefes • GoldMind",
  fallback = "Canlı GoldMind akışı yakında",
}: LiveActivityProps) {
  const live = isLiveUserCount(activeUsers);

  return (
    <section
      className="liveActivity"
      aria-label={title}
    >
      <div className="liveActivityField" aria-hidden="true">
        <span className="liveActivityRing liveActivityRingA" />
        <span className="liveActivityRing liveActivityRingB" />
        <span className="liveActivityDot liveActivityDotA" />
        <span className="liveActivityDot liveActivityDotB" />
        <span className="liveActivityDot liveActivityDotC" />
        <span className="liveActivityMark liveActivityMarkA" />
        <span className="liveActivityMark liveActivityMarkB" />
        <span className="liveActivityMark liveActivityMarkC" />
      </div>

      <p className="liveActivityTitle">{title}</p>

      {live ? (
        <>
          <div className="liveActivityCount">
            <strong>{activeUsers}</strong>
            <span className="liveActivityBadge">CANLI</span>
          </div>
          <p className="liveActivityCaption">{caption}</p>
        </>
      ) : (
        <p className="liveActivityFallback">{fallback}</p>
      )}

      <p className="liveActivityFoot">{footnote}</p>
    </section>
  );
}
