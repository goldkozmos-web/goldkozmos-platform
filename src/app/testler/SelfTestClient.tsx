"use client";

import { useState } from "react";

import HomeNavbar from "../../components/HomeNavbar";
import FooterSection from "../../components/FooterSection";
import { createSupabaseBrowserClient } from "../../lib/supabase/browser";
import { GOLDACT_XP_EVENT } from "../../lib/profilim/activityXp";
import type { LikertQuestion } from "../../data/selfTests";
import {
  CHARACTER_QUESTIONS,
  RELATIONSHIP_QUESTIONS,
  SHADOW_QUESTIONS,
  characterNarratives,
  relationshipNarratives,
  scoreLikert,
  shadowNarratives,
} from "../../data/selfTests";
import "../../styles/home.css";
import "../../styles/daily-practice.css";

export default function SelfTestClient({
  kind,
  title,
  lead,
  questions,
  href,
}: {
  kind: "character" | "shadow" | "relationship";
  title: string;
  lead: string;
  questions: LikertQuestion[];
  href: string;
}) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [saved, setSaved] = useState("");
  const done = Object.keys(answers).length === questions.length;
  const question = questions[index];
  const result = done
    ? kind === "character"
      ? characterNarratives(scoreLikert(CHARACTER_QUESTIONS, answers))
      : kind === "shadow"
        ? shadowNarratives(scoreLikert(SHADOW_QUESTIONS, answers))
        : relationshipNarratives(scoreLikert(RELATIONSHIP_QUESTIONS, answers))
    : null;

  async function persist() {
    const supabase = createSupabaseBrowserClient();
    if (!supabase || !result) {
      setSaved("Sonucu hesaba yazmak için giriş yap.");
      return;
    }
    const { data } = await supabase.auth.getSession();
    const userId = data.session?.user.id;
    if (!userId) {
      setSaved("Giriş yapmalısın.");
      return;
    }
    const { error } = await supabase.from("user_test_results").insert({
      user_id: userId,
      test_kind: kind,
      result,
    });
    await supabase.rpc("record_user_activity", {
      p_kind: "test_complete",
      p_title: title,
      p_href: href,
      p_payload: { kind },
    });
    await supabase.rpc("record_analytics_event", {
      p_event_name: "test_complete",
      p_path: href,
      p_user_id: userId,
      p_anonymous_session_id: null,
      p_metadata: { kind },
    });
    setSaved(error ? error.message : "Profiline kaydedildi.");
    window.dispatchEvent(new Event(GOLDACT_XP_EVENT));
  }

  return (
    <main className="homeV3Page gkRouteIn" id="top">
      <HomeNavbar />
      <div className="homeSoftCard" style={{ marginTop: 28 }}>
        <p className="dailyEyebrow">ÖZ-FARKINDALIK ARACI</p>
        <h1 style={{ fontFamily: "Georgia, serif", fontWeight: 400 }}>{title}</h1>
        <p>{lead}</p>
      </div>
      {!done && question ? (
        <div className="homeSoftCard">
          <p className="dailyEyebrow">
            {index + 1} / {questions.length}
          </p>
          <h2>{question.text}</h2>
          <div className="gkWorkGrid" style={{ marginTop: 14 }}>
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                className="gkWorkCard"
                onClick={() => {
                  setAnswers((current) => ({ ...current, [question.id]: value }));
                  setIndex((next) => Math.min(questions.length - 1, next + 1));
                }}
              >
                {value === 1
                  ? "Pek uymuyor"
                  : value === 5
                    ? "Çok uyuyor"
                    : value}
              </button>
            ))}
          </div>
        </div>
      ) : result ? (
        <div className="homeSoftCard">
          <ResultBlocks result={result} />
          <button type="button" className="goldActDone" onClick={() => void persist()}>
            Sonucu kaydet
          </button>
          {saved ? <p className="goldActNote">{saved}</p> : null}
        </div>
      ) : null}
      <FooterSection />
    </main>
  );
}

function ResultBlocks({ result }: { result: Record<string, unknown> }) {
  const entries = Object.entries(result).filter(([key]) => key !== "scores");
  return (
    <div className="profilimDrawerStack">
      {entries.map(([key, value]) => (
        <section key={key}>
          <p className="dailyEyebrow">{heading(key)}</p>
          {Array.isArray(value) ? (
            <ul>
              {value.map((item) => (
                <li key={String(item)}>{String(item)}</li>
              ))}
            </ul>
          ) : (
            <p>{String(value)}</p>
          )}
        </section>
      ))}
    </div>
  );
}

function heading(key: string) {
  const map: Record<string, string> = {
    summary: "Karakter Özeti",
    strengths: "Güçlü Yönlerin",
    struggle: "Zorlandığın Alanlar",
    relations: "İlişkilerde Sen",
    decisions: "Karar Verirken",
    stress: "Stres Altında",
    growth: "Gelişim Alanların",
    highlights: "Öne Çıkan Gölge Eğilimleri",
    when: "Hangi Durumlarda Ortaya Çıkabilir?",
    transform: "Güçlü Tarafa Nasıl Dönüşebilir?",
    tips: "Gelişim İçin Küçük Adımlar",
    overall: "İlişkide Genel Eğilimin",
    closeness: "Yakınlık ve Mesafe",
    bounds: "Sınırların",
    conflict: "Çatışma Tarzın",
    patterns: "Tekrar Eden Örüntüler",
  };
  return map[key] ?? key;
}
