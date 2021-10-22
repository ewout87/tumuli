// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Bezoek onze tumuli',
  siteDescription: 'De oudste monumenten van België.',
  siteUrl: process.env.DEPLOY_URL || 'https://tumuli.netlify.app',
  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link'
    }
  },
  plugins: [
    {
      use: 'klaro-gridsome',
      options: {
        privacyPolicy: '/privacy-policy/',
        cookieName: 'consent',
        translations: {
          en: {
            consentModal: {
              description: 'Here you can see and customize the information that we collect about you.',
            },
            googleAnalytics: {
              description: 'Website analytics powered by Google Analytics, allowing us to see how visitors use our website.'
            },
            purposes: {
              analytics: 'Analytics'
            },
          },
        },
        apps: [
          {
            name: 'googleAnalytics',
            default: true,
            title: 'Google Analytics',
            purposes: ['analytics'],
            cookies: [
              '_ga',
              '_gcl_au',
              '_gid',
              '_gat'
            ],
            required: false,
            optOut: true,
            onlyOnce: false
          }
        ]
      }
    },
    {
      use: 'gridsome-plugin-gtm',
      options: {
        id: 'GTM-58JWGK9',
        enabled: true,
        debug: true
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'posts/**/*.md',
        typeName: 'Post'
      }
    },
    {
      use: `gridsome-plugin-netlify-cms`,
      options: {
        publicPath: `/admin`
      }
    },
  ],
  chainWebpack: config => {
    config.resolve.alias.set('@images', '@/assets/images')
  },
}
