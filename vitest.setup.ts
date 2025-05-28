import { vi } from 'vitest';

const mockAboutData = [
  {
    id: 'about.toml', // Mocked ID, actual ID structure might differ but isn't crucial for these tests
    collection: 'about',
    data: [
      {
        id: "about",
        title: "はじめまして、あろーです。",
        body: "なんかつくったり、つくらなかったりします。\nフランスパンとチョコミントがすきです。"
      },
      {
        id: "favorite",
        title: "好き",
        body: "デレマス / シャニマス / ARIA / 上伊那ぼたん / 薬袋カルテ"
      }
    ]
  }
];

const mockWorksData = [
  {
    id: 'arrow2nd-gen5',
    collection: 'works',
    data: {
      id: "arrow2nd-gen5",
      title: "www.arrow2nd.com (Gen 5)",
      shortDescription: "ポートフォリオサイトのようなもの (5代目)",
      category: "web",
      tags: ["Webサイト", "Astro"],
      createdAt: "2023-06-01",
      sections: [
        {
          title: "概要",
          body: "ポートフォリオのようなサイト。"
        },
        {
          title: "ひとこと",
          body: "Astro に入門したくて作りなおしました 🚀\nデザインもちょっと変えてます。"
        }
      ],
      links: [
        {
          icon: "github-line",
          href: "https://github.com/arrow2nd/arrow2nd.com-gen2",
          label: "GitHub"
        }
      ]
    }
  },
  {
    id: 'another-work',
    collection: 'works',
    data: {
      id: "another-work",
      title: "Another Great Project",
      shortDescription: "This is another project to test separators.",
      category: "tool",
      tags: ["CLI", "Utility"],
      createdAt: "2024-01-01",
      sections: [
        {
          title: "Main Feature",
          body: "It does something very useful."
        }
      ],
      links: [
        {
          icon: "info-icon",
          href: "https://example.com/another-work",
          label: "Project Page"
        }
      ]
    }
  }
];

vi.mock('astro:content', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    getCollection: vi.fn((collectionName: string) => {
      if (collectionName === 'about') {
        return Promise.resolve(mockAboutData);
      }
      if (collectionName === 'works') {
        return Promise.resolve(mockWorksData);
      }
      return Promise.resolve([]);
    }),
  };
});
