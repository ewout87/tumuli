<template>   
        <div class="list">
          <form class="search-form">
            <input type="text" name="search" id="search" placeholder="Plaatsnaam..." v-model="search"> 
            <button class="button" href="" @click.prevent="boundsUpdate(search)"><i class="fas fa-search-location"></i></button>
          </form>
          <div class="search-results"> 
            <ul class="results" v-if="searchResults.length > 0">
              <li class="result-item" v-for="tumulus in searchResults" :key="tumulus.node.id"  @click="showTumulus(tumulus.node)">
                <h3>{{tumulus.node.title}}</h3>
                <p>{{tumulus.node.location}} - {{tumulus.node.province}}</p>
              </li>
            </ul>
            <div class="no-results" v-if="searchResults.length = 0">
              <p>Geen tumuli gevonden op deze locatie.</p>
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
      return this.$page.tumuli.edges.filter(tumulus => {
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
    showTumulus(tumulus) {
      mutations.centerUpdate(tumulus.coords)
      mutations.showTumulus()
      mutations.updateTumulus(tumulus)
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

        mutations.updateBounds(bounds)
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
}

.search-form {
    padding: 1rem 2rem;
    background-color: transparent;
    font-size: 1.5rem;
    line-height: 2rem;
    height: 4rem;
}

.search-results {
  padding: 0 2rem;
}

.results {
  padding-left: 0;
}

.result-item {
  list-style-type: none;
  padding: 1rem 0;
  cursor: pointer;
  position: relative;
  transition: all 0.5s ease;
  -webkit-transition: all 0.5s ease-out;
  -moz-transition: all 0.5s ease-out;
  -o-transition: all 0.5s ease-out;
  border-bottom: 1px solid transparent;
}

.result-item:hover {
  border-bottom: 1px solid rgba(0,0,0,0.8);
}

.result-item p {
  letter-spacing: 2px;
}


.result-item p,
.result-item h3 {
  margin: 0;
}

form {
  display: flex;
}

#search {
    font-family: 'Jost', sans-serif;
    font-size: 1rem;
    line-height: 2rem;
    background-color: transparent;
    border: 0px solid;
    border-bottom: 1px solid rgba(0,0,0,0.8);;
    letter-spacing: 2px;
}

#search:focus {
    outline: none;
}
</style>