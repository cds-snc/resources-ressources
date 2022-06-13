const serverlessExpress = require('@vendia/serverless-express')
const { start } = require('./server')

const appPromise = start()

async function handler(event, context) {
  const app = await appPromise

  return serverlessExpress({ app })(event, context)
}
exports.handler = handler
