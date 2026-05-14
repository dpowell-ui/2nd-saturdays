import { defineCollection, z } from 'astro:content';

const events = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(), // accepts both YAML date and quoted strings
    time: z.string().default('6:00 PM'),
    doorsOpen: z.string().default('5:30 PM'),
    venue: z.string().default('Just Love Coffee Cafe'),
    address: z.string().default('4816 Main Street, Spring Hill, TN 37174'),
    artists: z.array(z.string()).default([]),
    note: z.string().optional(),
  }),
});

export const collections = { events };
