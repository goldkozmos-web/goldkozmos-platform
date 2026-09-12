"use client";

import { useState } from "react";

import { createSupabaseBrowserClient } from "../../lib/supabase/browser";

const CLUBS = [
  {
    id: "kitap",
    title: "Kitap Kulübü",
    text: "Birlikte okuyacağımız, konuşacağımız ve uygulayacağımız kişisel gelişim kitapları.",
  },
  {
    id: "gelisim",
    title: "Kişisel Gelişim Kulübü",
    text: "Farkındalık, alışkanlıklar ve kendilik üzerine ortak gelişim alanı.",
  },
] as const;

export default function HomeCommunities() {
  const [note, setNote] = useState("");

  async function join(clubId: string) {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setNote("Haberdar olmak için giriş yap.");
      return;
    }
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      setNote("Haberdar olmak için giriş yap.");
      return;
    }
    const { error } = await supabase.from("community_waitlist").insert({
      user_id: data.user.id,
      club_id: clubId,
    });
    setNote(error ? "Zaten listedesin veya kayıt alınamadı." : "Listeye alındın.");
  }

  return (
    <section className="homeSoftCard" aria-label="GoldKozmos Toplulukları">
      <p className="dailyEyebrow">TOPLULUK</p>
      <h2>GoldKozmos Toplulukları</h2>
      <div className="gkClubGrid" style={{ marginTop: 14 }}>
        {CLUBS.map((club) => (
          <article key={club.id} className="gkClubCard">
            <span className="gkSoon">YAKINDA</span>
            <strong>{club.title}</strong>
            <p>{club.text}</p>
            <button type="button" className="dailyInlineAction" onClick={() => void join(club.id)}>
              Haberdar Olmak İstiyorum
            </button>
          </article>
        ))}
      </div>
      {note ? <p className="dailyStatus">{note}</p> : null}
    </section>
  );
}
