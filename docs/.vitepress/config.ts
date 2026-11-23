import { defineConfig } from 'vitepress';
import { getCategoriesSidebar } from './core/config/sidebar';
import { napCoreMarkdownPlugin } from './plugins/napCoreMarkdownPlugin';
import { collapsePlugin } from './plugins/collapsePlugin';
import { chapterPlugin } from './plugins/chapterPlugin';
import { okfDevPlugin } from './plugins/okfDevPlugin';
import { llmsDevPlugin } from './plugins/llmsDevPlugin';
import { validateAllStandards } from './core/validation/standards';
import { validateAllCategories } from './core/validation/categories';
import { handleValidationResult } from './core/validation/utils';
import { buildEnd } from './buildEnd';
import { siteUrl, withBasePath } from './core/config/site';
import { splitDynamicPageIntoSections } from './core/search/dynamicPageSearch';
import llmstxtPlugin from 'vitepress-plugin-llmstxt';
import {
  type LlmsContext,
  cleanLlmsPage,
  fixIndexLinks,
  hiddenBlogPosts,
  loadLlmsContext,
} from './core/llms/llmsMarkdown';
import { fileURLToPath, URL } from 'node:url';

// Validate STANDARD_METADATA at config load time
const standardsValidationResult = validateAllStandards();
handleValidationResult('STANDARD_METADATA', standardsValidationResult);

// Validate CATEGORIES at config load time
const categoriesValidationResult = validateAllCategories();
handleValidationResult('CATEGORIES', categoriesValidationResult);

// Use process.env to read the variable.
// If the variable is not set, default to '/' (root path).
const BASE_PATH = process.env.VITEPRESS_BASE || '/';
// VitePress does not add the base to `head` tags or social links
const withBase = (url: string) => withBasePath(url, BASE_PATH);
const SRC_DIR = fileURLToPath(new URL('..', import.meta.url));

// Site data for the llms.txt transform, loaded on first use
let llmsContext: LlmsContext | undefined;
// The finished llms files by URL path, for llmsDevPlugin
const llmsFiles = new Map<string, string>();

export default defineConfig({
  title: 'Awesome NAPCORE',
  description: 'European Mobility Data Tools Catalogue',
  // Dynamically set the base path for assets and routing
  base: BASE_PATH,

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: withBase('/favicon.png') }],
    [
      'link',
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: 'Awesome NAPCORE Blog Feed',
        href: withBase('/feed.rss'),
      },
    ],
    [
      'link',
      { rel: 'alternate', type: 'text/markdown', title: 'LLM-friendly documentation', href: withBase('/llms.txt') },
    ],
    [
      'link',
      {
        rel: 'alternate',
        type: 'text/markdown',
        title: 'Complete LLM-friendly documentation',
        href: withBase('/llms-full.txt'),
      },
    ],
    ['meta', { name: 'theme-color', content: '#ffcb01' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Awesome NAPCORE' }],
    ['meta', { property: 'og:description', content: 'Curated tools for European mobility data professionals' }],
  ],
  markdown: {
    config: (md) => {
      md.use(napCoreMarkdownPlugin);
      md.use(collapsePlugin);
      md.use(chapterPlugin);
    },
  },

  /**
   * Transforms page data to set dynamic titles from route parameters.
   * For dynamic routes, uses the title from params to override the page title.
   *
   * @param pageData - VitePress page data object containing route params and metadata
   */
  async transformPageData(pageData) {
    // For dynamic routes with title param, set the page title
    if (pageData.params?.title) {
      pageData.title = pageData.params.title;
    }
    // A dynamic route has no source file of its own (the edit link would point at a missing
    // docs/categories/<slug>.md), and its content comes from data files, so hide the link
    if (pageData.params) {
      pageData.frontmatter.editLink = false;
    }
  },

  // Generate RSS feed at build time
  buildEnd,

  // Ignore dead link check for RSS feed (generated in buildEnd hook)
  ignoreDeadLinks: ['/feed.rss'],

  themeConfig: {
    logo: { light: '/napcore-logo-navy.png', dark: '/napcore-logo-dark.png' },

    outline: {
      level: [2, 3],
      // label: 'On this page', // Optional title text above the outline
    },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Tools', link: '/tools/' },
      { text: 'Contribute', link: '/contribute' },
      { text: 'Blog', link: '/blog' },
      {
        text: 'Help',
        items: [
          { text: 'About', link: '/about' },
          { text: 'Data & AI', link: '/help/ai' },
          { text: 'Keyboard Shortcuts', link: '/help/keyboard-shortcuts' },
        ],
      },
    ],

    sidebar: {
      // '/tools/': getToolsSidebar(),
      '/categories/': { base: '/', items: getCategoriesSidebar() },
      '/tools/': { base: '/', items: getCategoriesSidebar() },
      '/standards/': { base: '/', items: getCategoriesSidebar() },
      // by-napcore lives at the site root (not in the categories taxonomy)
      // but still shows the catalogue sidebar.
      '/by-napcore/': { base: '/', items: getCategoriesSidebar() },
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/napcore-tools/web-awesome_napcore_tools' },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M203.7 512.9s0 0 0 0l-37.8 26.7c-7.3 5.2-16.9 5.8-24.9 1.7S128 529 128 520l0-72-32 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l320 0c53 0 96 43 96 96l0 224c0 53-43 96-96 96l-120.4 0-91.9 64.9zm64.3-104.1c8.1-5.7 17.8-8.8 27.7-8.8L416 400c26.5 0 48-21.5 48-48l0-224c0-26.5-21.5-48-48-48L96 80c-26.5 0-48 21.5-48 48l0 224c0 26.5 21.5 48 48 48l56 0c10.4 0 19.3 6.6 22.6 15.9 .9 2.5 1.4 5.2 1.4 8.1l0 49.7c32.7-23.1 63.3-44.7 91.9-64.9z"/></svg>',
        },
        link: 'https://github.com/napcore-tools/web-awesome_napcore_tools/discussions',
      },
      { icon: 'rss', link: withBase('/feed.rss') },
    ],

    footer: {
      // The official 2021-2027 emblem from the Commission's download centre: the positive
      // version on the yellow light footer, the negative one on the navy dark footer.
      // napcore-theme.css switches between them. VitePress shows the footer only on pages
      // without a sidebar (home, About, Contribute, blog).
      message:
        `<img class="eu-emblem eu-emblem-light" src="${withBase('/eu-co-funded.png')}" width="251" height="56" alt="Co-funded by the European Union">` +
        `<img class="eu-emblem eu-emblem-dark" src="${withBase('/eu-co-funded-dark.png')}" width="251" height="56" alt="Co-funded by the European Union">` +
        '<span class="eu-programme">Connecting Europe Facility</span>',
      copyright:
        'Copyright © 2026 <a href="https://napcore.eu" target="_blank" rel="noopener">NAPCORE</a> - National Access Point Coordination Organisation for Europe',
    },

    search: {
      provider: 'local',
      options: {
        // Dynamic pages (publiccode tools, generated categories and standards) have no
        // Markdown file on disk, so the indexer renders them to empty and can't see their
        // text. splitDynamicPageIntoSections rebuilds their searchable text from the data
        // files; for every other page it returns undefined so VitePress' default splitter runs.
        miniSearch: {
          _splitIntoSections: splitDynamicPageIntoSections,
        },
        // Fold selected frontmatter (standards, categories, tags, description) into the
        // local search index for hand-crafted tool pages, so a tool is findable by its
        // metadata even when those values don't appear in the page body.
        _render(src, env, md) {
          if (env.frontmatter?.search === false) return '';
          const html = md.render(src, env);
          const fm = env.frontmatter;
          if (fm && env.relativePath?.startsWith('tools/')) {
            const meta = [
              ...(Array.isArray(fm.standards) ? fm.standards : []),
              ...(Array.isArray(fm.categories) ? fm.categories : []),
              ...(Array.isArray(fm.tags) ? fm.tags : []),
              typeof fm.description === 'string' ? fm.description : '',
            ].filter(Boolean);
            if (meta.length) return `${html}\n${md.render(meta.join(' '))}`;
          }
          return html;
        },
        translations: {
          button: {
            buttonText: 'Search',
            buttonAriaLabel: 'Search tools',
          },
          modal: {
            noResultsText: 'No results for',
            resetButtonTitle: 'Reset search',
            footer: {
              selectText: 'to select',
              navigateText: 'to navigate',
            },
          },
        },
      },
    },

    editLink: {
      pattern: 'https://github.com/napcore-tools/web-awesome_napcore_tools/edit/main/docs/:path',
      text: 'Suggest changes to this page',
    },
  },

  vite: {
    plugins: [
      // Dev only: the build writes the OKF bundle in buildEnd
      okfDevPlugin(siteUrl),
      llmstxtPlugin({
        // Drafts and scheduled posts, which the blog hides
        // and the /all/ page, which only redirects to /tools/
        ignore: [...hiddenBlogPosts(SRC_DIR), '**/all/index.md'],
        // Turn the plugin's raw page sources into plain Markdown (see core/llms/llmsMarkdown.ts),
        // fix the backslashes path.join produces on Windows ("/\tools\motis.md") and add the base.
        transform: ({ page, pages, vpConfig }) => {
          llmsContext ??= loadLlmsContext(vpConfig?.srcDir ?? SRC_DIR, BASE_PATH);
          const ctx = llmsContext;
          const isPage = (p: { path: string }) => p.path.endsWith('.md');

          if (isPage(page)) {
            page = cleanLlmsPage(page, ctx);
          } else if (page.path === '/llms-full.txt') {
            // Built by the plugin before transform runs, so rebuild it from the cleaned pages
            page.content = pages
              .filter(isPage)
              .map((p) => cleanLlmsPage(p, ctx).content)
              .join('\n\n');
          } else {
            page.content = fixIndexLinks(page.content, ctx.base);
          }
          llmsFiles.set(page.path, page.content);
          return page;
        },
      }),
      // Dev only, after llmstxtPlugin: its own dev middleware does not work on Windows
      llmsDevPlugin(llmsFiles),
    ],
    resolve: {
      preserveSymlinks: true,
      alias: {
        '@': fileURLToPath(new URL('.', import.meta.url)),
      },
    },
  },
});
