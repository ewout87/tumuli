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
    <div class='icon-scroll' @click="scrollToBottom()"></div>
    <div class="sidebar">
      <div class="text-wrapper" ref="scrollToMe">
        <div class="text-header">
          <form>
            <input type="text" name="search" id="search" placeholder="Plaatsnaam..." v-model="search"> 
            <button href="" @click="flyToLocation(search)">Zoek</button>
          </form>
        </div>
        <div class="text-body results" v-if="searchResults.length > 0">
          <ul>
            <li class="card" v-for="tumulus in searchResults" :key="tumulus.node.id"  @click="flyToMarker(tumulus.node.coords)">{{tumulus.node.title}} - {{tumulus.node.location}}</li>
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
    LControlZoom: Vue2Leaflet.LControlZoom,
    latLngBounds: L.latLngBounds
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 10,
      center: [50.67198817403728, 5.077813266040513],
      bounds: [
        [50.80667, 3.461389],
        [50.23167, 6.115278]
      ],
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
    flyToMarker(coords) {
      this.$refs.map.mapObject.flyTo(coords, 15)
    },
    async flyToLocation(search){
        event.preventDefault()

      try {
      const data = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=` + search + ` Belgie&format=json`
      )

        // var coords1 = [50.67198817403728, 5.077813266040513] 
       
        //  for(var tumulus in this.$page.allTumuli.edges){
        //     var ids = []
        //     var coords2 = tumulus.node.coords
        //     var d = this.calculateDistance(coords1, coords2)

        //     if(d < 50000){
        //       ids.push(tumulus.node.id)
        //     }
        // }

        // return this.$page.allTumuli.edges.filter(tumulus => {
        //   return tumulus.node.id.includes()
        // })

        var bounds = L.latLngBounds([
          [data.data[0].boundingbox[1], data.data[0].boundingbox[2]],
          [data.data[0].boundingbox[0], data.data[0].boundingbox[3]]
        ])

        this.$refs.map.fitBounds(bounds)
      } 
      catch (error) {
        console.log(error)
      }
    },
    scrollToBottom() {
      const el = this.$refs.scrollToMe;

      if (el) {
        // Use el.scrollIntoView() to instantly scroll to the element
        el.scrollIntoView({behavior: 'smooth'});
      }
    },
    calculateDistance(coords1, coords2){
      const R = 6371e3; // metres
      const φ1 = coords1[1] * Math.PI/180; // φ, λ in radians
      const φ2 = coords2[1] * Math.PI/180;
      const Δφ = (coords2[1]-coords1[1]) * Math.PI/180;
      const Δλ = (coords2[2]-coords2[2]) * Math.PI/180;

      const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

      const d = R * c; // in metres

      return d
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