import { z } from "astro:content";
import { SectionSchema } from "./section";
import { CategorySchema } from "./category";
import { ImageSchema } from "./image";

export const WorkSchema = z.object({
  id: z.string(),
  title: z.string(),
  shortDescription: z.string(),
  category: CategorySchema.shape.id,
  tags: z.array(z.string()),
  createdAt: z.string(),
  images: ImageSchema.array(),
  sections: SectionSchema.array(),
  links: z.array(
    z.object({
      icon: z.string(),
      href: z.string(),
      label: z.string(),
    }),
  ),
});

export type WorkType = z.infer<typeof WorkSchema>;
