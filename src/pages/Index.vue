<template v-slot:search>
  <Layout>
    <ClientOnly>    
      <l-map id="map" ref="map" :zoom="zoom" :center="center" :bounds="bounds" :options="{zoomControl: false}">
        <l-tile-layer :url="url"></l-tile-layer>
        <l-marker-cluster>
          <l-marker v-for="marker in markers" :key="marker.node.title" :lat-lng="marker.node.coordinates" :icon="icon" @click="flyToMarker(marker.node.coordinates), setTumulus(marker.node)"> 
            <l-tooltip :content="marker.node.title"></l-tooltip>
          </l-marker>
        </l-marker-cluster>
        <l-control-zoom position="bottomright"></l-control-zoom>
        <l-polyline v-for="polyline in polylines" :key="polyline" :lat-lngs="polyline" :color="color"></l-polyline>
        <l-polyline v-for="route in routes" :key="route.name" :lat-lngs="route.coordinates"></l-polyline>
      </l-map>
      <Tumulus/>
      <LikedList/>
    </ClientOnly>
  </Layout>
</template>

<script>
import Tumulus from '~/components/Tumulus.vue'
import { store, mutations } from '@/store.js'
import polylines from '@/data/polylines.json'
import LikedList from '~/components/LikedList.vue'
let L = {}
let Vue2Leaflet = {}
let Vue2LeafletMarkerCluster = {}
if (process.isClient) {
  L = require("leaflet")
  Vue2Leaflet = require("vue2-leaflet")
  Vue2LeafletMarkerCluster = require("vue2-leaflet-markercluster")
}
export default {
  name: 'MyAwesomeMap',
  components: {
    LMap: Vue2Leaflet.LMap,
    LTileLayer: Vue2Leaflet.LTileLayer,
    LMarker: Vue2Leaflet.LMarker,
    LTooltip: Vue2Leaflet.LTooltip,
    LIcon: Vue2Leaflet.LIcon,
    LPolyline: Vue2Leaflet.LPolyline,
    LControlZoom: Vue2Leaflet.LControlZoom,
    latLngBounds: L.latLngBounds,
    LMarkerCluster: Vue2LeafletMarkerCluster,
    Tumulus,
    LikedList
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      icon: null,
      popup: null,
      staticAnchor: [16, 32],
      iconSize: 64,
      color: 'green',
      polylines,
      search: '',
      markers: [],
      tumulus: '',
      selected: false
    };
  },
 computed: {
    center() {
      return store.coords
    },
    zoom() {
      return store.zoom
    },
    bounds() {
      return store.bounds
    },
    routes() {
      return store.routes
    }
  },
  async mounted () {
    if (process.isClient) {
      this.icon =  L.icon({
        iconUrl: require(`@images/icon.png`),
        iconSize: [32, 32],
        iconAnchor: [16, 32]
      });
    }
    const tumuli = this.$page.tumuli.edges
    tumuli.forEach(function getCoords(tumulus) {
      var data = JSON.parse(tumulus.node.coords)
      tumulus.node.coordinates = data.coordinates.reverse()
    })
    this.markers = tumuli
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
    setTumulus(tumulus) {
      mutations.showTumulus()
      mutations.updateTumulus(tumulus)
    },
    flyToMarker(coords) {
      this.$refs.map.mapObject.flyTo(coords, 15)
    },
  }
};
</script>

<page-query>
query {
  tumuli: allTumuli {
    edges {
      node {
        id
        title
        coords
        location
        province
        image
        age
        height
        number
        converted
        accessibility
      }
    }
  }
}
</page-query>

<style scoped>
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

.hide {
    visibility: hidden !important;
}
</style>