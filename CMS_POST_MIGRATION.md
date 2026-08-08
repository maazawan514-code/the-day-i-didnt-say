# CMS Post Migration

Migrated existing static blog content from `src/data/posts.ts` into Decap CMS-compatible markdown files under `content/posts/`.

- Total posts migrated: 8
- Source file preserved: `src/data/posts.ts`
- New CMS content location: `content/posts/`

Preserved metadata fields:
- `id`
- `slug`
- `title`
- `subtitle`
- `category`
- `date`
- `year`
- `month`
- `readTime`
- `excerpt`
- `tags`
- `featured`
- `author`
- `contentType`
- `letterRecipient` (when present)
- `diaryLocation` (when present)
- `mathFormulas` (when present)
- `toc` (when present)
- `footnotes` (when present)
- `content` body text, including embedded math, quotes, and lists

Notes:
- No existing UI or source imports were changed during this migration.
- `src/data/posts.ts` remains intact for the current app until CMS integration is phased in.
- Generated markdown files use frontmatter and preserve the full post bodies from the source data.
