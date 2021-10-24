// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const fs = require('fs')
const yaml = require('js-yaml')

const fileContents = fs.readFileSync('./src/data/tumuli.yaml', 'utf8')
//const tumuliData = yaml.load(fileContents)

module.exports = function (api) {
  api.loadSource(({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })

  api.loadSource(async actions => {
  })

  api.loadSource(({ addSchemaResolvers }) => {
    addSchemaResolvers({
      Tumuli: {
        coordinates: {
          type: 'String',
          resolve(obj) {
            var data = JSON.parse(obj.coords).coordinates
            return JSON.stringify(data)
          }
        }
      }
    })
  })
}
