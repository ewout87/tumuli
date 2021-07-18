// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Gallo-Romeinse tumuli',
  plugins: [],
  chainWebpack: config => {
    config.resolve.alias.set('@images', '@/assets/images')
  },
}
