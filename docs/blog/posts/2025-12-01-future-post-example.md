---
title: This Post Will Be Published in December
description: This is an example of a scheduled post that won't appear until its publishDate arrives.
date: 2099-12-01
publishDate: 2099-12-01
author: NAPCORE Team
tags:
  - example
  - scheduled
published: true
---

<BlogPostMeta />

# This Post Will Be Published in December

This post demonstrates the `publishDate` feature. It won't be visible on the blog listing page or in the RSS feed until December 1, 2099.

## How It Works

When you add a `publishDate` field to the frontmatter, the post will be hidden until that date arrives:

```yaml
---
title: Your Post Title
date: 2099-12-01
publishDate: 2099-12-01 # Post won't appear until this date
published: true
---
```

## Use Cases

- **Content Scheduling**: Prepare posts in advance and schedule them for future publication
- **Announcement Timing**: Coordinate blog posts with product launches or events
- **Content Pipeline**: Build a backlog of content that publishes automatically

## Notes

- The `publishDate` is checked at build time
- If you don't specify `publishDate`, the post is published immediately
- The `date` field is used for sorting, while `publishDate` controls visibility
- You'll need to rebuild your site for scheduled posts to appear after their publishDate

---

_This post will automatically appear on December 1, 2099!_
