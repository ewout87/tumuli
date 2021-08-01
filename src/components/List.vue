<template>   
    <div class="sidebar">
      <div class="text-wrapper" ref="scrollToMe">
        <div class="text-header">
          <form>
            <input type="text" name="search" id="search" placeholder="Plaatsnaam..." v-model="search"> 
            <button class="button" href="" @click.prevent="boundsUpdate(search)"><i class="fas fa-search-location"></i></button>
          </form>
        </div>
        <div class="text-body results" v-if="searchResults.length > 0">
            <div class="card" v-for="tumulus in searchResults" :key="tumulus.node.id"  @click="centerUpdate(tumulus.node.coords)">
              <h3>{{tumulus.node.title}}</h3>
              <p>{{tumulus.node.location}} - {{tumulus.node.province}}</p>
            </div>
        </div>
        <div class="text-body no-results" v-else>
          <div class="card">  
             <p>Geen tumuli gevonden op deze locatie.</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import { store, mutations } from '@/store.js'

export default {
  data () {
    return {
      search: '',
    };
  },
  computed: {
    searchResults() {
      return this.$page.allTumuli.edges.filter(tumulus => {
        if(tumulus.node.title.toLowerCase().includes(this.search.toLowerCase().trim())) {
           return tumulus.node.title.toLowerCase().includes(this.search.toLowerCase().trim())
        }
        else if(tumulus.node.location.toLowerCase().includes(this.search.toLowerCase().trim())) {
          return tumulus.node.location.toLowerCase().includes(this.search.toLowerCase().trim())
        }
        else {
          return tumulus.node.province.toLowerCase().includes(this.search.toLowerCase().trim())
        }
      })
    }
  },
  methods: {
    centerUpdate(coords) {
      mutations.centerUpdate(coords)
    },
    async boundsUpdate(search){
      try {
      const data = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=` + search + ` Belgie&format=json`
      )

      var bounds = L.latLngBounds([
        [data.data[0].boundingbox[1], data.data[0].boundingbox[2]],
        [data.data[0].boundingbox[0], data.data[0].boundingbox[3]]
      ])

        mutations.boundsUpdate(bounds)
      } 
      catch (error) {
        console.log(error)
      }
    }
  }
};
</script>

<style scoped>
.button {
    background-color: transparent;
    border: none;
    border-radius: 0;
    font-size: 2rem;
    color: #fff;
}

.text-container {
    max-width: 1044px;
    width: 100%;
    padding: 0 3rem;
    margin: 0 auto
}

.text-wrapper {
    width: 100%;
    background-color: transparent;
}

.text-header {
    padding: 1rem 2rem;
    background-color: transparent;
    font-size: 1.5rem;
    line-height: 2rem;
    height: 4rem;
}

.text-body {
    overflow: scroll;
    height: calc(100vh - 4rem);
    color: #fff;
}

.card {
    padding: 1rem 2rem;
    cursor: pointer;
    position: relative;
    transition: all 0.5s ease;
    -webkit-transition: all 0.5s ease-out;
    -moz-transition: all 0.5s ease-out;
    -o-transition: all 0.5s ease-out;
}

.card:hover::after {
    background-color: #fff;
    content: '';
    display: block;
    height: 1px;
    width: 80%;
    margin: 0 2rem;
    position: absolute;
    bottom: 0;
    left: 0;
}

.card p {
    letter-spacing: 2px;
}


.card p,
.card h3 {
    margin: 0;
}

form {
  display: flex;
}

#search {
    color: #fff;
    font-family: 'Jost', sans-serif;
    font-size: 1rem;
    line-height: 2rem;
    background-color: transparent;
    border: 0px solid;
    border-bottom: 1px solid #fff;
    letter-spacing: 2px;
}

#search:focus {
    outline: none;
}
</style>