import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({}) => {
  const aboutEntries = await getCollection("about");
  const worksEntries = await getCollection("works");

  let output = `ここはarrow2nd (あろー)のポートフォリオサイトです。

# About

`;

  // Process "about" entries
  if (aboutEntries.length > 0 && Array.isArray(aboutEntries[0].data)) {
    aboutEntries[0].data.forEach((section: any) => {
      output += `## ${section.title}\n`;
      output += `${section.body}\n\n`; // Double newline for paragraph break in Markdown
    });
  }

  output += "\n---\n\n"; // Markdown horizontal rule

  output += "# Works\n\n";

  // Process "works" entries
  worksEntries.forEach((work: any) => {
    output += `## ${work.data.title}\n`;
    output += `${work.data.shortDescription}\n\n`; // Double newline for paragraph break
  });

  return new Response(output, {
    status: 200,
    headers: {
      // As per instruction, keeping text/plain due to .txt extension,
      // but content is Markdown.
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
