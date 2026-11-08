import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { PROMPT_CATEGORIES, AI_MODELS, TUTORIAL_CATEGORIES, DIFFICULTIES } from './data/categories';

const prompts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/prompts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(PROMPT_CATEGORIES),
    tags: z.array(z.string()).default([]),
    models: z.array(z.enum(AI_MODELS)).default(['通用']),
    date: z.coerce.date(),
    featured: z.boolean().default(false),
  }),
});

const tutorials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tutorials' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(TUTORIAL_CATEGORIES),
    tags: z.array(z.string()).default([]),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    difficulty: z.enum(DIFFICULTIES),
    draft: z.boolean().default(false),
  }),
});

export const collections = { prompts, tutorials };
