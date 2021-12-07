// import serverlessExpress from '@vendia/serverless-express'
const serverlessExpress = require('@vendia/serverless-express')
// const app = require('./server')
const { start } = require('./server')
// let serverlessExpressInstance

const appPromise = start()

async function handler(event, context){
    console.log(`EVENT: ${JSON.stringify(event)}`);
    // console.log("EVENT: \n" + JSON.stringify(event, null, 2))

    // console.log('context', context)
    console.log('here')
    // const result = serverlessExpress({ app })

    // console.log('RESULT', result)
    // return result

    const app = await appPromise
    console.log('app is', app)

    return serverlessExpress({app})(event, context)
    // event = 'AWS_LAMBDA_EDGE'
    // event = {
    //     Records: []
    // }

    // serverlessExpressInstance = serverlessExpress({ 
    //     app,
    //     // eventSourceRoute:{
    //     //     'AWS_LAMBDA_EDGE': '/'
    //     // },
    //     logSettings: {
    //         level: 'debug' // default: 'error'
    //       }    
    // })
    // console.log('CONTEXT', context)

    // callback(null, `Hello world ${event.test} ${JSON.stringify(event)}`)
    // return "HELLo world"
    // return serverlessExpressInstance(event, context)
}
exports.handler = handler


// import { Nuxt } from '@nuxt/core'
// import * as config from '../app/nuxt.config.js'

// const nuxt = new Nuxt(config)
// // https://github.com/pimlie/nuxt-lambda/blob/master/src/handlers/full.js
// const fullHandler = async (req, res) => {
// //   fixConfig(config)

// //   req.url = prepareUrl(req.url)

//   await nuxt.ready()

//   // console.
//   return "Hello World"

//   // return nuxt.server.app(req, res)
// }
// const { loadNuxt } = require('nuxt')
// const app = require('express')()
// const app = require('../server')
// const fullHandler = async (req, res) => {
//   // const nuxt = await loadNuxt('start')
//   // app.use(nuxt.render)
//   console.log('started')
//   return app
//   // return "Hello World"
// }

// // export default fullHandler
// exports.handler = fullHandler

// const serverlessExpress = require('@vendia/serverless-express')
// const app = require('./server')
// exports.handler = serverlessExpress({ app })

// 'use strict';
// const awsServerlessExpress = require('aws-serverless-express')
// const app = require('./server')

// const binaryMimeTypes = [
//   'application/javascript',
//   'application/json',
//   'application/octet-stream',
//   'application/xml',
//   'font/eot',
//   'font/opentype',
//   'font/otf',
//   'image/jpeg',
//   'image/png',
//   'image/svg+xml',
//   'text/comma-separated-values',
//   'text/css',
//   'text/html',
//   'text/javascript',
//   'text/plain',
//   'text/text',
//   'text/xml'
// ]
// const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes)

// module.exports.nuxt = (event, context) => awsServerlessExpress.proxy(server, event, context)