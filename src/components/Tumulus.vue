<template>
  <div :class="{ hide: !show }" >
    <div class="tumulus-backdrop" @click="hide()"></div>
      <div class="tumulus">
        <div class="background" :style="{ backgroundImage: 'url(' + tumulus.image + ')' }"></div>
          <h2>{{tumulus.title}}</h2>
          <p>{{tumulus.location}}</p>
          <div class="tumulus-overlay">
            <ul class="list">
            <li class="list-item" v-if="tumulus.age"><app-icon class="list-icon" icon="hourglass-half" size="lg"/>{{ tumulus.age }}</li>
            <li class="list-item" v-if="tumulus.height"><app-icon class="list-icon" icon="arrows-alt-v" size="lg"/>{{ tumulus.height }} m</li>
            <li class="list-item" v-if="tumulus.accessibility"><app-icon class="list-icon" icon="hiking" size="lg"/></li>
            <li class="list-item" v-if="tumulus.number"><app-icon class="list-icon" icon="mountain" size="lg"/>{{ tumulus.number }} tumuli</li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { store, mutations } from '@/store.js'

export default {
  computed: {
    tumulus() {
      return store.selectedTumulus
    },
    show(){
      return store.tumulusSelected
    },
    imageUrl() {
      return store.selectedTumulus.image
    },
    liked() {
      if(store.likedTumulus.includes(store.selectedTumulus.title)) {
        return true
      }
    }
  },
  methods: {
    hide(){
      mutations.hideTumulus()
    },
    toggleLike(tumulus){
      if(store.likedTumulus.includes(store.selectedTumulus.title)) {
        mutations.unlikeTumulus(tumulus)
      }
      else {
        mutations.likeTumulus(tumulus)
      }
    }
  }
}
</script>

<style scoped>
  .tumulus-backdrop {
    width: 100%;
    height: 500px;
    position: absolute;
    z-index: 9;
    top: 0;
    left: 0;
    cursor: pointer;
  }

  .tumulus {
    background-color: #fff;
    position: absolute;
    top: 10rem;
    left: 10rem;
    z-index: 9;
    box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, .2);
  }
</style>