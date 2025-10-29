import { defineConfig } from 'vitepress'
import { _getToolsSidebar, getCategoriesSidebar } from './sidebar'

export default defineConfig({
  title: 'NAPCORE Store',
  description: 'Curated catalog of European mobility data-related tools',
  
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['meta', { name: 'theme-color', content: '#0066cc' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'NAPCORE Store' }],
    ['meta', { property: 'og:description', content: 'Curated tools for European mobility data professionals' }]
  ],

  themeConfig: {
    logo: 'https://napcore.eu/wp-content/themes/napcore/images/napcore-logo.png',
    
    nav: [
      { text: 'Home', link: '/' },
//      { text: 'Browse Tools', link: '/tools/' },
      { text: 'Tools', link: '/categories/' },
      { text: 'Contribute', link: '/contribute' },
      { text: 'Status (WIP)', link: '/about' },
    ],

    sidebar: {
      // '/tools/': getToolsSidebar(),
      '/categories/': {base: '/', items: getCategoriesSidebar()},
      '/tools/': {base: '/', items: getCategoriesSidebar()},
      '/standards/': {base: '/', items: getCategoriesSidebar()},
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/napcore' }
    ],

    footer: {
      message: 'Co-financed by the Connecting Europe Facility of the European Union',
      copyright: 'Copyright © 2025 NAPCORE - National Access Point Coordination Organisation for Europe'
    },

    search: {
      provider: 'local',
      options: {
        placeholder: 'Search tools...',
        translations: {
          button: {
            buttonText: 'Search',
            buttonAriaLabel: 'Search tools'
          },
          modal: {
            noResultsText: 'No results for',
            resetButtonTitle: 'Reset search',
            footer: {
              selectText: 'to select',
              navigateText: 'to navigate'
            }
          }
        }
      }
    },

    // editLink: {
    //   pattern: 'https://github.com/napcore/napcore-web-store/edit/main/docs/:path',
    //   text: 'Suggest changes to this page'
    // }
  }
})
