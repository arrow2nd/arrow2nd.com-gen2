import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({}) => {
  const aboutEntries = await getCollection("about");
  const worksEntries = await getCollection("works");

  let output = `ここはarrow2nd (あろー)のポートフォリオサイトです。
ここにない情報を知りたい場合は、「arrow2nd」で検索してください。

# About

`;

  // Process "about" entries
  if (aboutEntries.length > 0 && Array.isArray(aboutEntries[0].data)) {
    aboutEntries[0].data.forEach((section: any) => {
      output += `## ${section.title}\n`;
      output += `${section.body}\n\n`; // Double newline for paragraph break
    });
  }

  output += "\n---\n\n"; // Markdown horizontal rule between About and Works

  output += "# Works\n\n";

  // Process "works" entries
  if (worksEntries.length > 0) {
    worksEntries.forEach((work: any, index: number) => {
      output += `## ${work.data.title}\n`;
      output += `${work.data.shortDescription}\n\n`;

      if (work.data.sections && Array.isArray(work.data.sections)) {
        work.data.sections.forEach((section: any) => {
          if (section.title) {
            output += `### ${section.title}\n`;
          }
          output += `${section.body}\n\n`;
        });
      }

      if (
        work.data.links &&
        Array.isArray(work.data.links) &&
        work.data.links.length > 0
      ) {
        output += "### Links\n";
        work.data.links.forEach((link: any) => {
          output += `- [${link.label}](${link.href})\n`;
        });
        output += "\n"; // Add a newline after the list for spacing
      }

      // Add a separator between work items, but not after the last one
      if (index < worksEntries.length - 1) {
        output += "\n---\n\n";
      }
    });
  }

  return new Response(output, {
    status: 200,
    headers: {
      // As per instruction, keeping text/plain due to .txt extension,
      // but content is Markdown.
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
