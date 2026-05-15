import { defineCollection, z } from 'astro:content';

/**
 * Events collection — one round per markdown file
 */
const events = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    time: z.string().default('6:00 PM'),
    doorsOpen: z.string().default('5:30 PM'),
    venue: z.string().default('Just Love Coffee Cafe'),
    address: z.string().default('4816 Main Street, Spring Hill, TN 37174'),
    headliner: z.string().optional(),
    artists: z
      .array(z.object({ name: z.string() }))
      .default([]),
    note: z.string().optional(),
  }),
});

/**
 * Settings collection — global editable text for each page.
 * Managed via Decap's "file" collection (one YAML file per page).
 */
const settings = defineCollection({
  type: 'data',
  schema: z.object({
    hero: z.object({
      eyebrow: z.string(),
      intro: z.string(),
    }),
    marquee: z.object({
      items: z.array(z.object({ text: z.string() })),
    }),
    format: z.object({
      eyebrow: z.string(),
      headline: z.string(),
      body: z.string(),
    }),
  }),
});

export const collections = { events, settings };
