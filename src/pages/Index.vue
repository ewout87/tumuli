<template v-slot:search>
  <Layout>
    <ClientOnly>    
      <l-map id="map" ref="map" :zoom="zoom" :center="center" :bounds="bounds" :options="{zoomControl: false}">
        <l-tile-layer :url="url"></l-tile-layer>
        <l-marker v-for="edge in $page.allTumuli.edges" :key="edge.node.id" :lat-lng="edge.node.coords" :icon="icon" @click="flyToMarker(edge.node.coords), setImage(edge.node.image)"> 
          <l-tooltip :content="edge.node.title"></l-tooltip>
          <l-popup>
            <h3>{{ edge.node.title }}</h3>
            <div :class="{'no-image':(edge.node.image === 'NA')}">
              <g-image :src="require(`!!assets-loader?width=250&height=250!@images/${image}`)" :alt="edge.node.title" fit="contain"/>
            </div>
            
          </l-popup>
        </l-marker>
        <l-control-zoom position="bottomright"></l-control-zoom>
      </l-map>
    </ClientOnly>
  </Layout>
</template>

<script>
import { store, mutations } from '@/store.js'
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
    LPopup:  Vue2Leaflet.LPopup,
    LControlZoom: Vue2Leaflet.LControlZoom,
    latLngBounds: L.latLngBounds
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      icon: null,
      popup: null,
      staticAnchor: [16, 32],
      iconSize: 64,
      tumuli: null,
      image: 'background.png',
      imageClass: 'no-image',
      search: '',
    };
  },
 computed: {
    center() {
      return store.coords
    },
    zoom() {
      return store.zoom
    },
    bounds(){
      return store.bounds
    }
  },
  mounted () {
      if (process.isClient) {
        this.icon =  L.icon({
          iconUrl: require(`@images/icon.png`),
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
      this.center = center
    },
    boundsUpdated (bounds) {
      this.bounds = bounds
    },
    setImage(image) {
        this.image = image
    },
    flyToMarker(coords) {
      this.$refs.map.mapObject.flyTo(coords, 15)
    }
  }
};
</script>

<page-query>
query {
  allTumuli(sortBy: "title", order: ASC) {
    edges {
      node {
        id
        title
        coords
        image
        location
      }
    }
  }
}
</page-query>

<style scoped>
.no-image img {
    filter: blur(10px);
    -webkit-filter: blur(10px);
    -moz-filter: blur(10px);
    -o-filter: blur(10px);
    -ms-filter: blur(10px);
    margin: -10px;
}

.no-image {
    overflow: hidden;
    position: relative;
}

.no-image:after {
    font-family: 'Roboto', sans-serif;
    position: absolute;
    display: block;
    content: 'Geen afbeelding';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    color: #fff;
    text-transform: uppercase;
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: bold;
    text-align: center;
    padding-top: 6rem;
}

#map {
    margin-left: auto;
    position: relative; 
    z-index: 1;
    height: 100vh;
    width: 100%;
}

.leaflet-container {
    font-family: 'Jost', sans-serif;
}
</style>