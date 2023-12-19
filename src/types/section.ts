import type { Content } from "newt-client-js";

export type Section = {
  title: string;
  text: string;
} & Content;
