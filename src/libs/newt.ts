import type { Category } from "@/types/category";
import type { Section } from "@/types/section";
import type { Work } from "@/types/work";

import { createClient } from "newt-client-js";

const appUid = "portfolio";

const client = createClient({
  spaceUid: import.meta.env.NEWT_SPACE_UID,
  token: import.meta.env.NEWT_CDN_API_TOKEN,
  apiType: "cdn"
});

const previewClient = createClient({
  spaceUid: import.meta.env.NEWT_SPACE_UID,
  token: import.meta.env.NEWT_API_TOKEN,
  apiType: "api"
});

/**
 * Aboutセクションを取得
 * @returns 一覧
 */
export const getAboutSections = async () => {
  const sections = await client.getContents<Section>({
    appUid,
    modelUid: "about",
    query: {
      order: ["-_sys.customOrder"]
    }
  });

  return sections.items;
};

/**
 * カテゴリ一覧を取得
 * @returns 一覧
 */
export const getCategories = async () => {
  const categories = await client.getContents<Category>({
    appUid,
    modelUid: "category",
    query: {
      order: ["-_sys.customOrder"]
    }
  });

  return categories.items;
};

/**
 * 作品一覧を取得
 * @param select 取得するフィールド
 * @returns 一覧
 */
export const getAllWorks = async (select?: string[]) => {
  const works = await client.getContents<Work>({
    appUid,
    modelUid: "work",
    query: {
      select,
      order: ["-_sys.createdAt"],
      limit: 1000
    }
  });

  return works.items;
};

/**
 * IDから作品を取得 (プレビュー用)
 * @param id 作品ID
 * @returns 作品情報
 */
export const getWorkPreview = async (id: string) => {
  return await previewClient.getFirstContent<Work>({
    appUid,
    modelUid: "work",
    query: {
      id
    }
  });
};
