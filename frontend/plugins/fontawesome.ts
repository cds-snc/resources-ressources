// import { defineNuxtPlugin } from 'nuxt3'

import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowRotateRight, faArrowRight } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowRotateRight, faArrowRight)
config.autoAddCss = false

// export default defineNuxtPlugin(nuxtApp => {
export default defineNuxtPlugin((nuxtApp) => {

    // Doing something with nuxtApp
    nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})