<template>
    <div class="sidebar">
        <div class="sidebar-backdrop" @click="closeSidebarPanel" v-if="isPanelOpen"></div>
        <transition name="slide">
            <div v-if="isPanelOpen" class="sidebar-panel">
                <div class="sidebar-wrapper" ref="scrollToMe">
                    <Search></Search>
                    <Social></Social>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import Social from '~/components/Social.vue'
import Search from '~/components/Search.vue'
import { store, mutations } from '@/store.js'

export default {
    name: 'app',
    components: {
        Search,
        Social
    },
    methods: {
        closeSidebarPanel: mutations.toggleNav
    },
    computed: {
        isPanelOpen() {
            return store.isNavOpen
        }
    }
}
</script>
<style>
    .slide-enter-active,
    .slide-leave-active {
        transition: transform 0.2s ease;
    }

    .slide-enter,
    .slide-leave-to {
        transform: translateX(-100%);
        transition: all 150ms ease-in 0s
    }

    .sidebar-backdrop {
        background-color: rgba(0,0,0,.5);
        width: 100vw;
        height: 100vh;
        position: fixed;
        z-index: 999;
        top: 0;
        left: 0;
        cursor: pointer;
    }

    .sidebar-panel {
        background-color: #130f40;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 999;
        width: 350px;
        height: 100vh;
    }

    .sidebar-wrapper {
        width: 100%;
        height: 100%;
        background-color: transparent;
        position: relative;
        color: #fff;
    }
</style>