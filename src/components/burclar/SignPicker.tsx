"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { SIGNS } from "../../data/burclar/signs";
import { matchHref } from "../../lib/burclar/search";
import type { SignId } from "../../data/burclar/types";

export default function SignPicker({
  initialA,
  initialB,
}: {
  initialA?: SignId;
  initialB?: SignId;
}) {
  const router = useRouter();
  const [a, setA] = useState<SignId>(initialA ?? "akrep");
  const [b, setB] = useState<SignId>(initialB ?? "koc");
  const href = useMemo(() => matchHref(a, b), [a, b]);

  return (
    <form
      className="burcPick"
      onSubmit={(event) => {
        event.preventDefault();
        router.push(href);
      }}
    >
      <label>
        1. burç
        <select value={a} onChange={(event) => setA(event.target.value as SignId)}>
          {SIGNS.map((sign) => (
            <option key={sign.id} value={sign.id}>
              {sign.symbol} {sign.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        2. burç
        <select value={b} onChange={(event) => setB(event.target.value as SignId)}>
          {SIGNS.map((sign) => (
            <option key={`b-${sign.id}`} value={sign.id}>
              {sign.symbol} {sign.name}
            </option>
          ))}
        </select>
      </label>
      <button className="burcCta" type="submit">
        Aşk Uyumunu Gör
      </button>
    </form>
  );
}
