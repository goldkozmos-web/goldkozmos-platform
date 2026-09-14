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
};
