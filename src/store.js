import Vue from "vue";

export const store = Vue.observable({
    isSidebarOpen: false,
    isLikesOpen: false,
    bounds: [
        [50.80667, 3.461389],
        [50.23167, 6.115278],
    ],
    zoom: 11,
    coords: [50.67198817403728, 5.077813266040513],
    tumulusSelected: false,
    selectedTumulus: [],
    likedTumulus: [],
    routes: []
});

// We call toggleNav anywhere we need it in our app
export const mutations = {
    hideTumulus() {
        store.tumulusSelected = false
    },
    showTumulus() {
        store.tumulusSelected = true
    },
    likeTumulus(tumulusId) {
        store.likedTumulus.push(tumulusId)
    },
    unlikeTumulus(tumulusId) {
        const arr = store.likedTumulus

        for( var i = 0; i < arr.length; i++){ 
            if (arr[i] === tumulusId) { 
                arr.splice(i, 1); 
            }
        }
    },
    updateTumulus(tumulus) {
        store.selectedTumulus = tumulus
    },
    toggleSidebar() {
        store.isSidebarOpen = !store.isSidebarOpen
    },
    toggleLikes() {
        store.isLikesOpen = !store.isLikesOpen
    },
    centerUpdate(coordinates) {
        store.coords = coordinates
        store.zoom = 15
    },
    updateBounds(bounds){
        store.bounds = bounds
    },
    updateRoutes(routes) {
        store.routes = routes
    }
};