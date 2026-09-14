import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Ces fichiers sont écrits par l'admin (keystatic.config.ts). Anglais d'abord, français ensuite.
const bilingual = z.object({ en: z.string(), fr: z.string() });

/** Chemin de la photo choisie dans l'admin, ou null s'il n'y en a pas encore. */
const photo = z.string().nullish();
const placeholder = z.string().default('sun');
const order = z.number().default(0);
const optionalText = z
  .string()
  .nullish()
  .transform((value) => value ?? '');

const children = defineCollection({
  type: 'data',
  schema: z.object({
    firstName: z.string(),
    age: z.number(),
    status: z.enum(['available', 'sponsored']),
    bio: bilingual,
    photo,
    // Protection de l'enfance : la photo n'est publiée que si l'accord du tuteur est coché
    photoConsent: z.boolean().default(false),
    photoPlaceholder: placeholder,
    order,
  }),
});

const missionaries = defineCollection({
  type: 'data',
  schema: z.object({
    firstName: z.string(),
    zone: z.string(),
    summary: bilingual,
    stats: bilingual,
    photo,
    photoPlaceholder: placeholder,
    order,
  }),
});

const teachers = defineCollection({
  type: 'data',
  schema: z.object({
    firstName: z.string(),
    village: z.string(),
    summary: bilingual,
    photo,
    photoPlaceholder: placeholder,
    order,
  }),
});

const projects2026 = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string().optional(),
    title: bilingual,
    description: bilingual,
    budgetGoal: z.number(),
    budgetRaised: z.number(),
    currency: z.string().default('USD'),
    photo,
    photoPlaceholder: placeholder,
    order,
  }),
});

const villageSchools = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string().optional(),
    villageName: bilingual,
    budgetGoal: z.number(),
    budgetRaised: z.number(),
    currency: z.string().default('USD'),
    photoPlaceholder: placeholder,
    order,
  }),
});

const testimonials = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    role: bilingual,
    quote: bilingual,
    photo,
    showOnTeachersPage: z.boolean().default(false),
    photoPlaceholder: placeholder,
    order,
  }),
});

/**
 * Blog : chaque article est un dossier src/content/blog/<adresse>/
 *   - index.md      → informations + texte anglais (obligatoire)
 *   - contentFr.md  → texte français (facultatif)
 */
const blogFolderId = ({ entry }: { entry: string }) => entry.split('/')[0];

const blog = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/blog', generateId: blogFolderId }),
  schema: z.object({
    title: z.string(),
    titleFr: optionalText,
    date: z.coerce.date(),
    published: z.boolean().default(true),
    cover: photo,
    coverAlt: optionalText,
    excerpt: z.string(),
    excerptFr: optionalText,
  }),
});

const blogFr = defineCollection({
  loader: glob({ pattern: '*/contentFr.md', base: './src/content/blog', generateId: blogFolderId }),
  schema: z.object({}).passthrough(),
});

export const collections = {
  children,
  missionaries,
  teachers,
  projects2026,
  testimonials,
  villageSchools,
  blog,
  blogFr,
};
