"use client";

import { useEffect, useState } from "react";

import { createSupabaseBrowserClient } from "../../lib/supabase/browser";

export function FavoriteButton({
  contentType,
  contentId,
  title,
  href,
}: {
  contentType: string;
  contentId: string;
  title: string;
  href: string;
}) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;
    void supabase
      .from("favorites")
      .select("id")
      .eq("content_type", contentType)
      .eq("content_id", contentId)
      .maybeSingle()
      .then(({ data }) => setOn(Boolean(data)));
  }, [contentType, contentId]);

  return (
    <button
      type="button"
      className="dailyInlineAction"
      onClick={() => {
        const supabase = createSupabaseBrowserClient();
        if (!supabase) return;
        void (async () => {
          const { data: session } = await supabase.auth.getSession();
          if (!session.session?.user.id) return;
          if (on) {
            await supabase
              .from("favorites")
              .delete()
              .eq("content_type", contentType)
              .eq("content_id", contentId);
            setOn(false);
            return;
          }
          await supabase.from("favorites").insert({
            user_id: session.session.user.id,
            content_type: contentType,
            content_id: contentId,
            title,
            href,
          });
          setOn(true);
        })();
      }}
    >
      {on ? "Favoride" : "Favorile"}
    </button>
  );
}
