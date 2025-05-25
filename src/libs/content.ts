import { getCollection, getEntry } from "astro:content";
import type { CategoryType } from "@/types/category";
import type { WorkType } from "@/types/work";
import type { SectionType } from "@/types/section";
import type { CareerType } from "@/types/career";
import { optimizedImages } from "./image";

/**
 * Aboutセクションを取得
 */
export const getAboutSections = async (): Promise<SectionType[]> => {
  const about = await getCollection("about");
  return about.flatMap(({ data }) => data);
};

/**
 * 経歴を取得
 */
export const getCareers = async (): Promise<CareerType[]> => {
  const careers = await getCollection("careers");
  return careers.flatMap(({ data }) => data);
};

/**
 * カテゴリ一覧を取得
 */
export const getCategories = async (): Promise<CategoryType[]> => {
  const categories = await getCollection("categories");
  return categories.flatMap(({ data }) => data);
};

/**
 * 作品一覧を取得
 */
export const getAllWorks = async (): Promise<WorkType[]> => {
  const works = await getCollection("works");

  const results = works.flatMap(async ({ data }) => {
    const images = await optimizedImages(data.id, data.images);

    return {
      ...data,
      images,
    };
  });

  const allWorks = await Promise.all(results);

  // createdAtでソート
  return allWorks.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
};

/**
 * IDから作品を取得
 * @param id 作品ID
 * @returns 作品情報
 */
export const getWorkById = async (id: string): Promise<WorkType | null> => {
  try {
    const work = await getEntry("works", id);
    return work;
  } catch (error) {
    console.error(`Failed to load work ${id}:`, error);
    return null;
  }
};
