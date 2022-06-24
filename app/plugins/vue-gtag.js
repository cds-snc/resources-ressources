import Vue from "vue";
import VueGtag from "vue-gtag";

// Vue.use(VueGtag, {
//   config: { id: process.env.GOOGLE_ANALYTICS_ID },
// })
/**
 * @type {import('@nuxt/types').Plugin}
 */
const vueGtag = ({ app }) => {
  Vue.use(
    VueGtag,
    {
      config: { id: process.env.GOOGLE_ANALYTICS_ID },
    },
    app.router
  )
}

export default vueGtag
