import { paraglideVitePlugin } from "@inlang/paraglide-js";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { fumadocsMdx } from "fumadocs-mdx/vite";
import { defineConfig } from "vite";

const config = defineConfig({
	resolve: { tsconfigPaths: true },
	plugins: [
		devtools(),
		fumadocsMdx(),
		paraglideVitePlugin({
			project: "./project.inlang",
			outdir: "./src/paraglide",
			strategy: ["url", "baseLocale"],
		}),
		tailwindcss(),
		tanstackStart({ prerender: { enabled: true, crawlLinks: true } }),
		viteReact(),
	],
});

export default config;
