import { Command } from "@commander-js/extra-typings";
import { confirm, input } from "@inquirer/prompts";
import { execSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WEBSITES_FILE = resolve(__dirname, "../content/websites/websites.json");

async function fetchMetadata(url: string) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (site-adder bot)" },
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
    title: decode(titleMatch?.[1] ?? ""),
    description: decode(descMatch?.[1] ?? ""),
  };
}

const program = new Command();

program
  .name("add-site")
  .description("Add a new website to websites.json interactively")
  .option("-u, --url <url>", "URL to add")
  .option("-c, --category <category>", "Category for the website")
  .option("--commit", "Create a git commit after adding the site")
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

    let category: string;
    if (opts.category) {
      category = opts.category.trim();
    } else {
      category = (
        await input({ message: "Category:" })
      ).trim();
    }

    const entry: Record<string, string> = { title, url, description, category };

    const existing = JSON.parse(await readFile(WEBSITES_FILE, "utf-8"));
    existing.push(entry);
    await writeFile(WEBSITES_FILE, JSON.stringify(existing, null, 2) + "\n");

    console.log(`\nAdded "${title}" to ${WEBSITES_FILE}`);

    const shouldCommit =
      opts.commit ??
      (await confirm({ message: "Create a git commit?", default: false }));
    if (shouldCommit) {
      execSync(`git add ${WEBSITES_FILE}`, { stdio: "inherit" });
      execSync(`git commit -m "Add website: ${title}"`, { stdio: "inherit" });
    }
  });

program.parse();
