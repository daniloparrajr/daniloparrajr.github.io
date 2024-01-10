import { defineConfig, sharpImageService } from "astro/config";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import { readFileSync } from "node:fs";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";

import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  site: "https://daniloparrajr.com",
  compressHTML: true,
  image: {
    service: sharpImageService(),
  },
  markdown: {
    rehypePlugins: [rehypeHeadingIds, rehypeAutolinkHeadings],
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    react(),
    expressiveCode({
      theme: "one-dark-pro",
    }),
    mdx(),
    icon(),
  ],
  vite: {
    plugins: [rawFonts([".ttf", ".woff"])],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
});

// vite plugin to import fonts
function rawFonts(ext) {
  return {
    name: "vite-plugin-raw-fonts",
    transform(_, id) {
      if (ext.some((e) => id.endsWith(e))) {
        const buffer = readFileSync(id);
        return {
          code: `export default ${JSON.stringify(buffer)}`,
          map: null,
        };
      }
    },
  };
}
