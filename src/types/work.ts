import type { Category } from "./category";
import type { Section } from "./section";

export type Link = {
  icon: string;
  href: string;
  text: string;
};

export type Image = {
  image: {
    url: string;
    width: number;
    height: number;
  };
  alt: string;
};

export type Work = {
  id: string;
  images: Image[];
  category: Category;
  categories: Category[];
  title: string;
  description: string;
  sections: Section[];
  links: Link[];
};
