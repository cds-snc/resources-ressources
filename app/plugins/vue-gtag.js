import Vue from 'vue'
import VueGtag from 'vue-gtag'

/**
 * @type {import('@nuxt/types').Plugin}
 */
export default ({ app, $config: { googleAnalyticsID } }) => {
  Vue.use(
    VueGtag,
    {
      pageTrackerScreenviewEnabled: true,
      config: { id: googleAnalyticsID },
    },

    // Auto tracking https://matteo-gabriele.gitbook.io/vue-gtag/auto-tracking
    app.router
  )
}
