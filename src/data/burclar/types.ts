export type Element = "ates" | "toprak" | "hava" | "su";
export type Modality = "oncu" | "sabit" | "degisken";
export type Gender = "kadin" | "erkek";

export type VerbalScore =
  | "Düşük"
  | "Düşük-Orta"
  | "Orta"
  | "Orta-Yüksek"
  | "Yüksek";

export type SignId =
  | "koc"
  | "boga"
  | "ikizler"
  | "yengec"
  | "aslan"
  | "basak"
  | "terazi"
  | "akrep"
  | "yay"
  | "oglak"
  | "kova"
  | "balik";

export type SignProfile = {
  intro: string;
  character: string;
  inLove: string;
  values: string;
  whenInterested: string;
  whenDistant: string;
  feelingsShown?: string;
  strengths: string;
  challenges: string;
  workLife: string;
  summary: string;
};

export type Sign = {
  id: SignId;
  name: string;
  slug: string;
  symbol: string;
  element: Element;
  elementLabel: string;
  modality: Modality;
  modalityLabel: string;
  rulingPlanets: string[];
  dateRange: string;
  coreTraits: string[];
  relationshipStyle: string;
  communicationStyle: string;
  emotionalNeeds: string;
  strengths: string[];
  challenges: string[];
  loveStyle: string;
  woman: SignProfile;
  man: SignProfile;
  bestMatches: SignId[];
  attractionGives: string;
  attractionSeeks: string;
  trustNeed: string;
  frictionHabit: string;
  repairMove: string;
  passionNote: string;
  tempo: string;
  withElement: Record<Element, string>;
  withModality: Record<Modality, string>;
};

export type SignGenderPage = {
  sign: Sign;
  gender: Gender;
  slug: string;
  title: string;
  h1: string;
  seoTitle: string;
  metaDescription: string;
  profile: SignProfile;
};

export type MatchScores = {
  emotional: VerbalScore;
  communication: VerbalScore;
  trust: VerbalScore;
  attraction: VerbalScore;
  longTerm: VerbalScore;
};

export type MatchArticle = {
  slug: string;
  a: Sign;
  b: Sign;
  h1: string;
  seoTitle: string;
  metaDescription: string;
  scores: MatchScores;
  intro: string;
  attraction: string;
  emotional: string;
  communication: string;
  trust: string;
  passion: string;
  friction: string;
  strengthen: string;
  womanAManB: string;
  manAWomanB: string;
  longTerm: string;
  summary: string;
};

export type BurcSearchHit = {
  title: string;
  href: string;
  hint?: string;
};
