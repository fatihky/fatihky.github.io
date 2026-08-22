import { input } from "@inquirer/prompts";
import { Command } from "@commander-js/extra-typings";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const LINKS_FILE = resolve(__dirname, "../content/links/links.json");

async function fetchMetadata(url: string) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (link-adder bot)" },
  });
  if (!res.ok) return { title: "", description: "" };
  const html = await res.text();

  const titleMatch =
    html.match(/<title[^>]*>(.*?)<\/title>/is) ||
    html.match(/<meta\s+property="og:title"\s+content="(.*?)"/i);
  const descMatch =
    html.match(
      /<meta\s+(?:name|property)="(?:description|og:description)"\s+content="(.*?)"/i,
    ) ||
    html.match(
      /content="(.*?)"\s+(?:name|property)="(?:description|og:description)"/i,
    );

  const decode = (s: string) =>
    s
      ?.replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, " ")
      .trim() ?? "";

  return {
    title: decode(titleMatch?.[1]??''),
    description: decode(descMatch?.[1]??''),
  };
}

const program = new Command();

program
  .name("add-link")
  .description("Add a new link to links.json interactively")
  .option("-u, --url <url>", "URL to add")
  .option("-t, --tags <tags>", "Comma-separated tags")
  .action(async (opts) => {
    let url = opts.url;
    if (!url) {
      url = await input({
        message: "URL:",
        validate: (v) => !!v.trim() || "URL is required",
      });
    }
    url = url.trim();

    console.log(`Fetching metadata from ${url}...`);
    const meta = await fetchMetadata(url);

    let title = await input({
      message: "Title:",
      default: meta.title,
      validate: (v) => !!v.trim() || "Title is required",
    });
    title = title.trim();

    let description = await input({
      message: "Description:",
      default: meta.description,
    });
    description = description.trim();

    let tags: string[];

    if (opts.tags) {
      tags = opts.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    } else {
      const tagsInput = await input({ message: "Tags (comma-separated):" });
      tags = tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }

    const date = new Date().toISOString().slice(0, 10);

    const entry = { title, url, description, tags, date };

    const existing = JSON.parse(await readFile(LINKS_FILE, "utf-8"));
    existing.push(entry);
    await writeFile(LINKS_FILE, JSON.stringify(existing, null, 2) + "\n");

    console.log(`\nAdded "${title}" to ${LINKS_FILE}`);
  });

program.parse();
