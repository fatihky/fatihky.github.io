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
