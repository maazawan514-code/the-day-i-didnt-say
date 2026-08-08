import matter from 'gray-matter';
import type { Post } from '../types';

// Vite-compatible build-time glob import. Use eager:true to include raw markdown
// content at build time so CMS_POSTS is available to the app without runtime fetches.
const rawPostFiles = import.meta.glob('../../content/posts/*.md', { as: 'raw', eager: true }) as Record<string, string>;

const parseRawPost = (filePath: string, raw: string): Post => {
  const { data, content } = matter(raw);
  const slug = String(data.slug ?? filePath.split('/').pop()?.replace(/\.md$/, '') ?? '');
  const id = String(data.id ?? slug);

  return {
    id,
    slug,
    title: String(data.title ?? ''),
    subtitle: data.subtitle ? String(data.subtitle) : undefined,
    category: String(data.category ?? 'Poetry'),
    date: String(data.date ?? ''),
    year: Number(data.year ?? new Date(String(data.date ?? '')).getFullYear() ?? 0),
    month: String(data.month ?? ''),
    readTime: String(data.readTime ?? ''),
    excerpt: String(data.excerpt ?? ''),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    author: {
      name: String(data.author?.name ?? ''),
      role: String(data.author?.role ?? ''),
      avatar: data.author?.avatar ? String(data.author.avatar) : undefined,
    },
    featured: data.featured === true,
    contentType: String(data.contentType ?? ''),
    content: String(content).trim(),
    mathFormulas: Array.isArray(data.mathFormulas)
      ? data.mathFormulas.map((item: any) => ({
          label: String(item.label ?? ''),
          latex: String(item.latex ?? ''),
          explanation: item.explanation ? String(item.explanation) : undefined,
        }))
      : undefined,
    footnotes: Array.isArray(data.footnotes)
      ? data.footnotes.map((item: any) => ({
          id: Number(item.id),
          label: String(item.label ?? ''),
          text: String(item.text ?? ''),
        }))
      : undefined,
    toc: Array.isArray(data.toc)
      ? data.toc.map((item: any) => ({
          id: String(item.id ?? ''),
          title: String(item.title ?? ''),
          level: Number(item.level ?? 2),
        }))
      : undefined,
    letterRecipient: data.letterRecipient ? String(data.letterRecipient) : undefined,
    diaryLocation: data.diaryLocation ? String(data.diaryLocation) : undefined,
    coverImage: data.coverImage ? String(data.coverImage) : undefined,
    featuredImage: data.featuredImage ? String(data.featuredImage) : undefined,
    seoTitle: data.seoTitle ? String(data.seoTitle) : undefined,
    seoDescription: data.seoDescription ? String(data.seoDescription) : undefined,
    ogImage: data.ogImage ? String(data.ogImage) : undefined,
  };
};

const loadedPosts = Object.entries(rawPostFiles)
  .map(([filePath, raw]) => parseRawPost(filePath, raw))
  .sort((a, b) => {
    const aDate = new Date(a.date).getTime();
    const bDate = new Date(b.date).getTime();
    if (bDate !== aDate) return bDate - aDate;
    return a.title.localeCompare(b.title);
  });

export const CMS_POSTS: Post[] = loadedPosts;
