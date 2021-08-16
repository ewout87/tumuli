// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Bezoek onze tumuli',
  siteDescription: 'De oudste monumenten van België.',
  siteUrl: process.env.DEPLOY_URL || 'https://tumuli.netlify.app',
  plugins: [],
  chainWebpack: config => {
    config.resolve.alias.set('@images', '@/assets/images')
  },
}
