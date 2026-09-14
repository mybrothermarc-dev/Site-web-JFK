/**
 * Configuration de l'admin du site (Keystatic).
 *
 * L'admin tourne uniquement sur l'ordinateur de JFK (double-clic sur « Ouvrir-Admin-JFK.bat »).
 * Chaque formulaire ci-dessous écrit directement dans les fichiers de contenu du site
 * (src/content/… et src/data/settings/…). Le site publié ne contient rien de l'admin.
 *
 * Langue : l'anglais est la langue principale du site, le français vient en second.
 */
import { config, collection, singleton, fields } from '@keystatic/core';

// ---------- Champs réutilisables ----------

/** Texte en deux langues : anglais puis français. */
const bilingual = (label: string, { multiline = false } = {}) =>
  fields.object(
    {
      en: fields.text({ label: 'English', multiline, validation: { isRequired: true } }),
      fr: fields.text({ label: 'Français', multiline, validation: { isRequired: true } }),
    },
    { label }
  );

/** Photo optimisée automatiquement au moment de la publication. */
const photo = (label: string, folder: string, description?: string) =>
  fields.image({
    label,
    description: description ?? 'JPG ou PNG. La photo est réduite automatiquement pour que le site reste rapide.',
    directory: `src/assets/images/${folder}`,
    publicPath: `/src/assets/images/${folder}/`,
  });

const placeholderColor = () =>
  fields.select({
    label: 'Couleur de l’image provisoire',
    description: 'Utilisée seulement tant qu’il n’y a pas de photo.',
    options: [
      { label: 'Bleu', value: 'sun' },
      { label: 'Turquoise', value: 'sky' },
      { label: 'Vert', value: 'leaf' },
    ],
    defaultValue: 'sun',
  });

const order = () =>
  fields.integer({
    label: 'Ordre d’affichage',
    description: '1 = affiché en premier.',
    defaultValue: 1,
  });

const currency = () =>
  fields.select({
    label: 'Devise',
    options: [
      { label: 'Dollar US ($)', value: 'USD' },
      { label: 'Euro (€)', value: 'EUR' },
      { label: 'Ariary (MGA)', value: 'MGA' },
    ],
    defaultValue: 'USD',
  });

const blogImages = {
  directory: 'src/assets/images/blog',
  // Chemin relatif depuis src/content/blog/<article>/ : Astro optimise ces images au build
  publicPath: '../../../assets/images/blog/',
};

// ---------- Configuration ----------

export default config({
  storage: { kind: 'local' },

  ui: {
    brand: { name: 'Jesus Family Kingdom' },
    navigation: {
      'Contenu': ['blog', 'children', 'missionaries', 'teachers', 'testimonials'],
      'Projets': ['projects2026', 'villageSchools'],
      'Réglages du site': ['impact', 'pageImages', 'contacts', 'payments', 'amounts'],
    },
  },

  collections: {
    blog: collection({
      label: 'Blog',
      slugField: 'title',
      path: 'src/content/blog/*/',
      entryLayout: 'content',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: { label: 'Titre (anglais)' },
          slug: { label: 'Adresse de l’article', description: 'Créée automatiquement à partir du titre.' },
        }),
        titleFr: fields.text({
          label: 'Titre (français) — facultatif',
          description: 'Laisse vide si l’article n’est pas traduit : il n’apparaîtra alors que sur le site en anglais.',
        }),
        date: fields.date({
          label: 'Date de publication',
          defaultValue: { kind: 'today' },
          validation: { isRequired: true },
        }),
        published: fields.checkbox({
          label: 'Publié',
          description: 'Décoche pour garder l’article en brouillon, invisible sur le site.',
          defaultValue: true,
        }),
        cover: photo('Photo de couverture', 'blog'),
        coverAlt: fields.text({
          label: 'Description de la photo (anglais)',
          description: 'Lue par les personnes malvoyantes. Exemple : « Children singing at the Paradisakely school ».',
        }),
        excerpt: fields.text({
          label: 'Résumé (anglais)',
          description: '1 à 2 phrases affichées dans la liste des articles.',
          multiline: true,
          validation: { isRequired: true },
        }),
        excerptFr: fields.text({ label: 'Résumé (français) — facultatif', multiline: true }),
        content: fields.markdoc({
          label: 'Article (anglais)',
          extension: 'md',
          options: { image: blogImages },
        }),
        contentFr: fields.markdoc({
          label: 'Article (français) — facultatif',
          extension: 'md',
          options: { image: blogImages },
        }),
      },
    }),

    children: collection({
      label: 'Enfants à parrainer',
      slugField: 'firstName',
      path: 'src/content/children/*',
      format: { data: 'json' },
      schema: {
        firstName: fields.slug({
          name: { label: 'Prénom', description: 'Le prénom uniquement. Jamais de nom de famille.' },
        }),
        age: fields.integer({ label: 'Âge', validation: { isRequired: true, min: 0, max: 20 } }),
        status: fields.select({
          label: 'Statut',
          options: [
            { label: 'En attente d’un parrain', value: 'available' },
            { label: 'Déjà parrainé', value: 'sponsored' },
          ],
          defaultValue: 'available',
        }),
        bio: bilingual('Courte présentation', { multiline: true }),
        photo: photo(
          'Photo',
          'enfants',
          'Uniquement la photo de CET enfant. Aucun panneau, nom d’école ou lieu reconnaissable.'
        ),
        photoConsent: fields.checkbox({
          label: 'J’ai l’accord écrit du tuteur légal pour publier cette photo',
          description: 'Sans cette case cochée, la photo n’apparaît jamais sur le site.',
          defaultValue: false,
        }),
        photoPlaceholder: placeholderColor(),
        order: order(),
      },
    }),

    missionaries: collection({
      label: 'Missionnaires',
      slugField: 'firstName',
      path: 'src/content/missionaries/*',
      format: { data: 'json' },
      schema: {
        firstName: fields.slug({ name: { label: 'Prénom' } }),
        zone: fields.text({ label: 'Zone de mission', validation: { isRequired: true } }),
        summary: bilingual('Présentation du ministère', { multiline: true }),
        stats: bilingual('Résultats clés (ex : 5 nouveaux villages)'),
        photo: photo('Photo', 'missionnaires'),
        photoPlaceholder: placeholderColor(),
        order: order(),
      },
    }),

    teachers: collection({
      label: 'Enseignants missionnaires',
      slugField: 'firstName',
      path: 'src/content/teachers/*',
      format: { data: 'json' },
      schema: {
        firstName: fields.slug({ name: { label: 'Prénom' } }),
        village: fields.text({ label: 'Village ou école', validation: { isRequired: true } }),
        summary: bilingual('Présentation', { multiline: true }),
        photo: photo('Photo', 'enseignants'),
        photoPlaceholder: placeholderColor(),
        order: order(),
      },
    }),

    testimonials: collection({
      label: 'Témoignages',
      slugField: 'name',
      path: 'src/content/testimonials/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: 'Nom affiché' } }),
        role: bilingual('Qui est cette personne'),
        quote: bilingual('Citation', { multiline: true }),
        photo: photo(
          'Portrait',
          'temoignages',
          'Seulement avec l’accord de la personne. Photo carrée, visage bien centré.'
        ),
        showOnTeachersPage: fields.checkbox({
          label: 'Afficher aussi sur la page « Enseignants missionnaires »',
          description: 'Coche un seul témoignage : le premier trouvé est affiché.',
          defaultValue: false,
        }),
        photoPlaceholder: placeholderColor(),
        order: order(),
      },
    }),

    projects2026: collection({
      label: 'Projets 2026',
      slugField: 'name',
      path: 'src/content/projects2026/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: 'Nom court du projet', description: 'Pour s’y retrouver dans l’admin.' } }),
        title: bilingual('Titre affiché'),
        description: bilingual('Description', { multiline: true }),
        budgetGoal: fields.integer({ label: 'Objectif (montant total)', validation: { isRequired: true, min: 0 } }),
        budgetRaised: fields.integer({ label: 'Déjà réuni', validation: { isRequired: true, min: 0 } }),
        currency: currency(),
        photo: photo('Photo', 'projets'),
        photoPlaceholder: placeholderColor(),
        order: order(),
      },
    }),

    villageSchools: collection({
      label: 'Écoles de village à financer',
      slugField: 'name',
      path: 'src/content/villageSchools/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: 'Nom court', description: 'Exemple : Annexe 3.' } }),
        villageName: bilingual('Titre affiché'),
        budgetGoal: fields.integer({ label: 'Objectif (montant total)', validation: { isRequired: true, min: 0 } }),
        budgetRaised: fields.integer({ label: 'Déjà réuni', validation: { isRequired: true, min: 0 } }),
        currency: currency(),
        photoPlaceholder: placeholderColor(),
        order: order(),
      },
    }),
  },

  singletons: {
    impact: singleton({
      label: 'Chiffres d’impact',
      path: 'src/data/settings/impact',
      format: { data: 'json' },
      schema: {
        stats: fields.array(
          fields.object({
            value: fields.integer({ label: 'Nombre', validation: { isRequired: true, min: 0 } }),
            suffix: fields.text({ label: 'Après le nombre', description: 'Exemple : « + » ou « kg/month ». Laisse vide si rien.' }),
            labelEn: fields.text({ label: 'Libellé (anglais)', validation: { isRequired: true } }),
            labelFr: fields.text({ label: 'Libellé (français)', validation: { isRequired: true } }),
          }),
          {
            label: 'Compteurs de la page d’accueil',
            itemLabel: (props) =>
              `${props.fields.value.value ?? ''}${props.fields.suffix.value} ${props.fields.labelEn.value}`,
          }
        ),
      },
    }),

    pageImages: singleton({
      label: 'Photos des pages',
      path: 'src/data/settings/page-images',
      format: { data: 'json' },
      schema: {
        home: photo('Accueil — grande image du haut', 'pages', 'Format paysage, idéalement 1920 × 1080 px.'),
        mission: photo('Our mission — grande image du haut', 'pages'),
        sponsorChild: photo('Sponsor a child — grande image du haut', 'pages', 'Pas de visage d’enfant reconnaissable sans accord du tuteur.'),
        supportMissionaries: photo('Support missionaries — grande image du haut', 'pages'),
        supportTeachers: photo('Missionary teachers — grande image du haut', 'pages'),
        projects2026: photo('2026 projects — grande image du haut', 'pages'),
        donate: photo('Donate — grande image du haut', 'pages'),
        contact: photo('Contact — grande image du haut', 'pages'),
        blog: photo('Blog — grande image du haut', 'pages'),
        president: photo('Portrait du président (Sedera Rakotoaritsifa)', 'pages', 'Photo carrée, visage bien centré.'),
      },
    }),

    contacts: singleton({
      label: 'Coordonnées et réseaux',
      path: 'src/data/settings/contacts',
      format: { data: 'json' },
      schema: {
        address: fields.text({ label: 'Adresse', multiline: true }),
        email: fields.text({ label: 'Email de contact' }),
        mobile: fields.text({ label: 'Téléphone principal' }),
        whatsapp: fields.text({ label: 'Numéro WhatsApp', description: 'Avec l’indicatif, exemple : +261 33 14 207 03.' }),
        otherPhones: fields.array(fields.text({ label: 'Numéro' }), {
          label: 'Autres téléphones',
          itemLabel: (props) => props.value,
        }),
        facebook: fields.url({ label: 'Lien de la page Facebook' }),
        instagram: fields.url({ label: 'Lien du compte Instagram' }),
        web3formsKey: fields.text({
          label: 'Clé Web3Forms',
          description: 'Sans elle, les formulaires du site n’envoient rien. Clé gratuite sur web3forms.com.',
        }),
        annualReport: fields.file({
          label: 'Rapport annuel (PDF)',
          description: 'Tant qu’aucun PDF n’est ajouté, le bouton « Télécharger le rapport » est masqué.',
          directory: 'public/documents',
          publicPath: '/documents/',
        }),
      },
    }),

    payments: singleton({
      label: 'Moyens de paiement',
      path: 'src/data/settings/payments',
      format: { data: 'json' },
      schema: {
        stripeOneTime: fields.url({ label: 'Lien Stripe — don ponctuel' }),
        stripeMonthly: fields.url({ label: 'Lien Stripe — don mensuel' }),
        paypal: fields.url({ label: 'Lien PayPal' }),
        bank: fields.object(
          {
            accountName: fields.text({ label: 'Titulaire du compte' }),
            iban: fields.text({ label: 'IBAN' }),
            bic: fields.text({ label: 'BIC / SWIFT' }),
            bankName: fields.text({ label: 'Nom de la banque' }),
          },
          { label: 'Virement bancaire' }
        ),
        mobileMoney: fields.array(
          fields.object({
            provider: fields.text({ label: 'Opérateur', description: 'Exemple : Mvola' }),
            number: fields.text({ label: 'Numéro' }),
          }),
          { label: 'Mobile Money', itemLabel: (props) => props.fields.provider.value }
        ),
      },
    }),

    amounts: singleton({
      label: 'Montants et répartition des dons',
      path: 'src/data/settings/amounts',
      format: { data: 'json' },
      schema: {
        sponsorshipTiers: fields.array(
          fields.object({
            amount: fields.integer({ label: 'Montant par mois', validation: { isRequired: true, min: 0 } }),
            currency: fields.select({
              label: 'Devise',
              options: [
                { label: 'Euro (€)', value: 'EUR' },
                { label: 'Dollar US ($)', value: 'USD' },
              ],
              defaultValue: 'EUR',
            }),
            titleEn: fields.text({ label: 'Nom de la formule (anglais)', validation: { isRequired: true } }),
            titleFr: fields.text({ label: 'Nom de la formule (français)', validation: { isRequired: true } }),
            descriptionEn: fields.text({ label: 'Ce qui est couvert (anglais)', multiline: true }),
            descriptionFr: fields.text({ label: 'Ce qui est couvert (français)', multiline: true }),
            highlighted: fields.checkbox({ label: 'Mettre en avant (« Most popular »)', defaultValue: false }),
          }),
          {
            label: 'Formules de parrainage',
            itemLabel: (props) => `${props.fields.titleEn.value} — ${props.fields.amount.value ?? ''}`,
          }
        ),
        missionary: fields.object(
          {
            monthlyAmount: fields.integer({ label: 'Soutien mensuel d’un missionnaire', validation: { isRequired: true, min: 0 } }),
            currency: fields.select({
              label: 'Devise du soutien mensuel',
              options: [
                { label: 'Euro (€)', value: 'EUR' },
                { label: 'Dollar US ($)', value: 'USD' },
              ],
              defaultValue: 'EUR',
            }),
            emergencyCaseCost: fields.integer({ label: 'Coût d’une urgence médicale', validation: { isRequired: true, min: 0 } }),
            emergencyCurrency: fields.select({
              label: 'Devise de l’urgence médicale',
              options: [
                { label: 'Dollar US ($)', value: 'USD' },
                { label: 'Euro (€)', value: 'EUR' },
              ],
              defaultValue: 'USD',
            }),
          },
          { label: 'Missionnaires' }
        ),
        teacher: fields.object(
          {
            monthlyAmount: fields.integer({ label: 'Soutien mensuel d’un enseignant', validation: { isRequired: true, min: 0 } }),
            currency: fields.select({
              label: 'Devise du soutien mensuel',
              options: [
                { label: 'Euro (€)', value: 'EUR' },
                { label: 'Dollar US ($)', value: 'USD' },
              ],
              defaultValue: 'EUR',
            }),
            schoolProjectMin: fields.integer({ label: 'Ouvrir une école : coût minimum', validation: { isRequired: true, min: 0 } }),
            schoolProjectMax: fields.integer({ label: 'Ouvrir une école : coût maximum', validation: { isRequired: true, min: 0 } }),
            schoolProjectCurrency: fields.select({
              label: 'Devise du coût d’une école',
              options: [
                { label: 'Dollar US ($)', value: 'USD' },
                { label: 'Euro (€)', value: 'EUR' },
              ],
              defaultValue: 'USD',
            }),
          },
          { label: 'Enseignants' }
        ),
        fundsAllocation: fields.array(
          fields.object({
            labelEn: fields.text({ label: 'Poste (anglais)', validation: { isRequired: true } }),
            labelFr: fields.text({ label: 'Poste (français)', validation: { isRequired: true } }),
            percent: fields.integer({ label: 'Pourcentage', validation: { isRequired: true, min: 0, max: 100 } }),
          }),
          {
            label: 'Où va l’argent (le total doit faire 100 %)',
            itemLabel: (props) => `${props.fields.percent.value ?? ''} % — ${props.fields.labelEn.value}`,
          }
        ),
      },
    }),
  },
});
