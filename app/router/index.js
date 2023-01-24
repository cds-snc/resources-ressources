import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export function createRouter(ssrContext, createDefaultRouter, routerOptions) {
  const options = routerOptions || createDefaultRouter(ssrContext).options

  // console.log("hostname: " + hostname);

  return new Router({
    ...options,
    routes: options.routes,
  })
}

// Functions ----------------------------------------------------------------------------------------------------------
