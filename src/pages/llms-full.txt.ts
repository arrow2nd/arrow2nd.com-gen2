import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({}) => {
  const aboutEntries = await getCollection("about");
  const careersEntries = await getCollection("careers");
  const worksEntries = await getCollection("works");

  let output = `ここはarrow2nd (あろー)のポートフォリオサイトです。
ここにない情報を知りたい場合は、「arrow2nd」で検索してください。

# About

`;

  if (aboutEntries.length > 0 && Array.isArray(aboutEntries[0].data)) {
    for (const section of aboutEntries[0].data) {
      output += `## ${section.title}\n`;
      output += `${section.body}\n\n`;
    }
  }

  output += "# Careers\n\n";

  if (careersEntries.length > 0) {
    for (const careers of careersEntries) {
      for (const career of careers.data) {
        if (career.title) {
          output += `## ${career.title}\n`;
        }

        output += `- ${career.jobName}\n`;
        output += `- 期間: ${career.employmentPeriod}\n\n`;
      }
    }
  }

  output += "# Works\n\n";

  if (worksEntries.length > 0) {
    for (const work of worksEntries) {
      output += `## ${work.data.title}\n`;
      output += `${work.data.shortDescription}\n`;

      if (work.data.sections && Array.isArray(work.data.sections)) {
        for (const section of work.data.sections) {
          if (section.title) {
            output += `### ${section.title}\n`;
          }
          output += `${section.body.trim()}\n`;
        }
      }

      if (
        work.data.links &&
        Array.isArray(work.data.links) &&
        work.data.links.length > 0
      ) {
        output += "### Links\n";
        for (const link of work.data.links) {
          output += `- [${link.label}](${link.href})\n`;
        }
      }

      output += "\n";
    }
  }

  return new Response(output, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
