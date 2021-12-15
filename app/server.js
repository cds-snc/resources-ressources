const { Nuxt } = require('nuxt-start')

const express = require('express')
const app = express()

exports.start = async function start() {
    // We instantiate Nuxt with the options
    const config = require('./nuxt.config.js')
    console.log('starting nuxt...')
    if(config.env.CTF_CDA_ACCESS_TOKEN){
        console.log('token set')
    }
    if(config.env.CTF_CDA_ACCESS_TOKEN === process.env.contentful_cda_access_token){
        console.log('token from lambda env')
    }

    const configOverrides = { dev: false, debug: true }
    const nuxt = new Nuxt(Object.assign(config, configOverrides))
    await nuxt.ready()

    app.use(nuxt.render)
    return app
}