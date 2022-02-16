<template>   
  <div>
          <form class="search-form">
            <select class="select" id="select" placeholder="Plaatsnaam..."  v-model="select"> 
              <option value="" disabled selected>Select your option</option>
              <option v-for="option in options" :key="option" :value="option">{{option}}</option>
            </select>
            <input type="text" name="search" id="search" placeholder="Plaatsnaam..." v-model="search"> 
            <button class="hidden" href="" @click.prevent="showTumulus(search)"></button>
          </form>
          <div class="search-results" v-if="searchResults.length > 0"> 
            <div class="tumuli">
              <div class="tumulus" v-for="tumulus in searchResults" :key="tumulus.node.id"  @click="showTumulus(tumulus.node)" data-aos="fade" data-aos-duration="1500">
                <div class="background" :style="{ backgroundImage: 'url(' + tumulus.node.image + ')' }"></div>
                <h2>{{tumulus.node.title}}</h2>
                <p>{{tumulus.node.location}}</p>
                <div class="tumulus-overlay">
                  <ul class="list">
                    <li class="list-item" v-if="tumulus.node.age"><app-icon class="list-icon" icon="hourglass-half" size="lg"/>{{ tumulus.node.age }}</li>
                    <li class="list-item" v-if="tumulus.node.height"><app-icon class="list-icon" icon="arrows-alt-v" size="lg"/>{{ tumulus.node.height }}</li>
                    <li class="list-item" v-if="tumulus.node.accessibility"><app-icon class="list-icon" icon="hiking" size="lg"/></li>
                    <li class="list-item" v-if="tumulus.node.number"><app-icon class="list-icon" icon="mountain" size="lg"/>{{ tumulus.node.number }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="center">
            <button id="scrollToMe" class="button" href="" @click.prevent="showMore()">Toon meer</button>
          </div>
          <div class="no-results" v-if="searchResults.length = 0">
            <p>Geen tumuli gevonden op deze locatie.</p>
          </div>
  </div>
</template>

<script>
import axios from 'axios'
import { store, mutations } from '@/store.js'

export default {
  data () {
    return {
      select: '',
      search: '',
      results: [],
      slice: 9
    };
  },
  computed: {
    options() {
      return this.$static.provinces.provinces
    },
    searchResults() {
      return this.$page.tumuli.edges.filter(tumulus => {
        if(this.search) {
          return tumulus.node.location.toLowerCase().includes(this.search.toLowerCase().trim())
        }
        else if(this.select) {
          return tumulus.node.province.toLowerCase().includes(this.select.toLowerCase().trim())
        }
        else {
          return tumulus.node
        }
      }).slice(0, this.slice)
    }
  },
  methods: { 
    showMore() {
      this.slice += 9;
      var element = document.getElementById("scrollToMe")
      console.log(element)
      element.scrollIntoView({behavior: "smooth", block: "end", inline: "end"})
    },
    showTumulus(tumulus) {
      mutations.centerUpdate(tumulus.coordinates)
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

<static-query>
query {
  provinces(id: "0") {
    provinces
  }
}
</static-query>

<style scoped>
  .search-form {
      background-color: transparent;
      font-size: 1.5rem;
      line-height: 2rem;
      height: 4rem;
      display: flex;
      justify-content: space-between;
      margin-bottom: 3rem;
      padding: 0 1.5rem;
  }

  .search-form input {
    margin-left: auto;
  }

  .tumuli {
    padding-left: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1.5rem;
    padding: 0 1.5rem;
  }

  @media only screen and (max-width: 1100px) {
    .tumuli {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media only screen and (max-width: 800px) {
    .tumuli {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  .tumulus {
    margin-bottom: 3rem;
    justify-self: center;
  }
</style>