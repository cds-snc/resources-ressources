import Vue from 'vue'
import VueGtag from 'vue-gtag'

/**
 * @type {import('@nuxt/types').Plugin}
 */
export default ({ app, $config: { googleAnalyticsID } }) => {
  Vue.use(VueGtag, {
    config: { id: googleAnalyticsID }
  }, app.router);
}
