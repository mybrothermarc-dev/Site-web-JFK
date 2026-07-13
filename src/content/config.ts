import { defineCollection, z } from 'astro:content';

// Texte bilingue : { fr: '...', en: '...' }
const bilingual = z.object({ fr: z.string(), en: z.string() });

const children = defineCollection({
  type: 'data',
  schema: z.object({
    firstName: z.string(),
    age: z.number(),
    photoPlaceholder: z.string(), // couleur/icône du placeholder, ex: "leaf"
    status: z.enum(['available', 'sponsored']),
    bio: bilingual,
    order: z.number().default(0),
  }),
});

const missionaries = defineCollection({
  type: 'data',
  schema: z.object({
    firstName: z.string(),
    zone: z.string(),
    photoPlaceholder: z.string(),
    summary: bilingual,
    stats: bilingual,
    order: z.number().default(0),
  }),
});

const teachers = defineCollection({
  type: 'data',
  schema: z.object({
    firstName: z.string(),
    village: z.string(),
    photoPlaceholder: z.string(),
    summary: bilingual,
    order: z.number().default(0),
  }),
});

const projects2026 = defineCollection({
  type: 'data',
  schema: z.object({
    title: bilingual,
    description: bilingual,
    budgetGoal: z.number(),
    budgetRaised: z.number(),
    currency: z.string().default('USD'),
    photoPlaceholder: z.string(),
    order: z.number().default(0),
  }),
});

const villageSchools = defineCollection({
  type: 'data',
  schema: z.object({
    villageName: bilingual,
    budgetGoal: z.number(),
    budgetRaised: z.number(),
    currency: z.string().default('USD'),
    photoPlaceholder: z.string(),
    order: z.number().default(0),
  }),
});

const testimonials = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    role: bilingual,
    quote: bilingual,
    photoPlaceholder: z.string(),
    order: z.number().default(0),
  }),
});

export const collections = { children, missionaries, teachers, projects2026, testimonials, villageSchools };
