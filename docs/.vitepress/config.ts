import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'NAPCORE Tools',
  description: 'Curated tools for European mobility data professionals',
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#0066cc' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'NAPCORE Tools Catalog' }],
    ['meta', { property: 'og:description', content: 'Curated tools for European mobility data professionals' }]
  ],

  themeConfig: {
    logo: 'https://napcore.eu/wp-content/themes/napcore/images/napcore-logo.png',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Browse Tools', link: '/tools/' },
      { text: 'Categories', link: '/categories/' },
      { text: 'Contribute', link: '/contribute' },
      { text: 'About', link: '/about' }
    ],

    sidebar: {
      '/tools/': [
        {
          text: 'By Category',
          items: [
            { text: 'Validators', link: '/categories/validators' },
            { text: 'Converters & Transformers', link: '/categories/converters' },
            { text: 'Version Upgrade Tools', link: '/categories/version-tools' },
            { text: 'SDKs & Libraries', link: '/categories/sdks' },
            { text: 'Reference Implementations', link: '/categories/reference' },
            { text: 'Development Tools', link: '/categories/development' },
            { text: 'Data Quality Tools', link: '/categories/data-quality' },
            { text: 'Testing Utilities', link: '/categories/testing' },
            { text: 'Metadata Tools', link: '/categories/metadata' }
          ]
        },
        {
          text: 'Featured Tools',
          items: [
            { text: 'DATEX II Browser', link: '/tools/datex-browser' },
            { text: 'DATEX II Schema Tool', link: '/tools/datex-schema-tool' },
            { text: 'mobilityDCAT-AP Generator', link: '/tools/mobilitydcat-generator' }
          ]
        }
      ],
      '/categories/': [
        {
          text: 'Tool Categories',
          items: [
            { text: 'Overview', link: '/categories/' },
            { text: 'Validators', link: '/categories/validators' },
            { text: 'Converters & Transformers', link: '/categories/converters' },
            { text: 'Version Upgrade Tools', link: '/categories/version-tools' },
            { text: 'SDKs & Libraries', link: '/categories/sdks' },
            { text: 'Reference Implementations', link: '/categories/reference' },
            { text: 'Development Tools', link: '/categories/development' },
            { text: 'Data Quality Tools', link: '/categories/data-quality' },
            { text: 'Testing Utilities', link: '/categories/testing' },
            { text: 'Metadata Tools', link: '/categories/metadata' }
          ]
        }
      ]
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

    editLink: {
      pattern: 'https://github.com/napcore/napcore-web-store/edit/main/docs/:path',
      text: 'Suggest changes to this page'
    }
  }
})
