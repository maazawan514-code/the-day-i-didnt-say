import type { Post } from '../types';

// Vite-compatible build-time glob import. Use eager:true to include raw markdown
// content at build time so CMS_POSTS is available to the app without runtime fetches.
const rawPostFiles = import.meta.glob('../../content/posts/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

// Minimal, browser-safe YAML/frontmatter parser tailored to our posts' structure.
// It supports:
// - simple key: value pairs (strings, numbers, booleans)
// - quoted strings (single or double)
// - nested mappings via indentation
// - arrays using leading "- " lines
// This intentionally avoids any Node-only APIs and is small and deterministic.
function parseFrontmatter(yaml: string): Record<string, any> {
  const lines = yaml.replace(/\r\n/g, '\n').split('\n');
  const root: any = {};
  const stack: Array<{ indent: number; node: any; key?: string }> = [{ indent: -1, node: root }];

  const parseScalar = (raw: string) => {
    if (raw === '') return '';
    if (/^".*"$/.test(raw) || /^'.*'$/.test(raw)) return raw.slice(1, -1);
    if (raw === 'true') return true;
    if (raw === 'false') return false;
    if (/^\d+$/.test(raw)) return Number(raw);
    return raw;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    const indent = line.match(/^\s*/)?.[0].length ?? 0;
    const trimmed = line.trimStart();

    // Array item
    if (trimmed.startsWith('- ')) {
      const valPart = trimmed.slice(2).trim();
      // find parent that holds an array or create one
      while (stack.length && indent <= stack[stack.length - 1].indent) stack.pop();
      const parent = stack[stack.length - 1].node;
      // If no array exists at this key, but last key is set to array in stack, push
      if (!Array.isArray(parent)) {
        // If parent is an object with a last key
        const last = stack[stack.length - 1];
        if (last && last.key) {
          last.node[last.key] = last.node[last.key] ?? [];
          if (!Array.isArray(last.node[last.key])) last.node[last.key] = [last.node[last.key]];
          last.node[last.key].push(valPart ? parseScalar(valPart) : {});
        }
      } else {
        parent.push(parseScalar(valPart));
      }
      // If the array item is an object (next indented lines), push it on stack
      if (!valPart) {
        const arr = stack[stack.length - 1].node[stack[stack.length - 1].key!];
        const lastObj = arr[arr.length - 1];
        stack.push({ indent: indent + 2, node: lastObj });
      }
      continue;
    }

    // Key: value or key:
    const kvMatch = trimmed.match(/^([^:]+):(?:\s*(.*))?$/);
    if (kvMatch) {
      const key = kvMatch[1].trim();
      const rawVal = kvMatch[2] ?? '';

      // find correct parent by indentation
      while (stack.length && indent <= stack[stack.length - 1].indent) stack.pop();
      const parent = stack[stack.length - 1].node;

      if (rawVal === '') {
        // Could be a nested mapping or an empty string; we inspect the next line
        const nextLine = lines[i + 1]?.replace(/\r\n/g, '\n') ?? '';
        const nextIndent = nextLine.match(/^\s*/)?.[0].length ?? 0;
        if (nextLine.trimStart().startsWith('-')) {
          parent[key] = [];
          // push to stack so following `- ` items attach here
          stack.push({ indent, node: parent, key });
        } else if (nextIndent > indent) {
          parent[key] = {};
          stack.push({ indent, node: parent[key], key });
        } else {
          parent[key] = '';
        }
      } else {
        // Inline value
        parent[key] = parseScalar(rawVal.trim());
      }
    }
  }

  return root;
}

const parseRawPost = (filePath: string, raw: string): Post => {
  let fm: Record<string, any> = {};
  let content = raw;
  if (raw.startsWith('---')) {
    const end = raw.indexOf('\n---', 3);
    if (end !== -1) {
      const yaml = raw.slice(3, end + 1).trim();
      fm = parseFrontmatter(yaml) || {};
      content = raw.slice(end + 4);
    }
  }

  const data = fm;
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
