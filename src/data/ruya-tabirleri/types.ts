export type DreamVariation = {
  heading: string;
  body: string;
};

export type DreamGuide = {
  id: string;
  title: string;
  slug: string;
  h1: string;
  seoTitle: string;
  metaDescription: string;
  searchAliases: string[];
  aliases: string[];
  keywords: string[];
  normalizedSearchTerms: string[];
  intro: string;
  spiritualMeaning: string;
  variations: DreamVariation[];
  emotionMeaning?: string;
  relationshipMeaning?: string;
  careerMoneyMeaning?: string;
  colorMeaning?: string;
  placeMeaning?: string;
  peopleMeaning?: string;
  summary: string;
  relatedDreams: string[];
  faqs: { question: string; answer: string }[];
  published: boolean;
  updatedAt: string;
};

export type DreamGuideDraft = Omit<
  DreamGuide,
  "aliases" | "keywords" | "normalizedSearchTerms"
> &
  Partial<Pick<DreamGuide, "aliases" | "keywords" | "normalizedSearchTerms">>;

export type DreamLexiconEntry = {
  title: string;
  slug: string;
  aliases: string[];
  keywords: string[];
  normalizedSearchTerms: string[];
  contentSlug?: string;
};

export type DreamSearchHit = {
  title: string;
  slug: string;
  href?: string;
  ready: boolean;
};
