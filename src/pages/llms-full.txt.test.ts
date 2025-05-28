import { describe, it, expect } from 'vitest';
import { GET } from './llms-full.txt'; // Adjust if your endpoint is in a different location

describe('GET /llms-full.txt', () => {
  it('should return a 200 status and plain text content with full data', async () => {
    const response = await GET({} as any); // Minimal mock for APIContext
    const text = await response.text();

    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toBe('text/plain; charset=utf-8');
    expect(text).toBeDefined();
    expect(text.length).toBeGreaterThan(0);

    // Check for "about" content (from vitest.setup.ts mock)
    expect(text).toContain("はじめまして、あろーです。");
    expect(text).toContain("なんかつくったり、つくらなかったりします。\nフランスパンとチョコミントがすきです。");
    expect(text).toContain("好き");
    expect(text).toContain("デレマス / シャニマス / ARIA / 上伊那ぼたん / 薬袋カルテ");

    // Check for "works" content (from vitest.setup.ts mock for the first work)
    const firstWorkTitle = "www.arrow2nd.com (Gen 5)";
    const firstWorkShortDesc = "ポートフォリオサイトのようなもの (5代目)";
    const firstWorkSectionTitle = "概要";
    const firstWorkSectionBody = "ポートフォリオのようなサイト。";
    const firstWorkLink = "GitHub: https://github.com/arrow2nd/arrow2nd.com-gen2";

    expect(text).toContain(firstWorkTitle);
    expect(text).toContain(firstWorkShortDesc);
    expect(text).toContain(firstWorkSectionTitle);
    expect(text).toContain(firstWorkSectionBody);
    expect(text).toContain("ひとこと\nAstro に入門したくて作りなおしました 🚀\nデザインもちょっと変えてます。");
    expect(text).toContain(firstWorkLink);

    // Check for content from the second work
    const secondWorkTitle = "Another Great Project";
    const secondWorkShortDesc = "This is another project to test separators.";
    const secondWorkSectionTitle = "Main Feature"; // Note: section titles are included if they exist
    const secondWorkSectionBody = "It does something very useful.";
    const secondWorkLink = "Project Page: https://example.com/another-work";

    expect(text).toContain(secondWorkTitle);
    expect(text).toContain(secondWorkShortDesc);
    expect(text).toContain(secondWorkSectionTitle);
    expect(text).toContain(secondWorkSectionBody);
    expect(text).toContain(secondWorkLink);

    // Verify structure and separators
    const aboutEndContent = "デレマス / シャニマス / ARIA / 上伊那ぼたん / 薬袋カルテ";
    const separator = "\n---\n";

    const firstWorkFullContent = `${firstWorkTitle}\n${firstWorkShortDesc}\n${firstWorkSectionTitle}\n${firstWorkSectionBody}\nひとこと\nAstro に入門したくて作りなおしました 🚀\nデザインもちょっと変えてます。\n${firstWorkLink}`;
    const secondWorkFullContent = `${secondWorkTitle}\n${secondWorkShortDesc}\n${secondWorkSectionTitle}\n${secondWorkSectionBody}\n${secondWorkLink}`;

    // Expected structure:
    // {About Content}
    // ---
    // {Work 1 Content}
    // ---
    // {Work 2 Content}

    const expectedOrder = [
      aboutEndContent,
      firstWorkFullContent, // Check for some unique part of the first work
      secondWorkFullContent // Check for some unique part of the second work
    ];
    
    const parts = text.split(separator);
    expect(parts.length).toBe(3); // About, Work1, Work2

    expect(parts[0]).toContain(aboutEndContent);
    expect(parts[1]).toContain(firstWorkTitle);
    expect(parts[1]).toContain(firstWorkLink);
    expect(parts[2]).toContain(secondWorkTitle);
    expect(parts[2]).toContain(secondWorkLink);


    // More precise check for separators between about/work1 and work1/work2
    const aboutIndex = text.indexOf(aboutEndContent);
    const work1Index = text.indexOf(firstWorkTitle);
    const work2Index = text.indexOf(secondWorkTitle);

    // Ensure "about" content appears before the first "---" that precedes work1
    // Ensure work1 content appears before the "---" that precedes work2
    const firstSeparatorIndex = text.indexOf(separator);
    const secondSeparatorIndex = text.indexOf(separator, firstSeparatorIndex + separator.length);

    expect(aboutIndex).toBeLessThan(firstSeparatorIndex);
    expect(work1Index).toBeGreaterThan(firstSeparatorIndex);
    expect(work1Index).toBeLessThan(secondSeparatorIndex);
    expect(work2Index).toBeGreaterThan(secondSeparatorIndex);
  });
});
