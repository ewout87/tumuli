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
      <searchForm/>
      <Routes/>
  </div>
</template>

<script>
import Routes from '~/components/Routes.vue'
import searchForm from '~/components/SearchForm.vue'
import { store, mutations } from '@/store.js'

export default {
  components: {
    Routes: Routes,
    searchForm: searchForm
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