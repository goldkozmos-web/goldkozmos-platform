"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { createSupabaseBrowserClient } from "../../lib/supabase/browser";

type Viewer = {
  displayName: string;
  email: string | null;
  avatarUrl: string | null;
};

export default function ProfilimClient() {
  const router = useRouter();
  const [viewer, setViewer] = useState<Viewer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => setViewer(data.user ?? null))
      .catch(() => setViewer(null))
      .finally(() => setLoading(false));
  }, []);

  async function signOut() {
    const supabase = createSupabaseBrowserClient();
    await supabase?.auth.signOut();
    setViewer(null);
    router.refresh();
  }

  if (loading) {
    return <p>Yükleniyor…</p>;
  }

  if (!viewer) {
    return (
      <>
        <p>Yorum yazmak ve profilini görmek için giriş yap.</p>
        <Link href="/giris?next=/profilim">Giriş Yap</Link>
      </>
    );
  }

  return (
    <>
      <p>{viewer.displayName}</p>
      {viewer.email ? <span>{viewer.email}</span> : null}
      <button type="button" onClick={() => void signOut()}>
        Çıkış Yap
      </button>
    </>
  );
}
