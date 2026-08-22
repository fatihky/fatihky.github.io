import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

interface Link {
  title: string;
  url: string;
  description?: string;
  tags?: string[];
  date?: string;
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const linkFiles: Link | Link[] = JSON.parse(
  readFileSync(join(root, 'content/links/links.json'), 'utf-8'),
);

const links = (Array.isArray(linkFiles) ? linkFiles : [linkFiles]).sort(
  (a, b) => {
    if (!a.date || !b.date) return 0;
    return a.date < b.date ? 1 : -1;
  },
);

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildEntries(items: Link[], fallbackUpdated: string): string {
  return items
    .map((link) => {
      const date = link.date ? new Date(link.date).toISOString() : fallbackUpdated;
      const desc = escapeXml(link.description ?? '');
      const title = escapeXml(link.title);
      const cats = (link.tags ?? [])
        .map((t) => `\n    <category term="${escapeXml(t)}"/>`)
        .join('');
      return `  <entry>
    <title>${title}</title>
    <link href="${escapeXml(link.url)}" rel="alternate"/>
    <id>${escapeXml(link.url)}</id>
    <updated>${date}</updated>
    <summary>${desc}</summary>${cats}
  </entry>`;
    })
    .join('\n');
}

function buildFeed(title: string, alternateHref: string, selfHref: string, updated: string, entries: string): string {
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

const siteUrl = 'https://ag.fth';
const feedUrl = `${siteUrl}/links/feed.atom`;
const updated = links[0]?.date
  ? new Date(links[0].date).toISOString()
  : new Date().toISOString();

const entries = buildEntries(links, updated);
const xml = buildFeed('fatihky — links', `${siteUrl}/links`, feedUrl, updated, entries);

const outDir = join(root, 'dist/client/links');
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'feed.atom'), xml, 'utf-8');
console.log('✓ Generated /links/feed.atom');

// Generate per-tag feeds
const tagsToLinks = new Map<string, Link[]>();
for (const link of links) {
  for (const tag of link.tags ?? []) {
    if (!tagsToLinks.has(tag)) tagsToLinks.set(tag, []);
    tagsToLinks.get(tag)!.push(link);
  }
}

for (const [tag, tagLinks] of tagsToLinks) {
  const encodedTag = encodeURIComponent(tag);
  const tagFeedUrl = `${siteUrl}/links/tags/${encodedTag}/feed.atom`;
  const tagUpdated = tagLinks[0]?.date
    ? new Date(tagLinks[0].date).toISOString()
    : updated;

  const tagEntries = buildEntries(tagLinks, tagUpdated);
  const tagXml = buildFeed(
    `fatihky — links tagged "${escapeXml(tag)}"`,
    `${siteUrl}/links/tags/${encodedTag}`,
    tagFeedUrl,
    tagUpdated,
    tagEntries,
  );

  const tagDir = join(outDir, 'tags', encodedTag);
  mkdirSync(tagDir, { recursive: true });
  writeFileSync(join(tagDir, 'feed.atom'), tagXml, 'utf-8');
  console.log(`✓ Generated /links/tags/${encodedTag}/feed.atom`);
}
