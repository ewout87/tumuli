<template>   
    <div class="liked-list" v-if="isLikesOpen">
      <button type="button" class="button close-button" @click="toggle()">
        <app-icon class="close-icon" icon="times" size="lg"></app-icon>
      </button>
      <ul class="results">
        <li class="result-item" v-for="likedTumulus in likedTumuli" :key="likedTumulus[0].node.title">
          <div class="title">
            <div>
              <h3>{{ likedTumulus[0].node.title }}</h3>
              <p>{{likedTumulus[0].node.location}} - {{likedTumulus[0].node.province}}</p>
            </div>
            <button type="button" class="button" @click.prevent="unlike(likedTumulus[0].node.title)">
              <app-icon class="liked" icon="heart" size="lg"></app-icon>
            </button>
          </div>
        </li>
      </ul>
      <div class="buttons" v-if="likedTumuli.length > 1">
        <button type="button" :class="{'active': isActive === 'cycling-regular' ? true : false, 'button': true, 'directions-button': true}" @click="getDirections(likedTumuli, 'cycling-regular')">
          <app-icon class="liked" icon="bicycle" size="lg"></app-icon>
        </button>
        <button type="button" :class="{'active': isActive === 'driving-car' ? true : false, 'button': true, 'directions-button': true}" @click="getDirections(likedTumuli, 'driving-car')">
          <app-icon class="liked" icon="car" size="lg"></app-icon>
        </button>
      </div>
      <div class="directions" v-if="routes.length > 0">
        <div class="route" v-for="route in routes" :key="route.id">
          <p><strong>{{ route.name }}</strong></p>
          <p><label>Afstand:</label> {{route.distance}}</p>
          <p><label>Reistijd:</label> {{route.duration}}</p>
          <label>Routebeschrijving:</label>
          <ul class="steps">
            <li class="step" v-for="step in route.steps" :key="step.id">
              <p>{{ step.instruction }}</p>
            </li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import { store, mutations } from '@/store.js'

export default {
  data() {
    return {
      routes: [],
      isActive: '',
      bounds: []
    }
  },
  computed: {
    likedTumuli() {
      var likedTumuli = []
      for( var i = 0; i < store.likedTumulus.length; i++){ 
        likedTumuli.push(this.$page.tumuli.edges.filter(tumulus => {
          return tumulus.node.title.includes(store.likedTumulus[i])}
        ))
      }
      return likedTumuli
    },
    isLikesOpen() {
      return store.isLikesOpen
    }
  },
  methods: { 
    toggle() {
       mutations.toggleLikes()
    },
    unlike(tumulus){
      this.routes = [] 
      mutations.unlikeTumulus(tumulus)
      mutations.updateRoutes(this.routes)
    },
    closeSidebarPanel: mutations.toggleSidebar,
    getDirections(likedTumuli, transportMode) {
      this.routes = []
      for( var i = 1; i < likedTumuli.length; i++){ 
        this.getRoute(likedTumuli[i-1], likedTumuli[i], transportMode)
      }
      this.isActive = transportMode
      this.getBounds(this.routes)
      mutations.updateRoutes(this.routes)
      mutations.updateBounds(this.bounds)
      mutations.hideTumulus()
    },
    getBounds(routes) {
      this.bounds = []
      var boundW = []
      var boundS = []
      var boundE = []
      var boundN = []
      for( var i = 0; i < routes.length; i++){ 
        boundN.push(routes[i].bbox[3])
        boundW.push(routes[i].bbox[0])
        boundS.push(routes[i].bbox[1])
        boundE.push(routes[i].bbox[2])
      }
      this.bounds.push([Math.max(boundN), Math.min(boundW)], [Math.min(boundS), Math.max(boundE)])
    },
    async getRoute(tumulus1, tumulus2, transportMode) {
      var apiKey = '5b3ce3597851110001cf62489c7a7fecfb1349e088723b72860ea119'
      var pointA = JSON.parse(tumulus1[0].node.coords)
      var coordsA = pointA.coordinates.toString()
      var pointB = JSON.parse(tumulus2[0].node.coords)
      var coordsB = pointB.coordinates.toString()
      var route = {}
      try {
        const data = await axios.get(
          `https://api.openrouteservice.org/v2/directions/` + transportMode + `?api_key=` + apiKey + `&start=` + coordsA + `&end=` + coordsB
        )
        route.coordinates = data.data.features[0].geometry.coordinates.map(function reverse(element) {
          return element.reverse()
        })
        var name = 'Van ' + tumulus1[0].node.title + ' naar ' + tumulus2[0].node.title
        var distance = data.data.features[0].properties.segments[0].distance
        var km = Math.round(distance/1000) + ' km'
        var time = data.data.features[0].properties.segments[0].duration
        var hours = Math.floor(time / 3600);
        time = time - hours * 3600;
        var minutes = Math.floor(time / 60);
        route.name = name
        route.steps = data.data.features[0].properties.segments[0].steps
        route.distance = km ? km : 'minder dan 1km'
        route.duration = hours ? hours + ' uur ' + minutes + ' minuten': minutes + ' minuten'
        route.bbox = data.data.bbox
        this.routes.push(route)
      } 
      catch (error) {
        console.log(error)
      }
    }
  }
};
</script>

<style scoped>
  .result-item .title {
    display: flex;
    justify-content: space-between;
  }

  .result-item .liked {
    color: pink;
  }

  label {
    font-weight: bold;
  }

  .liked-list .buttons {
    display: flex;
    border-bottom: 2px solid #add19e;
  }

  .liked-list .directions-button {
    color: #add19e;
    width: 100%;
    margin: 0 1rem;
  }

  .liked-list .directions-button.active,
  .liked-list .directions-button:hover {
    color: #fff;
    background-color: #add19e;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }

  .liked-list .close-button {
    width: 100%;
    text-align: right;
    padding-top: 1rem;
    padding-right: 1rem;
  }

  .liked-list .directions {
    padding: 0 2rem;
    overflow-y: scroll;
    height: 50vh;
  }

  .liked-list {
    background-color: #fff;
    max-width: 300px;
    position: absolute;
    width: 100%;
    top: 7rem;
    right: 1rem;
    display: block;
    z-index: 1;
    box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, .2);
  }

  .results {
    padding-left: 0;
  }

  .result-item {
    list-style-type: none;
    padding: 1rem 0;
    position: relative;
    border-bottom: 1px solid transparent;
    padding: 1rem 2rem;
  }

  .result-item p {
    letter-spacing: 2px;
  }


  .result-item p,
  .result-item h3 {
    margin: 0;
  }
</style>