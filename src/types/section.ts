import { z } from "astro:content";

export const SectionSchema = z.object({
  title: z.string(),
  body: z.string(),
});

export type SectionType = z.infer<typeof SectionSchema>;
