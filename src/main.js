// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import 'leaflet/dist/leaflet.css'
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"
import {
  faHourglassHalf,
  faArrowsAltV,
  faHiking,
  faCross,
  faTimes,
  faMountain,
  faHeart
} from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default function (Vue, { router, head, isClient }) {
  library.add(faHourglassHalf, faArrowsAltV, faHiking, faCross, faTimes, faMountain, faHeart)
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.component('AppIcon', FontAwesomeIcon)
}
