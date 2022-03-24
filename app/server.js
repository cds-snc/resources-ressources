const { Nuxt } = require('nuxt-start')

const express = require('express')
const app = express()

exports.start = async function start() {
  // We instantiate Nuxt with the options
  const config = require('./nuxt.config.js')

  const configOverrides = { dev: false, debug: true }
  const nuxt = new Nuxt(Object.assign(config, configOverrides))
  await nuxt.ready()

  app.use(nuxt.render)
  return app
}
