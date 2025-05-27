import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ }) => {
  const aboutEntries = await getCollection('about');
  const worksEntries = await getCollection('works');

  let output = '';

  // Process "about" entries
  if (aboutEntries.length > 0 && Array.isArray(aboutEntries[0].data)) {
    aboutEntries[0].data.forEach((section: any) => {
      output += `${section.title}\n`;
      output += `${section.body}\n`;
    });
  }

  // Process "works" entries
  worksEntries.forEach((work: any) => {
    output += '---\n'; // Separator before each work item
    output += `${work.data.title}\n`;
    output += `${work.data.shortDescription}\n`;

    if (work.data.sections && Array.isArray(work.data.sections)) {
      work.data.sections.forEach((section: any) => {
        if (section.title) {
          output += `${section.title}\n`;
        }
        output += `${section.body}\n`;
      });
    }

    if (work.data.links && Array.isArray(work.data.links)) {
      work.data.links.forEach((link: any) => {
        output += `${link.label}: ${link.href}\n`;
      });
    }
  });

  // Remove the last '---' if it's the last thing in the output,
  // or ensure there isn't one if there were no works.
  // However, the example output suggests a '---' after each work.
  // If there are no works, no '---' will be added by the loop.
  // If there are works, the last work will have '---' after it.
  // The prompt example is:
  // Work Title 1
  // ...
  // Work Link Label 1: Work Link Href 1
  // ---                            <-- This separator
  // Work Title 2

  // So the current logic of adding '---' *before* each work (except the first one, effectively)
  // and one *after* the "about" section is correct according to the example.
  // Let's re-evaluate. The example is:
  // About ...
  // --- (separator between about and first work)
  // Work 1 ...
  // --- (separator between work 1 and work 2)
  // Work 2 ...

  // My current code for "about":
  // output += `${section.title}\n`;
  // output += `${section.body}\n`;
  //
  // Then for "works":
  // worksEntries.forEach((work: any) => {
  //   output += '---\n'; // THIS IS THE PROBLEM - adds separator *before* the first work if about is empty.
  //   output += `${work.data.title}\n`;

  // Let's adjust the separator logic.
  // A single separator between "about" and the "works" block.
  // And a separator *between* individual "works" entries.

  // Revised plan:
  // 1. Add "about" content.
  // 2. If "works" entries exist, add a separator.
  // 3. Iterate "works":
  //    - Add work content.
  //    - If it's not the last work, add a separator.

  // Let's re-write the content construction part.

  let newOutput = '';

  // Process "about" entries
  if (aboutEntries.length > 0 && Array.isArray(aboutEntries[0].data)) {
    aboutEntries[0].data.forEach((section: any) => {
      newOutput += `${section.title}\n`;
      newOutput += `${section.body}\n`;
    });
  }

  // Process "works" entries
  if (worksEntries.length > 0) {
    if (newOutput.length > 0) { // Add separator if "about" content exists
      newOutput += '---\n';
    }
    worksEntries.forEach((work: any, index: number) => {
      newOutput += `${work.data.title}\n`;
      newOutput += `${work.data.shortDescription}\n`;

      if (work.data.sections && Array.isArray(work.data.sections)) {
        work.data.sections.forEach((section: any) => {
          if (section.title) { // Sections might not have titles
            newOutput += `${section.title}\n`;
          }
          newOutput += `${section.body}\n`;
        });
      }

      if (work.data.links && Array.isArray(work.data.links)) {
        work.data.links.forEach((link: any) => {
          newOutput += `${link.label}: ${link.href}\n`;
        });
      }

      if (index < worksEntries.length - 1) {
        newOutput += '---\n'; // Separator between work items
      }
    });
  }

  return new Response(newOutput, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
