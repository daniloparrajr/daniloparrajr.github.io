import { z, defineCollection } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z
      .string()
      .max(
        160,
        "For best SEO results, please keep the description under 160 characters."
      ),
    draft: z.boolean().default(false),
    ogImage: z.string().optional(),
    tags: z
      .enum(["JavaScript", "Web Development", "CSS", "Git"])
      .array()
      .nonempty(),
  }),
});

export const collections = { blog };
