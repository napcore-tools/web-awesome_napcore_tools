import path from 'node:path';
import { writeFileSync } from 'node:fs';
import { Feed } from 'feed';
import type { SiteConfig } from 'vitepress';
import { createContentLoader } from 'vitepress';

// TODO: Update this with your actual site URL when deploying
const siteUrl = process.env.SITE_URL || 'https://napcore-store.eu';
const blogUrl = `${siteUrl}/blog`;

export const buildEnd = async (config: SiteConfig): Promise<void> => {
  const feed = new Feed({
    title: 'NAPCORE Store Blog',
    description: 'Latest updates on European mobility data tools and standards',
    id: blogUrl,
    link: blogUrl,
    language: 'en',
    image: `${siteUrl}/favicon.png`,
    favicon: `${siteUrl}/favicon.png`,
    copyright: 'Copyright © 2025 NAPCORE - National Access Point Coordination Organisation for Europe',
  });

  // Load blog posts with content
  const posts = await createContentLoader('blog/posts/*.md', {
    excerpt: true,
    render: true,
  }).load();

  // Sort by date (newest first)
  posts.sort((a, b) => +new Date(b.frontmatter.date as string) - +new Date(a.frontmatter.date as string));

  // Add posts to feed
  const now = Date.now();
  const isPreviewMode = typeof process.env.VITE_PREVIEW_MODE !== 'undefined';
  let publishedCount = 0;

  for (const { url, excerpt, frontmatter, html } of posts) {
    // Skip draft posts
    if (frontmatter.published === false) continue;

    // In preview mode, include all posts regardless of publishDate
    if (!isPreviewMode && frontmatter.publishDate) {
      const publishTime = new Date(frontmatter.publishDate as string).getTime();
      if (publishTime > now) continue;
    }

    feed.addItem({
      title: frontmatter.title,
      id: `${siteUrl}${url}`,
      link: `${siteUrl}${url}`,
      description: frontmatter.description || excerpt,
      content: html,
      author: frontmatter.author ? [{ name: frontmatter.author }] : undefined,
      date: new Date(frontmatter.date),
    });

    publishedCount++;
  }

  // Write RSS feed to output directory
  writeFileSync(path.join(config.outDir, 'feed.rss'), feed.rss2());

  console.log(`✅ Generated RSS feed with ${publishedCount} posts`);
};
