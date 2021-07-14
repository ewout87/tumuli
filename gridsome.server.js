// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require('axios')


module.exports = function (api) {
  api.loadSource(({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })

  api.loadSource(async actions => {
    const { data } = await axios.get(`https://www.wikitable2json.com/api/Gallo-Romeinse_tumuli_in_Belgi%C3%AB?lang=nl`)
    
    const collection = actions.addCollection({
      typeName: 'Tumuli'
    })
    
    const tumuli = data[0]

    var id = 0

      for (const tumulus of tumuli.data) {
        collection.addNode({
          id: ++id,
          title: tumulus[4]
        })
    }
  })
}
