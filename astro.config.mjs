import { defineConfig, sharpImageService } from "astro/config";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import tailwind from "@astrojs/tailwind";
import prefetch from "@astrojs/prefetch";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import { readFileSync } from "node:fs";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://daniloparrajr.com",
  compressHTML: true,
  experimental: {
    assets: true
  },
  image: {
    service: sharpImageService()
  },
  markdown: {
    rehypePlugins: [rehypeHeadingIds, rehypeAutolinkHeadings],
    shikiConfig: {
      theme: "github-dark-dimmed"
    }
  },
  integrations: [tailwind({
    applyBaseStyles: false
  }), prefetch({
    // Allow up to three links to be prefetched concurrently
    throttle: 3
  }), sitemap(), react(), mdx()],
  vite: {
    plugins: [rawFonts([".ttf", ".woff"])],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"]
    }
  }
});

// vite plugin to import fonts
function rawFonts(ext) {
  return {
    name: "vite-plugin-raw-fonts",
    transform(_, id) {
      if (ext.some(e => id.endsWith(e))) {
        const buffer = readFileSync(id);
        return {
          code: `export default ${JSON.stringify(buffer)}`,
          map: null
        };
      }
    }
  };
}