import { Command } from "@commander-js/extra-typings";
import { confirm, editor, input } from "@inquirer/prompts";
import { execSync } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { nowLocalISO } from "./datetime.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = resolve(__dirname, "../content/blog");

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const program = new Command();

program
  .name("add-post")
  .description("Add a new blog post to content/blog interactively")
  .option("-t, --title <title>", "Title of the post")
  .option("-d, --description <description>", "Short description")
  .option("-s, --slug <slug>", "Filename slug (defaults to slugified title)")
  .option("--date <date>", "Datetime (ISO-8601, defaults to now)")
  .option("--commit", "Create a git commit after adding the post")
  .action(async (opts) => {
    const title = (
      opts.title ??
      (await input({
        message: "Title:",
        validate: (v) => !!v.trim() || "Title is required",
      }))
    ).trim();

    const description = (
      opts.description ??
      (await input({
        message: "Description:",
        validate: (v) => !!v.trim() || "Description is required",
      }))
    ).trim();

    const slug = (
      opts.slug ??
      (await input({
        message: "Slug:",
        default: slugify(title),
        validate: (v) => !!v.trim() || "Slug is required",
      }))
    ).trim();

    const date = opts.date?.trim() || nowLocalISO();

    const body = await editor({
      message: "Body (MDX):",
      default: "",
      postfix: ".mdx",
    });

    const frontmatter = [
      "---",
      `title: ${JSON.stringify(title)}`,
      `description: ${JSON.stringify(description)}`,
      `date: ${JSON.stringify(date)}`,
      "---",
      "",
    ].join("\n");

    const filePath = resolve(BLOG_DIR, `${slug}.mdx`);
    await writeFile(filePath, frontmatter + body.trim() + "\n");

    console.log(`\nAdded post to ${filePath}`);

    const shouldCommit =
      opts.commit ??
      (await confirm({ message: "Create a git commit?", default: false }));
    if (shouldCommit) {
      execSync(`git add ${filePath}`, { stdio: "inherit" });
      execSync(`git commit -m "Add post: ${title}"`, { stdio: "inherit" });
    }
  });

program.parse();
