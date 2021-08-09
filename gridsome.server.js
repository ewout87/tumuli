// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const fs = require('fs')
const yaml = require('js-yaml')
const axios = require('axios')

const fileContents = fs.readFileSync('./src/data/tumuli.yaml', 'utf8')
const viaData = require('./src/data/viaBelgica.json');
const tumuliData = yaml.load(fileContents)

module.exports = function (api) {
  api.loadSource(({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })

  api.loadSource(async actions => {
    const tumuli = actions.addCollection({
      typeName: 'Tumuli'
    })

    for (const tumulus of tumuliData.data) {
      var latlng = tumulus[7].split(',')

      if(latlng.length > 1){
        var coords = []
  
        for (var dms of latlng) {
          var dms = dms.split(/°|'|"/)
          var degrees = parseFloat(dms[0])
          var minutes = parseFloat(dms[1]/60)
          var seconds = parseFloat(dms[2]/3600)
          var dd = parseFloat(degrees + minutes + seconds)
          coords.push(dd)
        }

        tumuli.addNode({
          id: tumulus[0],
          title: tumulus[4],
          image: tumulus[9],
          coords: coords,
          location: tumulus[5],
          province: tumulus[6]
        })
      }
    }
  })
}
