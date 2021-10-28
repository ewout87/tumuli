import Vue from "vue";

export const store = Vue.observable({
    isNavOpen: false,
    bounds: [
        [50.80667, 3.461389],
        [50.23167, 6.115278],
    ],
    zoom: 10,
    coords: [50.67198817403728, 5.077813266040513],
    tumulusSelected: false,
    selectedTumulus: [],
    likedTumulus: []
});

// We call toggleNav anywhere we need it in our app
export const mutations = {
    hideTumulus() {
        store.tumulusSelected = false
    },
    showTumulus() {
        store.tumulusSelected = true
    },
    likeTumulus(tumulus) {
        store.likedTumulus.push(tumulus.id)
    },
    unlikeTumulus(tumulus) {
        store.likedTumulus.splice(tumulus.id, 1)
    },
    updateTumulus(tumulus) {
        store.selectedTumulus = tumulus
    },
    toggleNav() {
        store.isNavOpen = !store.isNavOpen
    },
    centerUpdate(coords) {
        store.coords = coords
        store.zoom = 15
    },
    boundsUpdate(bounds){
        store.bounds = bounds
    }
};