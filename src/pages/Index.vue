<template>
  <Layout>
    <ClientOnly>
    <l-map id="map" :zoom="zoom" :center="center" :options="{zoomControl: false}">
      <l-tile-layer :url="url"></l-tile-layer>
      <l-marker v-for="tumulus in tumuli" :key="tumulus.id" :lat-lng="tumulus.coords" :icon="icon" @click="onClick"> 
        <l-tooltip :content="tumulus.title"></l-tooltip>
      </l-marker>
      <l-control-zoom position="bottomright"  ></l-control-zoom>
    </l-map>
    <div class="card" v-bind:style="{ background: backgroundImage}"></div>
    </ClientOnly>
  </Layout>
</template>

<script>
// import L from 'leaflet';
// import { LMap, LTileLayer, LMarker, LIcon, LTooltip} from 'vue2-leaflet';
import data from '@/data/tumuli.json'
import axios from 'axios'
let L = {}
let Vue2Leaflet = {}

if (process.isClient) {
  L = require("leaflet");
  Vue2Leaflet = require("vue2-leaflet");
}

export default {
  name: 'MyAwesomeMap',
  components: {
    LMap: Vue2Leaflet.LMap,
    LTileLayer: Vue2Leaflet.LTileLayer,
    LMarker: Vue2Leaflet.LMarker,
    LTooltip: Vue2Leaflet.LTooltip,
    LIcon: Vue2Leaflet.LIcon,
    LControlZoom: Vue2Leaflet.LControlZoom
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 11,
      center: [50.67198817403728, 5.077813266040513],
      bounds: null,
      icon: null,
      staticAnchor: [16, 32],
      iconSize: 64,
      tumuli: null,
      backgroundImage: 'url("https://www.visitlimburg.be/sites/default/files/public/import/Verborgen%20moois%20Gallo-Romeinse%20tumuli_4836_1.jpg") center center'
    };
  },
  async mounted () {
      const results = data[0]
      var id = 0
      var tumuli = []

      for (const result of results.data) {
        var latln = result[6].split(',')

        if(latln.length > 1){
          var coords = []

          for (var dms of latln) {
            var dms = dms.split(/°|'|"/)
            var degrees = parseFloat(dms[0])
            var minutes = parseFloat(dms[1]/60)
            var seconds = parseFloat(dms[2]/3600)
            var dd = parseFloat(degrees + minutes + seconds)
            coords.push(dd)
          }
          
          var tumulus = {
            id: ++id,
            title: result[4],
            coords: coords,
          }

          tumuli.push(tumulus)
        }
      }

      this.tumuli = tumuli
      
      if (process.isClient) {
        this.icon =  L.icon({
          iconUrl: 'https://image.flaticon.com/icons/png/128/595/595601.png',
          iconSize: [32, 32],
          iconAnchor: [16, 32]
        });
      }
  },
  methods: {
    zoomUpdated (zoom) {
      this.zoom = zoom;
    },
    centerUpdated (center) {
      this.center = center;
    },
    boundsUpdated (bounds) {
      this.bounds = bounds;
    },
    async onClick () {
      try {
      const {data} = await axios.get(
        'http://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=India&format=json' + '&origin=*'
      )

      var pages = data
      console.log(pages)

        for(var page of pages){
          page.original.source
          this.backgroundImage = 'url("'+ page.original.source +'") center center'
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
};
</script>

<page-query>
query {
  allTumuli {
    edges {
      node {
        id
        title
        coords
      }
    }
  }
}
</page-query>