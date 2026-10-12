/**
 * Données du site Jesus Family Kingdom.
 *
 * Les valeurs modifiables (coordonnées, paiements, montants, chiffres d'impact, photos des pages)
 * vivent dans src/data/settings/*.json et se changent depuis l'admin (Ouvrir-Admin-JFK.bat).
 * Ce fichier les remet simplement dans la forme attendue par les pages : pas besoin d'y toucher.
 */
import contacts from './settings/contacts.json';
import payments from './settings/payments.json';
import amounts from './settings/amounts.json';
import impact from './settings/impact.json';
import pageImagesData from './settings/page-images.json';
import type { RouteKey } from '../i18n/routes';

export const siteConfig = {
  name: 'Jesus Family Kingdom',
  shortName: 'JFK',
  url: 'https://www.jesus-family-kingdom.org',
  founder: 'Sedera Rakotoaritsifa',

  address: contacts.address,

  contacts: {
    mobile: contacts.mobile,
    whatsapp: contacts.whatsapp,
    whatsappLink: `https://wa.me/${contacts.whatsapp.replace(/\D/g, '')}`,
    other: contacts.otherPhones,
    email: contacts.email,
  },

  // Un réseau social encore provisoire (« A_REMPLACER ») n'est pas affiché : son icône disparaît du pied de page.
  socials: {
    facebook: /A_REMPLACER/i.test(contacts.facebook) ? null : contacts.facebook,
    instagram: /A_REMPLACER/i.test(contacts.instagram) ? null : contacts.instagram,
  },

  map: {
    // Coordonnées approximatives d'Ambohimalaza, Antananarivo (siège de JFK)
    lat: -18.9333,
    lng: 47.6167,
  },
};

/**
 * Zones d'action de la mission affichées sur la carte de Madagascar.
 * coords en pourcentage (x, y) sur le fond de carte SVG (0,0 = nord-ouest ; 100,100 = sud-est).
 */
export const actionZones = [
  { id: 'ambohimalaza', name: 'Ambohimalaza', x: 52, y: 47, isHQ: true },
  { id: 'paradisakely', name: 'Paradisakely', x: 54, y: 49, isHQ: false },
  { id: 'vavatenina', name: 'Vavatenina', x: 68, y: 33, isHQ: false },
  { id: 'nosyvarika', name: 'Nosy Varika', x: 62, y: 62, isHQ: false },
  { id: 'ikongo', name: 'Ikongo', x: 55, y: 72, isHQ: false },
  { id: 'marolambo', name: 'Marolambo', x: 63, y: 57, isHQ: false },
  { id: 'mahanoro', name: 'Mahanoro', x: 66, y: 52, isHQ: false },
  { id: 'majunga', name: 'Majunga (Mahajanga)', x: 33, y: 22, isHQ: false },
] as const;

/** Compteurs de la page d'accueil. */
export const impactStats2025 = impact.stats;

/** Formules de parrainage d'enfant. */
export const sponsorshipTiers = amounts.sponsorshipTiers;

export const missionarySupport = amounts.missionary;

export const teacherSupport = amounts.teacher;

export const paymentInfo = {
  stripe: {
    oneTimeLink: payments.stripeOneTime,
    monthlyLink: payments.stripeMonthly,
  },
  paypal: {
    link: payments.paypal,
  },
  bankTransfer: payments.bank,
  mobileMoney: payments.mobileMoney,
};

/**
 * Un moyen de paiement n'apparaît sur le site que s'il est vraiment renseigné.
 * Tant qu'un réglage contient « A_REMPLACER » ou « A_COMPLETER », la page affiche
 * à la place « Comment donner » : le donateur écrit, JFK envoie ses coordonnées en privé.
 */
const isReady = (value?: string | null) => Boolean(value && !/A_REMPLACER|A_COMPLETER/i.test(value));

export const paymentsReady = {
  stripe: isReady(payments.stripeOneTime),
  paypal: isReady(payments.paypal),
  bank: isReady(payments.bank.iban),
  mobileMoney: payments.mobileMoney.filter((m) => isReady(m.number)),
};

/** Y a-t-il au moins un paiement en ligne (carte ou PayPal) utilisable ? */
export const hasOnlinePayment = paymentsReady.stripe || paymentsReady.paypal;

/** Répartition de l'utilisation des dons. */
export const fundsAllocation = amounts.fundsAllocation;

/** Rapport annuel : null tant qu'aucun PDF n'a été ajouté (le bouton est alors masqué). */
export const annualReportUrl = (contacts.annualReport as string | null) || null;

/** Clé des formulaires Web3Forms (gratuit). */
export const web3FormsAccessKey = contacts.web3formsKey;

/** Grandes photos des pages et portrait du président, choisis dans l'admin. */
export const pageImages = pageImagesData as Partial<Record<RouteKey | 'president', string | null>>;
