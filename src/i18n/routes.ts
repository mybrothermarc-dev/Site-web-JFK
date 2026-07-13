/**
 * Carte des pages du site : chaque clé correspond à une page, avec son URL
 * localisée en français et en anglais. Utilisée par le header/footer et le
 * sélecteur de langue pour toujours proposer l'équivalent exact de la page.
 */
export const routes = {
  home: { fr: '/fr/', en: '/en/' },
  mission: { fr: '/fr/notre-mission', en: '/en/our-mission' },
  sponsorChild: { fr: '/fr/parrainer-un-enfant', en: '/en/sponsor-a-child' },
  supportMissionaries: { fr: '/fr/soutenir-les-missionnaires', en: '/en/support-missionaries' },
  supportTeachers: { fr: '/fr/enseignants-missionnaires', en: '/en/missionary-teachers' },
  projects2026: { fr: '/fr/projets-2026', en: '/en/2026-projects' },
  donate: { fr: '/fr/faire-un-don', en: '/en/donate' },
  contact: { fr: '/fr/contact', en: '/en/contact' },
  childProtection: { fr: '/fr/protection-de-lenfance', en: '/en/child-protection-policy' },
  legal: { fr: '/fr/mentions-legales', en: '/en/legal-notice' },
} as const;

export type RouteKey = keyof typeof routes;
export type Lang = 'fr' | 'en';

export function routeUrl(key: RouteKey, lang: Lang): string {
  return routes[key][lang];
}

export function otherLang(lang: Lang): Lang {
  return lang === 'fr' ? 'en' : 'fr';
}
