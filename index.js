require('dotenv').config()
const assert = require('assert')
const { parseEnv } = require('./libs/utils')
const Web = require('actions-http')

const config = parseEnv(process.env)
assert(config.name, 'app requires a name')

const App = require(`./apps/${config.name}`)
assert(App, 'app not found')

App(config)
  .then(actions => {
    if(actions) Web(config, actions)
    console.log(config.name, 'Online')
  })
  .catch(e => {
    console.log(e)
    process.exit(1)
  })

process.on('unhandledRejection', function(err, promise) {
  console.log(err)
  process.exit(1)
})
process.on('uncaughtException', function(err) {
  console.log(err.stack)
  process.exit(1)
})
