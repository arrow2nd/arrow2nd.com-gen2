import { z } from "astro:content";

export const ImageSchema = z.object({
  src: z.string(),
  alt: z.string().optional(),
});

export type ImageType = z.infer<typeof ImageSchema>;
