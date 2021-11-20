<template>
    <div class="routes">
        <div class="buttons" v-if="likedTumuli.length > 1">
        <button type="button" :class="{'active': isActive === 'cycling-regular' ? true : false, 'button': true, 'directions-button': true}" @click="getDirections(likedTumuli, 'cycling-regular')">
          <app-icon class="liked" icon="bicycle" size="lg"></app-icon>
        </button>
        <button type="button" :class="{'active': isActive === 'driving-car' ? true : false, 'button': true, 'directions-button': true}" @click="getDirections(likedTumuli, 'driving-car')">
          <app-icon class="liked" icon="car" size="lg"></app-icon>
        </button>
      </div>
      <div class="directions" v-if="routes.length > 0">
        <div :class="{'collapsed': isExpanded !== route.id ? true : false, 'route': true}" v-for="route in routes" :key="route.id">
          <div class="title" @click.prevent="toggleRoute(route.id)">
            <p><strong>{{ route.name }} </strong></p>
          </div>
          <div class="body">
            <p><label>Afstand:</label> {{ route.distance }}</p>
            <p><label>Reistijd:</label> {{ route.duration }}</p>
            <label>Routebeschrijving:</label>
            <ul class="steps">
              <li class="step" v-for="step in route.steps" :key="step.id">
                <p>{{ step.instruction }}</p>
              </li>
            </ul>
          </div>
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
      isActive: 'driving-car',
      isExpanded: '',
      bounds: [],
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
    }
  },
  methods: { 
    getDirections(likedTumuli, transportMode) {
      this.isActive = transportMode
      this.routes = []
      this.bounds = []
      for( var i = 0; i < likedTumuli.length; i++){ 
        if(i >= 1){
          this.getRoute(likedTumuli[i-1], likedTumuli[i], transportMode, i)
        }
        this.bounds.push(likedTumuli[i][0].node.coordinates)
      }
      mutations.updateBounds(this.bounds)
      mutations.updateRoutes(this.routes)
      mutations.hideTumulus()
    },
    calculateHours(time) {
      var hours = Math.floor(time / 3600);
      time = time - hours * 3600;
      var minutes = Math.floor(time / 60);
      return hours ? hours + ' uur ' + minutes + ' minuten': minutes + ' minuten'
    },
    calculateKm(distance) {
      var km =  Math.round(distance/1000) + ' km'
      return km ? km : 'minder dan 1km'
    },
    async getRoute(tumulus1, tumulus2, transportMode, id) {
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
        route.id = id;
        route.name = 'Van ' + tumulus1[0].node.title + ' naar ' + tumulus2[0].node.title
        route.steps = data.data.features[0].properties.segments[0].steps
        route.distance = this.calculateKm(data.data.features[0].properties.segments[0].distance)
        route.duration = this.calculateHours(data.data.features[0].properties.segments[0].duration)
        this.routes.push(route)
      } 
      catch (error) {
        console.log(error)
      }
    },
    toggleRoute(routeId) {
      if(this.isExpanded !== routeId) {
        this.isExpanded = routeId
      }
      else {
        this.isExpanded = ''
      }
    }
  }
};
</script>

<style scoped>
  label {
    font-weight: bold;
  }

  .route .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    transition: all 0.5s ease;
    -webkit-transition: all 0.5s ease-out;
    -moz-transition: all 0.5s ease-out;
    -o-transition: all 0.5s ease-out;
    border-bottom: 1px solid transparent;
  }

  .route .title:hover {
    background: rgba(0, 0, 255, 0.1)
  }

  .route .steps {
    padding-left: 1rem;
    padding-bottom: 1rem;
    margin-top: 0;
    margin-bottom: 0;
  }

  .route .body{
    transition: max-height 1s ease-in-out;
    max-height: 50vh;
    padding: 0 1rem;
    overflow-y: scroll;
    background: rgba(0, 0, 255, 0.1)
  } 
  
  .collapsed .body {
    max-height: 0;
    overflow: hidden;
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
  
  .route .title:hover {
    cursor: pointer;
  }

  .route .title::after {
    content: '-';
    padding-left: 1rem;
  }

  .route.collapsed .title::after {
    content: '+';
  }
</style>