/**
 * Configuration centrale du site Jesus Family Kingdom.
 * Modifie librement les valeurs ci-dessous (coordonnées, montants, liens de paiement, jauges de projets…).
 * Les montants marqués "À VALIDER" et les liens "À_REMPLACER" doivent être confirmés par JFK
 * avant la mise en ligne définitive — voir le README, section "À compléter par JFK".
 */

export const siteConfig = {
  name: 'Jesus Family Kingdom',
  shortName: 'JFK',
  url: 'https://www.jesus-family-kingdom.com',
  founder: 'Sedera Rakotoaritsifa',

  address: 'Lot IM 100 Ampanengenana, Ambatofotsy, Ambohimalaza, Antananarivo 103, Madagascar',

  contacts: {
    mobile: '+261 34 60 707 70',
    whatsapp: '+261 33 14 207 03',
    whatsappLink: 'https://wa.me/261331420703',
    other: ['+261 34 66 707 77', '+261 38 70 437 43'],
    // À COMPLÉTER PAR JFK : adresse email officielle de contact
    email: 'contact@jesus-family-kingdom.com',
  },

  socials: {
    // À COMPLÉTER PAR JFK : liens exacts vers les pages Facebook et Instagram
    facebook: 'https://facebook.com/JFK_A_REMPLACER',
    instagram: 'https://instagram.com/JFK_A_REMPLACER',
  },

  map: {
    // Coordonnées approximatives d'Ambohimalaza, Antananarivo (siège de JFK)
    lat: -18.9333,
    lng: 47.6167,
  },
} as const;

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

/**
 * Chiffres d'impact 2025 — affichés en compteurs animés sur l'accueil.
 * Modifie ces valeurs chaque année pour mettre à jour le site.
 */
export const impactStats2025 = [
  { id: 'lives', value: 8000, suffix: '+', labelFr: 'vies touchées par l’Évangile', labelEn: 'lives reached with the Gospel' },
  { id: 'churches', value: 65, suffix: '+', labelFr: 'églises implantées', labelEn: 'churches planted' },
  { id: 'leaders', value: 500, suffix: '+', labelFr: 'leaders équipés', labelEn: 'leaders trained' },
  { id: 'villages', value: 450, suffix: '+', labelFr: 'villages impactés', labelEn: 'villages impacted' },
  { id: 'baptisms', value: 150, suffix: '+', labelFr: 'baptêmes', labelEn: 'baptisms' },
  { id: 'medical', value: 1300, suffix: '+', labelFr: 'consultations médicales', labelEn: 'medical consultations' },
  { id: 'dental', value: 656, suffix: '', labelFr: 'soins dentaires', labelEn: 'dental treatments' },
  { id: 'acupuncture', value: 72, suffix: '', labelFr: 'traitements d’acupuncture', labelEn: 'acupuncture treatments' },
  { id: 'students', value: 500, suffix: '+', labelFr: 'enfants scolarisés', labelEn: 'children in school' },
  { id: 'teachers', value: 16, suffix: '', labelFr: 'enseignants missionnaires formés', labelEn: 'missionary teachers trained' },
  { id: 'schools', value: 10, suffix: '', labelFr: 'écoles ouvertes', labelEn: 'schools opened' },
  { id: 'fish', value: 400, suffix: ' kg/mois', labelFr: 'de poissons produits', labelEn: 'of fish produced monthly' },
] as const;

/**
 * Montants de parrainage d'enfant — MONTANTS À VALIDER PAR JFK avant mise en ligne.
 */
export const sponsorshipTiers = [
  {
    id: 'scolarite',
    amount: 15,
    currency: 'EUR',
    titleFr: 'Scolarité',
    titleEn: 'Education',
    descriptionFr: 'Couvre les frais de scolarité, les fournitures et l’uniforme de l’enfant.',
    descriptionEn: 'Covers the child’s school fees, supplies and uniform.',
    highlighted: false,
  },
  {
    id: 'scolarite-repas',
    amount: 30,
    currency: 'EUR',
    titleFr: 'Scolarité + repas',
    titleEn: 'Education + meals',
    descriptionFr: 'Ajoute une alimentation quotidienne équilibrée à la scolarisation.',
    descriptionEn: 'Adds daily balanced meals on top of schooling.',
    highlighted: true,
  },
  {
    id: 'prise-en-charge-complete',
    amount: 50,
    currency: 'EUR',
    titleFr: 'Prise en charge complète',
    titleEn: 'Full care',
    descriptionFr: 'Hébergement, nourriture, scolarité, suivi médical et accompagnement spirituel.',
    descriptionEn: 'Housing, food, schooling, medical follow-up and spiritual mentoring.',
    highlighted: false,
  },
] as const;

/** MONTANT À VALIDER PAR JFK */
export const missionarySupport = {
  monthlyAmount: 40,
  currency: 'EUR',
  emergencyCaseCost: 350,
  emergencyCurrency: 'USD',
};

/** MONTANT À VALIDER PAR JFK */
export const teacherSupport = {
  monthlyAmount: 35,
  currency: 'EUR',
  schoolProjectMin: 3000,
  schoolProjectMax: 4000,
  schoolProjectCurrency: 'USD',
};

/**
 * Moyens de paiement — LIENS ET COORDONNÉES À COMPLÉTER PAR JFK.
 */
export const paymentInfo = {
  stripe: {
    oneTimeLink: 'https://buy.stripe.com/STRIPE_LINK_A_REMPLACER_PONCTUEL',
    monthlyLink: 'https://buy.stripe.com/STRIPE_LINK_A_REMPLACER_MENSUEL',
  },
  paypal: {
    link: 'https://paypal.me/PAYPAL_LINK_A_REMPLACER',
  },
  bankTransfer: {
    accountName: 'Jesus Family Kingdom — NOM_BANQUE_A_COMPLETER',
    iban: 'IBAN_A_COMPLETER',
    bic: 'BIC_A_COMPLETER',
    bankName: 'NOM_DE_LA_BANQUE_A_COMPLETER',
  },
  mobileMoney: [
    { provider: 'Mvola', number: 'NUMERO_MVOLA_A_COMPLETER' },
    { provider: 'Orange Money', number: 'NUMERO_ORANGE_MONEY_A_COMPLETER' },
  ],
};

/** Répartition indicative de l'utilisation des dons — À VALIDER PAR JFK */
export const fundsAllocation = [
  { labelFr: 'Missions (évangélisation, formation, implantation d’églises)', labelEn: 'Missions (evangelism, training, church planting)', percent: 35 },
  { labelFr: 'Éducation (écoles, enseignants, fournitures)', labelEn: 'Education (schools, teachers, supplies)', percent: 25 },
  { labelFr: 'Orphelinat Paradisakely (hébergement, nourriture, soins)', labelEn: 'Paradisakely orphanage (housing, food, care)', percent: 25 },
  { labelFr: 'Mission médicale (soins, évacuations, matériel)', labelEn: 'Medical mission (care, evacuations, equipment)', percent: 10 },
  { labelFr: 'Fonctionnement et administration', labelEn: 'Operations and administration', percent: 5 },
] as const;

/** Lien vers le rapport annuel — À COMPLÉTER PAR JFK (déposer le PDF dans /public/documents/) */
export const annualReportUrl = '/documents/rapport-annuel-2025.pdf';

/** Formulaires — Web3Forms (gratuit). Remplace par ta clé d'accès. Voir README. */
export const web3FormsAccessKey = 'WEB3FORMS_ACCESS_KEY_A_REMPLACER';
