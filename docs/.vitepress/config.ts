import { defineConfig } from 'vitepress';
import { getCategoriesSidebar } from './core/config/sidebar';
import { napCoreMarkdownPlugin } from './plugins/napCoreMarkdownPlugin';
import { collapsePlugin } from './plugins/collapsePlugin';
import { chapterPlugin } from './plugins/chapterPlugin';
import { validateAllStandards } from './core/validation/standards';
import { validateAllCategories } from './core/validation/categories';
import { handleValidationResult } from './core/validation/utils';
import { buildEnd } from './buildEnd';
import llmstxtPlugin from 'vitepress-plugin-llmstxt';
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

export default defineConfig({
  title: 'Awesome NAPCORE Tools [PoC]',
  description: 'Curated catalog of European mobility data-related tools',
  // Dynamically set the base path for assets and routing
  base: BASE_PATH,

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    [
      'link',
      { rel: 'alternate', type: 'application/rss+xml', title: 'Awesome NAPCORE Tools Blog Feed', href: '/feed.rss' },
    ],
    ['link', { rel: 'alternate', type: 'text/markdown', title: 'LLM-friendly documentation', href: '/llms.txt' }],
    [
      'link',
      { rel: 'alternate', type: 'text/markdown', title: 'Complete LLM-friendly documentation', href: '/llms-full.txt' },
    ],
    ['meta', { name: 'theme-color', content: '#0066cc' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Awesome NAPCORE Tools' }],
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
  },

  // Generate RSS feed at build time
  buildEnd,

  // Ignore dead link check for RSS feed (generated in buildEnd hook)
  ignoreDeadLinks: ['/feed.rss'],

  themeConfig: {
    logo: 'https://napcore.eu/wp-content/themes/napcore/images/napcore-logo.png',

    outline: {
      level: [2, 3],
      // label: 'On this page', // Optional title text above the outline
    },

    nav: [
      { text: 'Home', link: '/' },
      //      { text: 'Browse Tools', link: '/tools/' },
      { text: 'Tools', link: '/categories/' },
      { text: 'Contribute', link: '/contribute' },
      { text: 'Blog', link: '/blog' },
      { text: 'About', link: '/about' },
    ],

    sidebar: {
      // '/tools/': getToolsSidebar(),
      '/categories/': { base: '/', items: getCategoriesSidebar() },
      '/tools/': { base: '/', items: getCategoriesSidebar() },
      '/standards/': { base: '/', items: getCategoriesSidebar() },
      '/all/': { base: '/', items: getCategoriesSidebar() },
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/napcore-tools/web-awesome_napcore_tools' },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M203.7 512.9s0 0 0 0l-37.8 26.7c-7.3 5.2-16.9 5.8-24.9 1.7S128 529 128 520l0-72-32 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l320 0c53 0 96 43 96 96l0 224c0 53-43 96-96 96l-120.4 0-91.9 64.9zm64.3-104.1c8.1-5.7 17.8-8.8 27.7-8.8L416 400c26.5 0 48-21.5 48-48l0-224c0-26.5-21.5-48-48-48L96 80c-26.5 0-48 21.5-48 48l0 224c0 26.5 21.5 48 48 48l56 0c10.4 0 19.3 6.6 22.6 15.9 .9 2.5 1.4 5.2 1.4 8.1l0 49.7c32.7-23.1 63.3-44.7 91.9-64.9z"/></svg>',
        },
        link: 'https://github.com/napcore-tools/web-awesome_napcore_tools/discussions',
      },
      { icon: 'rss', link: '/feed.rss' },
    ],

    footer: {
      message: 'Co-financed by the Connecting Europe Facility of the European Union',
      copyright: 'Copyright © 2025 NAPCORE - National Access Point Coordination Organisation for Europe',
    },

    search: {
      provider: 'local',
      options: {
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
    plugins: [llmstxtPlugin()],
    resolve: {
      preserveSymlinks: true,
      alias: {
        '@': fileURLToPath(new URL('.', import.meta.url)),
      },
    },
  },
});
