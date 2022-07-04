import Vue from 'vue'
import VueGtag from 'vue-gtag'

/**
 * @type {import('@nuxt/types').Plugin}
 */
export const vueGtag = ({ app }) => {
  Vue.use(
    VueGtag,
    {
      config: { id: `ga-id-${process.env.GOOGLE_ANALYTICS_ID}` },
    },
    app.router
  )
}
