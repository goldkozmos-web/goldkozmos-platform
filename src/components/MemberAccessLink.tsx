"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "../lib/supabase/browser";
import "../styles/member-access.css";

export default function MemberAccessLink() {
  const [member, setMember] = useState<boolean | null>(null);
  useEffect(() => {
    const client = createSupabaseBrowserClient();
    if (!client) return;
    let active = true;
    void client.auth.getSession().then(({ data, error }) => {
      if (active && !error) setMember(Boolean(data.session));
    }).catch(() => undefined);
    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
      if (active) setMember(Boolean(session));
    });
    return () => { active = false; subscription.unsubscribe(); };
  }, []);
  if (member === null) return null;
  return <Link className="memberAccessLink" href="/profilim" prefetch={false}>
    <span aria-hidden="true">✧</span>{member ? "Profilim" : "Ücretsiz üye ol"}
  </Link>;
}
