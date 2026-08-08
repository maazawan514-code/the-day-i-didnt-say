export type Category = 
  | 'Poetry'
  | 'Letters'
  | 'Essays'
  | 'Reflections'
  | 'Journal'
  | 'Personal';

export type ContentType =
  | 'poetry'
  | 'letter'
  | 'mathematics'
  | 'teaching'
  | 'journal'
  | 'reflections'
  | 'philosophy'
  | 'memory'
  | 'domestic'
  | string;

export interface Footnote {
  id: number;
  label: string;
  text: string;
}

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: Category;
  date: string; // ISO or readable string
  year: number;
  month: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  featured?: boolean;
  contentType: ContentType;
  content: string; // Markdown or structured text
  mathFormulas?: { label: string; latex: string; explanation?: string }[];
  footnotes?: Footnote[];
  toc?: TocItem[];
  letterRecipient?: string;
  diaryLocation?: string;
  coverImage?: string;
  featuredImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
}

export interface Comment {
  id: string;
  postId: string;
  authorName: string;
  date: string;
  text: string;
  likes: number;
}

export interface SearchFilterState {
  query: string;
  category: Category | 'All';
  tag: string | 'All';
  year: number | 'All';
}
