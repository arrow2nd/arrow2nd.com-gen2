import { file } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro:content";
import { SectionSchema } from "./types/section";
import { CategorySchema } from "./types/category";
import { CareerSchema } from "./types/career";
import { WorkSchema } from "./types/work";
import { parse } from "toml";

const about = defineCollection({
  loader: file("src/data/about.toml", {
    parser: (text) => parse(text),
  }),
  schema: z.array(SectionSchema),
});

const careers = defineCollection({
  loader: file("src/data/careers.toml", {
    parser: (text) => parse(text),
  }),
  schema: z.array(CareerSchema),
});

const categories = defineCollection({
  loader: file("src/data/categories.toml", {
    parser: (text) => parse(text),
  }),
  schema: z.array(CategorySchema),
});

const works = defineCollection({
  loader: async () => {
    const files = import.meta.glob<string>("src/data/works/**/*.toml", {
      query: "?raw",
      import: "default",
    });

    const entries = [];

    for (const [_, loader] of Object.entries(files)) {
      const content = await loader();
      const parsed = parse(content);
      entries.push(parsed);
    }

    return entries;
  },
  schema: WorkSchema,
});

export const collections = {
  about,
  careers,
  categories,
  works,
};
