<template>
  <div class="likes" @click="toggle">
    <app-icon class="likes-icon" icon="heart" size="lg"/>
    <span class="counter" :v-if="{counter}">{{counter}}</span>
  </div>
</template>

<script>
import { store, mutations } from '@/store.js'

export default {
  computed: {
    counter() {
        if(store.likedTumulus.length > 0) {
            return store.likedTumulus.length
        }
    },
  },
  methods: {
        toggle() {
            mutations.toggleLikes()
        }
    }
}
</script>

<style scoped>
.likes {
    position: relative;
}

.likes:hover {
    cursor: pointer;
}

.likes .counter {
    display: flex;
    text-align: center;
    color: #fff;
    font-weight: bold;
    font-size: 12px;
    background-color: pink;
    border-radius: 1rem;
    position: absolute;
    top: 0;
    right: -10px;
    padding: 0 6px;
}

.likes-icon {
    color: #fff;
    font-size: 2rem;
}
</style>