<template>
  <div class="tumulus" :class="{ hide: !show }" >
    <button type="button" class="button close-button" @click.prevent="hide()">
      <app-icon class="close-icon" icon="times" size="lg"></app-icon>
    </button>
    <div class="background" :style="{ backgroundImage: 'url(' + imageUrl + ')' }"></div>
    <div class="tumulus-container">
      <div class="title">
        <h2>{{tumulus.title}}</h2>
        <button type="button" class="button" @click.prevent="toggleLike(tumulus.title)">
          <app-icon :class="{liked: liked}" icon="heart" size="lg"></app-icon>
        </button>
      </div>
      <p>{{tumulus.location}} - {{tumulus.province}}</p>
      <hr>
      <ul class="list">
        <li class="list-item"><app-icon class="list-icon" icon="hourglass-half" size="lg"/>{{ tumulus.age }}</li>
        <li class="list-item"><app-icon class="list-icon" icon="arrows-alt-v" size="lg"/>{{ tumulus.height }} m</li>
        <li class="list-item"><app-icon class="list-icon" icon="hiking" size="lg"/>{{ tumulus.accessibility }}</li>
        <li class="list-item" v-if="tumulus.number"><app-icon class="list-icon" icon="mountain" size="md"/>{{ tumulus.number }} tumuli</li>
        <li class="list-item" v-if="tumulus.converted"><app-icon class="list-icon" icon="cross" size="lg"/>Gekerstend</li>
      </ul>
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
  .tumulus {
    background-color: #fff;
    max-width: 400px;
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    left: calc(25% - 200px);
    display: block;
    z-index: 1;
    box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, .2);
  }

  @media only screen and (max-width: 1000px) {
    .tumulus {
      transform: translateY(0);
      left: calc(50% - 200px);
      top: calc(50% + 2rem);
    }
  }

  @media only screen and (max-width: 400px) {
    .tumulus {
      left: 0;
      top: calc(50% + 2rem);
    }
  }

  .tumulus h2 {
    line-height: 1.5rem;
    margin-top: 0;
    margin-bottom: .5rem;
  }

  .tumulus p {
    letter-spacing: 2px;
    margin-top: 0;
  }

  .tumulus .title {
    display: flex;
    justify-content: space-between;
  }

  .tumulus .liked {
    color: pink;
  }

  .tumulus-container {
    padding: 1rem 2rem;
  }

  .background {
    width: 100%;
    height: 300px;
    background-size: cover;
  }

  .list {
    column-count: 2;
    padding-left: 0;
  }

  .list-item {
    list-style-type: none;
    margin-bottom: 1rem;
  }

  .list-icon {
    padding-right: 1rem;
    color: rgb(216, 122, 0);
  }

  .tumulus .button {
    border: 0;
    border-radius: 0;
    background-color: transparent;
  }

  .tumulus .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  .close-icon {
    color: #fff;
    filter: drop-shadow(2px 2px 0px rgba(0, 0, 255, .2));
  }
</style>