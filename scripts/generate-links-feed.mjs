import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const linkFiles = JSON.parse(
  readFileSync(join(root, 'content/links/links.json'), 'utf-8'),
);

const links = (Array.isArray(linkFiles) ? linkFiles : [linkFiles]).sort(
  (a, b) => {
    if (!a.date || !b.date) return 0;
    return a.date < b.date ? 1 : -1;
  },
);

function escapeXml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const siteUrl = 'https://ag.fth';
const feedUrl = `${siteUrl}/links/feed.atom`;
const updated = links[0]?.date
  ? new Date(links[0].date).toISOString()
  : new Date().toISOString();

const entries = links
  .map((link) => {
    const date = link.date ? new Date(link.date).toISOString() : updated;
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

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>fatihky — links</title>
  <link href="${siteUrl}/links" rel="alternate"/>
  <link href="${feedUrl}" rel="self"/>
  <id>${feedUrl}</id>
  <updated>${updated}</updated>
  <author><name>Fatih Kaya</name></author>
${entries}
</feed>
`;

const outDir = join(root, 'dist/client/links');
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'feed.atom'), xml, 'utf-8');
console.log('✓ Generated /links/feed.atom');
