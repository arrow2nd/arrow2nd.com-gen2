import type { Category } from "@/types/category";
import type { Section } from "@/types/section";
import type { Work } from "@/types/work";
import { createClient, MicroCMSQueries } from "microcms-js-sdk";

const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

/**
 * Aboutのセクションを取得
 * @returns セクション一覧
 */
export const getAboutSections = async () => {
  return await client.getList<Section>({
    endpoint: "about",
    queries: { limit: 100 },
  });
};

/**
 * カテゴリー一覧を取得
 * @returns カテゴリー一覧
 */
export const getCategories = async (queries?: MicroCMSQueries) => {
  return await client.getList<Category>({
    endpoint: "category",
    queries,
  });
};

/**
 * 作品一覧を取得
 * @param queries クエリ
 * @returns 作品一覧
 */
export const getWorks = async (queries?: MicroCMSQueries) => {
  return await client.getList<Work>({
    endpoint: "works",
    queries,
  });
};

/**
 * 作品情報を取得
 * @param contentId コンテンツID
 * @returns 作品情報
 */
export const getWork = async (contentId: string) => {
  return await client.getListDetail<Work>({
    endpoint: "works",
    contentId,
  });
};
