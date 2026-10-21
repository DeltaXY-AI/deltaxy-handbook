import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				/** Approval status. Required for standards; enforced in `src/routeData.ts`. */
				status: z.enum(['Draft', 'Approved', 'Superseded']).optional(),
				/** Handbook version of this page, e.g. `0.1`. */
				version: z.string().optional(),
				/** Owner role, never a personal name. */
				owner: z.string().optional(),
				/** Recorded decision, e.g. `Deferred for detailed review`. */
				decision: z.string().optional(),
			}),
		}),
	}),
	i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
};
