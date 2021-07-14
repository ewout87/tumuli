<template>
  <Layout>
    <l-map style="height: 100vh; width: 100vw" :zoom="zoom" :center="center">
    <l-tile-layer :url="url"></l-tile-layer>
    </l-map>
    <div>
      <div v-for="edge in $page.allTumuli.edges" :key="edge.node.title">
        <h1 v-html="edge.node.title" />
        <div v-html="edge.node.id"></div>
      </div>
    </div>

  </Layout>
</template>

<script>
import L from 'leaflet';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';

export default {
  name: 'MyAwesomeMap',
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 10,
      center: [50.71575438472916, 4.610677249749641],
      bounds: null
    };
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
      }
    }
  }
}
</page-query>