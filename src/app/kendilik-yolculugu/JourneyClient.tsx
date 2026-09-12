"use client";

import { useEffect, useMemo, useState } from "react";

import FooterSection from "../../components/FooterSection";
import HomeNavbar from "../../components/HomeNavbar";
import { JOURNEY_DAYS } from "../../data/kendilik-yolculugu";
import { createSupabaseBrowserClient } from "../../lib/supabase/browser";
import "../../styles/home.css";
import "../../styles/daily-practice.css";

export default function JourneyClient() {
  const [status, setStatus] = useState("");
  const [done, setDone] = useState<number[]>([]);
  const [note, setNote] = useState("");
  const completed = new Set(done);
  const current =
    JOURNEY_DAYS.find((item) => !completed.has(item.day)) ?? JOURNEY_DAYS[20];

  async function load() {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;
    const { data: session } = await supabase.auth.getSession();
    if (!session.session?.user.id) return;
    const { data } = await supabase
      .from("user_journey_days")
      .select("day")
      .eq("user_id", session.session.user.id);
    setDone((data ?? []).map((row) => Number(row.day)));
  }

  useEffect(() => {
    void load();
  }, []);

  const progress = useMemo(() => completed.size, [completed.size]);

  async function complete() {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setStatus("Giriş yapmalısın.");
      return;
    }
    const { error } = await supabase.rpc("complete_journey_day", {
      p_day: current.day,
      p_note: note,
    });
    setStatus(error ? error.message : "Gün kaydedildi.");
    if (!error) void load();
  }

  return (
    <main className="homeV3Page gkRouteIn" id="top">
      <HomeNavbar />
      <div className="homeSoftCard" style={{ marginTop: 28 }}>
        <p className="dailyEyebrow">KENDİLİK</p>
        <h1 style={{ fontFamily: "Georgia, serif", fontWeight: 400 }}>
          21 Günlük Kendilik Yolculuğu
        </h1>
        <p>Günde birkaç dakika. Kaçırılan gün her şeyi sıfırlamaz.</p>
        <p>İlerleme: {progress} / 21</p>
      </div>
      <div className="homeSoftCard">
        <p className="dailyEyebrow">GÜN {current.day}</p>
        <h2>{current.title}</h2>
        <p>{current.read}</p>
        <p>
          <strong>Uygulama: </strong>
          {current.practice}
        </p>
        <p>
          <strong>Soru: </strong>
          {current.question}
        </p>
        <textarea
          className="grNote"
          style={{ width: "100%", minHeight: 80, marginTop: 12 }}
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Kısa not (isteğe bağlı)"
        />
        <button type="button" className="dailyActionDone" onClick={() => void complete()}>
          {completed.has(current.day) ? "Tamamlandı" : "Günü tamamla"}
        </button>
        {status ? <p className="dailyStatus">{status}</p> : null}
      </div>
      <FooterSection />
    </main>
  );
}
