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
}

declare const data: BlogPost[];
export { data };

export default createContentLoader('blog/posts/*.md', {
  excerpt: true,
  transform(raw): BlogPost[] {
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
      }))
      .filter((post) => post.published !== false)
      .sort((a, b) => b.date.time - a.date.time);
  },
});

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
