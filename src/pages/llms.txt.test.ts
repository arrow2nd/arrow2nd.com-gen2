import { describe, it, expect } from 'vitest';
import { GET } from './llms.txt'; // Adjust if your endpoint is in a different location

describe('GET /llms.txt', () => {
  it('should return a 200 status and plain text content with correct data', async () => {
    // The GET function from Astro endpoint expects an object similar to APIContext.
    // Since our GET function doesn't use any properties from it, we can pass a minimal mock.
    const response = await GET({} as any);
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

    // Check for the separator
    expect(text).toContain("\n---\n");

    // Check for "works" content (from vitest.setup.ts mock for the first work)
    expect(text).toContain("www.arrow2nd.com (Gen 5)");
    expect(text).toContain("ポートフォリオサイトのようなもの (5代目)");

    // Check for content from the second work to ensure loop and formatting
    expect(text).toContain("Another Great Project");
    expect(text).toContain("This is another project to test separators.");

    // Verify structure: about content, then separator, then works content
    const aboutPart = "デレマス / シャニマス / ARIA / 上伊那ぼたん / 薬袋カルテ";
    const separator = "---";
    const worksPart = "www.arrow2nd.com (Gen 5)";

    expect(text.indexOf(aboutPart)).toBeLessThan(text.indexOf(separator));
    expect(text.indexOf(separator)).toBeLessThan(text.indexOf(worksPart));
  });
});
