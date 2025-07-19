import { file, glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro:content";
import { SectionSchema } from "./types/section";
import { CategorySchema } from "./types/category";
import { CareerSchema } from "./types/career";
import { WorkSchema } from "./types/work";

const about = defineCollection({
  loader: file("src/data/about.toml"),
  schema: z.array(SectionSchema)
});

const careers = defineCollection({
  loader: file("src/data/careers.toml"),
  schema: z.array(CareerSchema)
});

const categories = defineCollection({
  loader: file("src/data/categories.toml"),
  schema: z.array(CategorySchema)
});

const works = defineCollection({
  loader: glob({ pattern: "**/*.toml", base: "src/data/works" }),
  schema: WorkSchema
});

export const collections = {
  about,
  careers,
  categories,
  works
};
