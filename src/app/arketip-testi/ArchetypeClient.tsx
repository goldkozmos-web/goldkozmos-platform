"use client";

import { useState } from "react";

import FooterSection from "../../components/FooterSection";
import HomeNavbar from "../../components/HomeNavbar";
import {
  ARCHETYPE_QUESTIONS,
  scoreArchetypes,
  type ArchetypeId,
} from "../../data/archetypes";
import { createSupabaseBrowserClient } from "../../lib/supabase/browser";
import "../../styles/home.css";
import "../../styles/daily-practice.css";

export default function ArchetypeClient() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState("");
  const question = ARCHETYPE_QUESTIONS[index];
  const done = Object.keys(answers).length === ARCHETYPE_QUESTIONS.length;
  const top = done ? scoreArchetypes(answers) : [];

  async function persist() {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setSaved("Sonuç tarayıcıda kaldı. Hesaba yazmak için giriş yap.");
      return;
    }
    const { data: session } = await supabase.auth.getSession();
    if (!session.session?.user.id || !top[0]) {
      setSaved("Giriş yapmalısın.");
      return;
    }
    const { error } = await supabase.from("user_archetype").upsert({
      user_id: session.session.user.id,
      primary_id: top[0].id,
      second_id: top[1]?.id ?? null,
      third_id: top[2]?.id ?? null,
      payload: { answers, top },
      updated_at: new Date().toISOString(),
    });
    await supabase.from("user_test_results").upsert({
      user_id: session.session.user.id,
      test_kind: "archetype",
      result: { top, answers },
      created_at: new Date().toISOString(),
    });
    await supabase.rpc("record_user_activity", {
      p_kind: "archetype",
      p_title: "Arketip testi tamamlandı",
      p_href: "/arketip-testi",
      p_payload: {},
    });
    setSaved(error ? error.message : "Profiline kaydedildi.");
  }

  return (
    <main className="homeV3Page gkRouteIn" id="top">
      <HomeNavbar />
      <div className="homeSoftCard" style={{ marginTop: 28 }}>
        <p className="dailyEyebrow">ÖZ-FARKINDALIK ARACI</p>
        <h1 style={{ fontFamily: "Georgia, serif", fontWeight: 400 }}>
          GoldKozmos Arketip Testi
        </h1>
        <p>
          Bu klinik bir kişilik testi değil. Kendine hangi arketipten baktığını görmek için
          24 soruluk bir öz-farkındalık aracı.
        </p>
      </div>

      {!done && question ? (
        <div className="homeSoftCard">
          <p className="dailyEyebrow">
            {index + 1} / {ARCHETYPE_QUESTIONS.length}
          </p>
          <h2>{question.text}</h2>
          <div className="gkWorkGrid" style={{ marginTop: 14 }}>
            {question.options.map((option) => (
              <button
                key={option.id}
                type="button"
                className="gkWorkCard"
                onClick={() => {
                  setAnswers((current) => ({ ...current, [question.id]: option.id }));
                  setIndex((value) => Math.min(ARCHETYPE_QUESTIONS.length - 1, value + 1));
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {done ? (
        <div className="homeSoftCard">
          <p className="dailyEyebrow">SONUCUN</p>
          {top.map((item, rank) => (
            <article key={item.id} className="gkWorkCard" style={{ marginTop: 12 }}>
              <span className="gkSoon">
                {rank === 0 ? "BASKIN" : rank === 1 ? "İKİNCİ" : "ÜÇÜNCÜ"}
              </span>
              <strong>{item.name}</strong>
              <p>{item.traits}</p>
              <p>Güçlü taraf: {item.strength}</p>
              <p>Gölge: {item.shadow}</p>
              <p>İhtiyaç: {item.needs}</p>
              <p>İlişkiler: {item.relations}</p>
              <p>Gelişim: {item.growth}</p>
            </article>
          ))}
          <button type="button" className="dailyActionDone" onClick={() => void persist()}>
            Profilime kaydet
          </button>
          {saved ? <p className="dailyStatus">{saved}</p> : null}
        </div>
      ) : null}
      <FooterSection />
    </main>
  );
}

export type { ArchetypeId };
