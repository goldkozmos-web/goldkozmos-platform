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
  category?: string;
  mainSymbol?: string;
  indexable?: boolean;
};

export type DreamConcept = {
  id: string;
  slug: string;
  title: string;
  h1: string;
  mainSymbol: string;
  category: string;
  aliases: string[];
  modifiers: string[];
  shortAnswer: string;
  spiritualMeaning: string;
  variants: DreamVariation[];
  relatedSymbols: string[];
  seoTitle: string;
  metaDescription: string;
  published: boolean;
  indexable: boolean;
};
