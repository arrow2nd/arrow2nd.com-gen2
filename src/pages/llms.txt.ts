import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({}) => {
  const aboutEntries = await getCollection("about");
  const worksEntries = await getCollection("works");

  let output = `ここはarrow2nd (あろー)のポートフォリオサイトです。
より詳細は内容は /llms-full.txt を参照してください。

# About
`;

  if (aboutEntries.length > 0 && Array.isArray(aboutEntries[0].data)) {
    for (const section of aboutEntries[0].data) {
      output += `## ${section.title}\n`;
      output += `${section.body}\n\n`;
    }
  }

  output += "# Works\n\n";

  for (const work of worksEntries) {
    output += `## ${work.data.title}\n`;
    output += `${work.data.shortDescription}\n\n`;
  }

  return new Response(output, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
