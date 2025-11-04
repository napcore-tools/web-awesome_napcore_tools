// .vitepress/theme/index.ts
import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import './custom.css';
import StatsBar from './components/StatsBar.vue';
import ToolStats from './components/ToolStats.vue';
import ToolCard from './components/ToolCard.vue';
import ToolsGrid from './components/ToolsGrid.vue';
import CategoryGrid from './components/CategoryGrid.vue';
import StandardsGrid from './components/StandardsGrid.vue';
import QuickInfo from './components/QuickInfo.vue';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // Additional custom layout slots can go here
    });
  },
  enhanceApp({ app, _router, _siteData }) {
    // Register global components
    app.component('StatsBar', StatsBar);
    app.component('ToolStats', ToolStats);
    app.component('ToolCard', ToolCard);
    app.component('ToolsGrid', ToolsGrid);
    app.component('CategoryGrid', CategoryGrid);
    app.component('StandardsGrid', StandardsGrid);
    app.component('QuickInfo', QuickInfo);
  },
} satisfies Theme;
