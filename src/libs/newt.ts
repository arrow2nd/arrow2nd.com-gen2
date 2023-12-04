import type { Category } from "@/types/category";
import type { Section } from "@/types/section";
import type { Work } from "@/types/work";

import { createClient } from "newt-client-js";

type CommonAttributes = {
  _sys: {
    customOrder: number;
  };
};

const appUid = "portfolio";

const client = createClient({
  spaceUid: import.meta.env.NEWT_SPACE_UID,
  token: import.meta.env.NEWT_CDN_API_TOKEN,
  apiType: "cdn"
});

/**
 * Aboutセクションを取得
 * @returns 一覧
 */
export const getAboutSections = async () => {
  const sections = await client.getContents<CommonAttributes & Section>({
    appUid,
    modelUid: "about"
  });

  // カスタムオーダーに沿ってソート
  return sections.items.sort((a, b) => b._sys.customOrder - a._sys.customOrder);
};

/**
 * カテゴリ一覧を取得
 * @returns 一覧
 */
export const getCategories = async () => {
  const categories = await client.getContents<CommonAttributes & Category>({
    appUid,
    modelUid: "category"
  });

  // カスタムオーダーに沿ってソート
  return categories.items.sort(
    (a, b) => b._sys.customOrder - a._sys.customOrder
  );
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
      order: ["createdAt"],
      limit: 500
    }
  });

  return works.items;
};
