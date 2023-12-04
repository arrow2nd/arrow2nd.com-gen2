import type { Category } from "./category";
import type { Section } from "./section";

export type Link = {
  icon: string;
  href: string;
  text: string;
};

export type Image = {
  altText: string;
  src: string;
  width: number;
  height: number;
};

export type Work = {
  id: string;
  images: Image[];
  category: Category;
  title: string;
  description: string;
  sections: Section[];
  links: Link[];
};
