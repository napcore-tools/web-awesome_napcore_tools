import path from 'node:path';
import { mkdirSync, writeFileSync } from 'node:fs';
import { Feed } from 'feed';
import type { SiteConfig } from 'vitepress';
import { createContentLoader } from 'vitepress';
import { siteUrl } from './core/config/site';
import { OKF_ARCHIVE, okfBundle } from './core/okf/okfBundle';
import { zipArchive } from './core/okf/zipArchive';

const blogUrl = `${siteUrl}/blog`;

/**
 * VitePress buildEnd hook that generates an RSS feed for blog posts and the OKF bundle.
 * Loads all blog posts, filters by publish status and date, and creates feed.rss in the output directory.
 * Respects VITE_PREVIEW_MODE environment variable for scheduled posts.
 *
 * @param config - VitePress site configuration object
 * @returns Promise that resolves when RSS feed is written
 */
export const buildEnd = async (config: SiteConfig): Promise<void> => {
  const feed = new Feed({
    title: 'Awesome NAPCORE Tools Blog',
    description: 'Latest updates on European mobility data tools and standards',
    id: blogUrl,
    link: blogUrl,
    language: 'en',
    image: `${siteUrl}/favicon.png`,
    favicon: `${siteUrl}/favicon.png`,
    copyright: 'Copyright © 2026 NAPCORE - National Access Point Coordination Organisation for Europe',
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

  writeOkfBundle(config.outDir);
};

/**
 * Writes the catalogue as an OKF bundle: a browsable tree of Markdown concepts at
 * `/okf/` and the same tree as one zip beside it (see core/okf/okfBundle.ts).
 */
function writeOkfBundle(outDir: string): void {
  const files = okfBundle(siteUrl);

  for (const [relative, contents] of files) {
    const target = path.join(outDir, 'okf', relative);
    mkdirSync(path.dirname(target), { recursive: true });
    writeFileSync(target, contents);
  }
  writeFileSync(path.join(outDir, `${OKF_ARCHIVE}.zip`), zipArchive(files));

  console.log(`✅ Generated OKF bundle with ${files.size} files`);
}
