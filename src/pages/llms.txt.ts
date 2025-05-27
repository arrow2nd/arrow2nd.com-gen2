import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ }) => {
  const aboutEntries = await getCollection('about');
  const worksEntries = await getCollection('works');

  let output = '';

  // Process "about" entries
  // The 'about' collection is an array of sections within a single document.
  // So, aboutEntries[0] should give us the document, and aboutEntries[0].data should be the array of sections.
  if (aboutEntries.length > 0 && Array.isArray(aboutEntries[0].data)) {
    aboutEntries[0].data.forEach((section: any) => {
      output += `${section.title}\n`;
      output += `${section.body}\n`;
    });
  }

  output += '---\n';

  // Process "works" entries
  // The 'works' collection seems to be a list of individual work documents.
  worksEntries.forEach((work: any) => {
    output += `${work.data.title}\n`;
    output += `${work.data.shortDescription}\n`;
  });

  return new Response(output, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
