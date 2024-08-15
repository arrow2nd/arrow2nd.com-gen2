import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import playformCompress from "@playform/compress";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  integrations: [
    tailwind(),
    icon(),
    sitemap(),
    playformCompress({
      HTML: {
        "html-minifier-terser": {
          collapseWhitespace: true,
          preserveLineBreaks: true
        }
      }
    })
  ],
  site: "https://www.arrow2nd.com",
  image: {
    remotePatterns: [
      {
        protocol: "https"
      }
    ]
  },
  adapter: vercel()
});
