import { loader } from 'fumadocs-core/source';
import { defineCollections } from 'fumadocs-mdx/macro';
import { meta } from 'fumadocs-mdx/runtime/macro';
import { z } from 'zod';

export const blog = defineCollections({
  type: 'doc',
  dir: 'content/blog',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
  }),
});

// fumadocs-mdx 15.2.3 emits `meta:` for standalone meta collections but its
// runtime reads `entries`, so call the runtime directly to avoid the bug.
// Keys must be relative to `base` with a `./` prefix (see fileInfo()).
const tagFiles = import.meta.glob('../../content/tags/**/*.json', {
  eager: true,
  import: 'default',
});

export const blogTags = await meta({
  base: 'content/tags',
  entries: Object.fromEntries(
    Object.entries(tagFiles).map(([path, data]) => [
      `./${path.replace('../../content/tags/', '')}`,
      data,
    ]),
  ),
});

export function getTags(slug: string): string[] {
  const tags = blogTags.get('tags.json') as
    | Record<string, string[]>
    | undefined;
  return tags?.[slug] ?? [];
}

export const blogSource = loader({
  baseUrl: '/posts',
  source: blog.toFumadocsSource(),
});

// Jottings — short notes, drafts, thoughts
export const jottings = defineCollections({
  type: 'doc',
  dir: 'content/jottings',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
  }),
});

export const jottingsSource = loader({
  baseUrl: '/jottings',
  source: jottings.toFumadocsSource(),
});

// Links — simple JSON collection (no MDX body needed)
const linkFiles = import.meta.glob('../../content/links/**/*.json', {
  eager: true,
  import: 'default',
});

export interface LinkEntry {
  title: string;
  url: string;
  description?: string;
  tags?: string[];
  date?: string;
}

export function getLinks(): LinkEntry[] {
  const all: LinkEntry[] = [];
  for (const data of Object.values(linkFiles)) {
    const entries = data as LinkEntry | LinkEntry[];
    if (Array.isArray(entries)) all.push(...entries);
    else all.push(entries);
  }
  return all.sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return a.date < b.date ? 1 : -1;
  });
}

export function getLinkTags(): string[] {
  const tags = new Set<string>();
  for (const link of getLinks()) {
    if (link.tags) {
      for (const tag of link.tags) tags.add(tag);
    }
  }
  return [...tags].sort();
}

export function getLinksByTag(tag: string): LinkEntry[] {
  return getLinks().filter((l) => l.tags?.includes(tag));
}

// Websites — curated interesting websites
const websiteFiles = import.meta.glob('../../content/websites/**/*.json', {
  eager: true,
  import: 'default',
});

export interface WebsiteEntry {
  title: string;
  url: string;
  description?: string;
  category?: string;
}

export function getWebsites(): WebsiteEntry[] {
  const all: WebsiteEntry[] = [];
  for (const data of Object.values(websiteFiles)) {
    const entries = data as WebsiteEntry | WebsiteEntry[];
    if (Array.isArray(entries)) all.push(...entries);
    else all.push(entries);
  }
  return all.sort((a, b) => a.title.localeCompare(b.title));
}
