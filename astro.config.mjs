import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Site final une fois le domaine branché sur Cloudflare Pages.
const SITE_URL = 'https://www.jesus-family-kingdom.com';

// L'admin (Keystatic) ne tourne qu'en local, lancé par « npm run admin » / Ouvrir-Admin-JFK.bat.
// Le build publié sur Cloudflare reste 100 % statique et ne charge rien de l'admin.
const isAdmin = process.env.JFK_ADMIN === '1';

const adminIntegrations = [];
let adapter;

if (isAdmin) {
  const [{ default: react }, { default: keystatic }, { default: node }] = await Promise.all([
    import('@astrojs/react'),
    import('@keystatic/astro'),
    import('@astrojs/node'),
  ]);
  adminIntegrations.push(react(), keystatic());
  adapter = node({ mode: 'standalone' });
}

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  adapter,
  trailingSlash: 'ignore',
  devToolbar: { enabled: false },
  server: isAdmin ? { open: '/keystatic' } : {},
  i18n: {
    // L'anglais est la langue principale du site ; le français vient en second.
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    ...adminIntegrations,
  ],
});
