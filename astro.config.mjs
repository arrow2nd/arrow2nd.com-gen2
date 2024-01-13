import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import compress from "astro-compress";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), compress(), icon(), sitemap()],
  site: "https://www.arrow2nd.com",
  image: {
    remotePatterns: [
      {
        protocol: "https"
      }
    ]
  }
});

