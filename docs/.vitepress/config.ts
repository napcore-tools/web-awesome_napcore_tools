import { defineConfig } from 'vitepress';
import { _getToolsSidebar, getCategoriesSidebar } from './core/config/sidebar';
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

export default defineConfig({
  title: 'NAPCORE Store',
  description: 'Curated catalog of European mobility data-related tools',

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['meta', { name: 'theme-color', content: '#0066cc' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'NAPCORE Store' }],
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
      { text: 'Status (WIP)', link: '/about' },
    ],

    sidebar: {
      // '/tools/': getToolsSidebar(),
      '/categories/': { base: '/', items: getCategoriesSidebar() },
      '/tools/': { base: '/', items: getCategoriesSidebar() },
      '/standards/': { base: '/', items: getCategoriesSidebar() },
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/napcore' }],

    footer: {
      message: 'Co-financed by the Connecting Europe Facility of the European Union',
      copyright: 'Copyright © 2025 NAPCORE - National Access Point Coordination Organisation for Europe',
    },

    search: {
      provider: 'local',
      options: {
        placeholder: 'Search tools...',
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

    // editLink: {
    //   pattern: 'https://github.com/napcore/napcore-store/edit/main/docs/:path',
    //   text: 'Suggest changes to this page'
    // }
  },

  vite: {
    plugins: [llmstxtPlugin()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('.', import.meta.url)),
      },
    },
  },
});
