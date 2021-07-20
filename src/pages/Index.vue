<template v-slot:search>
  <Layout>
    <ClientOnly>
    <l-map id="map" ref="map" :zoom="zoom" :center="center" :options="{zoomControl: false}">
      <l-tile-layer :url="url"></l-tile-layer>
      <l-marker v-for="edge in $page.allTumuli.edges" :key="edge.node.id" :lat-lng="edge.node.coords" :icon="icon" @click="centerUpdated(edge.node.coords), setImage(edge.node.image)"> 
        <l-tooltip :content="edge.node.title"></l-tooltip>
        <l-popup>
          <h3>{{ edge.node.title }}</h3>
          <div :class="{'no-image':(edge.node.image === 'NA')}">
            <g-image :src="require(`!!assets-loader?width=250&height=250!@images/${image}`)" :alt="edge.node.title" width="500" fit="contain"/>
          </div>
        </l-popup>
      </l-marker>
      <l-control-zoom position="bottomright"></l-control-zoom>
    </l-map>
    <div class='icon-scroll'></div>
    <div class="sidebar">
      <div class="text-wrapper" >
        <div class="text-header">
          <i class="fas fa-search-location"></i>
          <input type="text" name="search" id="search" placeholder="Plaatsnaam..." v-model="search">
        </div>
        <div class="text-body results" v-if="searchResults.length > 0">
          <ul>
            <li class="card" v-for="tumulus in searchResults" :key="tumulus.node.id"  @click="flyToMarker(tumulus.node.coords, tumulus.node.id)">{{tumulus.node.title}} - {{tumulus.node.location}}</li>
          </ul>
        </div>
        <div class="text-body no-results" v-else>
          <p>Geen tumuli gevonden op deze locatie.</p>
        </div>
      </div>
    </div>
    </ClientOnly>
  </Layout>
</template>

<script>
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
      image: 'background.png',
      imageClass: 'no-image',
      search: ''
    };
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
  computed: {
    searchResults() {
      return this.$page.allTumuli.edges.filter(tumulus => {
        return tumulus.node.title.toLowerCase().includes(this.search.toLowerCase().trim())
      })
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
    flyToMarker(coords, id) {
      this.$refs.map.mapObject.flyTo(coords, 15)
    },
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
        location
      }
    }
  }
}
</page-query>