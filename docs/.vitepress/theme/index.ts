// .vitepress/theme/index.ts
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // Additional custom layout slots can go here
    })
  },
  enhanceApp({ app, router, siteData }) {
    // App-level enhancements can go here
  }
} satisfies Theme
