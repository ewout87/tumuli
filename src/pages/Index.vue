<template>
  <Layout>
    <ClientOnly>
    <l-map id="map" :zoom="zoom" :center="center" :options="{zoomControl: false}">
      <l-tile-layer :url="url"></l-tile-layer>
      <l-marker v-for="edge in $page.allTumuli.edges" :key="edge.node.id" :lat-lng="edge.node.coords" :icon="icon" @click="centerUpdated(edge.node.coords), setImage(edge.node.image)"> 
        <l-tooltip :content="edge.node.title"></l-tooltip>
        <l-popup html="tumulus.image">
          <h3>{{ edge.node.title }}</h3>
          <g-image :src="require(`!!assets-loader?width=250&height=250!@images/${imageUrl}`)" :alt="edge.node.title" width="500" fit="contain"/></l-popup>
      </l-marker>
      <l-control-zoom position="bottomright"></l-control-zoom>
    </l-map>
    <div class="card" v-bind:style="{ 'background-image': backgroundImage, 'background-position': 'center center', 'transition': 'background-image 0.2s ease-in-out'}">
      <div class="text-wrapper"></div>
    </div>
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
    LPopup:  Vue2Leaflet.LPopup,
    LControlZoom: Vue2Leaflet.LControlZoom
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 11,
      center: [50.67198817403728, 5.077813266040513],
      bounds: null,
      icon: null,
      popup: null,
      staticAnchor: [16, 32],
      iconSize: 64,
      tumuli: null,
      pages: null,
      imageUrl: 'no-image-available.png',
      backgroundImage: 'url("https://www.visitlimburg.be/sites/default/files/public/import/Verborgen%20moois%20Gallo-Romeinse%20tumuli_4836_1.jpg")'
    };
  },
  async mounted () {
      if (process.isClient) {
        this.icon =  L.icon({
          iconUrl: 'https://image.flaticon.com/icons/png/128/595/595601.png',
          iconSize: [32, 32],
          iconAnchor: [16, 32]
        });

        this.popup = L.popup({
          maxWidth: 560
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
      this.imageUrl = image
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
        image
      }
    }
  }
}
</page-query>