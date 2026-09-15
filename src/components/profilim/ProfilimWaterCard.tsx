"use client";

import { useEffect, useState } from "react";

import { createSupabaseBrowserClient } from "../../lib/supabase/browser";
import { recoverMissingTable } from "../../lib/platform/ensureSchema";
import WaterGlassArt from "./WaterGlassArt";

export default function ProfilimWaterCard({
  userId,
  onOpen,
}: {
  userId: string;
  onOpen: () => void;
}) {
  const [glasses, setGlasses] = useState(0);
  const [goal, setGoal] = useState(8);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase || !userId) return;
    const today = new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Istanbul" });
    void Promise.all([
      supabase.from("water_reminder_settings").select("daily_goal").eq("user_id", userId).maybeSingle(),
      supabase
        .from("water_logs")
        .select("amount")
        .eq("user_id", userId)
        .gte("logged_at", `${today}T00:00:00+03:00`),
    ]).then(async ([settings, logs]) => {
      if (settings.error && (await recoverMissingTable(settings.error.message))) {
        const todayAgain = new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Istanbul" });
        const retry = await Promise.all([
          supabase.from("water_reminder_settings").select("daily_goal").eq("user_id", userId).maybeSingle(),
          supabase
            .from("water_logs")
            .select("amount")
            .eq("user_id", userId)
            .gte("logged_at", `${todayAgain}T00:00:00+03:00`),
        ]);
        if (retry[0].data?.daily_goal) setGoal(Number(retry[0].data.daily_goal));
        setGlasses((retry[1].data ?? []).reduce((sum, row) => sum + Number(row.amount || 1), 0));
        return;
      }
      if (settings.data?.daily_goal) setGoal(Number(settings.data.daily_goal));
      setGlasses((logs.data ?? []).reduce((sum, row) => sum + Number(row.amount || 1), 0));
    });
  }, [userId]);

  const done = glasses >= goal;

  return (
    <button
      type="button"
      className="profilimFeatured profilimWaterCard"
      onClick={onOpen}
      aria-label={`Su hatırlatıcısı, bugün ${glasses} / ${goal} bardak`}
    >
      <span className="profilimWaterAura" aria-hidden="true" />
      <span className="profilimWaterCopy">
        <span className="profilimFeaturedEyebrow">SU</span>
        <strong className="profilimFeaturedTitle">Su hatırlatıcısı</strong>
        <span className="profilimWaterMeta">
          {done ? "Bugün tamam" : `Bugün: ${glasses} / ${goal}`}
        </span>
      </span>
      <WaterGlassArt glasses={glasses} goal={goal} />
    </button>
  );
}
