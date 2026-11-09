"use client";

import Image from "next/image";
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
      className={`liveActivity goldmindBroadcast${live ? " isConnected" : " isPreparing"}`}
      aria-label={title}
    >
      <div className="goldmindBroadcastBackdrop" aria-hidden="true"><Image src="/images/goldmind/categories/sakinles-premium.webp" alt="" fill sizes="(max-width: 700px) 100vw, 900px" /></div>
      <div className="goldmindBroadcastTop"><p className="liveActivityTitle">GOLDMIND AKIŞI</p><span className="goldmindBroadcastStatus"><i aria-hidden="true" />{live ? "Canlı" : "Hazırlanıyor"}</span></div>
      <div className="goldmindBroadcastVisual" aria-hidden="true"><span className="goldmindBroadcastHalo" /><div className="goldmindBroadcastWaves">{[8,14,25,19,36,48,30,56,40,26,46,35,18,29,13,23,38,52,33,24,42,26,18,12,8].map((height,index)=><i key={index} style={{height: `${height}px`, animationDelay: `${index * -.17}s`}} />)}</div></div>
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

      {live ? (
        <>
          <div className="liveActivityCount">
            <strong>{activeUsers}</strong>
            <span className="liveActivityBadge">ŞU ANDA</span>
          </div>
          <p className="liveActivityCaption">{caption}</p>
        </>
      ) : (
        <div className="goldmindBroadcastWaiting"><h2>Birlikte, kendimize dönelim.</h2><p>{fallback === "Canlı GoldMind akışı yakında" ? "Pratikler yayınlandığında canlı katılım bu alanda görünecek." : fallback}</p></div>
      )}

      <div className="goldmindBroadcastBottom"><span aria-hidden="true">✦</span><p className="liveActivityFoot">{footnote}</p><span className="goldmindBroadcastSignal" aria-hidden="true"><i /><i /><i /></span></div>
    </section>
  );
}
