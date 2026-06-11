export interface SocialLinks {
  twitter?: string;
  github?: string;
  website?: string;
  linkedin?: string;
  email?: string;
}

export interface Author {
  name: string;
  affiliation?: string;
  orcid?: string;
}

export interface Article {
  id: string;
  title: string;
  accessType?: string;
  authors: Author[];
  abstract: string;
  keyWords: string[];
  journal?: string;
  publisher?: string;
  publisherDate?: string;
  doi?: string;
  url?: string;
  pdfUrl?: string;
  sourceUrl?: string;
  viewsCount: number;
}

export type CategoryType = 'Barchasi' | 'Texnologiya' | 'Ilmiy' | 'Tibbiyot' | 'Iqtisodiyot' | 'Jamiyat';

export interface FilterState {
  searchQuery: string;
  categories: string[];      // ko'p tanlovli (multi-select)
  selectedTags: string[];    // ko'p tanlovli (multi-select)
  selectedAuthors: string[]; // ko'p tanlovli (multi-select)
  sortBy: 'date' | 'views' | 'citations';
  // Kengaytirilgan qidiruv maydonlari
  advTitle?: string;
  advAuthor?: string;
  advAbstract?: string;
  advKeywords?: string;
  advPublisher?: string;
  advDoi?: string;
}
