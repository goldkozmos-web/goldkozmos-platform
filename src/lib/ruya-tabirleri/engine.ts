import { foldTurkish, scoreDreamQuery } from "./search";
import { normalizeDreamQuery, stemCandidates, tokenizeQuery } from "./normalize";
import {
  ACTION_TERMS,
  COLOR_TERMS,
  GENDER_TERMS,
  SYNONYMS,
} from "./modifiers";

export type DreamSearchHit = {
  slug: string;
  title: string;
  score: number;
  kind: "exact" | "alias" | "stem" | "synonym" | "fuzzy" | "parsed";
};

export type DreamSearchDoc = {
  slug: string;
  title: string;
  aliases: string[];
  folded: string[];
};

export type ParsedDreamQuery = {
  object?: string;
  color?: string;
  action?: string;
  gender?: string;
};

function levenshtein(a: string, b: string) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i += 1) {
    let prev = i - 1;
    row[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const cur = row[j] ?? 0;
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      row[j] = Math.min((row[j] ?? 0) + 1, (row[j - 1] ?? 0) + 1, prev + cost);
      prev = cur;
    }
  }
  return row[b.length] ?? 99;
}

export function parseDreamTokens(query: string): ParsedDreamQuery {
  const tokens = tokenizeQuery(query);
  const parsed: ParsedDreamQuery = {};
  const rest: string[] = [];
  for (const token of tokens) {
    if (COLOR_TERMS[token] && !parsed.color) {
      parsed.color = COLOR_TERMS[token];
      continue;
    }
    if (ACTION_TERMS[token] && !parsed.action) {
      parsed.action = ACTION_TERMS[token];
      continue;
    }
    if (GENDER_TERMS[token] && !parsed.gender) {
      parsed.gender = GENDER_TERMS[token];
      continue;
    }
    rest.push(SYNONYMS[token] || token);
  }
  if (rest.length) parsed.object = rest.join(" ");
  return parsed;
}

export function buildSearchIndex(docs: DreamSearchDoc[]) {
  const exact = new Map<string, DreamSearchDoc[]>();
  function add(key: string, doc: DreamSearchDoc) {
    const list = exact.get(key) ?? [];
    list.push(doc);
    exact.set(key, list);
  }
  for (const doc of docs) {
    for (const raw of doc.folded) {
      add(raw, doc);
      for (const stem of stemCandidates(raw)) add(stem, doc);
    }
  }
  return { docs, exact };
}

export type DreamIndex = ReturnType<typeof buildSearchIndex>;

function uniqueHits(hits: DreamSearchHit[]) {
  const seen = new Set<string>();
  return hits.filter((hit) => {
    if (seen.has(hit.slug)) return false;
    seen.add(hit.slug);
    return true;
  });
}

export function queryDreamIndex(
  index: DreamIndex,
  query: string,
  limit = 8,
): { hits: DreamSearchHit[]; parsed: ParsedDreamQuery; matchedSlug: string | null } {
  const folded = foldTurkish(query);
  const normalized = normalizeDreamQuery(query);
  const parsed = parseDreamTokens(query);
  if (folded.length < 2) {
    return { hits: [], parsed, matchedSlug: null };
  }

  const hits: DreamSearchHit[] = [];

  function push(docs: DreamSearchDoc[] | undefined, kind: DreamSearchHit["kind"], score: number) {
    if (!docs) return;
    for (const doc of docs) {
      hits.push({ slug: doc.slug, title: doc.title, kind, score });
    }
  }

  push(index.exact.get(folded), "exact", 40);
  push(index.exact.get(normalized), "alias", 28);
  for (const token of tokenizeQuery(query)) {
    const syn = SYNONYMS[token];
    if (syn) push(index.exact.get(foldTurkish(syn)), "synonym", 24);
    for (const stem of stemCandidates(token)) {
      push(index.exact.get(stem), "stem", 18);
    }
  }
  if (parsed.object) {
    for (const stem of stemCandidates(foldTurkish(parsed.object))) {
      push(index.exact.get(stem), "parsed", 16);
    }
    push(index.exact.get(foldTurkish(parsed.object)), "parsed", 20);
  }

  if (hits.length < limit) {
    const needle = parsed.object ? foldTurkish(parsed.object) : normalized;
    if (needle.length >= 4) {
      const max = needle.length >= 8 ? 2 : 2;
      for (const doc of index.docs) {
        let best = 99;
        let close = false;
        for (const alias of doc.folded) {
          if (Math.abs(alias.length - needle.length) > 2) continue;
          const dist = levenshtein(needle, alias);
          if (dist < best) {
            best = dist;
            close = alias.length === needle.length;
          }
          if (best === 0) break;
        }
        if (best > 0 && best <= max) {
          hits.push({
            slug: doc.slug,
            title: doc.title,
            kind: "fuzzy",
            score: 10 - best + (close ? 4 : 0),
          });
        }
      }
    }
  }

  if (hits.length < 3) {
    for (const doc of index.docs) {
      const score = scoreDreamQuery(query, [doc.title, ...doc.aliases]);
      if (score > 0) hits.push({ slug: doc.slug, title: doc.title, kind: "alias", score });
    }
  }

  const objectFold = parsed.object ? foldTurkish(parsed.object) : "";
  const colorFold = parsed.color ? foldTurkish(parsed.color) : "";
  const ranked = uniqueHits(hits)
    .map((hit) => {
      let score = hit.score;
      if (objectFold && hit.slug.includes(`-${objectFold}-`)) score += 14;
      if (objectFold && colorFold && hit.slug.includes(colorFold) && hit.slug.includes(objectFold)) {
        score += 18;
      }
      return { ...hit, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.max(6, limit));

  return {
    hits: ranked,
    parsed,
    matchedSlug: ranked[0]?.slug ?? null,
  };
}
