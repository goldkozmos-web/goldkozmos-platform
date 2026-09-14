import { SIGNS, signById } from "../../data/burclar/signs";
import type { Sign, SignId } from "../../data/burclar/types";

export function pairSlug(a: SignId, b: SignId) {
  return [a, b].sort((x, y) => x.localeCompare(y, "en")).join("-");
}

export function parsePairSlug(slug: string): [SignId, SignId] | null {
  const parts = slug.split("-");
  if (parts.length !== 2) return null;
  const [x, y] = parts as [SignId, SignId];
  if (!signById(x) || !signById(y)) return null;
  return [x, y];
}

export function canonicalPair(a: SignId, b: SignId) {
  const [left, right] = [a, b].sort((x, y) => x.localeCompare(y, "en")) as [
    SignId,
    SignId,
  ];
  return { a: signById(left)!, b: signById(right)!, slug: `${left}-${right}` };
}

export function aliasPairSlug(a: SignId, b: SignId) {
  if (a === b) return null;
  const canonical = pairSlug(a, b);
  const reversed = `${b}-${a}`;
  return reversed === canonical ? null : reversed;
}

export function allCanonicalPairs() {
  const out: { a: Sign; b: Sign; slug: string }[] = [];
  for (let i = 0; i < SIGNS.length; i += 1) {
    for (let j = i; j < SIGNS.length; j += 1) {
      out.push(canonicalPair(SIGNS[i].id, SIGNS[j].id));
    }
  }
  return out;
}

export function reversedPairRedirects() {
  return allCanonicalPairs()
    .filter((pair) => pair.a.id !== pair.b.id)
    .map((pair) => ({
      source: `/burc-uyumu/${pair.b.id}-${pair.a.id}`,
      destination: `/burc-uyumu/${pair.slug}`,
      permanent: true as const,
    }));
}
