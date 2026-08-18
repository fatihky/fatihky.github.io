import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const BLOG_DIR = 'content/blog';
const TAGS_FILE = 'content/tags/tags.json';
const TAG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const posts = (await readdir(BLOG_DIR))
  .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
  .map((f) => f.replace(/\.(mdx|md)$/, ''));

let tagsBySlug;
try {
  tagsBySlug = JSON.parse(await readFile(TAGS_FILE, 'utf-8'));
} catch (err) {
  console.error(`error: cannot read ${TAGS_FILE}: ${err.message}`);
  process.exit(1);
}

if (
  typeof tagsBySlug !== 'object' ||
  tagsBySlug === null ||
  Array.isArray(tagsBySlug)
) {
  console.error(`error: ${TAGS_FILE} must be an object of slug -> string[]`);
  process.exit(1);
}

const errors = [];
const warnings = [];

for (const [slug, tags] of Object.entries(tagsBySlug)) {
  if (!posts.includes(slug)) {
    errors.push(`${slug}: entry in ${TAGS_FILE} but no post in ${BLOG_DIR}`);
    continue;
  }
  if (!Array.isArray(tags) || tags.some((t) => typeof t !== 'string')) {
    errors.push(`${slug}: value must be an array of strings`);
    continue;
  }
  if (new Set(tags).size !== tags.length) {
    errors.push(`${slug}: duplicate tags`);
  }
  for (const tag of tags) {
    if (!TAG_PATTERN.test(tag)) {
      errors.push(`${slug}: malformed tag "${tag}" (use lowercase kebab-case)`);
    }
  }
}

for (const slug of posts) {
  if (!(slug in tagsBySlug)) {
    warnings.push(`${slug}: no tags entry (renders without tags)`);
  }
}

for (const warning of warnings) {
  console.warn(`warn: ${warning}`);
}
for (const error of errors) {
  console.error(`error: ${error}`);
}

if (errors.length > 0) {
  console.error(`\n${errors.length} error(s), ${warnings.length} warning(s)`);
  process.exit(1);
}
console.log(`tags ok: ${posts.length} posts checked`);
