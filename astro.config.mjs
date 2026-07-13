import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

import cloudflare from "@astrojs/cloudflare";

// Site final une fois le domaine branché sur Cloudflare Pages.
// À ajuster si besoin dans le README > "À compléter par JFK".
const SITE_URL = 'https://www.jesus-family-kingdom.com';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'ignore',
  devToolbar: { enabled: false },

  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: {
      prefixDefaultLocale: true,
    },
  },

  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
  ],

  adapter: cloudflare()
});