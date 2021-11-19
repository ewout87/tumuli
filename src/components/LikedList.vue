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
      <form class="address-form">
        <input type="text" placeholder="adres" :address="address">
        <input type="text" placeholder="postcode of plaats" :code="code">
        <button class="button" @click.prevent="getLocation()">Bereken Route</button>
      </form>
      <div class="directions" v-if="routes.length > 0">
        <div :class="{'collapsed': isExpanded !== route.id ? true : false, 'route': true}" v-for="route in routes" :key="route.id">
          <div class="title" @click.prevent="toggle(route.id)">
            <p><strong>{{ route.name }}{{route.id}} </strong></p>
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
      address: '',
      code: '',
      location: []
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
    toggle(routeId) {
      if(this.isExpanded !== routeId) {
        this.isExpanded = routeId
      }
      else {
        this.isExpanded = ''
      }
    },
    async getLocation(){
      this.location = []

      try {
        const data = await axios.get(
          `https://nominatim.openstreetmap.org/search?q=` + this.address + ` ` + this.code + ` Belgie&format=json`
        )
        this.location.push(data.data[0].lat, data.data[0].lon);
      } 
      catch (error) {
        console.log(error)
      }
    }
  }
};
</script>

<style scoped>
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
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

  .liked-list {
    background-color: #fff;
    max-width: 300px;
    position: absolute;
    width: 100%;
    top: 7rem;
    right: 1rem;
    display: block;
    z-index: 99;
    box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, .2);
  }

  .address-form {
    padding: 0 1rem;
    margin: 1rem 0;
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

  .route .title {
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