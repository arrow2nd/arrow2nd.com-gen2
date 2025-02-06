import icon from "astro-icon";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import playformCompress from "@playform/compress";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  output: "static",
  integrations: [
    icon(),
    sitemap(),
    playformCompress({
      HTML: false
    })
  ],
  vite: {
    build: {
      minify: true
    }
  },
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
