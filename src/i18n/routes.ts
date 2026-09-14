/**
 * Carte des pages du site : chaque clé correspond à une page, avec son URL
 * localisée en anglais (langue principale) et en français. Utilisée par le header/footer
 * et le sélecteur de langue pour toujours proposer l'équivalent exact de la page.
 */
export const routes = {
  home: { en: '/en/', fr: '/fr/' },
  mission: { en: '/en/our-mission', fr: '/fr/notre-mission' },
  sponsorChild: { en: '/en/sponsor-a-child', fr: '/fr/parrainer-un-enfant' },
  supportMissionaries: { en: '/en/support-missionaries', fr: '/fr/soutenir-les-missionnaires' },
  supportTeachers: { en: '/en/missionary-teachers', fr: '/fr/enseignants-missionnaires' },
  projects2026: { en: '/en/2026-projects', fr: '/fr/projets-2026' },
  blog: { en: '/en/blog', fr: '/fr/blog' },
  donate: { en: '/en/donate', fr: '/fr/faire-un-don' },
  contact: { en: '/en/contact', fr: '/fr/contact' },
  childProtection: { en: '/en/child-protection-policy', fr: '/fr/protection-de-lenfance' },
  legal: { en: '/en/legal-notice', fr: '/fr/mentions-legales' },
} as const;

export type RouteKey = keyof typeof routes;
export type Lang = 'en' | 'fr';

export function routeUrl(key: RouteKey, lang: Lang): string {
  return routes[key][lang];
}

export function otherLang(lang: Lang): Lang {
  return lang === 'en' ? 'fr' : 'en';
}

const withoutTrailingSlash = (path: string) => (path.length > 1 ? path.replace(/\/+$/, '') : path);

/** Retrouve la page correspondant à une adresse (ex : « /en/donate/ » → « donate »). */
export function routeKeyFromPath(pathname: string): RouteKey | undefined {
  const target = withoutTrailingSlash(pathname);
  for (const [key, urls] of Object.entries(routes)) {
    if (withoutTrailingSlash(urls.en) === target || withoutTrailingSlash(urls.fr) === target) {
      return key as RouteKey;
    }
  }
  if (/^\/(en|fr)\/blog\//.test(target)) return 'blog';
  return undefined;
}
