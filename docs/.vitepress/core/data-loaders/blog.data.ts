import { createContentLoader } from 'vitepress';

export interface BlogPost {
  title: string;
  url: string;
  date: {
    time: number;
    string: string;
  };
  author?: string;
  tags?: string[];
  description: string;
  excerpt?: string;
  published?: boolean;
  publishDate?: string;
}

declare const data: BlogPost[];
export { data };

export default createContentLoader('blog/posts/*.md', {
  excerpt: true,
  /**
   * Transforms raw blog post data from content loader into BlogPost objects.
   * Filters out unpublished posts and posts with future publish dates (unless in preview mode).
   * Returns posts sorted by date in descending order (newest first).
   *
   * @param raw - Array of raw content loader data containing frontmatter and excerpts
   * @returns Array of validated and filtered BlogPost objects, sorted by date descending
   */
  transform(raw): BlogPost[] {
    const now = Date.now();
    const isPreviewMode = typeof process.env.VITE_PREVIEW_MODE !== 'undefined';

    return raw
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title,
        url,
        date: formatDate(frontmatter.date),
        author: frontmatter.author,
        tags: frontmatter.tags || [],
        description: frontmatter.description || '',
        excerpt: excerpt || frontmatter.description,
        published: frontmatter.published !== false,
        publishDate: frontmatter.publishDate,
      }))
      .filter((post) => {
        // Filter out unpublished posts
        if (!post.published) return false;

        // In preview mode, show all posts regardless of publishDate
        if (isPreviewMode) return true;

        // Filter out posts with future publishDate
        if (post.publishDate) {
          const publishTime = new Date(post.publishDate).getTime();
          if (publishTime > now) return false;
        }

        return true;
      })
      .sort((a, b) => b.date.time - a.date.time);
  },
});

/**
 * Formats a date string into a BlogPost date object.
 * Sets the time to 12:00 UTC to avoid timezone-related date shifts.
 *
 * @param raw - Raw date string in ISO format (YYYY-MM-DD)
 * @returns BlogPost date object with numeric timestamp and formatted string
 */
function formatDate(raw: string): BlogPost['date'] {
  const date = new Date(raw);
  date.setUTCHours(12);
  return {
    time: +date,
    string: date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  };
}
