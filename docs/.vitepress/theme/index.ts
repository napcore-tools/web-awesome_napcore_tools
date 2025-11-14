// .vitepress/theme/index.ts
import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import './custom.css';
import './blog.css';
import './markdown-sections.css';
import StatsBar from './components/index/StatsBar.vue';
import ToolStats from './components/tools/ToolStats.vue';
import ToolCard from './components/tools/ToolCard.vue';
import ToolsGrid from './components/tools/ToolsGrid.vue';
import ToolsFilter from './components/tools/ToolsFilter.vue';
import CategoryGrid from './components/categories/CategoryGrid.vue';
import StandardsGrid from './components/standards/StandardsGrid.vue';
import QuickInfo from './components/tools/ToolQuickInfo.vue';
import ToolMetadata from './components/tools/ToolMetadata.vue';
import RelatedCategories from './components/categories/RelatedCategories.vue';
import BlogCard from './components/blog/BlogCard.vue';
import BlogGrid from './components/blog/BlogGrid.vue';
import BlogPostMeta from './components/blog/BlogPostMeta.vue';
import BlogTagFilter from './components/blog/BlogTagFilter.vue';
import BlogPreviewBanner from './components/blog/BlogPreviewBanner.vue';
import { initializeDetailsNavigation } from '../core/utils';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // Additional custom layout slots can go here
    });
  },
  /**
   * Enhances the VitePress app by registering global Vue components.
   * Makes all custom components available throughout the documentation site.
   *
   * @param app - Vue app instance
   * @param _router - VitePress router instance (unused)
   * @param _siteData - Site data object (unused)
   */
  enhanceApp({ app, _router, _siteData }) {
    // Register global components
    app.component('StatsBar', StatsBar);
    app.component('ToolStats', ToolStats);
    app.component('ToolCard', ToolCard);
    app.component('ToolsGrid', ToolsGrid);
    app.component('ToolsFilter', ToolsFilter);
    app.component('CategoryGrid', CategoryGrid);
    app.component('StandardsGrid', StandardsGrid);
    app.component('QuickInfo', QuickInfo);
    app.component('ToolMetadata', ToolMetadata);
    app.component('RelatedCategories', RelatedCategories);
    app.component('BlogCard', BlogCard);
    app.component('BlogGrid', BlogGrid);
    app.component('BlogPostMeta', BlogPostMeta);
    app.component('BlogTagFilter', BlogTagFilter);
    app.component('BlogPreviewBanner', BlogPreviewBanner);

    // Initialize details navigation (client-side only)
    if (typeof window !== 'undefined') {
      initializeDetailsNavigation();
    }
  },
} satisfies Theme;
