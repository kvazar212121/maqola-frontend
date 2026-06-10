export interface SocialLinks {
  twitter?: string;
  github?: string;
  website?: string;
  linkedin?: string;
  email?: string;
}

export interface Author {
  id: string;
  name: string;
  avatar: string; // URL yoki rang/harf generatori uchun
  bio: string;
  role: string;
  institution?: string; // Muallif ishlaydigan universitet/tashkilot
  socialLinks: SocialLinks;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string; // To'liq maqola matni (Markdown formatida bo'lishi mumkin)
  author: Author;
  publishedAt: string; // ISO formatdagi sana yoki chiroyli yozilgan sana
  readTime: number; // o'qish vaqti (daqiqa)
  category: string;
  tags: string[];
  views: number;
  likes: number;
  featured?: boolean;
  doi?: string; // Digital Object Identifier - ilmiy maqolalar uchun muhim havola
  publisher?: string; // Nashriyot nomi (masalan, IEEE, Springer, O'zMU xabarlari)
  downloadUrl?: string; // PDF yuklab olish uchun havola
  externalUrl?: string; // Asl manba havolasi (link)
  citationsCount?: number; // Iqtiboslar soni
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
