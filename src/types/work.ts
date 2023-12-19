import type { Content, Image } from "newt-client-js";
import type { Category } from "./category";
import type { Section } from "./section";

export type Link = {
  icon: string;
  href: string;
  text: string;
};

export type Work = {
  id: string;
  images: Image[];
  category: Category;
  title: string;
  description: string;
  sections: Section[];
  links: Link[];
} & Content;
