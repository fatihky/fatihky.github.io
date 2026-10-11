import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

interface FeedItem {
  title: string;
  url: string;
  description?: string;
  tags?: string[];
  date?: string;
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const siteUrl = 'https://fatihky.github.io';

// Minimal frontmatter parser (no deps): reads the leading `---` block and
// supports the scalar/array shapes used in `content/**/*.mdx`.
function parseFrontmatter(raw: string): Record<string, unknown> {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
  if (!match) return {};

  const data: Record<string, unknown> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const sep = line.indexOf(':');
    if (sep === -1) continue;
    const key = line.slice(0, sep).trim();
    let value = line.slice(sep + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    } else if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map((v) => v.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
      continue;
    }
    data[key] = value;
  }
  return data;
}

// Tags are stored separately: content/tags/tags.json maps slug -> string[]
// (see src/lib/source.ts).
let tagsBySlug: Record<string, string[]> = {};
try {
  tagsBySlug = JSON.parse(
    readFileSync(join(root, 'content/tags/tags.json'), 'utf-8'),
  );
} catch {
  tagsBySlug = {};
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildEntries(items: FeedItem[], fallbackUpdated: string): string {
  return items
    .map((item) => {
      const date = item.date ? new Date(item.date).toISOString() : fallbackUpdated;
      const desc = escapeXml(item.description ?? '');
      const title = escapeXml(item.title);
      const cats = (item.tags ?? [])
        .map((t) => `\n    <category term="${escapeXml(t)}"/>`)
        .join('');
      return `  <entry>
    <title>${title}</title>
    <link href="${escapeXml(item.url)}" rel="alternate"/>
    <id>${escapeXml(item.url)}</id>
    <updated>${date}</updated>
    <summary>${desc}</summary>${cats}
  </entry>`;
    })
    .join('\n');
}

function buildFeed(
  title: string,
  alternateHref: string,
  selfHref: string,
  updated: string,
  entries: string,
): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${title}</title>
  <link href="${alternateHref}" rel="alternate"/>
  <link href="${selfHref}" rel="self"/>
  <id>${selfHref}</id>
  <updated>${updated}</updated>
  <author><name>Fatih Kaya</name></author>
${entries}
</feed>
`;
}

// Reads an MDX collection directory into feed items, sorted newest first.
function readCollection(dir: string, basePath: string): FeedItem[] {
  return readdirSync(dir)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, '');
      const fm = parseFrontmatter(readFileSync(join(dir, file), 'utf-8'));
      return {
        title: String(fm.title ?? slug),
        url: `${siteUrl}${basePath}/${slug}`,
        description: fm.description ? String(fm.description) : undefined,
        tags: tagsBySlug[slug] ?? [],
        date: fm.date ? String(fm.date) : undefined,
      };
    })
    .sort((a, b) => {
      if (!a.date || !b.date) return 0;
      return a.date < b.date ? 1 : -1;
    });
}

// Writes `<outDir>/feed.atom` plus per-tag feeds at `<outDir>/tags/<tag>/feed.atom`.
function writeFeeds(
  outDir: string,
  feedLabel: string,
  basePath: string,
  items: FeedItem[],
): void {
  const feedUrl = `${siteUrl}${basePath}/feed.atom`;
  const updated = items[0]?.date
    ? new Date(items[0].date).toISOString()
    : new Date().toISOString();

  const xml = buildFeed(
    `fatihky — ${feedLabel}`,
    `${siteUrl}${basePath}`,
    feedUrl,
    updated,
    buildEntries(items, updated),
  );
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'feed.atom'), xml, 'utf-8');
  console.log(`✓ Generated ${basePath}/feed.atom`);

  const tagsToItems = new Map<string, FeedItem[]>();
  for (const item of items) {
    for (const tag of item.tags ?? []) {
      if (!tagsToItems.has(tag)) tagsToItems.set(tag, []);
      tagsToItems.get(tag)!.push(item);
    }
  }

  for (const [tag, tagItems] of tagsToItems) {
    const encodedTag = encodeURIComponent(tag);
    const tagFeedUrl = `${siteUrl}${basePath}/tags/${encodedTag}/feed.atom`;
    const tagUpdated = tagItems[0]?.date
      ? new Date(tagItems[0].date).toISOString()
      : updated;

    const tagXml = buildFeed(
      `fatihky — ${feedLabel} tagged "${escapeXml(tag)}"`,
      `${siteUrl}${basePath}/tags/${encodedTag}`,
      tagFeedUrl,
      tagUpdated,
      buildEntries(tagItems, tagUpdated),
    );

    const tagDir = join(outDir, 'tags', encodedTag);
    mkdirSync(tagDir, { recursive: true });
    writeFileSync(join(tagDir, 'feed.atom'), tagXml, 'utf-8');
    console.log(`✓ Generated ${basePath}/tags/${encodedTag}/feed.atom`);
  }
}

const collections = [
  { dir: 'content/blog', out: 'dist/client/posts', basePath: '/posts', label: 'posts' },
  {
    dir: 'content/jottings',
    out: 'dist/client/jottings',
    basePath: '/jottings',
    label: 'jottings',
  },
];

for (const { dir, out, basePath, label } of collections) {
  const items = readCollection(join(root, dir), basePath);
  writeFeeds(join(root, out), label, basePath, items);
}
