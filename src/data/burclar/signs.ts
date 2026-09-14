import type { Sign, SignId } from "./types";
import { akrep } from "./voices/akrep";
import { aslan } from "./voices/aslan";
import { balik } from "./voices/balik";
import { basak } from "./voices/basak";
import { boga } from "./voices/boga";
import { ikizler } from "./voices/ikizler";
import { koc } from "./voices/koc";
import { kova } from "./voices/kova";
import { oglak } from "./voices/oglak";
import { terazi } from "./voices/terazi";
import { yay } from "./voices/yay";
import { yengec } from "./voices/yengec";

export const SIGNS: Sign[] = [
  koc,
  boga,
  ikizler,
  yengec,
  aslan,
  basak,
  terazi,
  akrep,
  yay,
  oglak,
  kova,
  balik,
];

const byId = new Map(SIGNS.map((sign) => [sign.id, sign]));

export function signById(id: string) {
  return byId.get(id as SignId);
}

export function signBySlug(slug: string) {
  return SIGNS.find((sign) => sign.slug === slug);
}

export function genderPageSlug(sign: Sign, gender: "kadin" | "erkek") {
  return gender === "kadin" ? `${sign.slug}-kadini` : `${sign.slug}-erkegi`;
}

export function genderPageBySlug(slug: string) {
  const match = slug.match(/^([a-z]+)-(kadini|erkegi)$/);
  if (!match) return null;
  const sign = signById(match[1]);
  if (!sign) return null;
  const gender = match[2] === "kadini" ? "kadin" : "erkek";
  return { sign, gender } as const;
}
